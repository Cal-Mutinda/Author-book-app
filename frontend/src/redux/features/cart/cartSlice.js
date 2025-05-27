import { createSlice } from '@reduxjs/toolkit'
import Swal  from 'sweetalert2'

const initialState = {
    cartItems: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id)
            if (!existingItem) {
                state.cartItems.push(action.payload)
                Swal.fire({
                    title: "Cart Update",
                    text: "The book has been succesfully added to Cart",
                    icon: "success"
                });
            }
            else (
                Swal.fire({
                    title: "Cart",
                    text: "Book already added to the cart",
                    icon: "warning"
                })
            )
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id)
        },
        clearCart: (state) => {
            state.cartItems = []
            
        }
    }
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;