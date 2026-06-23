import axios from 'axios';

const API_URL = '/api/auth';

// Mock data
const mockUser = {
  id: 1,
  name: 'Dr. Saketh Kumar',
  email: 'saketh@pharmacy.com',
  role: 'ADMIN',
  token: 'mock-jwt-token-12345'
};

export const login = async (credentials) => {
  // When backend is ready:
  // return axios.post(`${API_URL}/login`, credentials);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: mockUser });
    }, 500);
  });
};

export const register = async (userData) => {
  // return axios.post(`${API_URL}/register`, userData);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { message: 'Registration successful', user: mockUser } });
    }, 500);
  });
};

export const forgotPassword = async (email) => {
  // return axios.post(`${API_URL}/forgot-password`, { email });
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { message: 'Password reset email sent' } });
    }, 500);
  });
};
