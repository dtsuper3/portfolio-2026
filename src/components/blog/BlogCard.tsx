import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types/blog';
import { urlForImage } from '@/sanity/image';
import ReadingTime from './ReadingTime';
import { BlogIcon } from './BlogIcon';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const imageUrl = post.coverImage
    ? typeof post.coverImage === 'string'
      ? post.coverImage
      : urlForImage(post.coverImage).width(600).height(340).url()
    : null;

  return (
    <article className="group flex flex-col justify-between h-full rounded-lg border border-[var(--terminal-border)] bg-[var(--terminal-surface)] hover:border-[var(--terminal-green-dim)] transition-all duration-300 overflow-hidden hover:shadow-[var(--crt-glow)]">
      <div>
        {/* Cover Image or Hacker Graphic Placeholder */}
        <div className="relative w-full h-44 bg-[var(--terminal-surface-2)] overflow-hidden border-b border-[var(--terminal-border)]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[var(--terminal-surface)] to-[var(--terminal-surface-2)]">
              <div className="text-[var(--terminal-green)] opacity-40 font-mono text-xs mb-2">
                {`// SYSTEM.ARTICLE_ID_${post._id.slice(0, 6)}`}
              </div>
              <BlogIcon name="CodeBracketIcon" className="w-10 h-10 text-[var(--terminal-green-dim)] opacity-60 group-hover:scale-110 transition-transform duration-300" />
            </div>
          )}
          {post.category && (
            <Link
              href={`/blog/category/${post.category.slug}`}
              className="absolute top-3 left-3 z-10 text-xs font-mono px-2.5 py-1 rounded bg-[var(--terminal-bg)] border border-[var(--terminal-border)] text-[var(--terminal-green)] hover:border-[var(--terminal-green)] transition-colors shadow"
            >
              {post.category.title}
            </Link>
          )}
        </div>

        {/* Content Body */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-3 text-xs font-mono text-[var(--terminal-text-dim)] mb-3">
              <span className="flex items-center space-x-1">
                <BlogIcon name="CalendarIcon" className="w-3.5 h-3.5 text-[var(--terminal-text-faint)]" />
                <span>{formattedDate}</span>
              </span>
              <span>•</span>
              <ReadingTime content={post.content} />
            </div>

            <h3 className="text-lg font-bold font-mono text-[var(--terminal-text)] group-hover:text-[var(--terminal-green)] transition-colors line-clamp-2 mb-2 leading-snug">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h3>

            <p className="text-xs md:text-sm font-mono text-[var(--terminal-text-dim)] line-clamp-3 leading-relaxed mb-4">
              {post.description}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Tags & Read Link */}
      <div className="px-5 pb-5 pt-0 border-t border-transparent flex items-center justify-between mt-auto">
        <div className="flex flex-wrap gap-1.5 overflow-hidden max-h-6">
          {post.tags?.slice(0, 2).map((tag) => (
            <Link
              key={tag.slug}
              href={`/blog/tag/${tag.slug}`}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--terminal-surface-2)] text-[var(--terminal-text-dim)] hover:text-[var(--terminal-green)] transition-colors"
            >
              #{tag.title}
            </Link>
          ))}
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center space-x-1 text-xs font-mono font-semibold text-[var(--terminal-green)] group-hover:translate-x-1 transition-transform shrink-0 ml-2"
        >
          <span>Read</span>
          <BlogIcon name="ArrowRightIcon" className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}
