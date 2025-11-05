import type { CollectionConfig } from 'payload'
import { admins, adminsOrPublished } from '../access'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'showInNav', 'updatedAt'],
    group: 'Chapter Management',
    livePreview: {
      url: ({ data }) => {
        return `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/${data.slug}`
      },
    },
    preview: (doc) => {
      return `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/${doc.slug}`
    },
  },
  versions: {
    drafts: {
      autosave: {
        interval: 375, // Auto-save every 375ms for real-time feel
      },
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // CONTENT TAB
        {
          label: 'Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                description: 'Page title - shown in browser tab and navigation',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'slug',
                  type: 'text',
                  required: true,
                  unique: true,
                  index: true,
                  admin: {
                    width: '70%',
                    description: 'URL path (auto-generates from title)',
                  },
                  hooks: {
                    beforeValidate: [
                      ({ value, data, operation }) => {
                        if (operation === 'create' && !value && data?.title) {
                          return data.title
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/^-+|-+$/g, '')
                        }
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
                    { label: '📝 Draft', value: 'draft' },
                    { label: '✅ Published', value: 'published' },
                    { label: '📦 Archived', value: 'archived' },
                  ],
                  admin: {
                    width: '30%',
                  },
                },
              ],
            },
            {
              name: 'layout',
              type: 'blocks',
              required: true,
              minRows: 1,
              labels: {
                singular: 'Content Block',
                plural: 'Content Blocks',
              },
              admin: {
                initCollapsed: false,
                description: 'Build your page by adding content blocks',
              },
              blocks: [
                // HERO BLOCK
                {
                  slug: 'hero',
                  labels: {
                    singular: 'Hero Section',
                    plural: 'Hero Sections',
                  },
                  fields: [
                    {
                      name: 'heading',
                      type: 'text',
                      required: true,
                      admin: {
                        placeholder: 'Welcome to Theta Tau',
                      },
                    },
                    {
                      name: 'subheading',
                      type: 'textarea',
                      admin: {
                        placeholder: 'Professional Engineering Fraternity',
                      },
                    },
                    {
                      name: 'backgroundImage',
                      type: 'upload',
                      relationTo: 'media',
                      admin: {
                        description: 'Background image for the hero section',
                      },
                    },
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'ctaText',
                          type: 'text',
                          label: 'Button Text',
                          admin: {
                            width: '50%',
                            placeholder: 'Learn More',
                          },
                        },
                        {
                          name: 'ctaLink',
                          type: 'text',
                          label: 'Button Link',
                          admin: {
                            width: '50%',
                            placeholder: '/about-us',
                          },
                        },
                      ],
                    },
                  ],
                },
                
                // RICH TEXT BLOCK
                {
                  slug: 'content',
                  labels: {
                    singular: 'Rich Text',
                    plural: 'Rich Text Blocks',
                  },
                  fields: [
                    {
                      name: 'richText',
                      type: 'richText',
                      required: true,
                    },
                  ],
                },
                
                // IMAGE GALLERY
                {
                  slug: 'imageGallery',
                  labels: {
                    singular: 'Image Gallery',
                    plural: 'Image Galleries',
                  },
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      admin: {
                        placeholder: 'Gallery Title (optional)',
                      },
                    },
                    {
                      name: 'images',
                      type: 'array',
                      minRows: 1,
                      fields: [
                        {
                          name: 'image',
                          type: 'upload',
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
                
                // BROTHERS DISPLAY
                {
                  slug: 'brothersDisplay',
                  labels: {
                    singular: 'Brothers Grid',
                    plural: 'Brothers Grids',
                  },
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
                        { label: 'Active', value: 'active' },
                        { label: 'Alumni', value: 'alumni' },
                        { label: 'Pledge', value: 'pledge' },
                      ],
                      defaultValue: ['active'],
                      admin: {
                        description: 'Which members to display',
                      },
                    },
                  ],
                },
                
                // OFFICERS DISPLAY
                {
                  slug: 'officersDisplay',
                  labels: {
                    singular: 'Officers & Chairs',
                    plural: 'Officers & Chairs',
                  },
                  fields: [
                    {
                      name: 'heading',
                      type: 'text',
                      defaultValue: 'Chapter Leadership',
                    },
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'showExecutiveCommittee',
                          type: 'checkbox',
                          defaultValue: true,
                          admin: {
                            width: '50%',
                          },
                        },
                        {
                          name: 'showChairs',
                          type: 'checkbox',
                          defaultValue: true,
                          admin: {
                            width: '50%',
                          },
                        },
                      ],
                    },
                  ],
                },
                
                // TWO COLUMN LAYOUT
                {
                  slug: 'twoColumn',
                  labels: {
                    singular: 'Two Columns',
                    plural: 'Two Column Layouts',
                  },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'leftColumn',
                          type: 'richText',
                          required: true,
                          admin: {
                            width: '50%',
                          },
                        },
                        {
                          name: 'rightColumn',
                          type: 'richText',
                          required: true,
                          admin: {
                            width: '50%',
                          },
                        },
                      ],
                    },
                  ],
                },
                
                // CALL TO ACTION
                {
                  slug: 'callToAction',
                  labels: {
                    singular: 'Call to Action',
                    plural: 'Call to Actions',
                  },
                  fields: [
                    {
                      name: 'heading',
                      type: 'text',
                      required: true,
                      admin: {
                        placeholder: 'Ready to Join?',
                      },
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      admin: {
                        placeholder: 'Learn more about recruitment and how to become a member',
                      },
                    },
                    {
                      name: 'buttons',
                      type: 'array',
                      maxRows: 3,
                      fields: [
                        {
                          type: 'row',
                          fields: [
                            {
                              name: 'label',
                              type: 'text',
                              required: true,
                              admin: {
                                width: '40%',
                              },
                            },
                            {
                              name: 'link',
                              type: 'text',
                              required: true,
                              admin: {
                                width: '40%',
                              },
                            },
                            {
                              name: 'style',
                              type: 'select',
                              options: [
                                { label: 'Primary', value: 'primary' },
                                { label: 'Secondary', value: 'secondary' },
                                { label: 'Outline', value: 'outline' },
                              ],
                              defaultValue: 'primary',
                              admin: {
                                width: '20%',
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        
        // SETTINGS TAB
        {
          label: 'Settings',
          fields: [
            {
              name: 'showInNav',
              type: 'checkbox',
              defaultValue: true,
              label: 'Show in Navigation',
              admin: {
                description: 'Display this page in the main navigation menu',
              },
            },
            {
              name: 'navOrder',
              type: 'number',
              admin: {
                description: 'Order in navigation menu (lower = first)',
                condition: (data) => data.showInNav === true,
              },
            },
            {
              name: 'navLabel',
              type: 'text',
              admin: {
                description: 'Custom label for navigation (defaults to page title)',
                placeholder: 'Leave blank to use page title',
                condition: (data) => data.showInNav === true,
              },
            },
          ],
        },
        
        // SEO TAB
        {
          label: 'SEO',
          fields: [
            {
              name: 'seo',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  admin: {
                    description: 'SEO title (defaults to page title if empty)',
                    placeholder: 'Leave blank to use page title',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  admin: {
                    description: 'Meta description for search engines (150-160 characters recommended)',
                  },
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Social media preview image',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  access: {
    read: adminsOrPublished,
    create: admins,
    update: admins,
    delete: admins,
  },
}
