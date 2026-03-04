import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/index.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Deepak Thapa | Web Developer & Software Engineer',
  description: 'Portfolio of Deepak Thapa, a Full-Stack Web Developer specialized in React, Next.js, and Agentic AI. Building creative and helpful digital solutions.',
  keywords: "Deepak Thapa, Web Developer, Software Engineer, Full-Stack Developer, React Developer, Next.js, TypeScript, Agentic AI, Portfolio 2026, New Delhi Developer",
  authors: [{ name: "Deepak Thapa" }],
  icons: {
    icon: '/logo.png',
  },
  openGraph: {
    title: 'Deepak Thapa | Web Developer & Software Engineer',
    description: 'Explore the portfolio of Deepak Thapa, focusing on modern web technologies and AI.',
    url: 'https://deepakthapa.dev', // Replace with actual URL if known
    siteName: 'Deepak Thapa Portfolio',
    images: [
      {
        url: '/og-image.png', // Ensure this exists in public/
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deepak Thapa | Web Developer & Software Engineer',
    description: 'Full-Stack Web Developer specialized in React, Next.js, and Agentic AI.',
    creator: '@Deepak13307717',
    images: ['/og-image.png'],
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
