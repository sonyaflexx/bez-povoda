import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from 'next/font/google'
import "./globals.css";

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

const pionerSans = localFont({
  src: "./fonts/PionerSans-VF.ttf",
  variable: "--font-pioner-sans",
  weight: "100 900",
});

const magnetTrial = localFont({
  src: "./fonts/MagnetTrial-Medium.ttf",
  variable: "--font-magnet-sans",
  weight: "500",
});

const magnetTrialRegular = localFont({
  src: "./fonts/MagnetTrial-Regular.ttf",
  variable: "--font-magnet-regular-sans",
  weight: "400",
});

const magnetTrialSemibold = localFont({
  src: "./fonts/MagnetTrial-SemiBold.ttf",
  variable: "--font-magnet-semibold-sans",
  weight: "600",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Без Повода - Лучший магазин лучших цветов",
  description: "Место, где покупают лучшие цветы",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${pionerSans.variable} ${magnetTrial.variable} ${magnetTrialRegular.variable} ${magnetTrialSemibold.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
