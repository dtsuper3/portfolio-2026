import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/index.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Deepak Thapa - Personal Portfolio',
  description: 'It is my personal portfolio',
  keywords: "Deepak Thapa, Portfolio, Personal Portfolio, Deepak Thapa Portfolio, Deepak Thapa Personal Portfolio, Deepak Thapa Personal Portfolio 2026, Deepak Thapa Personal Portfolio 2026",
  authors: { name: "Deepak Thapa" },
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
