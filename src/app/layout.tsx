import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZERO LIVE — Luxury Short Video & Live Streaming",
  description: "The world's most exclusive short video and live streaming platform. Black & Gold luxury experience.",
  keywords: ["short video", "live streaming", "luxury", "zero live"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ background: "#000", color: "#fff", overflowX: "hidden" }}
      >
        {children}
      </body>
    </html>
  );
}
