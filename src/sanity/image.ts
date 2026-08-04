import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';
import { dataset, projectId } from './env';

const imageBuilder = imageUrlBuilder({
  projectId: projectId || 'your-project-id',
  dataset: dataset || 'production',
});

export const urlForImage = (source: SanityImageSource) => {
  return imageBuilder.image(source).auto('format').fit('max');
};
