'use client';

import React, { useState } from 'react';
import { BlogIcon } from './BlogIcon';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title
  )}&url=${encodeURIComponent(url)}`;

  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    url
  )}`;

  return (
    <div className="flex items-center space-x-2 font-mono text-xs text-[var(--terminal-text-dim)]">
      <span className="font-semibold text-[var(--terminal-text-faint)]">Share:</span>

      <button
        onClick={handleCopy}
        className="flex items-center space-x-1 px-3 py-1.5 rounded border border-[var(--terminal-border)] bg-[var(--terminal-surface-2)] hover:border-[var(--terminal-green)] hover:text-[var(--terminal-green)] transition-all"
        title="Copy Link"
      >
        {copied ? (
          <>
            <BlogIcon name="CheckIcon" className="w-3.5 h-3.5 text-[var(--terminal-green)]" />
            <span className="text-[var(--terminal-green)] font-bold">Copied!</span>
          </>
        ) : (
          <>
            <BlogIcon name="LinkIcon" className="w-3.5 h-3.5" />
            <span>Copy URL</span>
          </>
        )}
      </button>

      <a
        href={twitterShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1.5 rounded border border-[var(--terminal-border)] bg-[var(--terminal-surface-2)] hover:border-[var(--terminal-cyan)] hover:text-[var(--terminal-cyan)] transition-all inline-flex items-center space-x-1"
        title="Share on Twitter / X"
      >
        <BlogIcon name="ShareIcon" className="w-3.5 h-3.5" />
        <span>Twitter</span>
      </a>

      <a
        href={linkedInShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1.5 rounded border border-[var(--terminal-border)] bg-[var(--terminal-surface-2)] hover:border-[var(--terminal-green-dim)] hover:text-[var(--terminal-green)] transition-all inline-flex items-center space-x-1"
        title="Share on LinkedIn"
      >
        <BlogIcon name="ShareIcon" className="w-3.5 h-3.5" />
        <span>LinkedIn</span>
      </a>
    </div>
  );
}
