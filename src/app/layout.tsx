import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AudioProvider } from "@/components/providers/audio-context";
import SmoothScrollProvider from "@/components/providers/smooth-scroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prathmesh Singh | Live",
  description: "Explore the digital concert world of Prathmesh Singh. Procedural ambient synths, 3D vinyl selectors, and award-winning musical storytelling.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
    >
      <body className="bg-[#050505] text-[#F7F7F7]">
        <AudioProvider>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </AudioProvider>
      </body>
    </html>
  );
}
