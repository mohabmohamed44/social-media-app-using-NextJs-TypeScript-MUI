import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';
export interface IUserProfile {
  _id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  photo: string;
}

interface ProfileState {
  userProfile: IUserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  userProfile: null,
  loading: false,
  error: null
};

export const getUserProfile = createAsyncThunk(
    '/profile',
    async () => {  // Remove the formData parameter since it's not needed
      const token = Cookies.get('authToken');
      if (!token) {
        throw new Error('No authentication token found');
      }
      try {
        const response = await axios.get("https://linked-posts.routemisr.com/users/profile-data", {
          headers: {
            token
          }
        });
        toast.success("Your Profile Page is here")
        return response.data;
      } catch (err: any) {
        if (err.response?.data) {
          toast.error("Unable to reach it");  
          throw new Error(err.response.data.message || 'Failed to fetch profile');
        }
        throw new Error('Failed to fetch profile');
      }
    }
  );

let loggedUserSlice = createSlice({
    name: "pages/profile",
    initialState,
    reducers: {
        clearProfile: (state) => {
            state.userProfile = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.userProfile = action.payload.user;
                state.error = null;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch profile';
            });
    }
});

export const { clearProfile } = loggedUserSlice.actions;
export const profilereducer = loggedUserSlice.reducer;