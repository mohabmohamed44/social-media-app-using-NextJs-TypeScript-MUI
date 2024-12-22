"use client";

import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/footer";
import "./globals.css";

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
        {/* Navbar component */}
        <Navbar />
        {/* Main content */}
        {children}
        <Footer/>
      </body>
    </html>
  );
}
