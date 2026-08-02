import { client } from '../client';
import { BlogPost, BlogCategory, BlogTag, PrevNextPost } from '@/types/blog';
import {
  postsQuery,
  featuredPostsQuery,
  latestPostsQuery,
  postBySlugQuery,
  categoriesQuery,
  tagsQuery,
  postsByCategoryQuery,
  postsByTagQuery,
  prevNextPostQuery,
  postSlugsQuery,
} from '../queries';

export async function getPosts(): Promise<BlogPost[]> {
  try {
    const posts = await client.fetch<BlogPost[]>(postsQuery, {}, { next: { revalidate: 60 } });
    return posts || [];
  } catch (error) {
    console.error('Error fetching posts from Sanity:', error);
    return [];
  }
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  try {
    const posts = await client.fetch<BlogPost[]>(featuredPostsQuery, {}, { next: { revalidate: 60 } });
    return posts || [];
  } catch (error) {
    console.error('Error fetching featured posts from Sanity:', error);
    return [];
  }
}

export async function getLatestPosts(): Promise<BlogPost[]> {
  try {
    const posts = await client.fetch<BlogPost[]>(latestPostsQuery, {}, { next: { revalidate: 60 } });
    return posts || [];
  } catch (error) {
    console.error('Error fetching latest posts from Sanity:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const post = await client.fetch<BlogPost>(postBySlugQuery, { slug }, { next: { revalidate: 60 } });
    return post || null;
  } catch (error) {
    console.error(`Error fetching post with slug "${slug}" from Sanity:`, error);
    return null;
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const slugs = await client.fetch<string[]>(postSlugsQuery, {}, { next: { revalidate: 60 } });
    return slugs || [];
  } catch (error) {
    console.error('Error fetching post slugs from Sanity:', error);
    return [];
  }
}

export async function getCategories(): Promise<BlogCategory[]> {
  try {
    const categories = await client.fetch<BlogCategory[]>(categoriesQuery, {}, { next: { revalidate: 60 } });
    return categories || [];
  } catch (error) {
    console.error('Error fetching categories from Sanity:', error);
    return [];
  }
}

export async function getTags(): Promise<BlogTag[]> {
  try {
    const tags = await client.fetch<BlogTag[]>(tagsQuery, {}, { next: { revalidate: 60 } });
    return tags || [];
  } catch (error) {
    console.error('Error fetching tags from Sanity:', error);
    return [];
  }
}

export async function getPostsByCategory(slug: string): Promise<BlogPost[]> {
  try {
    const posts = await client.fetch<BlogPost[]>(postsByCategoryQuery, { slug }, { next: { revalidate: 60 } });
    return posts || [];
  } catch (error) {
    console.error(`Error fetching posts for category "${slug}" from Sanity:`, error);
    return [];
  }
}

export async function getPostsByTag(slug: string): Promise<BlogPost[]> {
  try {
    const posts = await client.fetch<BlogPost[]>(postsByTagQuery, { slug }, { next: { revalidate: 60 } });
    return posts || [];
  } catch (error) {
    console.error(`Error fetching posts for tag "${slug}" from Sanity:`, error);
    return [];
  }
}

export async function getPrevAndNextPost(publishedAt: string): Promise<PrevNextPost> {
  try {
    const res = await client.fetch<PrevNextPost>(prevNextPostQuery, { publishedAt }, { next: { revalidate: 60 } });
    return res || { prev: null, next: null };
  } catch (error) {
    console.error('Error fetching prev/next post from Sanity:', error);
    return { prev: null, next: null };
  }
}
