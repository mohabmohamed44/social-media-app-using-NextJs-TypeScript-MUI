'use client';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useFormik } from 'formik';
import Theme from '@/theme'; // Adjust the import path as necessary
import { handleLogin } from '@/lib/Redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { ILoginData } from '@/lib/Redux/slices/authSlice';
import { dispatchType } from '@/lib/Redux/store';

export default function LoginPage() {
    let dispatch = useDispatch<dispatchType>();
    let loginFormik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (values:ILoginData) => {
            console.log(values);
            dispatch(handleLogin(values));
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
                        Login
                    </Typography>
                    <form action="" onSubmit={loginFormik.handleSubmit}>
                    <TextField
                        name="email"
                        value={loginFormik.values.email}
                        onChange={loginFormik.handleChange}
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        name="password"
                        value={loginFormik.values.password}
                        onChange={loginFormik.handleChange}
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type='submit'
                        fullWidth
                        style={{ marginTop: '16px' }}
                    >
                        Sign In
                    </Button>
                    </form>
                </Box>
            </Container>
        </ThemeProvider>
    );
};
