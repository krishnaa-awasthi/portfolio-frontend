import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer"; // <-- Brought your Footer back!

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Krishna Awasthi | Portfolio",
  description: "Full Stack Developer specializing in scalable web applications, backend systems, and modern UI/UX design.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* FIX: Applied the Geist font variables and added 'antialiased' for smooth text rendering */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans bg-[#0A0A0A] text-white overflow-x-hidden w-full`}>
        {children}
        <Footer /> {/* <-- Footer stays at the bottom */}
      </body>
    </html>
  );
}