import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  admin: {
    group: 'Configuration',
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'Theta Tau Lambda Gamma',
    },
    {
      name: 'siteDescription',
      type: 'textarea',
      defaultValue: 'The professional engineering fraternity at Clemson University',
    },
    {
      name: 'logo',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'favicon',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        {
          name: 'facebook',
          type: 'text',
        },
        {
          name: 'instagram',
          type: 'text',
        },
        {
          name: 'twitter',
          type: 'text',
        },
        {
          name: 'linkedin',
          type: 'text',
        },
        {
          name: 'email',
          type: 'email',
        },
      ],
    },
    {
      name: 'navigation',
      type: 'array',
      label: 'Main Navigation',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          required: true,
        },
        {
          name: 'order',
          type: 'number',
        },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      fields: [
        {
          name: 'copyrightText',
          type: 'text',
          defaultValue: '© 2024 Theta Tau Lambda Gamma Chapter. All rights reserved.',
        },
        {
          name: 'additionalLinks',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'link',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'homePage',
      type: 'relationship',
      relationTo: 'pages',
      admin: {
        description: 'Select the page to display as the home page',
      },
    },
    {
      name: 'maintenance',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'message',
          type: 'textarea',
          defaultValue: 'Site is currently under maintenance. Please check back later.',
        },
      ],
    },
  ],
  access: {
    read: () => true,
    update: ({ req: { user } }) => {
      return user?.role === 'admin' || user?.role === 'web-chair'
    },
  },
}

