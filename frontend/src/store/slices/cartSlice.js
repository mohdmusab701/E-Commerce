import { createSlice } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
    try {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : { items: [], totalQuantity: 0, totalPrice: 0 };
    } catch (error) {
        return { items: [], totalQuantity: 0, totalPrice: 0 };
    }
};

const saveCartToStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

const calculateTotal = (items) => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

const initialState = loadCartFromStorage();

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(item => item.product === action.payload.product);

            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }

            state.totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0);
            state.totalPrice = calculateTotal(state.items);
            saveCartToStorage(state);
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.product !== action.payload);
            state.totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0);
            state.totalPrice = calculateTotal(state.items);
            saveCartToStorage(state);
        },
        updateQuantity: (state, action) => {
            const { product, quantity } = action.payload;
            const item = state.items.find(item => item.product === product);

            if (item) {
                item.quantity = quantity;
                state.totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0);
                state.totalPrice = calculateTotal(state.items);
                saveCartToStorage(state);
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
            saveCartToStorage(state);
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
