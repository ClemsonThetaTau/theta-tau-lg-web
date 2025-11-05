import type { CollectionConfig } from 'payload'

export const Officers: CollectionConfig = {
  slug: 'officers',
  admin: {
    useAsTitle: 'positionName',
    defaultColumns: ['positionName', 'user', 'type', 'isActive', 'displayOrder'],
    listSearchableFields: ['positionName'],
    group: 'Chapter Management',
    description: '',
  },
  fields: [
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
      type: 'row',
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            { label: 'Executive Committee', value: 'executive-committee' },
            { label: 'Chair Position', value: 'committee-chair' },
          ],
          admin: {
            width: '50%',
            description: 'Position type',
          },
        },
        {
          name: 'displayOrder',
          type: 'number',
          defaultValue: 0,
          admin: {
            width: '50%',
            description: 'Display order - lower numbers appear first',
          },
        },
      ],
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
        condition: (_, siblingData) => siblingData?.type === 'executive-committee',
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
    
    // Term Information
    {
      type: 'row',
      fields: [
        {
          name: 'termStart',
          type: 'date',
          required: true,
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
            description: 'Term end date (leave empty for current position)',
          },
        },
      ],
    },
    
    // Virtual field to show if active (computed from dates)
    {
      name: 'isActive',
      type: 'checkbox',
      admin: {
        readOnly: true,
        description: 'Auto-computed: position is active if no end date or end date is in the future',
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            // Auto-calculate based on term dates
            const now = new Date()
            const hasStarted = !siblingData.termStart || new Date(siblingData.termStart) <= now
            const hasNotEnded = !siblingData.termEnd || new Date(siblingData.termEnd) >= now
            return hasStarted && hasNotEnded
          },
        ],
      },
    },
  ],
  access: {
    // Public can read, admins can see all
    read: () => true,
    // Only admins can manage positions
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
}