import { defineField, defineType } from 'sanity';

const YOUTUBE_REGEX = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;

export const youtubeBlockType = defineType({
  name: 'youtubeBlock',
  title: 'YouTube Embed',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'YouTube Video URL',
      type: 'url',
      description: 'Full URL to the YouTube video (e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ)',
      validation: (Rule) =>
        Rule.required()
          .uri({ scheme: ['http', 'https'] })
          .custom((url) => {
            if (!url || YOUTUBE_REGEX.test(url)) {
              return true;
            }
            return 'Must be a valid YouTube URL (youtube.com or youtu.be)';
          }),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional caption or title shown below the embedded video player',
    }),
  ],
  preview: {
    select: {
      url: 'url',
      caption: 'caption',
    },
    prepare({ url, caption }) {
      return {
        title: caption || 'YouTube Video Embed',
        subtitle: url || 'No URL specified',
      };
    },
  },
});
