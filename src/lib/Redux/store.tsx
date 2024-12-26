import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { profilereducer } from "./slices/loggedUserSlice";

export let store = configureStore({
    // slices 
    reducer: {
        auth: authReducer,
        profile: profilereducer
    },
})

export type dispatchType =  typeof store.dispatch
// In your store.ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;