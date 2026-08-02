import React from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';
import BlogCard from './BlogCard';
import { BlogIcon } from './BlogIcon';

interface LatestBlogSectionProps {
  posts: BlogPost[];
}

export default function LatestBlogSection({ posts }: LatestBlogSectionProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-16 border-t border-[var(--terminal-border)] bg-[var(--terminal-bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[var(--terminal-border)]">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-[var(--terminal-green)] mb-2">
              <span className="w-2 h-2 rounded-full bg-[var(--terminal-green)] animate-ping"></span>
              <span>DEV.BLOG_LOGS</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-mono text-[var(--terminal-green)] glow-green">
              LATEST TECHNICAL WRITINGS
            </h2>
          </div>

          <Link
            href="/blog"
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 px-4 py-2 rounded border border-[var(--terminal-green)] bg-[var(--terminal-surface)] text-xs font-mono text-[var(--terminal-green)] hover:bg-[var(--terminal-green)] hover:text-[var(--terminal-bg)] transition-all font-bold shadow-[var(--crt-glow)]"
          >
            <span>View All Blog Posts</span>
            <BlogIcon name="ArrowRightIcon" className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
