import { defineField, defineType } from 'sanity';

export const faqType = defineType({
  name: 'faq',
  title: 'FAQ Item',
  type: 'object',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required().error('Question is required.'),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().error('Answer is required.'),
    }),
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'answer',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled Question',
        subtitle: subtitle ? (subtitle.length > 80 ? `${subtitle.slice(0, 80)}...` : subtitle) : '',
      };
    },
  },
});
