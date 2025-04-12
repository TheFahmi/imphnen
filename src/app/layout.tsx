import type { Metadata } from "next";
import { Comic_Neue } from "next/font/google";
import "./globals.css";

const comicNeue = Comic_Neue({
  weight: ['300', '400', '700'],
  subsets: ["latin"],
  display: 'swap',
  variable: "--font-comic",
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
        className={`${comicNeue.variable} font-comic antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
