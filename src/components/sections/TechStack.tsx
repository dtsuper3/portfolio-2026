'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TechCategory } from '@/types/portfolio';

interface TechStackProps {
  techStack: TechCategory[];
}

export default function TechStack({ techStack }: TechStackProps) {
  return (
    <section id="stack" aria-label="Tech Stack Section" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <span style={{ color: 'var(--terminal-green)', textShadow: 'var(--crt-glow)' }} aria-hidden="true">
              $
            </span>
            <h2 className="text-2xl font-bold" style={{ color: 'var(--terminal-text)' }}>
              cat ./tech-stack.yaml
            </h2>
          </div>
          <p className="text-sm ml-6" style={{ color: 'var(--terminal-text-faint)' }}>
            {'//'} Modern web technologies, frameworks, backend & DevOps tools
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {techStack.map((cat, i) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              key={cat.label}
              className="terminal-window p-5 transition-all duration-300 hover:border-[var(--terminal-green-dim)]"
            >
              <div className="flex items-center gap-2 mb-4">
                <span
                  style={{ color: 'var(--terminal-amber)', textShadow: 'var(--amber-glow)' }}
                  aria-hidden="true"
                >
                  ▸
                </span>
                <h3 className="text-sm font-bold" style={{ color: 'var(--terminal-text)' }}>
                  {cat.label}:
                </h3>
              </div>
              <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
                {cat.items.map((item) => (
                  <li key={item}>
                    <span className="tech-badge cursor-default">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: techStack.length * 0.1 }}
            className="terminal-window p-5 transition-all duration-300 hover:border-[var(--terminal-green-dim)]"
          >
            <div className="flex items-center gap-2 mb-4">
              <span
                style={{ color: 'var(--terminal-amber)', textShadow: 'var(--amber-glow)' }}
                aria-hidden="true"
              >
                ▸
              </span>
              <h3 className="text-sm font-bold" style={{ color: 'var(--terminal-text)' }}>
                Currently Learning:
              </h3>
            </div>
            <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
              {['LLM', 'Agentic AI', 'RAG'].map((item) => (
                <li key={item}>
                  <span
                    className="tech-badge cursor-default"
                    style={{
                      borderColor: 'var(--terminal-amber-dim)',
                      color: 'var(--terminal-amber)',
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
