import type { CollectionConfig } from 'payload'

export const Blog: CollectionConfig = {
  slug: 'blog',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'status', 'publishedDate'],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly version of the title',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) {
              return value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '')
            }
            if (data?.title) {
              return data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '')
            }
          },
        ],
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        description: 'Author of the blog post',
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
      name: 'publishedDate',
      type: 'date',
      admin: {
        description: 'Date the blog post was/will be published',
      },
    },
    {
      name: 'featuredImage',
      type: 'relationship',
      relationTo: 'media',
      admin: {
        description: 'Featured image for the blog post',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description: 'Short excerpt for blog post previews',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'categories',
      type: 'select',
      hasMany: true,
      options: [
        {
          label: 'Brotherhood',
          value: 'brotherhood',
        },
        {
          label: 'Professional Development',
          value: 'professional',
        },
        {
          label: 'Service',
          value: 'service',
        },
        {
          label: 'Recruitment',
          value: 'recruitment',
        },
        {
          label: 'Alumni',
          value: 'alumni',
        },
        {
          label: 'Events',
          value: 'events',
        },
        {
          label: 'News',
          value: 'news',
        },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
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
            description: 'SEO title (defaults to post title)',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'SEO meta description (defaults to excerpt)',
          },
        },
        {
          name: 'image',
          type: 'relationship',
          relationTo: 'media',
          admin: {
            description: 'SEO preview image (defaults to featured image)',
          },
        },
      ],
    },
  ],
  access: {
    // Admins see all, public only sees published
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') {
        return true
      }
      return {
        status: {
          equals: 'published',
        },
      }
    },
    // Authenticated users can create posts (as drafts)
    create: ({ req: { user } }) => Boolean(user),
    // Authors can update their own posts, admins can update all
    update: ({ req: { user } }) => {
      if (user?.role === 'admin') {
        return true
      }
      return {
        author: {
          equals: user?.id,
        },
      }
    },
    // Only admins can delete posts
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
}

