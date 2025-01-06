import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';

export const setProfilePhoto = createAsyncThunk(
  "profilePhoto/setProfilePhoto",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "https://linked-posts.routemisr.com/users/upload-photo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "token": Cookies.get("authToken") || "",
          },
        }
      );
      toast.success("Photo uploaded successfully!");
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to upload photo";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const profilePhotoSlice = createSlice({
  name: "profilePhoto",
  initialState: {
    profilePhoto: null as any,
    isLoading: false,
    error: null as string | null,
  },
  reducers: {
    clearProfilePhoto: (state) => {
      state.profilePhoto = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setProfilePhoto.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(setProfilePhoto.fulfilled, (state, action) => {
        state.profilePhoto = action.payload;
        state.isLoading = false;
      })
      .addCase(setProfilePhoto.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProfilePhoto } = profilePhotoSlice.actions;
export const ProfilePhotoReducer = profilePhotoSlice.reducer;