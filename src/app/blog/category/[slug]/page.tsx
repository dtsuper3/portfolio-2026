import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostsByCategory, getCategories, getTags } from '@/sanity/lib/fetch';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogList from '@/components/blog/BlogList';
import Breadcrumb from '@/components/blog/Breadcrumb';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return { title: 'Category Not Found' };
  }

  return {
    title: `Articles in ${category.title} | Deepak Thapa Blog`,
    description: category.description || `Read all blog posts categorized under ${category.title}.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const [categories, tags] = await Promise.all([getCategories(), getTags()]);
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const posts = await getPostsByCategory(slug);

  return (
    <main className="min-h-screen bg-[var(--terminal-bg)] text-[var(--terminal-text)] py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto crt-screen">
      <div className="mb-6">
        <Breadcrumb
          items={[
            { label: 'blog', href: '/blog' },
            { label: 'category' },
            { label: category.title.toLowerCase() },
          ]}
        />
      </div>

      <BlogHeader
        title={`CATEGORY: ${category.title.toUpperCase()}`}
        subtitle={category.description || `Browsing all articles filed under ${category.title}.`}
        totalPosts={posts.length}
      />

      <BlogList initialPosts={posts} categories={categories} tags={tags} />
    </main>
  );
}
