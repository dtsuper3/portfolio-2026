import React from 'react';
import Link from 'next/link';
import { BlogIcon } from './BlogIcon';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-xs font-mono text-[var(--terminal-text-dim)] py-3 px-4 rounded-md border border-[var(--terminal-border)] bg-[var(--terminal-surface)] overflow-x-auto">
      <Link
        href="/"
        className="hover:text-[var(--terminal-green)] transition-colors flex items-center space-x-1 shrink-0"
      >
        <BlogIcon name="HomeIcon" className="w-3.5 h-3.5" />
        <span>root</span>
      </Link>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <span className="text-[var(--terminal-text-faint)]">/</span>
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-[var(--terminal-green)] transition-colors shrink-0"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[var(--terminal-green)] font-semibold truncate">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
