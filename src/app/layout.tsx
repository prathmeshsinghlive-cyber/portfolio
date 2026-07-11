import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AudioProvider } from "@/components/providers/audio-context";
import SmoothScrollProvider from "@/components/providers/smooth-scroll";
import CustomCursor from "@/components/ui/custom-cursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prathmesh Singh | Immersive Concert Experience",
  description: "Explore the digital concert world of Prathmesh Singh. Procedural ambient synths, 3D vinyl selectors, and award-winning musical storytelling.",
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
            <CustomCursor />
          </SmoothScrollProvider>
        </AudioProvider>
      </body>
    </html>
  );
}
