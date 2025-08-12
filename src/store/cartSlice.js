import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: []
}

const cartSlice = createSlice({
    name: "cartItem",
    initialState: initialState,
    reducers: {
        handleAddCartItem: (state, action) => {
            state.cart = [...action.payload]
        }
    }
})

export const { handleAddCartItem } = cartSlice.actions

export default cartSlice.reducer