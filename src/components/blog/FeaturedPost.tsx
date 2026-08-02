import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types/blog';
import { urlForImage } from '@/sanity/image';
import ReadingTime from './ReadingTime';
import { BlogIcon } from './BlogIcon';

interface FeaturedPostProps {
  post: BlogPost;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const imageUrl = post.coverImage
    ? typeof post.coverImage === 'string'
      ? post.coverImage
      : urlForImage(post.coverImage).width(800).height(450).url()
    : null;

  return (
    <div className="relative rounded-xl border border-[var(--terminal-green-dim)] bg-[var(--terminal-surface)] overflow-hidden shadow-[var(--crt-glow-strong)] transition-all duration-300 hover:border-[var(--terminal-green)] mb-10">
      <div className="absolute top-0 right-0 bg-[var(--terminal-green)] text-[var(--terminal-bg)] text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-bl-lg shadow flex items-center gap-1 z-20">
        <BlogIcon name="SparklesIcon" className="w-3 h-3" />
        <span>FEATURED POST</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
        {/* Featured Cover / Visual */}
        <div className="md:col-span-6 relative min-h-[240px] md:min-h-[340px] bg-[var(--terminal-surface-2)] border-b md:border-b-0 md:border-r border-[var(--terminal-border)]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full min-h-[240px] flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[var(--terminal-surface)] via-[var(--terminal-surface-2)] to-[var(--terminal-bg)]">
              <div className="text-[var(--terminal-green)] opacity-50 font-mono text-xs mb-3">
                {`// SYSTEM_FEATURED_ARTICLE`}
              </div>
              <BlogIcon name="CommandLineIcon" className="w-16 h-16 text-[var(--terminal-green)] animate-pulse" />
            </div>
          )}
        </div>

        {/* Content details */}
        <div className="md:col-span-6 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-3 text-xs font-mono text-[var(--terminal-text-dim)] mb-4 flex-wrap gap-y-2">
              {post.category && (
                <Link
                  href={`/blog/category/${post.category.slug}`}
                  className="px-2.5 py-0.5 rounded bg-[var(--terminal-surface-2)] border border-[var(--terminal-border)] text-[var(--terminal-green)] font-semibold"
                >
                  {post.category.title}
                </Link>
              )}
              <span className="flex items-center space-x-1">
                <BlogIcon name="CalendarIcon" className="w-3.5 h-3.5" />
                <span>{formattedDate}</span>
              </span>
              <span>•</span>
              <ReadingTime content={post.content} />
            </div>

            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold font-mono text-[var(--terminal-green)] glow-green leading-snug mb-4">
              <Link href={`/blog/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h2>

            <p className="text-sm font-mono text-[var(--terminal-text-dim)] leading-relaxed mb-6 line-clamp-3">
              {post.description}
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[var(--terminal-border)]">
            <div className="flex flex-wrap gap-2">
              {post.tags?.map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/blog/tag/${tag.slug}`}
                  className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--terminal-surface-2)] text-[var(--terminal-text-dim)] hover:text-[var(--terminal-green)] transition-colors"
                >
                  #{tag.title}
                </Link>
              ))}
            </div>

            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center space-x-2 text-sm font-mono font-bold text-[var(--terminal-bg)] bg-[var(--terminal-green)] px-4 py-2 rounded hover:bg-[var(--terminal-green-dim)] transition-colors shadow-[var(--crt-glow)] shrink-0 ml-3"
            >
              <span>Read Full Article</span>
              <BlogIcon name="ArrowRightIcon" className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
