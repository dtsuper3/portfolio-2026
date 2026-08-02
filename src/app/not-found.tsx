import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The requested page could not be found on Deepak Thapa\'s portfolio site.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-[var(--terminal-bg)] text-[var(--terminal-text)] font-mono">
      <div className="terminal-window max-w-md w-full p-8 text-center box-glow">
        <div className="terminal-titlebar mb-6" aria-hidden="true">
          <div className="terminal-dot" style={{ background: '#FF5F57' }} />
          <div className="terminal-dot" style={{ background: '#FFBD2E' }} />
          <div className="terminal-dot" style={{ background: '#28C840' }} />
          <span className="ml-2 text-xs" style={{ color: 'var(--terminal-text-faint)' }}>
            404_error.sh
          </span>
        </div>

        <h1 className="text-7xl font-bold mb-2 glow-amber">404</h1>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--terminal-text)' }}>
          ERR_NOT_FOUND
        </h2>
        <p className="text-sm mb-8" style={{ color: 'var(--terminal-text-dim)' }}>
          The path you requested does not exist or has been relocated.
        </p>

        <div className="flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded font-mono text-sm font-bold transition-all duration-200 box-glow hover:bg-[var(--terminal-green-faint)] focus:outline-none focus:ring-2 focus:ring-green-400"
            style={{
              background: 'var(--terminal-green-faint)',
              border: '1px solid var(--terminal-green-dim)',
              color: 'var(--terminal-green)',
              textShadow: 'var(--crt-glow)',
            }}
            aria-label="Return to Deepak Thapa Portfolio Home"
          >
            ./return-home.sh ▶
          </Link>
        </div>
      </div>
    </main>
  );
}