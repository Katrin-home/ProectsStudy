import {createSlice} from "@reduxjs/toolkit";
import {AUTH_USER_ITEM} from "../app/utils/constants";

const  authSlice = createSlice({
    name: 'auth',
    initialState: {authUser: localStorage.getItem(AUTH_USER_ITEM) || ""},
    reducers: {
        login: (state, action) => {
            state.authUser = action.payload || ""
        },
        logout: (state) => {
            state.authUser = ""
        }
    }
})
export const {login, logout} = authSlice.actions;
export default authSlice.reducer;