import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NavWrapper from "@/components/Home/Navbar/NavWrapper";
import { Toaster } from "sonner";
import React from "react";

const font = Poppins({
  weight: ["100","200","300","400","500","600","700","800","900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Company Review System",
  description: "Company Review System using Next js 15",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <NavWrapper/>
        {children}
        <Toaster position="top-center"/>
      </body>
    </html>
  );
}
