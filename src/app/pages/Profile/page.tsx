'use client';

import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';

const Profile = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        name: '',
        email: '',
        gender: '',
        dateOfBirth: '',
    });

    useEffect(() => {
        // Simulate fetching user data from an API or local storage
        const fetchedUser = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            gender: 'male',
            dateOfBirth: '1990-01-01',
        };
        setUser(fetchedUser);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission (e.g., send updated user data to an API)
        console.log('Updated user data:', user);
        // Optionally, redirect or show a success message
        alert('Profile updated successfully!');
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h5" component="h1" gutterBottom>
                    Profile
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        name="name"
                        label="Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={user.name}
                        onChange={handleChange}
                    />
                    <TextField
                        name="email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={user.email}
                        onChange={handleChange}
                    />
                    <TextField
                        name="gender"
                        label="Gender"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={user.gender}
                        onChange={handleChange}
                    />
                    <TextField
                        name="dateOfBirth"
                        label="Date of Birth"
                        type="date"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={user.dateOfBirth}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                        <Button type="submit" variant="contained" color="primary">
                            Save Changes
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default Profile;