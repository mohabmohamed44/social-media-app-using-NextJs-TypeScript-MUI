import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import Theme from '@/theme'; // Adjust the import path as necessary

const LoginPage = () => {
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
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginTop: '16px' }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default LoginPage;
