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

export const postsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    ${postFields}
  }
`;

export const featuredPostsQuery = groq`
  *[_type == "post" && defined(slug.current) && featured == true] | order(publishedAt desc) {
    ${postFields}
  }
`;

export const latestPostsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...3] {
    ${postFields}
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ${postFields},
    content
  }
`;

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;

export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "count": count(*[_type == "post" && references(^._id)])
  }
`;

export const tagsQuery = groq`
  *[_type == "tag"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    "count": count(*[_type == "post" && references(^._id)])
  }
`;

export const postsByCategoryQuery = groq`
  *[_type == "post" && defined(slug.current) && category->slug.current == $slug] | order(publishedAt desc) {
    ${postFields}
  }
`;

export const postsByTagQuery = groq`
  *[_type == "post" && defined(slug.current) && $slug in tags[]->slug.current] | order(publishedAt desc) {
    ${postFields}
  }
`;

export const prevNextPostQuery = groq`
  {
    "prev": *[_type == "post" && defined(slug.current) && publishedAt < $publishedAt] | order(publishedAt desc)[0] {
      title,
      "slug": slug.current
    },
    "next": *[_type == "post" && defined(slug.current) && publishedAt > $publishedAt] | order(publishedAt asc)[0] {
      title,
      "slug": slug.current
    }
  }
`;
