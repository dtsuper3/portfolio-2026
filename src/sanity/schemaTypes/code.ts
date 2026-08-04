import { defineField, defineType } from 'sanity';

export const codeBlockType = defineType({
  name: 'codeBlock',
  title: 'Code Block',
  type: 'object',
  fields: [
    defineField({
      name: 'filename',
      title: 'Filename',
      type: 'string',
      description: 'Optional path or filename (e.g. src/components/Button.tsx)',
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'TypeScript', value: 'typescript' },
          { title: 'JavaScript', value: 'javascript' },
          { title: 'TSX / JSX', value: 'tsx' },
          { title: 'HTML', value: 'html' },
          { title: 'CSS / SCSS', value: 'css' },
          { title: 'Tailwind CSS', value: 'tailwindcss' },
          { title: 'JSON', value: 'json' },
          { title: 'Bash / Shell', value: 'bash' },
          { title: 'Python', value: 'python' },
          { title: 'Rust', value: 'rust' },
          { title: 'Go', value: 'go' },
          { title: 'SQL', value: 'sql' },
          { title: 'GROQ', value: 'groq' },
          { title: 'YAML', value: 'yaml' },
          { title: 'Markdown', value: 'markdown' },
          { title: 'Docker / Dockerfile', value: 'dockerfile' },
          { title: 'GraphQL', value: 'graphql' },
        ],
      },
      initialValue: 'typescript',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'code',
      title: 'Code',
      type: 'text',
      rows: 10,
      validation: (Rule) => Rule.required().error('Code content is required.'),
    }),
    defineField({
      name: 'highlightedLines',
      title: 'Highlighted Lines',
      type: 'string',
      description: 'Specify line numbers to highlight (e.g. "1, 4-7, 12")',
    }),
    defineField({
      name: 'showLineNumbers',
      title: 'Show Line Numbers',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      filename: 'filename',
      language: 'language',
      code: 'code',
    },
    prepare({ filename, language, code }) {
      const codeSnippet = code ? code.trim().split('\n')[0] : '';
      return {
        title: filename || (language ? `Code Block (${language})` : 'Code Block'),
        subtitle: codeSnippet ? (codeSnippet.length > 60 ? `${codeSnippet.slice(0, 60)}...` : codeSnippet) : 'Empty code block',
      };
    },
  },
});
