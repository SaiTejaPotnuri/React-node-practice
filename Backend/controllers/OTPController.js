const twilio = require('twilio');
const { twilloAccountSid, twilloAuthToken, twilloVerifiedServiceId } = require("../config/twillo.config.js");

// Initialize Twilio client
const client = twilio(twilloAccountSid, twilloAuthToken);

exports.OTPController = async (req, res) => {
    console.log("OTP API called", req.body);
    
    try {
        const { action, email, otp } = req.body;

        // Validate required fields based on action
        if (!action) {
            return res.status(400).json({
                success: false,
                message: 'Action is required (send or verify)'
            });
        }

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        // Handle Send OTP
        if (action === 'send') {
            const verification = await client.verify.v2
                .services(twilloVerifiedServiceId)
                .verifications
                .create({
                    to: email,
                    channel: 'email',
                    locale: 'en'
                });

            console.log('OTP sent successfully:', verification.sid);

            return res.status(200).json({
                success: true,
                message: 'OTP sent successfully to your email',
                sid: verification.sid,
                status: verification.status,
                data: {
                    email: email,
                    channel: 'email'
                }
            });
        }

        // Handle Verify OTP
        if (action === 'verify') {
            if (!otp) {
                return res.status(400).json({
                    success: false,
                    message: 'OTP is required for verification'
                });
            }

            // Validate OTP format (should be 6 digits)
            if (!/^\d{6}$/.test(otp)) {
                return res.status(400).json({
                    success: false,
                    message: 'OTP must be 6 digits'
                });
            }

            const verificationCheck = await client.verify.v2
                .services(twilloVerifiedServiceId)
                .verificationChecks
                .create({
                    to: email,
                    code: otp
                });

            console.log('Verification result:', verificationCheck.status);

            if (verificationCheck.status === 'approved') {
                return res.status(200).json({
                    success: true,
                    message: 'Email verified successfully!',
                    status: verificationCheck.status,
                    data: {
                        email: email,
                        verified: true,
                        verifiedAt: new Date().toISOString()
                    }
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid or expired OTP',
                    status: verificationCheck.status
                });
            }
        }

        // Invalid action
        return res.status(400).json({
            success: false,
            message: 'Invalid action. Use "send" or "verify"'
        });

    } catch (error) {
        console.error('Twilio OTP Error:', error);

        // Handle specific Twilio errors
        if (error.code === 20404) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Verify Service configuration',
                errorCode: error.code
            });
        }

        if (error.code === 60200) {
            return res.status(429).json({
                success: false,
                message: 'Too many attempts. Please try again later.',
                errorCode: error.code
            });
        }

        if (error.code === 60202) {
            return res.status(400).json({
                success: false,
                message: 'Invalid verification code',
                errorCode: error.code
            });
        }

        if (error.code === 60203) {
            return res.status(400).json({
                success: false,
                message: 'Maximum verification attempts reached',
                errorCode: error.code
            });
        }

        if (error.code === 60205) {
            return res.status(400).json({
                success: false,
                message: 'SMS/Email not delivered',
                errorCode: error.code
            });
        }

        // Generic error response
        return res.status(500).json({
            success: false,
            message: 'Failed to process OTP request. Please try again.',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
};

// Optional: Separate functions for better organization
exports.sendOTP = async (req, res) => {
    req.body.action = 'send';
    return exports.OTPController(req, res);
};

exports.verifyOTP = async (req, res) => {
    req.body.action = 'verify';
    return exports.OTPController(req, res);
};