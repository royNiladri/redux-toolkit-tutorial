import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from "../cartItems";

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
    cartItems: [],
    amount: 0,
    total: 0,
    isLoading: false,
};

export const getcartItems = createAsyncThunk(
    'cart/getCartItems',
    () => {
        return fetch(url)
            .then((res => res.json()))
            .catch(err => console.log(err));
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = []; // redux toolkit comes with Immer, and handles immutability
        },
        removeItem: (state, action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter(item => item.id !== itemId);
        },
        increase: (state, { payload }) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            cartItem.amount = cartItem.amount + 1;
        },
        decrease: (state, { payload }) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            cartItem.amount = cartItem.amount - 1;
        },
        calculateTotals: (state) => {
            state.amount = state.cartItems.reduce((a, b) => a + b.amount, 0); // item count
            state.total = state.cartItems.reduce((sum, itm) => sum + (itm.price * itm.amount), 0);
        }
    },
    extraReducers: {
        [getcartItems.pending]: (state) => {
            state.isLoading = true;
        },
        [getcartItems.fulfilled]: (state, action) => {
            state.cartItems = action.payload;
            state.isLoading = false;
        },
        [getcartItems.rejected]: (state) => {
            state.isLoading = false;
        }
    }
});

console.log(cartSlice);

export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;