# Blog UI Sanity Schema Update Design

## Overview
This specification details the UI updates required to support the newly added Sanity schemas for the developer blog. The changes expand data fetching, TypeScript definitions, header metadata presentation, custom Portable Text block renderers, and post-content components (author bio, series banner, FAQ section, related posts).

---

## 1. Data Architecture & Queries

### 1.1 Type Definitions (`src/types/blog.ts`)
- **`Author`**:
  - `name`: string
  - `slug`: string
  - `avatar`?: any
  - `bio`?: string
  - `website`?: string
  - `github`?: string
  - `linkedin`?: string
  - `twitter`?: string
- **`Series`**:
  - `title`: string
  - `part`: number
- **`FaqItem`**:
  - `question`: string
  - `answer`: string
- **`BlogPost` Updates**:
  - `author`?: Author
  - `difficulty`?: `'beginner' | 'intermediate' | 'advanced'`
  - `series`?: Series
  - `faq`?: FaqItem[]
  - `readingTime`?: number
  - `updatedAt`?: string
  - `relatedPosts`?: BlogPost[]
  - `seo`?: { metaTitle?: string; metaDescription?: string; keywords?: string[] }

### 1.2 GROQ Queries (`src/sanity/queries.ts`)
- Expand `postFields` to fetch:
  ```groq
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
  ```

---

## 2. Component Updates

### 2.1 Article Detail Page (`src/app/blog/[slug]/page.tsx`)
- **Series Banner**: Display a prominent banner at the top of the post if `series` is present (e.g. `PART 2 OF SERIES: Full-Stack Next.js 16 Mastery`).
- **Header Badges**:
  - Difficulty badge (`BEGINNER`, `INTERMEDIATE`, `ADVANCED`) with terminal-themed color coding.
  - Published & Last Updated dates if `updatedAt` is present.
  - Estimated reading time (from Sanity `readingTime` or calculated fallback).
- **Author Box**:
  - Render an Author card showing avatar, name, bio, and social links (GitHub, Twitter, LinkedIn, Website).
- **FAQ Component**:
  - Render an interactive terminal-styled FAQ accordion or QA list at the bottom of the article.
- **Related Posts**:
  - Render curated `relatedPosts` from Sanity reference (or category fallback).

### 2.2 Portable Text Custom Block Renderers (`src/components/blog/PortableTextRenderer.tsx`)
Support the 9 custom block types:
1. `codeBlock`: Code editor block with filename, language tag, line numbers, line highlighting, and copy button.
2. `terminalBlock`: CRT shell window header with window controls, `$ prompt` formatting for shell commands and outputs.
3. `calloutBlock`: Color-coded alert boxes for `info` (cyan), `warning` (amber), `tip` (green), `danger` (red), `success` (emerald), `bestPractice` (purple).
4. `tableBlock`: Terminal-styled grid table with caption, custom headers, and styled rows.
5. `comparisonBlock`: Side-by-side "Before" vs "After" code comparison cards with labels.
6. `mermaidBlock`: Diagram renderer for process and system charts.
7. `githubBlock`: GitHub repository badge card featuring repo URL, file path, and branch link.
8. `youtubeBlock`: Responsive 16:9 embedded YouTube video player with caption.
9. `fileTreeBlock`: Ascii-style interactive file tree diagram.

---

## 3. Verification Plan
- Run TypeScript compiler `npx tsc --noEmit` to verify type safety.
- Verify page rendering with mock/Sanity data.
