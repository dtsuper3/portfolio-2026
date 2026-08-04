import { defineField, defineType } from 'sanity';

export const calloutBlockType = defineType({
  name: 'calloutBlock',
  title: 'Callout Box',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Callout Type',
      type: 'string',
      options: {
        list: [
          { title: 'Info (Blue)', value: 'info' },
          { title: 'Tip (Green)', value: 'tip' },
          { title: 'Warning (Amber)', value: 'warning' },
          { title: 'Success (Emerald)', value: 'success' },
          { title: 'Danger (Red)', value: 'danger' },
          { title: 'Best Practice (Purple)', value: 'bestPractice' },
        ],
      },
      initialValue: 'info',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title (Optional)',
      type: 'string',
      description: 'Optional custom callout title',
    }),
    defineField({
      name: 'text',
      title: 'Callout Text',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().error('Callout text is required.'),
    }),
  ],
  preview: {
    select: {
      type: 'type',
      title: 'title',
      text: 'text',
    },
    prepare({ type, title, text }) {
      const typeLabel = (type || 'info').toUpperCase();
      const snippet = text ? (text.length > 50 ? `${text.slice(0, 50)}...` : text) : '';
      return {
        title: title ? `Callout [${typeLabel}]: ${title}` : `Callout [${typeLabel}]`,
        subtitle: snippet,
      };
    },
  },
});
