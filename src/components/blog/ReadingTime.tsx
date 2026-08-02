import React from 'react';
import { BlogIcon } from './BlogIcon';
import { calculateReadingTime } from '@/lib/readingTime';

interface ReadingTimeProps {
  content?: any;
  minutes?: number;
  className?: string;
}

export default function ReadingTime({ content, minutes, className = '' }: ReadingTimeProps) {
  const readTime = minutes || calculateReadingTime(content);
  return (
    <span className={`inline-flex items-center space-x-1.5 text-xs font-mono text-[var(--terminal-text-dim)] ${className}`}>
      <BlogIcon name="ClockIcon" className="w-3.5 h-3.5 text-[var(--terminal-green)]" />
      <span>{readTime} min read</span>
    </span>
  );
}
