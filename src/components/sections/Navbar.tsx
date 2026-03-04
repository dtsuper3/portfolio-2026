'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  activeSection: string;
  scrollTo: (id: string) => void;
}

export default function Navbar({ activeSection, scrollTo }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { id: 'projects', label: 'projects' },
    { id: 'experience', label: 'experience' },
    { id: 'stack', label: 'stack' },
    { id: 'contact', label: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    scrollTo(id);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ background: 'rgba(10,14,10,0.92)', borderColor: 'var(--terminal-border)', backdropFilter: 'blur(8px)' }}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('home');
          }}
          className="font-mono text-sm font-bold glow-green phosphor-pulse cursor-pointer"
        >
          <span style={{ color: 'var(--terminal-text-faint)' }}>~/</span>deepak-thapa
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(s.id);
              }}
              className="font-mono text-xs transition-all duration-200 cursor-pointer hover:text-green-400"
              style={{
                color: activeSection === s.id ? 'var(--terminal-green)' : 'var(--terminal-text-faint)',
                textShadow: activeSection === s.id ? 'var(--crt-glow)' : 'none',
              }}
            >
              ./{s.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3">
            <a href="https://github.com/dtsuper3" target="_blank" rel="noopener noreferrer" className="font-mono text-xs tech-badge">GitHub</a>
            <a href="https://www.linkedin.com/in/deepak-thapa-381647148" target="_blank" rel="noopener noreferrer" className="font-mono text-xs tech-badge">LinkedIn</a>
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-green-500 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between items-end">
              <span className={`h-0.5 bg-current transition-all duration-300 ${isOpen ? 'w-6 translate-y-2 -rotate-45' : 'w-6'}`} />
              <span className={`h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : 'w-4'}`} />
              <span className={`h-0.5 bg-current transition-all duration-300 ${isOpen ? 'w-6 -translate-y-2.5 rotate-45' : 'w-5'}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden border-t overflow-hidden"
            style={{ background: 'rgba(10,14,10,0.98)', borderColor: 'var(--terminal-border)' }}
          >
            <div className="flex flex-col p-4 space-y-4">
              {navLinks.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(s.id);
                  }}
                  className="font-mono text-sm py-2 px-1 transition-all duration-200"
                  style={{
                    color: activeSection === s.id ? 'var(--terminal-green)' : 'var(--terminal-text-dim)',
                    textShadow: activeSection === s.id ? 'var(--crt-glow)' : 'none',
                  }}
                >
                  <span className="text-green-800 mr-2">$</span> ./{s.label}
                </a>
              ))}
              <div className="flex gap-4 pt-4 border-t mt-2" style={{ borderColor: 'var(--terminal-border)' }}>
                <a href="https://github.com/dtsuper3" target="_blank" rel="noopener noreferrer" className="font-mono text-xs tech-badge">GitHub</a>
                <a href="https://www.linkedin.com/in/deepak-thapa-381647148" target="_blank" rel="noopener noreferrer" className="font-mono text-xs tech-badge">LinkedIn</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
