'use client';
import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Image from 'next/image';
import { PostData } from '@/app/interfaces/postData';

export default function Post({ postdata }: { postdata: PostData }) {
  return (
    <Card sx={{ mb: 2, mt: 4}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }}>
            {postdata.user?.photo && (
              <Image 
                src={postdata.user.photo} 
                alt='User' 
                width={40} 
                height={40}
                style={{ objectFit: 'cover' }}
              />
            )}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={postdata.user?.name || 'Unknown User'}
        subheader={new Date(postdata.createdAt).toLocaleDateString()}
      />
      {postdata.image && (
        <CardMedia
          component="img"
          height="100%"
          image={postdata.image}
          alt={postdata.title || 'Post image'}
        />
      )}
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {postdata.body}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {postdata.createdAt}
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
  );
}