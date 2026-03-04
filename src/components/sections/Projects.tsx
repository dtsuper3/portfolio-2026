'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '@/types/portfolio';

const langColors: Record<string, string> = {
  TypeScript: '#00FF41',
  JavaScript: '#FFD700',
  Rust: '#FF6B35',
  Go: '#00FFFF',
  'C++': '#FF69B4',
};

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projects" className="py-24 px-4">
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
            <h2 className="text-2xl font-bold" style={{ color: 'var(--terminal-text)' }}>ls -la ./projects</h2>
          </div>
          <p className="text-sm ml-6" style={{ color: 'var(--terminal-text-faint)' }}>
            {"//"} {projects.length} projects found
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <motion.a
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card rounded-lg p-5 block group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span style={{ color: 'var(--terminal-green)', textShadow: 'var(--crt-glow)' }}>▶</span>
                  <span className="font-bold text-sm group-hover:text-green-400 transition-colors" style={{ color: 'var(--terminal-text)' }}>
                    {project.name}
                  </span>
                </div>
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0 mt-1"
                  style={{ background: langColors[project.language] || '#00FF41', boxShadow: `0 0 6px ${langColors[project.language] || '#00FF41'}` }}
                />
              </div>
              <p className="text-xs mb-3 leading-relaxed" style={{ color: 'var(--terminal-text-dim)' }}>
                {project.description}
              </p>
              <div className="text-xs mb-3" style={{ color: 'var(--terminal-text-faint)' }}>
                <span style={{ color: 'var(--terminal-amber)' }}>period:</span> {project.period}
              </div>
              <div className="flex flex-wrap gap-1">
                {project.tags.map((tag) => (
                  <span key={tag} className="tech-badge">{tag}</span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
