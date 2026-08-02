import React from 'react';
import { BlogPost } from '@/types/blog';
import BlogCard from './BlogCard';

interface RelatedPostsProps {
  posts: BlogPost[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="mt-16 pt-10 border-t border-[var(--terminal-border)]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold font-mono text-[var(--terminal-green)] glow-green">
          RECOMMENDED & RELATED ARTICLES
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.slice(0, 3).map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
}
