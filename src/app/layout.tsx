import type { Metadata } from "next";
import { Press_Start_2P, VT323, Silkscreen } from "next/font/google";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  weight: ['400'],
  subsets: ["latin"],
  display: 'swap',
  variable: "--font-press-start",
});

const vt323 = VT323({
  weight: ['400'],
  subsets: ["latin"],
  display: 'swap',
  variable: "--font-vt323",
});

const silkscreen = Silkscreen({
  weight: ['400', '700'],
  subsets: ["latin"],
  display: 'swap',
  variable: "--font-silkscreen",
});

export const metadata: Metadata = {
  title: "IMPHNEN.DEV - Ingin Menjadi Programmer Handal Namun Enggan Ngoding",
  description: "Website komunitas programmer yang malas ngoding",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pressStart2P.variable} ${vt323.variable} ${silkscreen.variable} font-vt323 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
