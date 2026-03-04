'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="py-8 px-4 border-t" style={{ borderColor: 'var(--terminal-border)' }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-mono text-xs" style={{ color: 'var(--terminal-text-faint)' }}>
          <span style={{ color: 'var(--terminal-green)' }}>Deepak Thapa</span>
        </div>
        <div className="font-mono text-xs" style={{ color: 'var(--terminal-text-faint)' }}>
          © {new Date().getFullYear()} · All rights reserved
        </div>
        <div className="flex gap-4">
          <a href="https://github.com/dtsuper3" target="_blank" rel="noopener noreferrer" className="font-mono text-xs transition-colors duration-200 hover:text-green-400" style={{ color: 'var(--terminal-text-faint)' }}>GitHub</a>
          <a href="https://twitter.com/Deepak13307717" target="_blank" rel="noopener noreferrer" className="font-mono text-xs transition-colors duration-200 hover:text-green-400" style={{ color: 'var(--terminal-text-faint)' }}>Twitter</a>
          <a href="https://www.linkedin.com/in/deepak-thapa-381647148" target="_blank" rel="noopener noreferrer" className="font-mono text-xs transition-colors duration-200 hover:text-green-400" style={{ color: 'var(--terminal-text-faint)' }}>LinkedIn</a>
          <a href="mailto:dtsuper3@gmail.com" className="font-mono text-xs transition-colors duration-200 hover:text-green-400" style={{ color: 'var(--terminal-text-faint)' }}>Email</a>
        </div>
      </div>
    </footer>
  );
}
