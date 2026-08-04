import { defineArrayMember, defineField, defineType } from 'sanity';

export const seoType = defineType({
  name: 'seo',
  title: 'SEO Settings',
  type: 'object',
  fields: [
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Search engine title (recommended: 50-60 characters)',
      validation: (Rule) =>
        Rule.max(60).warning('SEO title should be 60 characters or less for optimal display.'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      description: 'Meta description for search results & social previews (recommended: 50-160 characters)',
      validation: (Rule) =>
        Rule.max(160).warning('SEO description should be 160 characters or less.'),
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        layout: 'tags',
      },
      description: 'Keywords for search engine indexing',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'The preferred URL if this page content exists elsewhere',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Custom social sharing card image (1200x630 recommended)',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) =>
            Rule.custom((alt, context) => {
              const parent = context.parent as { asset?: unknown } | undefined;
              if (parent?.asset && !alt) {
                return 'Alt text is required when an OG image is uploaded.';
              }
              return true;
            }),
        }),
      ],
    }),
    defineField({
      name: 'noIndex',
      title: 'NoIndex (Hide from Search Engines)',
      type: 'boolean',
      description: 'Instruct search engine bots not to index this page',
      initialValue: false,
    }),
  ],
});
