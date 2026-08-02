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
  description: "Is bhaag daud bhari zindagi me, aao thoda sa sukoon dhundte hain.",
  openGraph: {
    title: "Prathmesh Singh | Live",
    description: "Is bhaag daud bhari zindagi me, aao thoda sa sukoon dhundte hain.",
    url: "https://www.arawala.com",
    siteName: "Prathmesh Singh",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Prathmesh Singh Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prathmesh Singh | Live",
    description: "Is bhaag daud bhari zindagi me, aao thoda sa sukoon dhundte hain.",
    images: ["/logo.png"],
  },
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
