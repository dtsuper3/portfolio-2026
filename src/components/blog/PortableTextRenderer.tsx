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
  const filename = value?.filename;
  const highlightedLinesStr = value?.highlightedLines || '';

  // Parse highlighted line ranges (e.g. "1, 4-7")
  const highlightedLineSet = new Set<number>();
  if (highlightedLinesStr) {
    highlightedLinesStr.split(',').forEach((part: string) => {
      const trimmed = part.trim();
      if (trimmed.includes('-')) {
        const [start, end] = trimmed.split('-').map(Number);
        if (!isNaN(start) && !isNaN(end)) {
          for (let i = start; i <= end; i++) {
            highlightedLineSet.add(i);
          }
        }
      } else {
        const num = Number(trimmed);
        if (!isNaN(num)) highlightedLineSet.add(num);
      }
    });
  }

  const codeLines = (value?.code || '').split('\n');
  const showLineNumbers = value?.showLineNumbers !== false;

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-[var(--terminal-border)] bg-[var(--terminal-surface-2)] shadow-lg">
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--terminal-surface)] border-b border-[var(--terminal-border)] text-xs text-[var(--terminal-text-dim)]">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></span>
          <span className="font-mono text-[var(--terminal-green)] font-semibold ml-2">
            {filename || `${language}`}
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
        <code className={`language-${language}`}>
          {codeLines.map((line: string, index: number) => {
            const lineNum = index + 1;
            const isHighlighted = highlightedLineSet.has(lineNum);
            return (
              <div
                key={index}
                className={`${
                  isHighlighted ? 'bg-[rgba(0,255,65,0.12)] border-l-2 border-[var(--terminal-green)] -mx-4 px-4' : ''
                } flex`}
              >
                {showLineNumbers && (
                  <span className="select-none inline-block w-8 text-right pr-4 text-[var(--terminal-text-faint)] text-xs">
                    {lineNum}
                  </span>
                )}
                <span className="flex-1">{line || ' '}</span>
              </div>
            );
          })}
        </code>
      </pre>
    </div>
  );
}

function TerminalBlock({ value }: { value: any }) {
  const [copied, setCopied] = useState(false);
  const title = value?.title || 'Terminal';
  const commandText = value?.command || '';

  const handleCopy = () => {
    if (!commandText) return;
    navigator.clipboard.writeText(commandText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = commandText.split('\n');

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-[var(--terminal-border)] bg-[var(--terminal-surface)] shadow-md">
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--terminal-surface-2)] border-b border-[var(--terminal-border)] text-xs font-mono text-[var(--terminal-text-dim)]">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--terminal-amber)] opacity-80"></span>
          <span className="text-[var(--terminal-text)] font-semibold">{title}</span>
        </div>
        <button
          onClick={handleCopy}
          className="text-xs hover:text-[var(--terminal-green)] transition-colors"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className="p-4 font-mono text-sm bg-[var(--terminal-bg)] text-[var(--terminal-text)] overflow-x-auto space-y-1">
        {lines.map((line: string, idx: number) => {
          const isPrompt = line.trim().startsWith('$') || line.trim().startsWith('>');
          return (
            <div key={idx} className={isPrompt ? 'text-[var(--terminal-green)] font-semibold' : 'text-[var(--terminal-text-dim)]'}>
              {line}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CalloutBlock({ value }: { value: any }) {
  const type = value?.type || 'info';
  const title = value?.title;
  const text = value?.text;

  const stylesMap: Record<string, { border: string; bg: string; text: string; label: string }> = {
    info: {
      border: 'border-[var(--terminal-cyan)]',
      bg: 'bg-[rgba(0,255,255,0.05)]',
      text: 'text-[var(--terminal-cyan)]',
      label: 'INFO',
    },
    tip: {
      border: 'border-[var(--terminal-green)]',
      bg: 'bg-[rgba(0,255,65,0.05)]',
      text: 'text-[var(--terminal-green)]',
      label: 'TIP',
    },
    warning: {
      border: 'border-[var(--terminal-amber)]',
      bg: 'bg-[rgba(255,107,53,0.05)]',
      text: 'text-[var(--terminal-amber)]',
      label: 'WARNING',
    },
    success: {
      border: 'border-emerald-500',
      bg: 'bg-emerald-950/20',
      text: 'text-emerald-400',
      label: 'SUCCESS',
    },
    danger: {
      border: 'border-red-500',
      bg: 'bg-red-950/20',
      text: 'text-red-400',
      label: 'DANGER',
    },
    bestPractice: {
      border: 'border-purple-500',
      bg: 'bg-purple-950/20',
      text: 'text-purple-400',
      label: 'BEST PRACTICE',
    },
  };

  const currentStyle = stylesMap[type] || stylesMap.info;

  return (
    <div className={`my-6 p-4 rounded border-l-4 ${currentStyle.border} ${currentStyle.bg} bg-[var(--terminal-surface)] shadow-md`}>
      <div className={`text-xs font-mono font-bold tracking-wider uppercase mb-1 flex items-center gap-1.5 ${currentStyle.text}`}>
        <BlogIcon name="InformationCircleIcon" className="w-4 h-4" />
        <span>{title || currentStyle.label}</span>
      </div>
      <p className="text-sm font-mono text-[var(--terminal-text)] leading-relaxed m-0 opacity-95">
        {text}
      </p>
    </div>
  );
}

function TableBlock({ value }: { value: any }) {
  const caption = value?.caption;
  const headers = value?.headers || [];
  const rows = value?.rows || [];

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-[var(--terminal-border)] bg-[var(--terminal-surface)] shadow-md">
      {caption && (
        <div className="px-4 py-2 bg-[var(--terminal-surface-2)] border-b border-[var(--terminal-border)] text-xs font-mono text-[var(--terminal-text-dim)] font-semibold">
          {caption}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs md:text-sm font-mono">
          {headers.length > 0 && (
            <thead>
              <tr className="border-b border-[var(--terminal-border)] bg-[var(--terminal-surface-2)] text-[var(--terminal-green)]">
                {headers.map((header: string, i: number) => (
                  <th key={i} className="px-4 py-2 font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody className="divide-y divide-[var(--terminal-border)] bg-[var(--terminal-bg)]">
            {rows.map((row: string[], rIdx: number) => (
              <tr key={rIdx} className="hover:bg-[var(--terminal-surface)] transition-colors">
                {row.map((cell: string, cIdx: number) => (
                  <td key={cIdx} className="px-4 py-2.5 text-[var(--terminal-text)] opacity-90">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ComparisonBlock({ value }: { value: any }) {
  const title = value?.title || 'Comparison';
  const description = value?.description;
  const beforeTitle = value?.beforeTitle || 'Before / Incorrect';
  const beforeCode = value?.beforeCode || '';
  const afterTitle = value?.afterTitle || 'After / Recommended';
  const afterCode = value?.afterCode || '';

  return (
    <div className="my-6 rounded-lg border border-[var(--terminal-border)] bg-[var(--terminal-surface)] p-4 shadow-md">
      <div className="mb-4">
        <h4 className="text-sm font-mono font-bold text-[var(--terminal-green)] m-0">{title}</h4>
        {description && (
          <p className="text-xs font-mono text-[var(--terminal-text-dim)] mt-1 m-0">{description}</p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded border border-red-500/40 bg-[var(--terminal-bg)] overflow-hidden">
          <div className="px-3 py-1.5 bg-red-950/30 border-b border-red-500/30 text-xs font-mono text-red-400 font-semibold flex items-center justify-between">
            <span>{beforeTitle}</span>
            <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-red-500/20">Avoid</span>
          </div>
          <pre className="p-3 text-xs font-mono text-red-200/90 overflow-x-auto m-0">
            <code>{beforeCode}</code>
          </pre>
        </div>
        <div className="rounded border border-emerald-500/40 bg-[var(--terminal-bg)] overflow-hidden">
          <div className="px-3 py-1.5 bg-emerald-950/30 border-b border-emerald-500/30 text-xs font-mono text-emerald-400 font-semibold flex items-center justify-between">
            <span>{afterTitle}</span>
            <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-emerald-500/20">Recommended</span>
          </div>
          <pre className="p-3 text-xs font-mono text-emerald-200/90 overflow-x-auto m-0">
            <code>{afterCode}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

function MermaidBlock({ value }: { value: any }) {
  const title = value?.title || 'Diagram';
  const chart = value?.chart || '';

  return (
    <div className="my-6 rounded-lg border border-[var(--terminal-border)] bg-[var(--terminal-surface)] overflow-hidden shadow-md">
      <div className="px-4 py-2 bg-[var(--terminal-surface-2)] border-b border-[var(--terminal-border)] text-xs font-mono text-[var(--terminal-cyan)] font-semibold flex items-center justify-between">
        <span>Diagram: {title}</span>
        <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded bg-[rgba(0,255,255,0.1)] border border-[var(--terminal-cyan)]">
          Mermaid
        </span>
      </div>
      <div className="p-4 bg-[var(--terminal-bg)] font-mono text-xs text-[var(--terminal-text)] overflow-x-auto">
        <pre className="m-0 text-[var(--terminal-text-dim)]">
          <code>{chart}</code>
        </pre>
      </div>
    </div>
  );
}

function GithubBlock({ value }: { value: any }) {
  const repoUrl = value?.repoUrl || '#';
  const branch = value?.branch || 'main';
  const filePath = value?.filePath;
  const title = value?.title || 'View Source on GitHub';

  return (
    <div className="my-6 p-4 rounded-lg border border-[var(--terminal-border)] bg-[var(--terminal-surface)] hover:border-[var(--terminal-green)] transition-all shadow-md">
      <a
        href={repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between no-underline"
      >
        <div className="flex items-center space-x-3">
          <BlogIcon name="CodeBracketIcon" className="w-5 h-5 text-[var(--terminal-green)]" />
          <div>
            <div className="text-sm font-mono font-bold text-[var(--terminal-green)] hover:underline">
              {title}
            </div>
            <div className="text-xs font-mono text-[var(--terminal-text-dim)]">
              Branch: <span className="text-[var(--terminal-cyan)]">{branch}</span>
              {filePath && <span> • Path: {filePath}</span>}
            </div>
          </div>
        </div>
        <span className="text-xs font-mono text-[var(--terminal-text-dim)] hover:text-[var(--terminal-green)] flex items-center space-x-1">
          <span>GitHub</span>
          <BlogIcon name="ChevronRightIcon" className="w-3.5 h-3.5" />
        </span>
      </a>
    </div>
  );
}

function YoutubeBlock({ value }: { value: any }) {
  const url = value?.url || '';
  const title = value?.title;
  const caption = value?.caption;

  // Extract video ID from YouTube URL
  let videoId = '';
  if (url.includes('v=')) {
    videoId = url.split('v=')[1]?.split('&')[0] || '';
  } else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
  }

  if (!videoId) return null;

  return (
    <figure className="my-8 rounded-lg overflow-hidden border border-[var(--terminal-border)] bg-[var(--terminal-surface)] shadow-lg">
      {title && (
        <div className="px-4 py-2 bg-[var(--terminal-surface-2)] border-b border-[var(--terminal-border)] text-xs font-mono text-[var(--terminal-text)] font-semibold">
          {title}
        </div>
      )}
      <div className="relative w-full aspect-video">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title || 'YouTube Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full border-0"
        ></iframe>
      </div>
      {caption && (
        <figcaption className="p-3 text-center text-xs font-mono text-[var(--terminal-text-dim)] border-t border-[var(--terminal-border)] bg-[var(--terminal-surface-2)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function FileTreeBlock({ value }: { value: any }) {
  const title = value?.title || 'Project Structure';
  const treeStructure = value?.treeStructure || '';

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-[var(--terminal-border)] bg-[var(--terminal-surface)] shadow-md">
      <div className="px-4 py-2 bg-[var(--terminal-surface-2)] border-b border-[var(--terminal-border)] text-xs font-mono text-[var(--terminal-amber)] font-semibold flex items-center space-x-2">
        <BlogIcon name="FolderIcon" className="w-4 h-4 text-[var(--terminal-amber)]" />
        <span>{title}</span>
      </div>
      <div className="p-4 bg-[var(--terminal-bg)] font-mono text-xs text-[var(--terminal-text)] overflow-x-auto leading-relaxed">
        <pre className="m-0 text-[var(--terminal-text-dim)]">
          <code>{treeStructure}</code>
        </pre>
      </div>
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
    codeBlock: CodeBlock,
    callout: CalloutBlock,
    calloutBlock: CalloutBlock,
    terminalBlock: TerminalBlock,
    tableBlock: TableBlock,
    comparisonBlock: ComparisonBlock,
    mermaidBlock: MermaidBlock,
    githubBlock: GithubBlock,
    youtubeBlock: YoutubeBlock,
    fileTreeBlock: FileTreeBlock,
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
