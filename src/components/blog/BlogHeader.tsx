import React from 'react';
import { BlogIcon } from './BlogIcon';

interface BlogHeaderProps {
  title?: string;
  subtitle?: string;
  totalPosts?: number;
}

export default function BlogHeader({
  title = 'DEVELOPER BLOG & ARTICLES',
  subtitle = 'Insights on Next.js 15, React 19, Agentic AI, TypeScript, and modern web architecture.',
  totalPosts,
}: BlogHeaderProps) {
  return (
    <header className="mb-10 rounded-xl border border-[var(--terminal-border)] bg-[var(--terminal-surface)] p-6 md:p-8 relative overflow-hidden shadow-lg">
      <div className="flex items-center space-x-2 pb-4 mb-4 border-b border-[var(--terminal-border)] text-xs font-mono text-[var(--terminal-text-dim)]">
        <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
        <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
        <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
        <span className="ml-2 text-[var(--terminal-green)] font-semibold">
          user@portfolio:~/blog$
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold font-mono text-[var(--terminal-green)] glow-green tracking-tight mb-2">
            {title}
          </h1>
          <p className="text-xs md:text-sm font-mono text-[var(--terminal-text-dim)] max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        {totalPosts !== undefined && (
          <div className="self-start md:self-auto px-3.5 py-1.5 rounded-lg border border-[var(--terminal-border)] bg-[var(--terminal-surface-2)] text-xs font-mono text-[var(--terminal-green)] flex items-center space-x-2">
            <BlogIcon name="DocumentTextIcon" className="w-4 h-4" />
            <span>{totalPosts} {totalPosts === 1 ? 'Article' : 'Articles'} Published</span>
          </div>
        )}
      </div>
    </header>
  );
}
