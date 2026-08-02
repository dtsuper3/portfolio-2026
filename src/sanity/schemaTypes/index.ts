import { postType } from './post';
import { categoryType } from './category';
import { tagType } from './tag';

export const schema = {
  types: [postType, categoryType, tagType],
};
