/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useState } from 'react';
import { BlogIcon } from './BlogIcon';

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

interface TOCProps {
  content: any;
}

export default function TOC({ content }: TOCProps) {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!Array.isArray(content)) return;

    const extracted: HeadingItem[] = [];
    content.forEach((block: any) => {
      if (block._type === 'block' && ['h1', 'h2', 'h3'].includes(block.style)) {
        const text = block.children?.map((c: any) => c.text).join('') || '';
        if (text) {
          const id = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-');
          const level = block.style === 'h1' ? 1 : block.style === 'h2' ? 2 : 3;
          extracted.push({ id, text, level });
        }
      }
    });

    setHeadings(extracted);
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -40% 0px' }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="rounded-xl border border-[var(--terminal-border)] bg-[var(--terminal-surface)] p-5 font-mono text-xs shadow sticky top-24">
      <div className="flex items-center space-x-2 pb-3 mb-3 border-b border-[var(--terminal-border)] text-[var(--terminal-green)] font-bold">
        <BlogIcon name="ListBulletIcon" className="w-4 h-4" />
        <span>TABLE OF CONTENTS</span>
      </div>

      <nav className="space-y-1.5 max-h-[70vh] overflow-y-auto pr-1">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={`block transition-all py-1 pl-${(heading.level - 1) * 3} border-l-2 leading-relaxed truncate ${isActive
                  ? 'border-[var(--terminal-green)] text-[var(--terminal-green)] font-bold glow-green pl-2'
                  : 'border-transparent text-[var(--terminal-text-dim)] hover:text-[var(--terminal-text)] hover:border-[var(--terminal-border)]'
                }`}
            >
              {heading.level > 1 && <span className="opacity-40 mr-1">›</span>}
              {heading.text}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
