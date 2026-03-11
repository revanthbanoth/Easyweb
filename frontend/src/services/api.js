import axios from 'axios';

// In development: VITE_API_URL is empty → uses Vite proxy at /api (no CORS issue)
// In production:  VITE_API_URL = https://easyweb-qgyq.onrender.com
const API_BASE = import.meta.env.VITE_API_URL || 'https://easyweb-qgyq.onrender.com';

const api = axios.create({
    baseURL: `${API_BASE}/api`,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: false,
});

api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const message =
            error.response?.data?.message || error.message || 'An error occurred';
        return Promise.reject(new Error(message));
    }
);

export const getTemplates = () => api.get('/templates');
export const getTemplateById = (id) => api.get(`/templates/${id}`);
export const createOrder = (data) => api.post('/orders', data);
export const getOrders = () => api.get('/orders');
export const updateOrderStatus = (id, status) =>
    api.put(`/orders/${id}`, { order_status: status });
export const submitContactForm = (data) => api.post('/contact', data);

export default api;
