import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";

export let store = configureStore({
    // slices 
    reducer: {
        auth: authReducer,
    },
})

export type dispatchType =  typeof store.dispatch