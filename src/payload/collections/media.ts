import type { CollectionConfig } from 'payload';
import { isAdmin, isChair } from '../access';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    update: isChair,
    create: isChair,
    delete: isAdmin,
  },
  upload: true,
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
};

export default Media;
