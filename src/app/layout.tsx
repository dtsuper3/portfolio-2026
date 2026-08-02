import React from 'react';
import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import '../styles/index.css';
import JsonLd from '@/components/seo/JsonLd';
import { getPersonSchema, getWebSiteSchema, SITE_URL } from '@/lib/jsonld';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A0E0A',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Deepak Thapa | Web Developer & Software Engineer',
    template: '%s | Deepak Thapa',
  },
  description:
    'Portfolio of Deepak Thapa, a Full-Stack Web Developer & Software Engineer specialized in React, Next.js, TypeScript, and Agentic AI. Building performant, user-centric web applications.',
  keywords: [
    'Deepak Thapa',
    'Web Developer',
    'Software Engineer',
    'Full-Stack Developer',
    'React Developer',
    'Next.js Developer',
    'TypeScript Engineer',
    'Node.js Developer',
    'Agentic AI',
    'New Delhi Developer',
    'Portfolio 2026',
  ],
  authors: [{ name: 'Deepak Thapa', url: SITE_URL }],
  creator: 'Deepak Thapa',
  publisher: 'Deepak Thapa',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [{ url: '/logo.png', type: 'image/png' }],
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Deepak Thapa | Web Developer & Software Engineer',
    description:
      'Portfolio of Deepak Thapa, a Full-Stack Web Developer specialized in React, Next.js, TypeScript, and Agentic AI.',
    url: SITE_URL,
    siteName: 'Deepak Thapa Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Deepak Thapa - Full-Stack & Next.js Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deepak Thapa | Web Developer & Software Engineer',
    description:
      'Full-Stack Web Developer specialized in React, Next.js, TypeScript, and Agentic AI.',
    creator: '@Deepak13307717',
    site: '@Deepak13307717',
    images: ['/twitter-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personSchema = getPersonSchema();
  const websiteSchema = getWebSiteSchema();

  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <head>
        <JsonLd data={[personSchema, websiteSchema]} />
      </head>
      <body className="font-mono bg-[var(--terminal-bg)] text-[var(--terminal-text)] antialiased">
        {children}
      </body>
    </html>
  );
}
