'use client';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ThemeProvider } from '@mui/material/styles';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import Theme from '@/theme'; // Adjust the import path as necessary
import { handleRegister } from '@/lib/Redux/slices/authSlice'; // Adjust the import path as necessary
import { dispatchType } from '@/lib/Redux/store';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { LoaderCircle } from 'lucide-react'; // Adjust the import path as necessary
interface RegisterErrorPayload {
    error?: string; // Optional error property
}

export default function RegisterPage() {
    const dispatch = useDispatch<dispatchType>();
    const router = useRouter();
    const [registerError, setRegisterError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const registerFormik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            gender: '',
            dateOfBirth: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email format').required('Email is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
            rePassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .required('Re-enter Password is required'),
            gender: Yup.string().oneOf(['male', 'female', 'other'], 'Invalid gender').required('Required'),
            dateOfBirth: Yup.date().required('Required').nullable()
        }),
        onSubmit: async (values, { resetForm }) => {
            setLoading(true);
            const resultAction = await dispatch(handleRegister(values)) as { payload: RegisterErrorPayload };
            if (handleRegister.fulfilled.match(resultAction)) {
                toast.success('Registration successful!');
                setRegisterError(null);
                resetForm();
                setLoading(false);
            } else {
                const errorMessage = resultAction.payload?.error || 'Registration failed.';
                setRegisterError(errorMessage);
                toast.error(errorMessage);
                setLoading(false);
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
                        Register
                    </Typography>
                    <form onSubmit={registerFormik.handleSubmit}>
                        <TextField
                            name="name"
                            label="Name"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={registerFormik.values.name}
                            onChange={registerFormik.handleChange}
                            error={registerFormik.touched.name && Boolean(registerFormik.errors.name)}
                            helperText={registerFormik.touched.name && registerFormik.errors.name}
                        />
                        <TextField
                            name="email"
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={registerFormik.values.email}
                            onChange={registerFormik.handleChange}
                            error={registerFormik.touched.email && Boolean(registerFormik.errors.email)}
                            helperText={registerFormik.touched.email && registerFormik.errors.email}
                        />
                        <TextField
                            name="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={registerFormik.values.password}
                            onChange={registerFormik.handleChange}
                            error={registerFormik.touched.password && Boolean(registerFormik.errors.password)}
                            helperText={registerFormik.touched.password && registerFormik.errors.password}
                        />
                        <TextField
                            name="rePassword"
                            label="Re-enter Password"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={registerFormik.values.rePassword}
                            onChange={registerFormik.handleChange}
                            error={registerFormik.touched.rePassword && Boolean(registerFormik.errors.rePassword)}
                            helperText={registerFormik.touched.rePassword && registerFormik.errors.rePassword}
                        />
                        <TextField
                            name="gender"
                            label="Gender"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={registerFormik.values.gender}
                            onChange={registerFormik.handleChange}
                            error={registerFormik.touched.gender && Boolean(registerFormik.errors.gender)}
                            helperText={registerFormik.touched.gender && registerFormik.errors.gender}
                        />
                        <TextField
                            name="dateOfBirth"
                            label="Date of Birth"
                            type="date"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={registerFormik.values.dateOfBirth}
                            onChange={registerFormik.handleChange}
                            error={registerFormik.touched.dateOfBirth && Boolean(registerFormik.errors.dateOfBirth)}
                            helperText={registerFormik.touched.dateOfBirth && registerFormik.errors.dateOfBirth}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={{ marginTop: '16px' }}
                            disabled={loading}
                        >
                            {loading ? <LoaderCircle /> : 'Sign Up'}
                        </Button>
                    </form>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

