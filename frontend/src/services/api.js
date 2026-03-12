import axios from 'axios';

// In development: VITE_API_URL is empty → uses Vite proxy at /api (no CORS issue)
// In production:  VITE_API_URL = https://easyweb-backend-q7aa.onrender.com
const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '' : 'https://easyweb-backend-q7aa.onrender.com');

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

let templatesCache = null;

export const getTemplates = async () => {
    if (templatesCache) return { data: templatesCache };
    const res = await api.get('/templates');
    templatesCache = res.data;
    return res;
};

export const getTemplateById = async (id) => {
    if (templatesCache) {
        const cached = templatesCache.find(t => String(t.id) === String(id));
        if (cached) return { data: cached };
    }
    return api.get(`/templates/${id}`);
};

export const createOrder = (data) => api.post('/orders', data);
export const getOrders = () => api.get('/orders');
export const updateOrderStatus = (id, status) =>
    api.put(`/orders/${id}`, { order_status: status });
export const submitContactForm = (data) => api.post('/contact', data);
export const getContactMessages = () => api.get('/contact');

export default api;
