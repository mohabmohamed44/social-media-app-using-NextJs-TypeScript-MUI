'use client';
import '@fontsource/roboto/500.css';
import { createTheme } from "@mui/material";

const Theme = createTheme({
    typography: {
        fontFamily: 'var(--font-roboto)',
        h1: {
            fontSize: '2rem',
            fontWeight: 700,
        },
        body1: {
            fontSize: '1rem',
        },
    },
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
        background: {
            default: '#f4f6f8',
            paper: '#ffffff',
        },
        text: {
            primary: '#333333',
            secondary: '#666666',
        },
    },
    spacing: 8,
    shape: {
        borderRadius: 4,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },
    },
});

export default Theme;