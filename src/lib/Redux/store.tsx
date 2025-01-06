import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { profilereducer } from "./slices/loggedUserSlice";
import { postReducer } from "./slices/postSlice";
import { profile } from "console";
import { ProfilePhotoReducer } from "./slices/profilePhotoSlice";

export let store = configureStore({
    // slices 
    reducer: {
        auth: authReducer,
        profile: profilereducer,
        posts: postReducer,
        profilePhoto: ProfilePhotoReducer,
    },
})

export type dispatchType =  typeof store.dispatch
// In your store.ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;