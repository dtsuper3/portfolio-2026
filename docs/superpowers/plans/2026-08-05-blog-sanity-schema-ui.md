# Blog UI Sanity Schema Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the developer blog UI components to support newly added Sanity schemas including Author profile, Difficulty level, Series groupings, FAQ items, and 9 custom Portable Text content blocks.

**Architecture:** Extend GROQ queries in `src/sanity/queries.ts`, update TypeScript interfaces in `src/types/blog.ts`, implement rich developer-focused custom block renderers in `src/components/blog/PortableTextRenderer.tsx`, and enhance `src/app/blog/[slug]/page.tsx` header/footer layout.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript 5, Sanity PortableText (`@portabletext/react`), Tailwind CSS, Prism.js.

## Global Constraints
- Terminal / CRT dark-mode aesthetics using CSS variables (`var(--terminal-bg)`, `var(--terminal-surface)`, `var(--terminal-green)`, `var(--terminal-amber)`, `var(--terminal-cyan)`).
- Clean TypeScript types without `any` casts where possible.
- Responsive layout supporting mobile, tablet, and desktop viewports.

---

### Task 1: Update TypeScript Interfaces & Sanity GROQ Queries

**Files:**
- Modify: `src/types/blog.ts`
- Modify: `src/sanity/queries.ts`

**Interfaces:**
- Consumes: Existing `BlogPost`, `BlogCategory`, `BlogTag` interfaces.
- Produces: Updated `BlogPost` with `Author`, `Series`, `FaqItem`, `difficulty`, `readingTime`, `updatedAt`, `relatedPosts`.

- [ ] **Step 1: Update TypeScript definitions in `src/types/blog.ts`**

```typescript
export interface BlogCategory {
  _id?: string;
  title: string;
  slug: string;
  description?: string;
  count?: number;
}

export interface BlogTag {
  _id?: string;
  title: string;
  slug: string;
  count?: number;
}

export interface Author {
  name: string;
  slug: string;
  avatar?: any;
  bio?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
}

export interface Series {
  title: string;
  part: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  description: string;
  coverImage?: any;
  content: any;
  publishedAt: string;
  updatedAt?: string;
  featured?: boolean;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  series?: Series;
  author?: Author;
  faq?: FaqItem[];
  readingTime?: number;
  seoTitle?: string;
  seoDescription?: string;
  category?: BlogCategory;
  tags?: BlogTag[];
  relatedPosts?: BlogPost[];
}

export interface PrevNextPost {
  prev: { title: string; slug: string } | null;
  next: { title: string; slug: string } | null;
}
```

- [ ] **Step 2: Update GROQ queries in `src/sanity/queries.ts`**

Update `postFields` in `src/sanity/queries.ts`:
```typescript
import { groq } from 'next-sanity';

export const postFields = groq`
  _id,
  title,
  "slug": slug.current,
  description,
  coverImage,
  publishedAt,
  updatedAt,
  featured,
  difficulty,
  readingTime,
  series,
  faq,
  seoTitle,
  seoDescription,
  "author": author->{
    name,
    "slug": slug.current,
    avatar,
    bio,
    website,
    github,
    linkedin,
    twitter
  },
  "category": category->{
    title,
    "slug": slug.current
  },
  "tags": tags[]->{
    title,
    "slug": slug.current
  },
  "relatedPosts": relatedPosts[]->{
    _id,
    title,
    "slug": slug.current,
    description,
    coverImage,
    publishedAt,
    readingTime,
    difficulty,
    "category": category->{ title, "slug": slug.current }
  }
`;
```

- [ ] **Step 3: Run type check**

Run: `npx tsc --noEmit`
Expected: PASS with 0 errors.

- [ ] **Step 4: Commit**

```bash
git add src/types/blog.ts src/sanity/queries.ts
git commit -m "feat(blog): update TypeScript definitions and GROQ queries for new Sanity schema"
```

---

### Task 2: Implement Custom Portable Text Block Renderers

**Files:**
- Modify: `src/components/blog/PortableTextRenderer.tsx`

**Interfaces:**
- Consumes: Sanity `content` PortableText array with block types: `codeBlock`, `terminalBlock`, `calloutBlock`, `tableBlock`, `comparisonBlock`, `mermaidBlock`, `githubBlock`, `youtubeBlock`, `fileTreeBlock`.
- Produces: Rendered React components for all 9 block types.

- [ ] **Step 1: Update `PortableTextRenderer.tsx` with all 9 custom Portable Text components**

In `src/components/blog/PortableTextRenderer.tsx`, define handlers for each custom block type (`codeBlock`, `terminalBlock`, `calloutBlock`, `tableBlock`, `comparisonBlock`, `mermaidBlock`, `githubBlock`, `youtubeBlock`, `fileTreeBlock`).

- [ ] **Step 2: Run type check**

Run: `npx tsc --noEmit`
Expected: PASS with 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/blog/PortableTextRenderer.tsx
git commit -m "feat(blog): add custom PortableText renderers for code, terminal, callouts, tables, comparisons, github, youtube, file trees"
```

---

### Task 4: Update Article Detail Page Layout (`src/app/blog/[slug]/page.tsx`)

**Files:**
- Modify: `src/app/blog/[slug]/page.tsx`

**Interfaces:**
- Consumes: `BlogPost` object containing `author`, `difficulty`, `series`, `faq`, `updatedAt`, `relatedPosts`.
- Produces: Updated article detail view with Series Banner, Difficulty badge, Author card, and FAQ list.

- [ ] **Step 1: Update `src/app/blog/[slug]/page.tsx` to render Series Banner, Difficulty badge, Author Card, and FAQ accordion section**

- [ ] **Step 2: Run type check**

Run: `npx tsc --noEmit`
Expected: PASS with 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/blog/[slug]/page.tsx
git commit -m "feat(blog): update article detail page with series banner, difficulty badge, author profile card, and FAQ section"
```

---

### Task 5: Final Build & Type Check Verification

- [ ] **Step 1: Run TypeScript compiler check**

Run: `npx tsc --noEmit`
Expected: Exit code 0 with 0 errors.

- [ ] **Step 2: Run Next.js build check**

Run: `npm run build`
Expected: Successful Next.js production build.
