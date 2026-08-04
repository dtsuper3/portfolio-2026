import { defineField, defineType } from 'sanity';

export const terminalBlockType = defineType({
  name: 'terminalBlock',
  title: 'Terminal Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Terminal Window Title',
      type: 'string',
      initialValue: 'Terminal',
      description: 'Header text for the terminal window bar (e.g. bash, zsh, pnpm dev)',
    }),
    defineField({
      name: 'command',
      title: 'Command / Output',
      type: 'text',
      rows: 6,
      description: 'Commands and output to render inside terminal (lines starting with $ will render as prompts)',
      validation: (Rule) => Rule.required().error('Terminal command/output text is required.'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      command: 'command',
    },
    prepare({ title, command }) {
      const snippet = command ? command.trim().split('\n')[0] : '';
      return {
        title: title ? `Terminal: ${title}` : 'Terminal Block',
        subtitle: snippet ? (snippet.length > 60 ? `${snippet.slice(0, 60)}...` : snippet) : 'Empty terminal block',
      };
    },
  },
});
