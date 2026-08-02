'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MatrixRain from '@/components/ui/MatrixRain';

interface HeroProps {
  scrollTo?: (id: string) => void;
}

export default function Hero({ scrollTo }: HeroProps) {
  const [loginDate, setLoginDate] = useState<string>('');

  useEffect(() => {
    setLoginDate(new Date().toDateString());
  }, []);

  const handleScroll = (id: string) => {
    if (scrollTo) {
      scrollTo(id);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      aria-label="Hero Section"
      className="relative min-h-screen flex items-center justify-center px-4 pt-20 pb-12 overflow-hidden"
    >
      <MatrixRain />

      <div className="relative z-10 max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="terminal-window box-glow"
        >
          <div className="terminal-titlebar" aria-hidden="true">
            <div className="terminal-dot" style={{ background: '#FF5F57' }} />
            <div className="terminal-dot" style={{ background: '#FFBD2E' }} />
            <div className="terminal-dot" style={{ background: '#28C840' }} />
            <span className="ml-2 text-xs" style={{ color: 'var(--terminal-text-faint)' }}>
              portfolio.sh — bash — 120×40
            </span>
          </div>

          <div className="p-6 md:p-10">
            <div className="mb-4 text-xs font-mono" style={{ color: 'var(--terminal-text-faint)' }} aria-hidden="true">
              Last login: <span suppressHydrationWarning>{loginDate || 'Devfolio Session'}</span> on ttys001
            </div>

            <div className="mb-4 font-mono text-sm" aria-hidden="true">
              <span style={{ color: 'var(--terminal-green)', textShadow: 'var(--crt-glow)' }}>
                visitor@devfolio
              </span>
              <span style={{ color: 'var(--terminal-text-faint)' }}>:</span>
              <span style={{ color: 'var(--terminal-cyan)', textShadow: 'var(--cyan-glow)' }}>~</span>
              <span style={{ color: 'var(--terminal-text-faint)' }}>$ </span>
              <span style={{ color: 'var(--terminal-text)' }}>whoami</span>
            </div>

            <header className="mb-6">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2 glow-green-strong phosphor-pulse">
                Deepak Thapa
              </h1>
              <p
                className="text-base sm:text-lg md:text-xl mb-2 font-semibold"
                style={{ color: 'var(--terminal-amber)', textShadow: 'var(--amber-glow)' }}
              >
                Full-Stack Web Developer · Software Engineer · Next.js & Agentic AI Specialist
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--terminal-text-dim)' }}>
                Experienced in React 19, Next.js 16 App Router, TypeScript, Node.js, and Agentic AI applications — building performant, scalable, and intuitive web solutions.
              </p>
            </header>

            <div className="mb-6 space-y-1 text-sm font-mono" style={{ color: 'var(--terminal-text-dim)' }}>
              <div>
                <span style={{ color: 'var(--terminal-green)' }}>location</span>
                <span style={{ color: 'var(--terminal-text-faint)' }}>:</span> New Delhi, India
              </div>
              <div>
                <span style={{ color: 'var(--terminal-green)' }}>status</span>
                <span style={{ color: 'var(--terminal-text-faint)' }}>:</span>{' '}
                <span style={{ color: '#28C840' }}>● Open to software engineering roles</span>
              </div>
              <div>
                <span style={{ color: 'var(--terminal-green)' }}>focus</span>
                <span style={{ color: 'var(--terminal-text-faint)' }}>:</span> React 19, Next.js 16 App Router, TypeScript, Technical SEO & Agentic AI
              </div>
              <div>
                <span style={{ color: 'var(--terminal-green)' }}>email</span>
                <span style={{ color: 'var(--terminal-text-faint)' }}>:</span>{' '}
                <a
                  href="mailto:dtsuper3@gmail.com"
                  className="hover:underline focus:outline-none focus:ring-1 focus:ring-green-400 rounded px-1"
                  aria-label="Email Deepak Thapa at dtsuper3@gmail.com"
                >
                  dtsuper3@gmail.com
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll('projects');
                }}
                className="font-mono text-xs sm:text-sm px-4 py-2 rounded border transition-all duration-200 box-glow cursor-pointer hover:bg-[var(--terminal-green-faint)] focus:outline-none focus:ring-2 focus:ring-green-400"
                style={{
                  background: 'var(--terminal-green-faint)',
                  borderColor: 'var(--terminal-green-dim)',
                  color: 'var(--terminal-green)',
                  textShadow: 'var(--crt-glow)',
                }}
                aria-label="Navigate to Projects Section"
              >
                ls ./projects
              </a>

              <a
                href="/docs/Deepak-Thapa-Resume-Web-Developer.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs sm:text-sm px-4 py-2 rounded border transition-all duration-200 hover:border-green-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                style={{ borderColor: 'var(--terminal-border)', color: 'var(--terminal-text-dim)' }}
                aria-label="View Resume PDF (opens in new tab)"
              >
                cat resume.pdf
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll('contact');
                }}
                className="font-mono text-xs sm:text-sm px-4 py-2 rounded border transition-all duration-200 cursor-pointer hover:border-green-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                style={{ borderColor: 'var(--terminal-border)', color: 'var(--terminal-text-dim)' }}
                aria-label="Navigate to Contact Section"
              >
                ./contact.sh
              </a>
            </div>

            <div className="mt-4 font-mono text-sm" aria-hidden="true">
              <span style={{ color: 'var(--terminal-text-faint)' }}>$ </span>
              <span className="cursor-blink">█</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
