'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Experience as ExperienceType } from '@/types/portfolio';

interface ExperienceProps {
  experience: ExperienceType[];
}

export default function Experience({ experience }: ExperienceProps) {
  return (
    <section id="experience" className="py-24 px-4" style={{ background: 'var(--terminal-surface)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <span style={{ color: 'var(--terminal-green)', textShadow: 'var(--crt-glow)' }}>$</span>
            <h2 className="text-2xl font-bold" style={{ color: 'var(--terminal-text)' }}>cat ./experience.log</h2>
          </div>
          <p className="text-sm ml-6" style={{ color: 'var(--terminal-text-faint)' }}>
            {"//"} {experience.length} positions held
          </p>
        </motion.div>
        <div className="space-y-4">
          {experience.map((exp, i) => (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              key={i}
              className="terminal-window p-5 transition-all duration-300 hover:border-[var(--terminal-green-dim)]"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span style={{ color: 'var(--terminal-green)', textShadow: 'var(--crt-glow)' }}>▸</span>
                  <div>
                    <span className="font-bold text-sm" style={{ color: 'var(--terminal-text)' }}>{exp.role}</span>
                    <span style={{ color: 'var(--terminal-text-faint)' }}> @ </span>
                    <a
                      href={exp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:text-green-400 transition-colors"
                      style={{ color: 'var(--terminal-cyan)', textShadow: 'var(--cyan-glow)' }}
                    >
                      {exp.company}
                    </a>
                  </div>
                </div>
                <span className="tech-badge text-xs ml-6 md:ml-0">{exp.period}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
