import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { PostData } from "@/app/interfaces/postData";
import Cookies from 'js-cookie';

// Ensure token is dynamically retrieved
let token: string | null = null;
if (typeof window !== "undefined") {
  token = Cookies.get('authToken') || null;
}

// Thunk for fetching all posts
export const getAllPosts = createAsyncThunk(
  "post/allPosts", 
  async (limit: number) => {
    try {
      const response = await axios.get(
        `https://linked-posts.routemisr.com/posts?limit=${limit || 50}`,
        {
          headers: { token: token || "" } // Add fallback for token
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message || 'Failed to fetch posts';
    }
  }
);

// Define the post slice state
interface PostState {
  allPost: PostData[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PostState = {
  allPost: [],
  isLoading: false,
  error: null,
};

// Create the slice
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allPost = action.payload.posts || [];
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      });
  }
});

export const postReducer = postSlice.reducer;
