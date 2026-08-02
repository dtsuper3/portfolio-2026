'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer
      className="py-8 px-4 border-t"
      style={{ borderColor: 'var(--terminal-border)' }}
      aria-label="Site Footer"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-mono text-xs" style={{ color: 'var(--terminal-text-faint)' }}>
          <span style={{ color: 'var(--terminal-green)' }}>Deepak Thapa</span> · Full-Stack & Next.js Engineer
        </div>
        <div className="font-mono text-xs" style={{ color: 'var(--terminal-text-faint)' }}>
          © {new Date().getFullYear()} · All rights reserved
        </div>
        <div className="flex gap-4">
          <a
            href="https://github.com/dtsuper3"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs transition-colors duration-200 hover:text-green-400 focus:outline-none focus:ring-1 focus:ring-green-400 rounded px-1"
            style={{ color: 'var(--terminal-text-faint)' }}
            aria-label="GitHub Profile (opens in new tab)"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com/Deepak13307717"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs transition-colors duration-200 hover:text-green-400 focus:outline-none focus:ring-1 focus:ring-green-400 rounded px-1"
            style={{ color: 'var(--terminal-text-faint)' }}
            aria-label="Twitter Profile (opens in new tab)"
          >
            Twitter
          </a>
          <a
            href="https://www.linkedin.com/in/deepak-thapa-381647148"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs transition-colors duration-200 hover:text-green-400 focus:outline-none focus:ring-1 focus:ring-green-400 rounded px-1"
            style={{ color: 'var(--terminal-text-faint)' }}
            aria-label="LinkedIn Profile (opens in new tab)"
          >
            LinkedIn
          </a>
          <a
            href="mailto:dtsuper3@gmail.com"
            className="font-mono text-xs transition-colors duration-200 hover:text-green-400 focus:outline-none focus:ring-1 focus:ring-green-400 rounded px-1"
            style={{ color: 'var(--terminal-text-faint)' }}
            aria-label="Send email to dtsuper3@gmail.com"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
