import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import Authenticate from "../context/AuthContext";

const OtpVerificationModal = ({ showOTPModel, user, hideOTPModel, onOTPVerified }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const auth = useContext(Authenticate);

  const handleCancel = () => {
    setOtp('');
    setError('');
    hideOTPModel();
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
    setError('');
  };

  const handleSubmit = async () => {
    if (otp.length !== 6) {
      setError('Please enter a 6-digit OTP');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const payload = { userInfo: user, otp: otp };
      console.log("before")
      let responseVerify = await auth.verifyOtp(payload);
            console.log("After" + responseVerify)

      if (responseVerify) {
        setIsVerified(true);
        setTimeout(() => {
          onOTPVerified();
        }, 1500); // Show success message for 1.5 seconds before closing
      } else {
        setError( 'OTP verification failed.');
        setLoading(false);
      }
    } catch (err) {
      setError('Network error. Please try again later.');
      setLoading(false);
    }
  };

  // Don't render if modal should not be shown
  if (!showOTPModel) {
    return null;
  }

  return ReactDOM.createPortal(
    <div 
      className="modal" 
      style={{
        display: showOTPModel ? "block" : "none",
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
      }} 
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-bottom-0 pb-0">
            <h5 className="modal-title w-100 text-center">
              <i className="bi bi-shield-lock me-2"></i>
              OTP Verification
            </h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={handleCancel}
              disabled={loading}
            ></button>
          </div>
          
          <div className="modal-body text-center py-4">
            {!isVerified ? (
              <>
                <p className="text-muted mb-4">
                  Please enter the 6-digit code sent to your device
                </p>
                
                <div className="mb-4">
                  <input
                    type="text"
                    value={otp}
                    onChange={handleOtpChange}
                    className="form-control form-control-lg text-center fs-2 fw-bold letter-spacing-wide"
                    placeholder="000000"
                    maxLength="6"
                    disabled={loading}
                    autoFocus
                    style={{
                      letterSpacing: '0.5em',
                      fontSize: '2rem',
                      fontFamily: 'monospace',
                      border: '2px solid #dee2e6',
                      borderRadius: '0.5rem'
                    }}
                  />
                </div>

                {error && (
                  <div className="alert alert-danger py-2 mb-3">
                    <small>{error}</small>
                  </div>
                )}
              </>
            ) : (
              <div className="py-4">
                <div className="text-success mb-3">
                  <i className="bi bi-check-circle-fill" style={{fontSize: '3rem'}}></i>
                </div>
                <h5 className="text-success mb-2">Verified Successfully!</h5>
                <p className="text-muted">Your OTP has been verified successfully.</p>
              </div>
            )}
          </div>
          
          {!isVerified && (
            <div className="modal-footer border-top-0 justify-content-center gap-2">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={handleSubmit}
                disabled={loading || otp.length !== 6}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Verifying...
                  </>
                ) : (
                  'Verify OTP'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.getElementById('root-portal')
  );
};

export default OtpVerificationModal;