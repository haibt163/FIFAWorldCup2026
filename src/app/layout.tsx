import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";
import ClientLangSetter from "@/components/ClientLangSetter";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "World Cup 2026 Predictor",
  description: "Interactive bilingual World Cup 2026 predictor dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900 font-sans">
        <LanguageProvider>
          <ClientLangSetter />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}