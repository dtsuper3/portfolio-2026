import { defineArrayMember, defineField, defineType } from 'sanity';

export const fileTreeBlockType = defineType({
  name: 'fileTreeBlock',
  title: 'File Tree Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title / Root Folder Name',
      type: 'string',
      initialValue: 'project-root',
      description: 'Header or root folder name (e.g. my-app or /src)',
    }),
    defineField({
      name: 'items',
      title: 'File & Directory Nodes',
      type: 'array',
      validation: (Rule) => Rule.required().min(1).error('At least one file or folder item is required.'),
      of: [
        defineArrayMember({
          name: 'fileNode',
          title: 'File / Folder Node',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              description: 'Filename or directory name (e.g. package.json or components/)',
              validation: (Rule) => Rule.required().error('Name is required.'),
            }),
            defineField({
              name: 'isFolder',
              title: 'Is Directory / Folder?',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'depth',
              title: 'Indentation Level (Depth)',
              type: 'number',
              initialValue: 0,
              description: '0 for root level, 1 for nested level 1, 2 for nested level 2, etc.',
              validation: (Rule) => Rule.min(0).integer(),
            }),
            defineField({
              name: 'comment',
              title: 'Comment / Explanation',
              type: 'string',
              description: 'Optional inline comment explaining this file (e.g. "Main application layout")',
            }),
          ],
          preview: {
            select: {
              name: 'name',
              isFolder: 'isFolder',
              depth: 'depth',
              comment: 'comment',
            },
            prepare({ name, isFolder, depth = 0, comment }) {
              const indent = '  '.repeat(depth);
              const icon = isFolder ? '📁' : '📄';
              return {
                title: `${indent}${icon} ${name || 'Untitled'}`,
                subtitle: comment ? `// ${comment}` : `Depth: ${depth}`,
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      items: 'items',
    },
    prepare({ title, items }) {
      const itemCount = Array.isArray(items) ? items.length : 0;
      return {
        title: title ? `File Tree: ${title}` : 'File Tree Block',
        subtitle: `${itemCount} node${itemCount === 1 ? '' : 's'}`,
      };
    },
  },
});
