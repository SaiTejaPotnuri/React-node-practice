import axios from 'axios';
import { toast } from 'react-toastify';

class AxiosInterceptorService {
    constructor() {
        this.isRefreshing = false;
        this.refreshSubscribers = [];
        
        // Create axios instance
        this.api = axios.create({
            baseURL: "https://react-practice-01-832c4-default-rtdb.firebaseio.com",
            timeout: 15000
        });

        this.setupInterceptors();
    }

    onRefreshed(token) {
        this.refreshSubscribers.forEach(callback => callback(token));
        this.refreshSubscribers = [];
    }

    addRefreshSubscriber(callback) {
        this.refreshSubscribers.push(callback);
    }

    setupInterceptors() {
        // Request interceptor
        this.api.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');
                const isLoginRequest = config.url?.includes('/api/auth/signin');
                const isRefreshRequest = config.url?.includes('/api/auth/refreshtoken');

                if (token && !isRefreshRequest) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor
        this.api.interceptors.response.use(
            (response) => response,
            async (error) => {
                // Handle loader states
                this.handleLoaderStates();

                const originalRequest = error.config;
                
                if (error.response?.status === 401 && !originalRequest._retry) {
                    if (!originalRequest.url.includes('/api/auth/signin')) {
                        return this.handle401Error(originalRequest);
                    }
                }

                if (error.response?.status === 403) {
                    if (error?.response?.data?.message) {
                        toast.error('Session Expired. Please login again.');
                    }
                    localStorage.clear();
                    window.location.href = '/auth/signIn';
                    return Promise.reject(error);
                }

                if (error.response?.status === 500) {
                    if (error.response.data.error === 'Internal Server Error') {
                        toast.error('Something went wrong. Please try again');
                    }
                }

                // Handle specific error messages
                const errorMessage = error.response?.data?.message;
                if (errorMessage) {
                    const ignoredMessages = [
                        'No Data Found',
                        'Invalid JWT token',
                        'Bad credentials',
                        'JWT token has expired'
                    ];

                    if (errorMessage === 'Bad credentials') {
                        toast.error('Invalid credentials. Please check your username and password.');
                    } else if (!ignoredMessages.includes(errorMessage)) {
                        toast.error(errorMessage);
                    }
                }

                return Promise.reject(error);
            }
        );
    }

    async handle401Error(failedRequest) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            const refreshToken = localStorage.getItem('refreshToken');

            if (refreshToken) {
                try {
                    const response = await this.refreshToken();
                    const { accessToken, refreshToken: newRefreshToken } = response.data;

                    localStorage.setItem('token', accessToken);
                    localStorage.setItem('refreshToken', newRefreshToken);

                    failedRequest.headers.Authorization = `Bearer ${accessToken}`;
                    
                    // Notify all subscribers about the new token
                    this.onRefreshed(accessToken);
                    this.isRefreshing = false;

                    return this.api(failedRequest);
                } catch (error) {
                    this.isRefreshing = false;
                    localStorage.clear();
                    window.location.href = '/auth/signIn';
                    return Promise.reject(error);
                }
            }
        }

        // Wait for the new token
        return new Promise((resolve) => {
            this.addRefreshSubscriber((token) => {
                failedRequest.headers.Authorization = `Bearer ${token}`;
                resolve(this.api(failedRequest));
            });
        });
    }

    async refreshToken() {
        return this.api.post('/api/auth/refreshtoken', {
            refreshToken: localStorage.getItem('refreshToken')
        });
    }

    handleLoaderStates() {
        // Implement your loader state management here
        // Example:
        // store.dispatch(hideSpinner());
    }

    // Public API methods
    async get(url, config = {}) {
        return this.api.get(url, config);
    }

    async post(url, data = {}, config = {}) {
        return this.api.post(url, data, config);
    }

    async put(url, data = {}, config = {}) {
        return this.api.put(url, data, config);
    }

    async delete(url, config = {}) {
        return this.api.delete(url, config);
    }
}

// Create and export instance
export const apiService = new AxiosInterceptorService();