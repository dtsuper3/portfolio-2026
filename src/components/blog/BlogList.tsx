'use client';

import React, { useState, useMemo } from 'react';
import { BlogPost, BlogCategory, BlogTag } from '@/types/blog';
import BlogCard from './BlogCard';
import FeaturedPost from './FeaturedPost';
import { BlogIcon } from './BlogIcon';

interface BlogListProps {
  initialPosts: BlogPost[];
  categories: BlogCategory[];
  tags: BlogTag[];
  featuredPost?: BlogPost;
  postsPerPage?: number;
}

export default function BlogList({
  initialPosts,
  categories,
  tags,
  featuredPost,
  postsPerPage = 6,
}: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      // Exclude featured post if displayed in hero section and no filter active
      if (featuredPost && post._id === featuredPost._id && !searchQuery && !selectedCategory && !selectedTag) {
        return false;
      }

      // Search matching (title, description, tags, category)
      const matchesSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some((t) => t.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        post.category?.title.toLowerCase().includes(searchQuery.toLowerCase());

      // Category matching
      const matchesCategory =
        !selectedCategory || post.category?.slug === selectedCategory;

      // Tag matching
      const matchesTag =
        !selectedTag || post.tags?.some((t) => t.slug === selectedTag);

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [initialPosts, featuredPost, searchQuery, selectedCategory, selectedTag]);

  // Reset page when filter changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleCategorySelect = (slug: string | null) => {
    setSelectedCategory(slug === selectedCategory ? null : slug);
    setCurrentPage(1);
  };

  const handleTagSelect = (slug: string | null) => {
    setSelectedTag(slug === selectedTag ? null : slug);
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedTag(null);
    setCurrentPage(1);
  };

  // Pagination calculation
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(start, start + postsPerPage);
  }, [filteredPosts, currentPage, postsPerPage]);

  return (
    <div className="space-y-8">
      {/* Featured post section (only when no filters applied) */}
      {featuredPost && !searchQuery && !selectedCategory && !selectedTag && (
        <FeaturedPost post={featuredPost} />
      )}

      {/* Filter and Search Controls Bar */}
      <div className="rounded-xl border border-[var(--terminal-border)] bg-[var(--terminal-surface)] p-5 space-y-4 shadow">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <BlogIcon
              name="MagnifyingGlassIcon"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--terminal-text-dim)]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search posts by title, tag, or content..."
              className="w-full pl-10 pr-4 py-2.5 bg-[var(--terminal-surface-2)] border border-[var(--terminal-border)] rounded-lg font-mono text-xs md:text-sm text-[var(--terminal-green)] placeholder-[var(--terminal-text-faint)] outline-none focus:border-[var(--terminal-green)] transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[var(--terminal-text-dim)] hover:text-[var(--terminal-green)]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Active Filter Clear button */}
          {(selectedCategory || selectedTag || searchQuery) && (
            <button
              onClick={clearAllFilters}
              className="self-start md:self-auto flex items-center space-x-1.5 px-3 py-2 text-xs font-mono rounded border border-red-500/40 text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <BlogIcon name="XMarkIcon" className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Categories Bar */}
        {categories.length > 0 && (
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 pt-2">
            <span className="text-xs font-mono text-[var(--terminal-text-dim)] shrink-0 flex items-center gap-1">
              <BlogIcon name="FolderIcon" className="w-3.5 h-3.5 text-[var(--terminal-green)]" />
              Categories:
            </span>
            <button
              onClick={() => handleCategorySelect(null)}
              className={`px-3 py-1 rounded text-xs font-mono transition-all shrink-0 border ${
                selectedCategory === null
                  ? 'bg-[var(--terminal-green)] text-[var(--terminal-bg)] font-bold border-[var(--terminal-green)]'
                  : 'bg-[var(--terminal-surface-2)] text-[var(--terminal-text-dim)] border-[var(--terminal-border)] hover:border-[var(--terminal-green-dim)] hover:text-[var(--terminal-green)]'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleCategorySelect(cat.slug)}
                className={`px-3 py-1 rounded text-xs font-mono transition-all shrink-0 border ${
                  selectedCategory === cat.slug
                    ? 'bg-[var(--terminal-green)] text-[var(--terminal-bg)] font-bold border-[var(--terminal-green)]'
                    : 'bg-[var(--terminal-surface-2)] text-[var(--terminal-text-dim)] border-[var(--terminal-border)] hover:border-[var(--terminal-green-dim)] hover:text-[var(--terminal-green)]'
                }`}
              >
                {cat.title} {cat.count !== undefined && `(${cat.count})`}
              </button>
            ))}
          </div>
        )}

        {/* Tags Bar */}
        {tags.length > 0 && (
          <div className="flex items-center space-x-2 overflow-x-auto pb-1">
            <span className="text-xs font-mono text-[var(--terminal-text-dim)] shrink-0 flex items-center gap-1">
              <BlogIcon name="TagIcon" className="w-3.5 h-3.5 text-[var(--terminal-amber)]" />
              Tags:
            </span>
            {tags.map((tag) => (
              <button
                key={tag.slug}
                onClick={() => handleTagSelect(tag.slug)}
                className={`px-2.5 py-0.5 rounded text-[11px] font-mono transition-all shrink-0 border ${
                  selectedTag === tag.slug
                    ? 'bg-[var(--terminal-amber)] text-[var(--terminal-bg)] font-bold border-[var(--terminal-amber)]'
                    : 'bg-[var(--terminal-surface-2)] text-[var(--terminal-text-dim)] border-[var(--terminal-border)] hover:border-[var(--terminal-amber)] hover:text-[var(--terminal-amber)]'
                }`}
              >
                #{tag.title}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid of Posts */}
      {paginatedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedPosts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center rounded-xl border border-[var(--terminal-border)] bg-[var(--terminal-surface)] p-8">
          <BlogIcon name="ExclamationTriangleIcon" className="w-12 h-12 text-[var(--terminal-amber)] mx-auto mb-4 opacity-80" />
          <h3 className="text-lg font-mono font-bold text-[var(--terminal-text)] mb-2">
            No matching articles found
          </h3>
          <p className="text-xs font-mono text-[var(--terminal-text-dim)] max-w-md mx-auto mb-6">
            Try adjusting your search terms or clearing selected categories and tag filters.
          </p>
          <button
            onClick={clearAllFilters}
            className="px-4 py-2 text-xs font-mono font-bold bg-[var(--terminal-green)] text-[var(--terminal-bg)] rounded hover:bg-[var(--terminal-green-dim)] transition-colors shadow"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-6 border-t border-[var(--terminal-border)] font-mono text-xs text-[var(--terminal-text-dim)]">
          <div>
            Showing Page <span className="text-[var(--terminal-green)] font-bold">{currentPage}</span> of{' '}
            <span className="text-[var(--terminal-green)] font-bold">{totalPages}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3.5 py-1.5 rounded border border-[var(--terminal-border)] bg-[var(--terminal-surface)] hover:border-[var(--terminal-green)] hover:text-[var(--terminal-green)] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1"
            >
              <BlogIcon name="ChevronLeftIcon" className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3.5 py-1.5 rounded border border-[var(--terminal-border)] bg-[var(--terminal-surface)] hover:border-[var(--terminal-green)] hover:text-[var(--terminal-green)] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1"
            >
              <span>Next</span>
              <BlogIcon name="ChevronRightIcon" className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
