import type { Metadata } from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import StatCounterScript from "@/components/StatCounterScript";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Tetris - Classic Tetris with Game Boy Style & Retro Console UI",
  description: "Experience the classic Tetris reimagined with Next.js 15. Features Game Boy inspired retro console UI, touch controls, achievements system, and Web Audio effects. Play in your browser now!",
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
      >
        {children}

      <StatCounterScript />
      </body>
    </html>
  );
}
