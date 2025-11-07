import type { CollectionConfig } from 'payload'
import { admins, anyone, loggedIn } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'filename',
    group: 'Chapter Management',
  },
  upload: {
    staticDir: 'public/media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      admin: {
        description: 'Alt text for accessibility',
      },
    },
    {
      name: 'caption',
      type: 'text',
      admin: {
        description: 'Optional caption for the image',
      },
    },
  ],
  access: {
    read: anyone,
    create: loggedIn,
    update: loggedIn,
    delete: admins,
  },
}