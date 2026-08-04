import { defineField, defineType } from 'sanity';

export const mermaidBlockType = defineType({
  name: 'mermaidBlock',
  title: 'Mermaid Diagram Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Diagram Title / Caption',
      type: 'string',
      description: 'Optional caption describing the diagram',
    }),
    defineField({
      name: 'code',
      title: 'Mermaid Syntax Definition',
      type: 'text',
      rows: 8,
      description: 'Mermaid.js graph/diagram markup (e.g. graph TD; A-->B;)',
      validation: (Rule) => Rule.required().error('Mermaid code definition is required.'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      code: 'code',
    },
    prepare({ title, code }) {
      const snippet = code ? code.trim().split('\n')[0] : '';
      return {
        title: title ? `Mermaid: ${title}` : 'Mermaid Diagram',
        subtitle: snippet ? (snippet.length > 50 ? `${snippet.slice(0, 50)}...` : snippet) : 'Empty diagram',
      };
    },
  },
});
