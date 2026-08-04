import { defineArrayMember, defineField, defineType } from 'sanity';

export const tableBlockType = defineType({
  name: 'tableBlock',
  title: 'Table Block',
  type: 'object',
  fields: [
    defineField({
      name: 'caption',
      title: 'Table Caption / Title',
      type: 'string',
      description: 'Optional caption describing the table data',
    }),
    defineField({
      name: 'hasHeaderRow',
      title: 'Treat First Row as Header',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      validation: (Rule) => Rule.required().min(1).error('At least one row is required.'),
      of: [
        defineArrayMember({
          name: 'tableRow',
          title: 'Row',
          type: 'object',
          fields: [
            defineField({
              name: 'cells',
              title: 'Cells',
              type: 'array',
              of: [{ type: 'string' }],
              validation: (Rule) => Rule.required().min(1).error('At least one cell is required per row.'),
            }),
          ],
          preview: {
            select: {
              cells: 'cells',
            },
            prepare({ cells }) {
              return {
                title: Array.isArray(cells) ? cells.join(' | ') : 'Empty Row',
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      caption: 'caption',
      rows: 'rows',
    },
    prepare({ caption, rows }) {
      const rowCount = Array.isArray(rows) ? rows.length : 0;
      return {
        title: caption || 'Data Table',
        subtitle: `${rowCount} row${rowCount === 1 ? '' : 's'}`,
      };
    },
  },
});
