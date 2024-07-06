import {createSlice} from "@reduxjs/toolkit";
import {ProductType} from "../app/utils/types";

const initialState: {
    products: ProductType[]
} = {products:[]}

const productSlice = createSlice({
    name: 'prosuctState',
    initialState,
    reducers: {
        setProducts(state, action) {
            state.products = action.payload
        }
    }
})

export const {setProducts} = productSlice.actions
export default productSlice.reducer