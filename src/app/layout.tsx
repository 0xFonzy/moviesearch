import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie Search",
  description: "Movie search app created by Alfonso Aranzazu",
  icons: {
    icon: "/favicon.ico",
  },
  authors: {
    name: "Alfonso Aranzazu",
    url: "https://www.linkedin.com/in/alfonso-aranzazu/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='bg-black text-white'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
