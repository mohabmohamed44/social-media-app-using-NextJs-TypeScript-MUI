'use client';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import Theme from '@/theme'; // Adjust the import path as necessary
import { useFormik } from 'formik';

export default function RegisterPage() {

    useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit: (values) => {
            console.log(values);
        }
    });

    return (
        <ThemeProvider theme={Theme}>
            <Container maxWidth="xs">
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    minHeight="100vh"
                >
                    <Typography variant="h1" gutterBottom>
                        Register
                    </Typography>
                    <TextField
                        label="Name"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginTop: '16px' }}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

