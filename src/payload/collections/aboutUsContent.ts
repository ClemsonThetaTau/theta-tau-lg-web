import type { CollectionConfig } from 'payload';

import { isAdmin, isChair } from '../access';

export const AboutUsContent: CollectionConfig = {
  slug: 'about-us-content',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
  },
  access: {
    read: () => true,
    update: isChair,
    create: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'nationalHistory',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
        },
        {
          name: 'footer',
          type: 'text',
        },
      ],
    },
    {
      name: 'chapterHistory',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'chapterStats',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'stats',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'value',
              type: 'text',
              required: true,
            },
            {
              name: 'icon',
              type: 'text',
              admin: {
                description: 'Icon name from Lucide icons (e.g., "users", "calendar", etc.)',
              },
            },
          ],
        },
      ],
    },
  ],
};

export default AboutUsContent;
