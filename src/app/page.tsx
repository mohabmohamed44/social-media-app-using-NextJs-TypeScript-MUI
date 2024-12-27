'use client';
import Grid from '@mui/material/Grid';
import { Paper } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/Redux/store";
import { getAllPosts } from "@/lib/Redux/slices/postSlice";
import { CircularProgress } from '@mui/material';
import Post from "@/Components/Post/Post";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { allPost, isLoading, error } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(getAllPosts(50));
  }, [dispatch]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={3} />
      <Grid item xs={6}>
        <Paper>
          {isLoading ? (
            <CircularProgress sx={{textAlign: "center"}} />
          ) : error ? (
            <p>Error: {error}</p>
          ) : allPost && allPost.length > 0 ? (
            allPost?.map((post) => (
              <Post key={post._id} postdata={post} />
            ))
          ) : (
            <p style={{textAlign:"center"}}>No posts found</p>
          )}
        </Paper>
      </Grid>
      <Grid item xs={3} />
    </Grid>
  );
}