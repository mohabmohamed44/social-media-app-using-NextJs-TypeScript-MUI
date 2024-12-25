import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface ILoginData {
    email: string,
    password: string,
}

export interface IRegisterData {
    email: string,
    password: string,
    name: string,
}

export let handleLogin = createAsyncThunk('auth/login', async function (formData: ILoginData) {
    // payload
    return await axios.post("https://linked-posts.routemisr.com/users/signin", formData).then((response) => {
        return response.data;
    }).catch((error) => {
        return error.response.data;
    });
})

export let handleRegister = createAsyncThunk('auth/register', async function (formData: IRegisterData) {
    // payload
    return await axios.post(`https://linked-post.routemisr.com/users/signup`, formData).then((response) => {
        return response.data;
    }).catch((error) => {
        return error.response.data;
    });
})

let initialState:{token:string|null,userData:any, isLaoding:boolean} =   {
    // token
    token: null,
    // user data
    userData: null,
    // isLoading
    isLaoding: false,
}

let authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        clearData: function (state) {
            state.token = null;
            state.userData = null;
        },
    },
    extraReducers:function(builder) {
        builder.addCase(handleLogin.fulfilled, function (state, action) {
            console.log(action.payload);
            state.token = action.payload.token;
            state.userData = action.payload.user;
        });

        builder.addCase(handleLogin.rejected, function(state, action) {
            console.log(action.payload);
            state.token = null;
            state.userData = null;
        });

        builder.addCase(handleLogin.pending, function(state,action) {
            console.log( 'loading', action);
        });

        builder.addCase(handleRegister.fulfilled, function (state, action) {
            console.log(action.payload);
            state.token = action.payload.token;
            state.userData = action.payload.user;
        });

        builder.addCase(handleRegister.rejected, function(state, action) {
            console.log(action.payload);
            state.token = null;
            state.userData = null;
        });

        builder.addCase(handleRegister.pending, function(state,action) {
            console.log('registering', action);
        });
    }

});

export const authReducer = authSlice.reducer;