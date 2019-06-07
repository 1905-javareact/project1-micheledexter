import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://ec2-18-220-194-68.us-east-2.compute.amazonaws.com:5000',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});