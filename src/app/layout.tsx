import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner"; // Assuming you're using sonner for toasts
import StoreProvider from "@/lib/StorProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevScribe | Modern Blog Platform",
  description: "Web app for blogging built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        <StoreProvider>
          <Navbar />

          {/* FIX: Added a <main> wrapper with:
            - pt-24: Space for the fixed navbar
            - max-w-7xl: Prevents content from getting too wide
            - mx-auto: Centers the content
            - px-4/sm:px-6/lg:px-8: Responsive 'gap' on the left and right
        */}
          <main className="min-h-screen pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </main>

          <Footer />

          {/* Toast notifications handler */}
          <Toaster position="top-center" richColors />
        </StoreProvider>
      </body>
    </html>
  );
}
