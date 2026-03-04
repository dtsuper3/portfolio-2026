'use client';

import React, { useState, useEffect } from 'react';

const bootSequence = [
  'BIOS v2.4.1 — Initializing hardware...',
  'RAM check: 32768MB OK',
  'Loading kernel modules...',
  'Mounting filesystem: /dev/portfolio',
  'Starting network services...',
  'Launching devfolio.sh...',
  '',
  'Welcome. System ready.',
];

interface BootScreenProps {
  onBootDone: () => void;
}

export default function BootScreen({ onBootDone }: BootScreenProps) {
  const [bootLines, setBootLines] = useState<number>(0);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setBootLines(i);
      if (i >= bootSequence.length) {
        clearInterval(interval);
        setTimeout(() => onBootDone(), 600);
      }
    }, 220);
    return () => clearInterval(interval);
  }, [onBootDone]);

  return (
    <div className="crt-screen min-h-screen flex items-center justify-center">
      <div className="scanline" />
      <div className="terminal-window w-full max-w-2xl mx-4 p-6">
        <div className="terminal-titlebar mb-4">
          <div className="terminal-dot" style={{ background: '#FF5F57' }} />
          <div className="terminal-dot" style={{ background: '#FFBD2E' }} />
          <div className="terminal-dot" style={{ background: '#28C840' }} />
          <span className="ml-2 text-xs" style={{ color: 'var(--terminal-text-faint)' }}>boot.sh</span>
        </div>
        <div className="space-y-1">
          {bootSequence.slice(0, bootLines).map((line, i) => (
            <div
              key={i}
              className="boot-line text-sm font-mono"
              style={{
                animationDelay: `${i * 0.05}s`,
                color: line === '' ? 'transparent' : line.includes('Welcome') ? 'var(--terminal-green)' : 'var(--terminal-text-dim)',
                textShadow: line.includes('Welcome') ? 'var(--crt-glow)' : 'none',
              }}
            >
              {line || '\u00A0'}
            </div>
          ))}
          <span className="cursor-blink text-sm">█</span>
        </div>
      </div>
    </div>
  );
}
