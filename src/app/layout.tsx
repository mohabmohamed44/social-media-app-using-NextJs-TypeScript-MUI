"use client";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/footer";
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import {store} from '@/lib/Redux/store';
import "./globals.css";
import Theme from '@/theme';
import { Toaster } from 'react-hot-toast';

// Import fonts with subsets
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

// Metadata for the app
// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoMono.variable}`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={Theme} >
            <Provider store={store}> 
              <Toaster/>
            {/* Navbar component */}
            <Navbar />
            {/* Main content */}
            {children}
            <Footer />
            </Provider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
