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
  seoTitle?: string;
  seoDescription?: string;
  category?: BlogCategory;
  tags?: BlogTag[];
  readingTimeMinutes?: number;
}

export interface PrevNextPost {
  prev: { title: string; slug: string } | null;
  next: { title: string; slug: string } | null;
}
