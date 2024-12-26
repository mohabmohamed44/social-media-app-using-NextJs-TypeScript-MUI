'use client';
import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  Container,
  Grid,
  Paper,
  Divider,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import CakeIcon from '@mui/icons-material/Cake';
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/Redux/store';
import { getUserProfile } from '@/lib/Redux/slices/loggedUserSlice';

const ProfileContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const ProfileCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(15),
  marginBottom: theme.spacing(2),
  border: `4px solid ${theme.palette.primary.main}`,
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(2),
    color: theme.palette.primary.main,
  },
}));

const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '400px',
});

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userProfile, loading, error } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ProfileContainer maxWidth="md">
        <Typography color="error" align="center">
          {error}
        </Typography>
      </ProfileContainer>
    );
  }

  if (!userProfile) {
    return (
      <ProfileContainer maxWidth="md">
        <Typography align="center">
          No profile data available
        </Typography>
      </ProfileContainer>
    );
  }

  return (
    <ProfileContainer maxWidth="md">
      <ProfileCard>
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
            <UserAvatar src={userProfile.photo} alt={userProfile.name} />
            <Typography variant="h4" component="h1" gutterBottom>
              {userProfile.name}
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ p: 3, backgroundColor: 'background.default' }}>
                <InfoItem>
                  <PersonIcon />
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      Gender
                    </Typography>
                    <Typography variant="body1">
                      {userProfile.gender.charAt(0).toUpperCase() + userProfile.gender.slice(1)}
                    </Typography>
                  </Box>
                </InfoItem>

                <InfoItem>
                  <EmailIcon />
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      Email
                    </Typography>
                    <Typography variant="body1">
                      {userProfile.email}
                    </Typography>
                  </Box>
                </InfoItem>

                <InfoItem>
                  <CakeIcon />
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      Date of Birth
                    </Typography>
                    <Typography variant="body1">
                      {formatDate(userProfile.dateOfBirth)}
                    </Typography>
                  </Box>
                </InfoItem>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default ProfilePage;