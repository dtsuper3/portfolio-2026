'use client';

import React from 'react';
import { motion } from 'framer-motion';
import MatrixRain from '@/components/ui/MatrixRain';

interface HeroProps {
  scrollTo: (id: string) => void;
}

export default function Hero({ scrollTo }: HeroProps) {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 pt-16 overflow-hidden">
      <MatrixRain />
      <div className="relative z-10 max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="terminal-window box-glow"
        >
          <div className="terminal-titlebar">
            <div className="terminal-dot" style={{ background: '#FF5F57' }} />
            <div className="terminal-dot" style={{ background: '#FFBD2E' }} />
            <div className="terminal-dot" style={{ background: '#28C840' }} />
            <span className="ml-2 text-xs" style={{ color: 'var(--terminal-text-faint)' }}>portfolio.sh — bash — 120×40</span>
          </div>
          <div className="p-8 md:p-12">
            <div className="mb-6">
              <span className="text-xs" style={{ color: 'var(--terminal-text-faint)' }}>Last login: {new Date().toDateString()} on ttys001</span>
            </div>
            <div className="mb-4">
              <span style={{ color: 'var(--terminal-green)', textShadow: 'var(--crt-glow)' }}>visitor@devfolio</span>
              <span style={{ color: 'var(--terminal-text-faint)' }}>:</span>
              <span style={{ color: 'var(--terminal-cyan)', textShadow: 'var(--cyan-glow)' }}>~</span>
              <span style={{ color: 'var(--terminal-text-faint)' }}>$ </span>
              <span style={{ color: 'var(--terminal-text)' }}>whoami</span>
            </div>
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl font-bold mb-2 glow-green-strong phosphor-pulse">
                Deepak Thapa
              </h1>
              <p className="text-lg md:text-xl mb-1" style={{ color: 'var(--terminal-amber)', textShadow: 'var(--amber-glow)' }}>
                Web Developer · Software Engineer · Agentic AI Enthusiast
              </p>
              <p className="text-sm" style={{ color: 'var(--terminal-text-dim)' }}>
                Simple, creative, and enthusiastic — building things that are helpful for others.
              </p>
            </div>
            <div className="mb-8 space-y-1 text-sm" style={{ color: 'var(--terminal-text-dim)' }}>
              <div><span style={{ color: 'var(--terminal-green)' }}>location</span><span style={{ color: 'var(--terminal-text-faint)' }}>:</span> New Delhi, India</div>
              <div><span style={{ color: 'var(--terminal-green)' }}>status</span><span style={{ color: 'var(--terminal-text-faint)' }}>:</span> <span style={{ color: '#28C840' }}>● Open to opportunities</span></div>
              <div><span style={{ color: 'var(--terminal-green)' }}>focus</span><span style={{ color: 'var(--terminal-text-faint)' }}>:</span> React, Next.js, Full-Stack Web Development</div>
              <div><span style={{ color: 'var(--terminal-green)' }}>email</span><span style={{ color: 'var(--terminal-text-faint)' }}>:</span> dtsuper3@gmail.com</div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('projects');
                }}
                className="font-mono text-sm px-5 py-2 rounded border transition-all duration-200 box-glow cursor-pointer hover:bg-[var(--terminal-green-faint)]"
                style={{ background: 'var(--terminal-green-faint)', borderColor: 'var(--terminal-green-dim)', color: 'var(--terminal-green)', textShadow: 'var(--crt-glow)' }}
              >
                ls ./projects
              </a>
              <a
                href="/docs/Deepak-Thapa-Resume-Full-Stack-Developer.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm px-5 py-2 rounded border transition-all duration-200 hover:border-green-800"
                style={{ borderColor: 'var(--terminal-border)', color: 'var(--terminal-text-dim)' }}
              >
                cat resume.pdf
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('contact');
                }}
                className="font-mono text-sm px-5 py-2 rounded border transition-all duration-200 cursor-pointer hover:border-green-800"
                style={{ borderColor: 'var(--terminal-border)', color: 'var(--terminal-text-dim)' }}
              >
                ./contact.sh
              </a>
            </div>
            <div className="mt-6">
              <span style={{ color: 'var(--terminal-text-faint)' }}>$ </span>
              <span className="cursor-blink">█</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
