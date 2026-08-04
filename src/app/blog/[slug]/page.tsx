import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  getPostBySlug,
  getAllPostSlugs,
  getPrevAndNextPost,
  getPostsByCategory,
} from '@/sanity/lib/fetch';
import { urlForImage } from '@/sanity/image';
import PortableTextRenderer from '@/components/blog/PortableTextRenderer';
import TOC from '@/components/blog/TOC';
import ShareButtons from '@/components/blog/ShareButtons';
import ReadingTime from '@/components/blog/ReadingTime';
import RelatedPosts from '@/components/blog/RelatedPosts';
import Breadcrumb from '@/components/blog/Breadcrumb';
import JsonLd from '@/components/seo/JsonLd';
import { SITE_URL } from '@/lib/jsonld';
import { BlogIcon } from '@/components/blog/BlogIcon';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.description;
  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const ogImageUrl = post.coverImage
    ? typeof post.coverImage === 'string'
      ? post.coverImage
      : urlForImage(post.coverImage).width(1200).height(630).url()
    : `${SITE_URL}/og-image.png`;

  return {
    title: `${title} | Deepak Thapa Blog`,
    description,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title,
      description,
      url: postUrl,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const [prevNext, categoryPosts] = await Promise.all([
    getPrevAndNextPost(post.publishedAt),
    post.category ? getPostsByCategory(post.category.slug) : Promise.resolve([]),
  ]);

  // Combine curated related posts with category fallback
  const curatedRelated = post.relatedPosts || [];
  const categoryRelated = categoryPosts.filter(
    (p) => p.slug !== post.slug && !curatedRelated.some((cr) => cr.slug === p.slug)
  );
  const finalRelatedPosts = [...curatedRelated, ...categoryRelated].slice(0, 3);

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedUpdatedDate = post.updatedAt
    ? new Date(post.updatedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  const coverImageUrl = post.coverImage
    ? typeof post.coverImage === 'string'
      ? post.coverImage
      : urlForImage(post.coverImage).width(1200).height(630).url()
    : null;

  const authorAvatarUrl = post.author?.avatar
    ? typeof post.author.avatar === 'string'
      ? post.author.avatar
      : urlForImage(post.author.avatar).width(120).height(120).url()
    : null;

  const postUrl = `${SITE_URL}/blog/${post.slug}`;

  // Difficulty badge style map
  const difficultyMap: Record<string, { label: string; style: string }> = {
    beginner: {
      label: 'BEGINNER',
      style: 'border-[var(--terminal-green)] text-[var(--terminal-green)] bg-[rgba(0,255,65,0.08)]',
    },
    intermediate: {
      label: 'INTERMEDIATE',
      style: 'border-[var(--terminal-cyan)] text-[var(--terminal-cyan)] bg-[rgba(0,255,255,0.08)]',
    },
    advanced: {
      label: 'ADVANCED',
      style: 'border-[var(--terminal-amber)] text-[var(--terminal-amber)] bg-[rgba(255,107,53,0.08)]',
    },
  };

  const difficultyInfo = post.difficulty ? difficultyMap[post.difficulty] : null;

  // JSON-LD BlogPosting schema
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: postUrl,
    url: postUrl,
    image: coverImageUrl ? [coverImageUrl] : undefined,
    author: {
      '@type': 'Person',
      name: post.author?.name || 'Deepak Thapa',
      url: post.author?.website || SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: 'Deepak Thapa',
      url: SITE_URL,
    },
  };

  return (
    <>
      <JsonLd data={blogPostingSchema} />

      <main className="min-h-screen bg-[var(--terminal-bg)] text-[var(--terminal-text)] py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto crt-screen">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: 'blog', href: '/blog' },
              ...(post.category
                ? [{ label: post.category.title.toLowerCase(), href: `/blog/category/${post.category.slug}` }]
                : []),
              { label: post.title },
            ]}
          />
        </div>

        {/* Series Banner if present */}
        {post.series && (
          <div className="mb-6 px-4 py-3 rounded-xl border border-[var(--terminal-amber)] bg-[rgba(255,107,53,0.08)] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center space-x-2 text-[var(--terminal-amber)]">
              <span className="font-bold uppercase tracking-wider">Series Part {post.series.part}</span>
              <span>•</span>
              <span className="text-[var(--terminal-text)] font-semibold">{post.series.title}</span>
            </div>
            <span className="text-[var(--terminal-text-dim)]">Multi-Part Guide</span>
          </div>
        )}

        {/* Header Metadata Section */}
        <header className="mb-10 rounded-xl border border-[var(--terminal-border)] bg-[var(--terminal-surface)] p-6 md:p-10 shadow-lg">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--terminal-text-dim)] mb-4">
            {post.category && (
              <Link
                href={`/blog/category/${post.category.slug}`}
                className="px-3 py-1 rounded bg-[var(--terminal-surface-2)] border border-[var(--terminal-border)] text-[var(--terminal-green)] font-semibold hover:border-[var(--terminal-green)] transition-colors"
              >
                {post.category.title}
              </Link>
            )}

            {difficultyInfo && (
              <span className={`px-2.5 py-0.5 rounded border text-[10px] font-bold tracking-wider ${difficultyInfo.style}`}>
                {difficultyInfo.label}
              </span>
            )}

            <span className="flex items-center space-x-1">
              <BlogIcon name="CalendarIcon" className="w-4 h-4 text-[var(--terminal-text-faint)]" />
              <span>{formattedDate}</span>
            </span>

            {formattedUpdatedDate && formattedUpdatedDate !== formattedDate && (
              <span className="text-[11px] text-[var(--terminal-text-faint)]">
                (Updated: {formattedUpdatedDate})
              </span>
            )}

            <span>•</span>
            <ReadingTime content={post.content} />
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-mono text-[var(--terminal-green)] glow-green leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-sm md:text-base font-mono text-[var(--terminal-text-dim)] leading-relaxed mb-6 border-l-2 border-[var(--terminal-green-dim)] pl-4 italic">
            {post.description}
          </p>

          {/* Author info & tags */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[var(--terminal-border)]">
            {post.author ? (
              <div className="flex items-center space-x-3">
                {authorAvatarUrl ? (
                  <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[var(--terminal-border)]">
                    <Image src={authorAvatarUrl} alt={post.author.name} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-full bg-[var(--terminal-surface-2)] border border-[var(--terminal-border)] flex items-center justify-center text-[var(--terminal-green)] font-mono font-bold text-xs">
                    {post.author.name.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="text-xs font-mono font-bold text-[var(--terminal-text)]">
                    {post.author.name}
                  </div>
                  {post.author.bio && (
                    <div className="text-[11px] font-mono text-[var(--terminal-text-dim)] line-clamp-1">
                      {post.author.bio}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {post.tags?.map((tag) => (
                  <Link
                    key={tag.slug}
                    href={`/blog/tag/${tag.slug}`}
                    className="text-xs font-mono px-2.5 py-1 rounded bg-[var(--terminal-surface-2)] text-[var(--terminal-text-dim)] hover:text-[var(--terminal-green)] transition-colors border border-[var(--terminal-border)]"
                  >
                    #{tag.title}
                  </Link>
                ))}
              </div>
            )}

            <ShareButtons title={post.title} url={postUrl} />
          </div>
        </header>

        {/* Featured Cover Image if present */}
        {coverImageUrl && (
          <div className="mb-10 relative w-full h-[320px] md:h-[480px] rounded-xl overflow-hidden border border-[var(--terminal-border)] shadow-xl">
            <Image
              src={coverImageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content & Sticky Table of Contents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <div className="rounded-xl border border-[var(--terminal-border)] bg-[var(--terminal-surface)] p-6 md:p-10 shadow">
              <PortableTextRenderer value={post.content} />
            </div>

            {/* FAQ Accordion Section if available */}
            {post.faq && post.faq.length > 0 && (
              <section className="mt-10 rounded-xl border border-[var(--terminal-border)] bg-[var(--terminal-surface)] p-6 md:p-8 shadow">
                <h3 className="text-lg font-mono font-bold text-[var(--terminal-green)] mb-6 flex items-center space-x-2">
                  <BlogIcon name="InformationCircleIcon" className="w-5 h-5" />
                  <span>Frequently Asked Questions</span>
                </h3>
                <div className="space-y-4 font-mono text-sm">
                  {post.faq.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-lg border border-[var(--terminal-border)] bg-[var(--terminal-surface-2)]"
                    >
                      <div className="font-bold text-[var(--terminal-text)] mb-2 flex items-start space-x-2">
                        <span className="text-[var(--terminal-green)] font-bold">Q:</span>
                        <span>{item.question}</span>
                      </div>
                      <div className="text-[var(--terminal-text-dim)] leading-relaxed pl-5">
                        {item.answer}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Author Profile Footer Card */}
            {post.author && (
              <div className="mt-8 p-6 rounded-xl border border-[var(--terminal-border)] bg-[var(--terminal-surface)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  {authorAvatarUrl ? (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[var(--terminal-border)] flex-shrink-0">
                      <Image src={authorAvatarUrl} alt={post.author.name} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[var(--terminal-surface-2)] border border-[var(--terminal-border)] flex items-center justify-center text-[var(--terminal-green)] font-mono font-bold text-sm flex-shrink-0">
                      {post.author.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-mono font-bold text-[var(--terminal-green)]">
                      Written by {post.author.name}
                    </div>
                    {post.author.bio && (
                      <div className="text-xs font-mono text-[var(--terminal-text-dim)] mt-0.5">
                        {post.author.bio}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-xs font-mono">
                  {post.author.github && (
                    <a
                      href={post.author.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded bg-[var(--terminal-surface-2)] border border-[var(--terminal-border)] text-[var(--terminal-text-dim)] hover:text-[var(--terminal-green)] transition-colors"
                    >
                      GitHub
                    </a>
                  )}
                  {post.author.twitter && (
                    <a
                      href={post.author.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded bg-[var(--terminal-surface-2)] border border-[var(--terminal-border)] text-[var(--terminal-text-dim)] hover:text-[var(--terminal-cyan)] transition-colors"
                    >
                      Twitter
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Share Footer */}
            <div className="mt-8 p-6 rounded-xl border border-[var(--terminal-border)] bg-[var(--terminal-surface)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-mono text-[var(--terminal-text-dim)]">
                Enjoyed this article? Share it with fellow developers!
              </div>
              <ShareButtons title={post.title} url={postUrl} />
            </div>

            {/* Previous & Next Article Navigation */}
            {(prevNext.prev || prevNext.next) && (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                {prevNext.prev ? (
                  <Link
                    href={`/blog/${prevNext.prev.slug}`}
                    className="p-4 rounded-xl border border-[var(--terminal-border)] bg-[var(--terminal-surface)] hover:border-[var(--terminal-green)] transition-all group"
                  >
                    <div className="text-[var(--terminal-text-dim)] mb-1 flex items-center space-x-1">
                      <BlogIcon name="ChevronLeftIcon" className="w-3.5 h-3.5" />
                      <span>Previous Article</span>
                    </div>
                    <div className="font-bold text-[var(--terminal-green)] group-hover:underline line-clamp-1">
                      {prevNext.prev.title}
                    </div>
                  </Link>
                ) : (
                  <div></div>
                )}

                {prevNext.next && (
                  <Link
                    href={`/blog/${prevNext.next.slug}`}
                    className="p-4 rounded-xl border border-[var(--terminal-border)] bg-[var(--terminal-surface)] hover:border-[var(--terminal-green)] transition-all text-right group"
                  >
                    <div className="text-[var(--terminal-text-dim)] mb-1 flex items-center justify-end space-x-1">
                      <span>Next Article</span>
                      <BlogIcon name="ChevronRightIcon" className="w-3.5 h-3.5" />
                    </div>
                    <div className="font-bold text-[var(--terminal-green)] group-hover:underline line-clamp-1">
                      {prevNext.next.title}
                    </div>
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Sidebar Table of Contents */}
          <aside className="lg:col-span-4">
            <TOC content={post.content} />
          </aside>
        </div>

        {/* Related Articles Section */}
        <RelatedPosts posts={finalRelatedPosts} />
      </main>
    </>
  );
}
