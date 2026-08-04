import { defineField, defineType } from 'sanity';

export const githubBlockType = defineType({
  name: 'githubBlock',
  title: 'GitHub Block',
  type: 'object',
  fields: [
    defineField({
      name: 'repoUrl',
      title: 'GitHub Repository URL',
      type: 'url',
      description: 'Link to a GitHub repository (e.g. https://github.com/facebook/react)',
      validation: (Rule) =>
        Rule.uri({ scheme: ['http', 'https'] }).custom((url, context) => {
          const parent = context.parent as { gistUrl?: string } | undefined;
          if (!url && !parent?.gistUrl) {
            return 'Please provide either a GitHub Repository URL or a Gist URL.';
          }
          if (url && !url.includes('github.com')) {
            return 'URL must be a valid github.com domain.';
          }
          return true;
        }),
    }),
    defineField({
      name: 'gistUrl',
      title: 'GitHub Gist URL',
      type: 'url',
      description: 'Link to an embedded GitHub Gist (e.g. https://gist.github.com/username/gistid)',
      validation: (Rule) =>
        Rule.uri({ scheme: ['http', 'https'] }).custom((url, context) => {
          const parent = context.parent as { repoUrl?: string } | undefined;
          if (!url && !parent?.repoUrl) {
            return 'Please provide either a GitHub Repository URL or a Gist URL.';
          }
          if (url && !url.includes('gist.github.com')) {
            return 'Gist URL must be a valid gist.github.com domain.';
          }
          return true;
        }),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional caption or notes for this repository or gist link',
    }),
  ],
  preview: {
    select: {
      repoUrl: 'repoUrl',
      gistUrl: 'gistUrl',
      caption: 'caption',
    },
    prepare({ repoUrl, gistUrl, caption }) {
      const url = repoUrl || gistUrl || '';
      return {
        title: caption || (repoUrl ? 'GitHub Repository' : gistUrl ? 'GitHub Gist' : 'GitHub Link'),
        subtitle: url,
      };
    },
  },
});
