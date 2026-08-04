import { defineField, defineType } from 'sanity';

export const comparisonBlockType = defineType({
  name: 'comparisonBlock',
  title: 'Side-by-Side Comparison',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Comparison Title',
      type: 'string',
      description: 'Overall comparison title (e.g. "npm install vs npm ci")',
      validation: (Rule) => Rule.required().error('Comparison title is required.'),
    }),
    defineField({
      name: 'leftTitle',
      title: 'Left Side Title',
      type: 'string',
      description: 'Title for Option A / Left Side (e.g. "npm install")',
      validation: (Rule) => Rule.required().error('Left side title is required.'),
    }),
    defineField({
      name: 'leftContent',
      title: 'Left Side Content',
      type: 'text',
      rows: 5,
      description: 'Description, pros/cons, or code example for Option A',
      validation: (Rule) => Rule.required().error('Left side content is required.'),
    }),
    defineField({
      name: 'rightTitle',
      title: 'Right Side Title',
      type: 'string',
      description: 'Title for Option B / Right Side (e.g. "npm ci")',
      validation: (Rule) => Rule.required().error('Right side title is required.'),
    }),
    defineField({
      name: 'rightContent',
      title: 'Right Side Content',
      type: 'text',
      rows: 5,
      description: 'Description, pros/cons, or code example for Option B',
      validation: (Rule) => Rule.required().error('Right side content is required.'),
    }),
    defineField({
      name: 'recommendation',
      title: 'Recommendation / Verdict (Optional)',
      type: 'string',
      description: 'Summary verdict (e.g. "Use npm ci in CI/CD environments for reproducible builds")',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      leftTitle: 'leftTitle',
      rightTitle: 'rightTitle',
    },
    prepare({ title, leftTitle, rightTitle }) {
      return {
        title: title || 'Comparison Block',
        subtitle: leftTitle && rightTitle ? `${leftTitle} ⚡ ${rightTitle}` : '',
      };
    },
  },
});
