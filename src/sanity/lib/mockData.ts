import { BlogPost, BlogCategory, BlogTag } from '@/types/blog';

export const MOCK_CATEGORIES: BlogCategory[] = [
  { _id: 'cat-1', title: 'Next.js & React', slug: 'nextjs-react', description: 'Deep dives into modern React 19, Server Components, and Next.js App Router.', count: 2 },
  { _id: 'cat-2', title: 'AI & Engineering', slug: 'ai-engineering', description: 'Building autonomous AI agents, LLM integrations, and modern tool calling architectures.', count: 2 },
  { _id: 'cat-3', title: 'CSS & Frontend Aesthetics', slug: 'css-aesthetics', description: 'Designing retro terminal themes, custom animations, and glassmorphism UI.', count: 1 },
];

export const MOCK_TAGS: BlogTag[] = [
  { _id: 'tag-1', title: 'Next.js 15', slug: 'nextjs-15', count: 2 },
  { _id: 'tag-2', title: 'TypeScript', slug: 'typescript', count: 3 },
  { _id: 'tag-3', title: 'Sanity CMS', slug: 'sanity-cms', count: 1 },
  { _id: 'tag-4', title: 'Tailwind CSS', slug: 'tailwind-css', count: 2 },
  { _id: 'tag-5', title: 'Agentic AI', slug: 'agentic-ai', count: 1 },
];

export const MOCK_POSTS: BlogPost[] = [
  {
    _id: 'mock-post-1',
    title: 'Architecting Scalable Next.js 15 Applications with Sanity Headless CMS',
    slug: 'architecting-scalable-nextjs-15-with-sanity-cms',
    description: 'Learn how to integrate Sanity CMS into Next.js 15 App Router using Server Components, Portable Text, custom syntax highlighting, and dynamic ISR revalidation.',
    publishedAt: '2026-08-01T10:00:00.000Z',
    updatedAt: '2026-08-02T12:00:00.000Z',
    featured: true,
    category: MOCK_CATEGORIES[0],
    tags: [MOCK_TAGS[0], MOCK_TAGS[1], MOCK_TAGS[2]],
    seoTitle: 'Next.js 15 & Sanity CMS Integration Guide',
    seoDescription: 'A complete step-by-step guide to integrating Sanity Headless CMS into Next.js 15 with TypeScript and Tailwind CSS.',
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Integrating a headless CMS like Sanity into Next.js 15 offers unprecedented control over content management, editorial workflows, and page load speed.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'Why Sanity CMS and Next.js App Router?',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Sanity CMS provides structured content via Portable Text and powerful querying capabilities using GROQ. Combined with Next.js Server Components, fetching content incurs zero client-side JavaScript overhead.',
          },
        ],
      },
      {
        _type: 'callout',
        type: 'note',
        text: 'PRO TIP: Use gross GROQ queries inside server components to fetch only required fields and minimize payload sizes!',
      },
      {
        _type: 'code',
        language: 'typescript',
        filename: 'src/sanity/client.ts',
        code: `import { createClient } from 'next-sanity';\n\nexport const client = createClient({\n  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,\n  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,\n  apiVersion: '2024-03-01',\n  useCdn: false,\n});`,
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'Summary & Best Practices',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'By separating content schema design from front-end layout rendering, your web application remains scalable, maintainable, and extremely fast.',
          },
        ],
      },
    ],
  },
  {
    _id: 'mock-post-2',
    title: 'Building Autonomous AI Agents with Tool Calling in TypeScript',
    slug: 'building-autonomous-ai-agents-with-tool-calling-typescript',
    description: 'An in-depth guide to developing agentic AI systems that execute real-world tasks, manage state, and solve complex developer workflows using TypeScript.',
    publishedAt: '2026-07-28T14:30:00.000Z',
    featured: false,
    category: MOCK_CATEGORIES[1],
    tags: [MOCK_TAGS[1], MOCK_TAGS[4]],
    seoTitle: 'Autonomous AI Agents with Tool Calling in TypeScript',
    seoDescription: 'Explore how to build autonomous agentic AI software using tool-calling workflows and structured planning in TypeScript.',
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Agentic AI represents a paradigm shift from passive chat models to active execution systems capable of running terminal commands, inspecting file structures, and fixing code bugs autonomously.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'The Loop Architecture',
          },
        ],
      },
      {
        _type: 'code',
        language: 'typescript',
        filename: 'src/agent/loop.ts',
        code: `async function runAgentLoop(prompt: string) {\n  let plan = await createPlan(prompt);\n  while (!plan.isComplete) {\n    const action = await plan.getNextStep();\n    const result = await executeTool(action);\n    plan.updateState(result);\n  }\n  return plan.summary;\n}`,
      },
      {
        _type: 'callout',
        type: 'info',
        text: 'Always enforce strict verification checkpoints and static analysis tests before marking any AI task as complete.',
      },
    ],
  },
  {
    _id: 'mock-post-3',
    title: 'Crafting Retro CRT Hacker Terminal Aesthetics with Tailwind CSS',
    slug: 'crafting-retro-crt-hacker-terminal-aesthetics-tailwind-css',
    description: 'How to build immersive Cyberpunk phosphor green themes, scanlines, flickering text effects, and custom terminal UI components in modern web applications.',
    publishedAt: '2026-07-20T09:15:00.000Z',
    featured: false,
    category: MOCK_CATEGORIES[2],
    tags: [MOCK_TAGS[3]],
    seoTitle: 'Retro CRT Hacker UI Design in Tailwind CSS',
    seoDescription: 'Tutorial on building retro CRT monitor animations, scanlines, and terminal styling using Tailwind CSS.',
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Retro terminal visual designs combine nostalgia with high usability. Using CSS custom variables, phosphor text glow filters, and scanline pseudo-elements brings interfaces to life.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'CSS Scanlines & Phosphor Glow',
          },
        ],
      },
      {
        _type: 'code',
        language: 'css',
        filename: 'src/styles/terminal.css',
        code: `:root {\n  --terminal-green: #00FF41;\n  --crt-glow: 0 0 10px rgba(0, 255, 65, 0.4);\n}\n\n.glow-green {\n  color: var(--terminal-green);\n  text-shadow: var(--crt-glow);\n}`,
      },
    ],
  },
];
