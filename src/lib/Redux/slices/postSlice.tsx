// postsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

// types.ts
export interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  posts: Post[]
  author?: {
    name: string;
    _id: string;
  };
}

export interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

export interface ErrorResponse {
  message?: string;
  statusCode?: number;
}

// Helper function to get auth token
const getAuthToken = () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    toast.error("Authentication required");
    throw new Error("No auth token found");
  }
  return token;
};

export const getAllPosts = createAsyncThunk<
  Post[],
  number,
  { rejectValue: string }
>("posts/getAllPosts", async (limit: number = 10, { rejectWithValue }) => {
  try {
    const token = getAuthToken();
    const response = await axios.get<Post[]>(
      `https://linked-posts.routemisr.com/posts?limit=${limit}`,
      {
        headers: {
          token: token, // Keeping the token header as well for backward compatibility
        },
      }
    );

    toast.success("Posts loaded successfully");
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;

    // Handle different types of errors
    if (axiosError.response?.status === 401) {
      toast.error("Please login to view posts");
      localStorage.removeItem("authToken"); // Clear invalid token
    } else {
      const errorMessage =
        axiosError.response?.data?.message || "Failed to fetch posts";
      toast.error(errorMessage);
    }

    return rejectWithValue(
      axiosError.response?.data?.message || "Error fetching posts"
    );
  }
});

const initialState: PostsState = {
  posts: [], // Ensure this is an array
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearPosts: (state) => {
      state.posts = [];
    },
    clearError: (state) => {
      state.error = null;
    },
    logoutCleanup: (state) => {
      state.posts = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = Array.isArray(action.payload) ? action.payload : [];  // Enforce array
      })      
      .addCase(getAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
        state.posts = [];
      });
  },
});

export const { clearPosts, clearError, logoutCleanup } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;

// Selector
export const selectPosts = (state: { posts: PostsState }) => state.posts;
