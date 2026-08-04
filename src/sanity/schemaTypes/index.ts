import { type SchemaTypeDefinition } from 'sanity';

import { postType } from './post';
import { authorType } from './author';
import { categoryType } from './category';
import { tagType } from './tag';
import { seoType } from './seo';
import { faqType } from './faq';
import { codeBlockType } from './code';
import { terminalBlockType } from './terminal';
import { calloutBlockType } from './callout';
import { tableBlockType } from './table';
import { comparisonBlockType } from './comparison';
import { mermaidBlockType } from './mermaid';
import { githubBlockType } from './github';
import { youtubeBlockType } from './youtube';
import { fileTreeBlockType } from './fileTree';

export const schemaTypes: SchemaTypeDefinition[] = [
  // Document Schemas
  postType,
  authorType,
  categoryType,
  tagType,

  // Reusable Object Schemas
  seoType,
  faqType,

  // Portable Text Block Schemas
  codeBlockType,
  terminalBlockType,
  calloutBlockType,
  tableBlockType,
  comparisonBlockType,
  mermaidBlockType,
  githubBlockType,
  youtubeBlockType,
  fileTreeBlockType,
];

export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
};
