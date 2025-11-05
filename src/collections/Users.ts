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
    
    // System Role (Payload standard)
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'user',
      saveToJWT: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Admin: Full access. User: Can edit own profile only.',
      },
      access: {
        // Only admins can change roles
        update: ({ req: { user } }) => user?.role === 'admin',
      },
    },
  ],
  access: {
    // Only admins can create new users
    create: ({ req: { user } }) => user?.role === 'admin',
    
    // Read access: Admins see all, users see themselves, public sees displayOnWebsite users
    read: ({ req: { user } }) => {
      // Admins can see all
      if (user?.role === 'admin') {
        return true
      }
      
      // Logged-in users can see their own data
      if (user) {
        return {
          or: [
            {
              id: {
                equals: user.id,
              },
            },
            // Plus public profiles
            {
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
            },
          ],
        }
      }
      
      // Public can only see displayed active/alumni members
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
    
    // Update: Admins can update all, users can update themselves
    update: ({ req: { user } }) => {
      if (user?.role === 'admin') {
        return true
      }
      // Users can only update their own profile
      return {
        id: {
          equals: user?.id,
        },
      }
    },
    
    // Only admins can delete users
    delete: ({ req: { user } }) => user?.role === 'admin',
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