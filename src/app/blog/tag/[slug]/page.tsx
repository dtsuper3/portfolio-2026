import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostsByTag, getCategories, getTags } from '@/sanity/lib/fetch';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogList from '@/components/blog/BlogList';
import Breadcrumb from '@/components/blog/Breadcrumb';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tags = await getTags();
  const tag = tags.find((t) => t.slug === slug);

  if (!tag) {
    return { title: 'Tag Not Found' };
  }

  return {
    title: `Articles Tagged #${tag.title} | Deepak Thapa Blog`,
    description: `Read all developer articles tagged with #${tag.title}.`,
  };
}

export default async function TagPage({ params }: PageProps) {
  const { slug } = await params;
  const [categories, tags] = await Promise.all([getCategories(), getTags()]);
  const tag = tags.find((t) => t.slug === slug);

  if (!tag) {
    notFound();
  }

  const posts = await getPostsByTag(slug);

  return (
    <main className="min-h-screen bg-[var(--terminal-bg)] text-[var(--terminal-text)] py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto crt-screen">
      <div className="mb-6">
        <Breadcrumb
          items={[
            { label: 'blog', href: '/blog' },
            { label: 'tag' },
            { label: `#${tag.title.toLowerCase()}` },
          ]}
        />
      </div>

      <BlogHeader
        title={`TAG: #${tag.title.toUpperCase()}`}
        subtitle={`Browsing all developer posts tagged with #${tag.title}.`}
        totalPosts={posts.length}
      />

      <BlogList initialPosts={posts} categories={categories} tags={tags} />
    </main>
  );
}
