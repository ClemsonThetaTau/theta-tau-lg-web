import type { CollectionConfig } from 'payload'

export const Brothers: CollectionConfig = {
  slug: 'brothers',
  admin: {
    useAsTitle: 'displayName',
    defaultColumns: ['displayName', 'major', 'status', 'updatedAt'],
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      unique: true,
      admin: {
        description: 'Link this brother profile to a user account',
      },
    },
    {
      name: 'displayName',
      type: 'text',
      required: true,
      admin: {
        description: 'Full name as displayed on the website',
      },
    },
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'displayEmail',
      type: 'email',
      admin: {
        description: 'Email displayed on the public website',
      },
    },
    {
      name: 'major',
      type: 'text',
      required: true,
    },
    {
      name: 'profilePicture',
      type: 'relationship',
      relationTo: 'media',
      admin: {
        description: 'Profile picture displayed on the website',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
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
    },
    {
      name: 'displayOrder',
      type: 'number',
      admin: {
        description: 'Order in which this brother appears on the website (lower numbers first)',
      },
    },
    {
      name: 'isPublic',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this brother profile is visible on the public website',
      },
    },
  ],
  access: {
    // Public can read only public brothers
    read: ({ req: { user } }) => {
      if (user?.role === 'admin' || user?.role === 'web-chair') {
        return true
      }
      return {
        isPublic: {
          equals: true,
        },
      }
    },
    // Only web-chairs and admins can create/update/delete
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
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Auto-generate displayName from firstName and lastName
        if (data.firstName && data.lastName) {
          data.displayName = `${data.firstName} ${data.lastName}`
        }
        return data
      },
    ],
  },
}