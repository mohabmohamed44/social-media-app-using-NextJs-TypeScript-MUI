'use client';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/Redux/store';
import { getAllPosts, selectPosts } from '@/lib/Redux/slices/postSlice';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Image from 'next/image';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

export default function Post() {
  const dispatch: AppDispatch = useDispatch();
  const { loading, error } = useSelector(selectPosts);
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    dispatch(getAllPosts(10))
      .unwrap()
      .then((res) => {
        console.log("Posts loaded:", res);
        if (res && res.posts) {
          setPosts(res.posts);
        }
      })
      .catch((err) => {
        console.error("Failed to load posts:", err);
      });
  }, [dispatch]);

  if (loading) return <CircularProgress sx={{ display: 'block', margin: 'auto' }} />;
  if (error) return <Alert severity="error">{error}</Alert>;

  if (!posts || posts.length === 0) {
    return <Typography sx={{ textAlign: 'center', marginTop: '20px' }}>No posts available</Typography>;
  }

  return (
    <div>
      {posts.map((post: any) => (
        <Card key={post._id} sx={{ marginBottom: '20px' }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                <Image src={post.user?.image?.charAt(0) || 'A'} width="" height="">

                </Image>
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={post.user?.name || 'Unknown User'}
            subheader={new Date(post.createdAt).toDateString()}
          />
          <CardMedia
            component="img"
            image={post.image || '/static/images/cards/paella.jpg'}
            alt={post.body}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {post.body.substring(0, 100)}...
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
