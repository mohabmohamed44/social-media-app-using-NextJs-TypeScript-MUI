'use client';
import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useFormik } from 'formik';
import Theme from '@/theme'; // Adjust the import path as necessary
import { handleLogin } from '@/lib/Redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { ILoginData } from '@/lib/Redux/slices/authSlice';
import { dispatchType } from '@/lib/Redux/store';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import { LoaderCircle } from 'lucide-react'; // Adjust the import path as necessary
import {useRouter} from 'next/navigation'; // Adjust the import path as necessary

interface LoginErrorPayload {
    error?: string; // Optional error property
}

export default function LoginPage() {

    let router = useRouter()
    let dispatch = useDispatch<dispatchType>();
    const [loginError, setLoginError] = useState<string | null>(null); // State for error message
    const [loading, setLoading] = useState<boolean>(false); // State for loading

    let loginFormik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
        }),
        onSubmit: async (values: ILoginData, { resetForm }) => {
            setLoading(true); // Start loading
            const resultAction = await dispatch(handleLogin(values)) as { payload: LoginErrorPayload };
            if (handleLogin.fulfilled.match(resultAction)) {
                toast.success('Login successful!');
                setLoginError(null); // Clear any previous error
                resetForm(); // Reset the form fields
                setLoading(false); // Stop loading
                router.push('/'); // Redirect to home page
            } else {
                const errorMessage = resultAction.payload?.error || 'Login failed.';
                setLoginError(errorMessage);
                toast.error(errorMessage);
                setLoading(false); // Stop loading
            }
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
                            error={loginFormik.touched.email && Boolean(loginFormik.errors.email)}
                            helperText={loginFormik.touched.email && loginFormik.errors.email}
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
                            error={loginFormik.touched.password && Boolean(loginFormik.errors.password)}
                            helperText={loginFormik.touched.password && loginFormik.errors.password}
                        />
                        {loginError && (
                            <Typography color="error" variant="body2" style={{ marginTop: '8px' }}>
                                {loginError}
                            </Typography>
                        )}
                        <Button
                            variant="contained"
                            color="primary"
                            type='submit'
                            fullWidth
                            style={{ marginTop: '16px' }}
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? <LoaderCircle /> : 'Sign In'} {/* Show loader or button text */}
                        </Button>
                    </form>
                </Box>
            </Container>
        </ThemeProvider>
    );
};
