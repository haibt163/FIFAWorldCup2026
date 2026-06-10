import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";
import ClientLangSetter from "@/components/ClientLangSetter";
import Script from "next/script";
import SpeedAudioManager from "@/components/SpeedAudioManager";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FIFA World Cup 2026 Predictor - Predict your champion!",
  description: "Interactive bilingual World Cup 2026 predictor dashboard. Simulate groups, third-place rankings, and the entire knockout bracket with ease on mobile and desktop.",
  keywords: "FIFA World Cup 2026, World Cup Predictor, World Cup Simulator, Football Predictor, Soccer Simulator, World Cup Bracket, World Cup 2026 Groups",
  author: "VibeCode / Bui Thanh Hai",
  alternates: {
    canonical: "https://fifamundial2026.vercel.app/",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    url: "https://fifamundial2026.vercel.app/",
    title: "FIFA World Cup 2026 Predictor - Predict your champion!",
    description: "Drag, drop, and simulate the entire 2026 World Cup tournament. Rank groups and predict knockout results with this smooth interactive tool.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FIFA World Cup 2026 Simulator showing stadium, trophy, and football",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitterhandle",
    title: "FIFA World Cup 2026 Predictor - Predict your champion!",
    description: "Interactive bilingual World Cup 2026 predictor dashboard. Simulate groups, third-place rankings, and the entire knockout bracket with ease.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col text-gray-900 font-sans relative bg-gray-50">
        {/* Global Fixed Background Layer for both Mobile & Desktop (Bypasses rendering glitches) */}
        <div 
          className="fixed inset-0 -z-50 pointer-events-none bg-cover bg-center bg-no-repeat opacity-15"
          style={{ backgroundImage: "url('/ishowspeed.png')" }}
        />

        <LanguageProvider>
          <ClientLangSetter />
          
          <SpeedAudioManager /> 
          
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}