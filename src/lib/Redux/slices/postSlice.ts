import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { PostData } from "@/app/interfaces/postData";

let token: string | null = null;
if (typeof window !== "undefined") {
  token = localStorage.getItem("authToken");
}

export const getAllPosts = createAsyncThunk(
  "post/allPosts", 
  async (limit: number) => {
    try {
      const response = await axios.get(
        `https://linked-posts.routemisr.com/posts?limit=${limit || 50}`,
        {
          headers: { token }
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

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