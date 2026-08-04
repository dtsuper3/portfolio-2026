import { defineArrayMember, defineField, defineType } from 'sanity';

export const postType = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().error('Post title is required.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Post slug is required.'),
    }),
    defineField({
      name: 'description',
      title: 'Short Description / Excerpt',
      type: 'text',
      rows: 3,
      description: 'A concise summary of the article for blog feeds & cards',
      validation: (Rule) =>
        Rule.max(300).warning('Short description should be under 300 characters for optimal display.'),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Accessibility text describing the image',
          validation: (Rule) =>
            Rule.custom((alt, context) => {
              const parent = context.parent as { asset?: unknown } | undefined;
              if (parent?.asset && !alt) {
                return 'Alt text is required when a cover image is uploaded.';
              }
              return true;
            }),
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
          description: 'Optional image caption / attribution',
        }),
      ],
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule) => Rule.required().error('An author is required.'),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'tag' }] })],
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
        ],
        layout: 'radio',
      },
      initialValue: 'intermediate',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      description: 'Highlight this article as a featured post on the blog homepage',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required().error('Published date is required.'),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated Date',
      type: 'datetime',
      description: 'Date when the content was last meaningfully revised or updated',
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time (Minutes)',
      type: 'number',
      description: 'Estimated reading time in minutes',
      validation: (Rule) => Rule.min(1).integer(),
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'post' }],
        }),
      ],
      validation: (Rule) =>
        Rule.max(4)
          .unique()
          .custom((relatedPosts, context) => {
            const documentId = context.document?._id?.replace(/^drafts\./, '');
            if (Array.isArray(relatedPosts) && documentId) {
              const matchesSelf = relatedPosts.some(
                (ref: unknown) =>
                  typeof ref === 'object' &&
                  ref !== null &&
                  '_ref' in ref &&
                  (ref._ref === documentId || ref._ref === `drafts.${documentId}`)
              );
              if (matchesSelf) {
                return 'A post cannot reference itself as a related post.';
              }
            }
            return true;
          }),
    }),
    defineField({
      name: 'series',
      title: 'Post Series (Optional)',
      type: 'object',
      description: 'Group this article into a multi-part series',
      fields: [
        defineField({
          name: 'title',
          title: 'Series Title',
          type: 'string',
          description: 'Name of the series (e.g. "Full-Stack Next.js 16 Mastery")',
        }),
        defineField({
          name: 'part',
          title: 'Part Number',
          type: 'number',
          description: 'Position in the series (e.g. 1, 2, 3)',
          validation: (Rule) => Rule.min(1).integer(),
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
      description: 'Custom search engine optimization and social metadata',
    }),
    defineField({
      name: 'faq',
      title: 'Frequently Asked Questions (FAQ)',
      type: 'array',
      of: [defineArrayMember({ type: 'faq' })],
      description: 'FAQ items for structured data and reader quick reference',
    }),
    defineField({
      name: 'content',
      title: 'Content (Portable Text)',
      type: 'array',
      of: [
        // Standard Text & Block Elements
        defineArrayMember({
          name: 'block',
          title: 'Block',
          type: 'block',
          styles: [
            { title: 'Paragraph', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet List', value: 'bullet' },
            { title: 'Numbered List', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Underline', value: 'underline' },
              { title: 'Strike', value: 'strike-through' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'URL Link',
                fields: [
                  defineField({
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.required().uri({
                        scheme: ['http', 'https', 'mailto', 'tel'],
                        allowRelative: true,
                      }),
                  }),
                  defineField({
                    name: 'blank',
                    title: 'Open in new tab',
                    type: 'boolean',
                    initialValue: true,
                  }),
                ],
              },
            ],
          },
        }),

        // Inline / Content Image Block
        defineArrayMember({
          name: 'inlineImage',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Accessibility text describing the image',
              validation: (Rule) =>
                Rule.custom((alt, context) => {
                  const parent = context.parent as { asset?: unknown } | undefined;
                  if (parent?.asset && !alt) {
                    return 'Alt text is required when an inline image is uploaded.';
                  }
                  return true;
                }),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Caption shown beneath the image',
            }),
          ],
        }),

        // Custom Developer Portable Text Blocks
        defineArrayMember({ type: 'codeBlock' }),
        defineArrayMember({ type: 'terminalBlock' }),
        defineArrayMember({ type: 'calloutBlock' }),
        defineArrayMember({ type: 'tableBlock' }),
        defineArrayMember({ type: 'comparisonBlock' }),
        defineArrayMember({ type: 'mermaidBlock' }),
        defineArrayMember({ type: 'githubBlock' }),
        defineArrayMember({ type: 'youtubeBlock' }),
        defineArrayMember({ type: 'fileTreeBlock' }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      authorName: 'author.name',
      categoryTitle: 'category.title',
      media: 'coverImage',
      publishedAt: 'publishedAt',
    },
    prepare({ title, authorName, categoryTitle, media, publishedAt }) {
      const dateStr = publishedAt ? new Date(publishedAt).toLocaleDateString() : 'Draft';
      const meta = [categoryTitle, authorName, dateStr].filter(Boolean).join(' • ');
      return {
        title: title || 'Untitled Post',
        subtitle: meta,
        media,
      };
    },
  },
});
