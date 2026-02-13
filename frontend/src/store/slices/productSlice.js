import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    currentProduct: null,
    filters: {
        search: '',
        category: '',
        minPrice: '',
        maxPrice: '',
        minRating: '',
        sortBy: 'createdAt',
        sortOrder: 'desc',
    },
    pagination: {
        page: 1,
        limit: 12,
        total: 0,
        totalPages: 0,
    },
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload.data;
            state.pagination = action.payload.pagination;
            state.loading = false;
        },
        setCurrentProduct: (state, action) => {
            state.currentProduct = action.payload;
            state.loading = false;
        },
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
            state.pagination.page = 1; // Reset to first page when filters change
        },
        setPage: (state, action) => {
            state.pagination.page = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const {
    setLoading,
    setProducts,
    setCurrentProduct,
    setFilters,
    setPage,
    setError,
    clearError,
} = productSlice.actions;

export default productSlice.reducer;
