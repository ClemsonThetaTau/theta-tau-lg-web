import type { CollectionConfig } from 'payload'

export const Officers: CollectionConfig = {
  slug: 'officers',
  admin: {
    useAsTitle: 'positionName',
    defaultColumns: ['positionName', 'user', 'type', 'isActive', 'displayOrder'],
    listSearchableFields: ['positionName'],
    group: 'Chapter Management',
    description: 'Create officers here, then use the CMT Dashboard at /dashboard/settings/web-chair/officers-and-chairs to arrange their order with drag-and-drop.',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'user',
          type: 'relationship',
          relationTo: 'users',
          required: true,
          admin: {
            width: '60%',
            description: 'User who holds this position',
          },
        },
        {
          name: 'isActive',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            width: '40%',
            description: 'Currently active position',
          },
        },
      ],
    },
    
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Executive Committee', value: 'ec' },
        { label: 'Chair Position', value: 'chair' },
      ],
      admin: {
        description: 'Position type',
      },
    },
    
    {
      name: 'positionName',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g., "Regent", "Social Chair", "Webmaster"',
      },
    },
    
    {
      name: 'ecPosition',
      type: 'select',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'ec',
        description: 'Select EC position (for Executive Committee only)',
      },
      options: [
        { label: 'Regent', value: 'regent' },
        { label: 'Vice Regent', value: 'viceRegent' },
        { label: 'Scribe', value: 'scribe' },
        { label: 'Treasurer', value: 'treasurer' },
        { label: 'Corresponding Secretary', value: 'correspondingSecretary' },
        { label: 'Delegate at Large', value: 'delegateAtLarge' },
        { label: 'New Member Educator', value: 'newMemberEducator' },
      ],
    },
    
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Display order - lower numbers appear first. Use the CMT Dashboard for drag-and-drop reordering.',
      },
    },
    
    {
      type: 'collapsible',
      label: 'Term Information',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'termStart',
              type: 'date',
              admin: {
                width: '50%',
                description: 'Term start date',
              },
            },
            {
              name: 'termEnd',
              type: 'date',
              admin: {
                width: '50%',
                description: 'Term end date (optional)',
              },
            },
          ],
        },
      ],
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