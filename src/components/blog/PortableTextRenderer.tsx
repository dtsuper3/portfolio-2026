/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useState } from 'react';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import Image from 'next/image';
import { urlForImage } from '@/sanity/image';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-python';
import { BlogIcon } from './BlogIcon';

interface PortableTextRendererProps {
  value: any;
}

function CodeBlock({ value }: { value: any }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!value?.code) return;
    navigator.clipboard.writeText(value.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [value]);

  const language = value?.language || 'typescript';

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-[var(--terminal-border)] bg-[var(--terminal-surface-2)]">
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--terminal-surface)] border-b border-[var(--terminal-border)] text-xs text-[var(--terminal-text-dim)]">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--terminal-amber)] opacity-75"></span>
          <span className="font-mono text-[var(--terminal-green)] font-semibold">
            {value?.filename || `${language}`}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1.5 px-2.5 py-1 text-xs rounded border border-[var(--terminal-border)] hover:border-[var(--terminal-green-dim)] text-[var(--terminal-text-dim)] hover:text-[var(--terminal-green)] transition-all bg-[var(--terminal-surface-2)]"
          title="Copy Code"
        >
          {copied ? (
            <>
              <BlogIcon name="CheckIcon" className="w-3.5 h-3.5 text-[var(--terminal-green)]" />
              <span className="text-[var(--terminal-green)]">Copied!</span>
            </>
          ) : (
            <>
              <BlogIcon name="ClipboardIcon" className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono text-[var(--terminal-text)] bg-[var(--terminal-bg)] m-0">
        <code className={`language-${language}`}>{value?.code}</code>
      </pre>
    </div>
  );
}

function CalloutBlock({ value }: { value: any }) {
  const type = value?.type || 'note';
  const borderColor =
    type === 'warning'
      ? 'border-[var(--terminal-amber)] bg-[rgba(255,107,53,0.05)] text-[var(--terminal-amber)]'
      : type === 'info'
        ? 'border-[var(--terminal-cyan)] bg-[rgba(0,255,255,0.05)] text-[var(--terminal-cyan)]'
        : 'border-[var(--terminal-green)] bg-[rgba(0,255,65,0.05)] text-[var(--terminal-green)]';

  return (
    <div className={`my-6 p-4 rounded border-l-4 ${borderColor} bg-[var(--terminal-surface)] shadow-md`}>
      <div className="text-xs font-mono font-bold tracking-wider uppercase mb-1 flex items-center gap-1.5">
        <BlogIcon name="InformationCircleIcon" className="w-4 h-4" />
        <span>{type}</span>
      </div>
      <p className="text-sm font-mono text-[var(--terminal-text)] leading-relaxed m-0">
        {value?.text}
      </p>
    </div>
  );
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref && !value?.asset?.url) return null;
      const imageUrl = value.asset.url || urlForImage(value).url();
      return (
        <figure className="my-8 relative rounded-lg overflow-hidden border border-[var(--terminal-border)] bg-[var(--terminal-surface)]">
          <div className="relative w-full h-[360px] md:h-[480px]">
            <Image
              src={imageUrl}
              alt={value.alt || 'Blog illustration'}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          {value.caption && (
            <figcaption className="p-3 text-center text-xs font-mono text-[var(--terminal-text-dim)] border-t border-[var(--terminal-border)] bg-[var(--terminal-surface-2)]">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    code: CodeBlock,
    callout: CalloutBlock,
  },
  block: {
    h1: ({ children, value }) => {
      const id = value?.children?.[0]?.text?.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') || '';
      return (
        <h1 id={id} className="scroll-mt-24 text-2xl md:text-3xl font-bold font-mono text-[var(--terminal-green)] glow-green mt-10 mb-4 border-b border-[var(--terminal-border)] pb-2">
          {children}
        </h1>
      );
    },
    h2: ({ children, value }) => {
      const id = value?.children?.[0]?.text?.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') || '';
      return (
        <h2 id={id} className="scroll-mt-24 text-xl md:text-2xl font-bold font-mono text-[var(--terminal-green)] mt-8 mb-4">
          {children}
        </h2>
      );
    },
    h3: ({ children, value }) => {
      const id = value?.children?.[0]?.text?.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') || '';
      return (
        <h3 id={id} className="scroll-mt-24 text-lg md:text-xl font-bold font-mono text-[var(--terminal-text)] mt-6 mb-3">
          {children}
        </h3>
      );
    },
    h4: ({ children, value }) => {
      const id = value?.children?.[0]?.text?.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') || '';
      return (
        <h4 id={id} className="scroll-mt-24 text-base font-bold font-mono text-[var(--terminal-text-dim)] mt-4 mb-2">
          {children}
        </h4>
      );
    },
    normal: ({ children }) => (
      <p className="text-sm md:text-base font-mono text-[var(--terminal-text)] leading-relaxed mb-4 opacity-90">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 pl-4 border-l-2 border-[var(--terminal-amber)] text-[var(--terminal-amber)] italic font-mono text-sm md:text-base bg-[rgba(255,107,53,0.03)] py-2 rounded-r">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside my-4 space-y-2 font-mono text-sm md:text-base text-[var(--terminal-text)] pl-2">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside my-4 space-y-2 font-mono text-sm md:text-base text-[var(--terminal-text)] pl-2">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="leading-relaxed marker:text-[var(--terminal-green)]">{children}</li>
    ),
    number: ({ children }) => (
      <li className="leading-relaxed marker:text-[var(--terminal-green)]">{children}</li>
    ),
  },
  marks: {
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 rounded bg-[var(--terminal-surface-2)] border border-[var(--terminal-border)] text-[var(--terminal-green)] font-mono text-xs md:text-sm">
        {children}
      </code>
    ),
    strong: ({ children }) => (
      <strong className="font-bold text-[var(--terminal-green)]">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-[var(--terminal-text)]">{children}</em>
    ),
    link: ({ value, children }) => {
      const href = value?.href || '#';
      const isExternal = href.startsWith('http');
      return (
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-[var(--terminal-green)] underline underline-offset-4 hover:text-[var(--terminal-cyan)] transition-colors font-semibold"
        >
          {children}
        </a>
      );
    },
  },
};

export default function PortableTextRenderer({ value }: PortableTextRendererProps) {
  if (!value) return null;
  return (
    <article className="prose prose-invert max-w-none">
      <PortableText value={value} components={components} />
    </article>
  );
}
