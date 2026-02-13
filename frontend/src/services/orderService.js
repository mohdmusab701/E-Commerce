import api from './api';

export const orderService = {
    createPaymentIntent: async (items) => {
        const response = await api.post('/orders/payment-intent', { items });
        return response.data;
    },

    confirmOrder: async (orderData) => {
        const response = await api.post('/orders/confirm', orderData);
        return response.data;
    },

    getMyOrders: async () => {
        const response = await api.get('/orders/my-orders');
        return response.data;
    },

    getOrderById: async (id) => {
        const response = await api.get(`/orders/${id}`);
        return response.data;
    },

    getAllOrders: async (params = {}) => {
        const response = await api.get('/orders/all/list', { params });
        return response.data;
    },

    updateOrderStatus: async (id, status) => {
        const response = await api.put(`/orders/${id}/status`, { status });
        return response.data;
    },

    getOrderStats: async () => {
        const response = await api.get('/orders/stats/analytics');
        return response.data;
    },
};
