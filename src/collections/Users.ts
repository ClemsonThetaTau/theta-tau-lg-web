import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['firstName', 'lastName', 'status', 'role'],
  },
  fields: [
    // Profile Picture at the top
    {
      name: 'profilePicture',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Profile picture displayed on the website',
      },
    },
    
    // Basic Information
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'lastName',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    
    // Contact Information
    {
      type: 'collapsible',
      label: 'Contact Information',
      fields: [
        {
          name: 'displayEmail',
          type: 'email',
          label: 'Public Display Email',
          admin: {
            description: 'Email shown on the public website (optional)',
          },
        },
        {
          name: 'phone',
          type: 'text',
          admin: {
            description: 'Phone number for internal directory',
          },
        },
      ],
    },
    
    // Chapter Information
    {
      type: 'collapsible',
      label: 'Chapter Information',
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'status',
              type: 'select',
              required: true,
              defaultValue: 'active',
              options: [
                { label: 'Active', value: 'active' },
                { label: 'Alumni', value: 'alumni' },
                { label: 'Inactive', value: 'inactive' },
                { label: 'Pledge', value: 'pledge' },
                { label: 'PNM (Potential New Member)', value: 'pnm' },
              ],
              admin: {
                width: '50%',
                description: 'Current membership status',
              },
            },
            {
              name: 'badgeNumber',
              type: 'number',
              admin: {
                width: '50%',
                description: 'National badge number',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'pledgeClass',
              type: 'text',
              admin: {
                width: '50%',
                description: 'e.g., "Alpha", "Beta", "Spring 2024"',
              },
            },
            {
              name: 'initiationDate',
              type: 'date',
              admin: {
                width: '50%',
                description: 'Date of initiation into the chapter',
              },
            },
          ],
        },
      ],
    },
    
    // Academic Information
    {
      type: 'collapsible',
      label: 'Academic Information',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'major',
              type: 'text',
              admin: {
                width: '50%',
              },
            },
            {
              name: 'graduationYear',
              type: 'number',
              admin: {
                width: '50%',
              },
            },
          ],
        },
        {
          name: 'minor',
          type: 'text',
          admin: {
            description: 'Optional minor or concentration',
          },
        },
      ],
    },
    
    // Website Display Settings
    {
      type: 'collapsible',
      label: 'Website Display Settings',
      fields: [
        {
          name: 'displayOnWebsite',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show this person on the public brothers page (only applies to Active/Alumni)',
          },
        },
        {
          name: 'bio',
          type: 'textarea',
          admin: {
            description: 'Optional biography for the website',
          },
        },
      ],
    },
    
    // System Role
    {
      type: 'collapsible',
      label: 'System Permissions',
      admin: {
        condition: (data, siblingData, { user }) => {
          return user?.role === 'admin' || user?.role === 'web-chair'
        },
      },
      fields: [
        {
          name: 'role',
          type: 'select',
          required: true,
          defaultValue: 'member',
          options: [
            { label: 'Admin', value: 'admin' },
            { label: 'Web Chair', value: 'web-chair' },
            { label: 'Member', value: 'member' },
          ],
          admin: {
            description: 'System access level (only admins and web chairs can change this)',
          },
        },
      ],
    },
  ],
  access: {
    // Only admins can create new users
    create: ({ req: { user } }) => {
      return user?.role === 'admin'
    },
    // Users can read their own data, web-chairs can read all, admins can read all
    // Public can read users with displayOnWebsite=true and status active/alumni
    read: ({ req: { user } }) => {
      if (user?.role === 'admin' || user?.role === 'web-chair') {
        return true
      }
      if (user) {
        // Logged in users can see their own data
        return {
          id: {
            equals: user?.id,
          },
        }
      }
      // Public can see displayed active/alumni members
      return {
        and: [
          {
            displayOnWebsite: {
              equals: true,
            },
          },
          {
            status: {
              in: ['active', 'alumni'],
            },
          },
        ],
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
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        // PNM and Inactive users shouldn't be displayed on website by default
        if (operation === 'create' && (data.status === 'pnm' || data.status === 'inactive')) {
          data.displayOnWebsite = false
        }
        return data
      },
    ],
  },
}