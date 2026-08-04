/* eslint-disable @typescript-eslint/no-explicit-any */
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
