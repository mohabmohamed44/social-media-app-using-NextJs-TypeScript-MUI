'use client';
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  Container,
  CircularProgress,
  Button,
  styled
} from '@mui/material';
import { Calendar, Mail, User } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/Redux/store';
import { getUserProfile } from '@/lib/Redux/slices/loggedUserSlice';
import { setProfilePhoto, clearProfilePhoto } from '@/lib/Redux/slices/profilePhotoSlice';

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(16),
  height: theme.spacing(16),
  border: `4px solid ${theme.palette.primary.main}`,
  position: 'relative',
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  gap: theme.spacing(2),
  '& svg': {
    color: theme.palette.primary.main,
  },
}));

const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userProfile, loading, error } = useSelector((state: RootState) => state.profile);
  const { isLoading: photoLoading, error: photoError } = useSelector((state: RootState) => state.profilePhoto);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  useEffect(() => {
    dispatch(getUserProfile());
    return () => {
      dispatch(clearProfilePhoto());
    };
  }, [dispatch]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);

      const formData = new FormData();
      formData.append('photo', file);
      
      try {
        await dispatch(setProfilePhoto(formData)).unwrap();
        dispatch(getUserProfile());
      } catch (error) {
        setPreviewUrl(null);
      }
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Typography color="error" align="center">{error}</Typography>
      </Container>
    );
  }

  if (!userProfile) {
    return (
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Typography align="center">No profile data available</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Card>
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
            <Box position="relative">
              <StyledAvatar 
                src={previewUrl || userProfile.photo} 
                alt={userProfile.name}
              >
                {userProfile.name[0]}
              </StyledAvatar>
              {photoLoading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              )}
            </Box>
            <Typography variant="h4" component="h1" sx={{ mt: 2 }}>
              {userProfile.name}
            </Typography>
            {photoError && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {photoError}
              </Typography>
            )}
          </Box>

          <Box sx={{ mb: 4 }}>
            <InfoItem>
              <User />
              <Box>
                <Typography variant="body2" color="text.secondary">Gender</Typography>
                <Typography>{userProfile.gender.charAt(0).toUpperCase() + userProfile.gender.slice(1)}</Typography>
              </Box>
            </InfoItem>

            <InfoItem>
              <Mail />
              <Box>
                <Typography variant="body2" color="text.secondary">Email</Typography>
                <Typography>{userProfile.email}</Typography>
              </Box>
            </InfoItem>

            <InfoItem>
              <Calendar />
              <Box>
                <Typography variant="body2" color="text.secondary">Date of Birth</Typography>
                <Typography>{formatDate(userProfile.dateOfBirth)}</Typography>
              </Box>
            </InfoItem>
          </Box>

          <Box textAlign="center">
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="upload-photo"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="upload-photo">
              <Button
                variant="contained"
                component="span"
                disabled={photoLoading}
              >
                {photoLoading ? 'Uploading...' : 'Change Photo'}
              </Button>
            </label>
            {selectedFile && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Selected file: {selectedFile.name}
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfilePage;