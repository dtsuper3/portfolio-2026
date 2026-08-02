import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, useCdn } from './env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: 'published',
});

// Helper for preview/draft mode queries if token is supplied
export function getClient(previewToken?: string) {
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: previewToken ? false : useCdn,
    perspective: previewToken ? 'previewDrafts' : 'published',
    token: previewToken,
  });
}
