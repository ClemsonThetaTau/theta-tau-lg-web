import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [
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
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'member',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Web Chair',
          value: 'web-chair',
        },
        {
          label: 'Member',
          value: 'member',
        },
      ],
    },
    {
      name: 'major',
      type: 'text',
    },
    {
      name: 'badgeNumber',
      type: 'number',
    },
    {
      name: 'pledgeClass',
      type: 'text',
    },
    {
      name: 'status',
      type: 'select',
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
        {
          label: 'Pledge',
          value: 'pledge',
        },
      ],
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'graduationYear',
      type: 'number',
    },
    {
      name: 'displayEmail',
      type: 'email',
      label: 'Display Email (Public)',
    },
    {
      name: 'profilePicture',
      type: 'relationship',
      relationTo: 'media',
    },
  ],
  access: {
    // Only admins can create new users
    create: ({ req: { user } }) => {
      return user?.role === 'admin'
    },
    // Users can read their own data, web-chairs can read all, admins can read all
    read: ({ req: { user } }) => {
      if (user?.role === 'admin' || user?.role === 'web-chair') {
        return true
      }
      return {
        id: {
          equals: user?.id,
        },
      }
    },
    // Users can update their own data, web-chairs can update all, admins can update all
    update: ({ req: { user } }) => {
      if (user?.role === 'admin' || user?.role === 'web-chair') {
        return true
      }
      return {
        id: {
          equals: user?.id,
        },
      }
    },
    // Only admins can delete users
    delete: ({ req: { user } }) => {
      return user?.role === 'admin'
    },
  },
}