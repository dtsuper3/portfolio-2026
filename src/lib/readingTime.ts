/**
 * Calculates estimated reading time in minutes from Portable Text content or raw text
 */
export function calculateReadingTime(content: any): number {
  if (!content) return 1;

  let fullText = '';

  if (typeof content === 'string') {
    fullText = content;
  } else if (Array.isArray(content)) {
    content.forEach((block) => {
      if (block._type === 'block' && block.children) {
        block.children.forEach((child: any) => {
          if (child.text) fullText += child.text + ' ';
        });
      } else if (block._type === 'code' && block.code) {
        fullText += block.code + ' ';
      }
    });
  }

  const words = fullText.trim().split(/\s+/).filter(Boolean).length;
  const wordsPerMinute = 200;
  const minutes = Math.ceil(words / wordsPerMinute);
  return Math.max(1, minutes);
}
