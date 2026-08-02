import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { apiVersion, dataset, projectId } from './env';
import { schema } from './schemaTypes';

export default defineConfig({
  basePath: '/studio',
  projectId: projectId || 'your-project-id',
  dataset: dataset || 'production',
  title: 'Developer Blog Studio',
  schema,
  plugins: [
    structureTool(),
  ],
});
