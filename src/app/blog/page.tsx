import React from 'react';
import type { Metadata } from 'next';
import { getPosts, getFeaturedPosts, getCategories, getTags } from '@/sanity/lib/fetch';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogList from '@/components/blog/BlogList';
import Breadcrumb from '@/components/blog/Breadcrumb';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Developer Blog & Engineering Insights | Deepak Thapa',
  description:
    'Explore technical articles, tutorials, and architectural insights on Next.js 15, React 19, Agentic AI, TypeScript, and modern web application development.',
  openGraph: {
    title: 'Developer Blog & Engineering Insights | Deepak Thapa',
    description:
      'Technical articles and engineering insights on Next.js 15, React 19, Agentic AI, and TypeScript by Deepak Thapa.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Developer Blog & Engineering Insights | Deepak Thapa',
    description:
      'Technical articles and engineering insights on Next.js 15, React 19, Agentic AI, and TypeScript.',
  },
};

export default async function BlogIndexPage() {
  const [posts, featuredPosts, categories, tags] = await Promise.all([
    getPosts(),
    getFeaturedPosts(),
    getCategories(),
    getTags(),
  ]);

  const featuredPost = featuredPosts[0] || posts.find((p) => p.featured) || undefined;

  return (
    <main className="min-h-screen bg-[var(--terminal-bg)] text-[var(--terminal-text)] py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto crt-screen">
      <div className="mb-6">
        <Breadcrumb items={[{ label: 'blog' }]} />
      </div>

      <BlogHeader totalPosts={posts.length} />

      <BlogList
        initialPosts={posts}
        categories={categories}
        tags={tags}
        featuredPost={featuredPost}
      />
    </main>
  );
}
