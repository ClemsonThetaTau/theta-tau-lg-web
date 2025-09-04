import type { CollectionConfig } from 'payload'

export const Officers: CollectionConfig = {
  slug: 'officers',
  admin: {
    useAsTitle: 'positionName',
    defaultColumns: ['positionName', 'user', 'type', 'isActive'],
  },
  fields: [
    {
      name: 'positionName',
      type: 'text',
      required: true,
      admin: {
        description: 'Name of the position (e.g., "Regent", "Vice Regent", "Social Chair")',
      },
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        description: 'User who holds this position',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Executive Committee',
          value: 'ec',
        },
        {
          label: 'Chair Position',
          value: 'chair',
        },
      ],
      admin: {
        description: 'Whether this is an Executive Committee position or a Chair position',
      },
    },
    {
      name: 'ecPosition',
      type: 'select',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'ec',
        description: 'Specific Executive Committee position',
      },
      options: [
        {
          label: 'Regent',
          value: 'regent',
        },
        {
          label: 'Vice Regent',
          value: 'viceRegent',
        },
        {
          label: 'Scribe',
          value: 'scribe',
        },
        {
          label: 'Treasurer',
          value: 'treasurer',
        },
        {
          label: 'Corresponding Secretary',
          value: 'correspondingSecretary',
        },
        {
          label: 'Delegate at Large',
          value: 'delegateAtLarge',
        },
        {
          label: 'New Member Educator',
          value: 'newMemberEducator',
        },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this position assignment is currently active',
      },
    },
    {
      name: 'termStart',
      type: 'date',
      admin: {
        description: 'When this person started in this position',
      },
    },
    {
      name: 'termEnd',
      type: 'date',
      admin: {
        description: 'When this person\'s term ends (optional)',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      admin: {
        description: 'Order for displaying positions (lower numbers first)',
      },
    },
  ],
  access: {
    // Public can read active positions
    read: ({ req: { user } }) => {
      if (user?.role === 'admin' || user?.role === 'web-chair') {
        return true
      }
      return {
        isActive: {
          equals: true,
        },
      }
    },
    // Only web-chairs and admins can manage positions
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