import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'The title of the page',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL path for the page (e.g., "about-us", "brothers")',
      },
      hooks: {
        beforeValidate: [
          ({ value }) => {
            if (value) {
              return value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '')
            }
          },
        ],
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
        {
          label: 'Archived',
          value: 'archived',
        },
      ],
    },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      blocks: [
        {
          slug: 'hero',
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
            },
            {
              name: 'subheading',
              type: 'text',
            },
            {
              name: 'backgroundImage',
              type: 'relationship',
              relationTo: 'media',
            },
            {
              name: 'ctaText',
              type: 'text',
              label: 'CTA Button Text',
            },
            {
              name: 'ctaLink',
              type: 'text',
              label: 'CTA Button Link',
            },
          ],
        },
        {
          slug: 'content',
          fields: [
            {
              name: 'richText',
              type: 'richText',
              required: true,
            },
          ],
        },
        {
          slug: 'imageGallery',
          fields: [
            {
              name: 'title',
              type: 'text',
            },
            {
              name: 'images',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  type: 'relationship',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'caption',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          slug: 'brothersDisplay',
          fields: [
            {
              name: 'heading',
              type: 'text',
              defaultValue: 'Meet the Brothers',
            },
            {
              name: 'filterByStatus',
              type: 'select',
              hasMany: true,
              options: [
                {
                  label: 'Active',
                  value: 'active',
                },
                {
                  label: 'Alumni',
                  value: 'alumni',
                },
                {
                  label: 'Inactive',
                  value: 'inactive',
                },
              ],
              defaultValue: ['active'],
            },
          ],
        },
        {
          slug: 'officersDisplay',
          fields: [
            {
              name: 'heading',
              type: 'text',
              defaultValue: 'Officers and Chairs',
            },
            {
              name: 'showExecutiveCommittee',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'showChairs',
              type: 'checkbox',
              defaultValue: true,
            },
          ],
        },
        {
          slug: 'twoColumn',
          fields: [
            {
              name: 'leftColumn',
              type: 'richText',
              required: true,
            },
            {
              name: 'rightColumn',
              type: 'richText',
              required: true,
            },
          ],
        },
        {
          slug: 'callToAction',
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'buttons',
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
                {
                  name: 'style',
                  type: 'select',
                  options: [
                    {
                      label: 'Primary',
                      value: 'primary',
                    },
                    {
                      label: 'Secondary',
                      value: 'secondary',
                    },
                    {
                      label: 'Outline',
                      value: 'outline',
                    },
                  ],
                  defaultValue: 'primary',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          admin: {
            description: 'SEO title (defaults to page title)',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'SEO meta description',
          },
        },
        {
          name: 'image',
          type: 'relationship',
          relationTo: 'media',
          admin: {
            description: 'SEO preview image',
          },
        },
      ],
    },
  ],
  access: {
    // Public can read published pages
    read: ({ req: { user } }) => {
      if (user?.role === 'admin' || user?.role === 'web-chair') {
        return true
      }
      return {
        status: {
          equals: 'published',
        },
      }
    },
    // Only web-chairs and admins can manage pages
    create: ({ req: { user } }) => {
      return user?.role === 'admin' || user?.role === 'web-chair'
    },
    update: ({ req: { user } }) => {
      return user?.role === 'admin' || user?.role === 'web-chair'
    },
    delete: ({ req: { user } }) => {
      return user?.role === 'admin' || user?.role === 'web-chair'
    },
  },
}

