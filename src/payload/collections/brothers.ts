import type { CollectionConfig } from 'payload';

import { isAdmin, isChair } from '../access';

export const Brothers: CollectionConfig = {
  slug: 'brothers',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'pledgeClass', 'position'],
  },
  access: {
    read: () => true,
    update: isChair,
    create: isChair,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
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
      name: 'headshot',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'major',
      type: 'text',
      required: true,
    },
    {
      name: 'pledgeClass',
      type: 'text',
      required: true,
    },
    {
      name: 'graduationYear',
      type: 'number',
      required: true,
    },
    {
      name: 'badgeNumber',
      type: 'number',
      required: true,
    },
    {
      name: 'position',
      type: 'select',
      options: [
        { label: 'Regent', value: 'regent' },
        { label: 'Vice Regent', value: 'vice-regent' },
        { label: 'Scribe', value: 'scribe' },
        { label: 'Treasurer', value: 'treasurer' },
        { label: 'Corresponding Secretary', value: 'corresponding-secretary' },
        { label: 'Pledge Marshal', value: 'pledge-marshal' },
        { label: 'Rush Chair', value: 'rush-chair' },
        { label: 'Professional Chair', value: 'professional-chair' },
        { label: 'Brotherhood Chair', value: 'brotherhood-chair' },
        { label: 'Community Service Chair', value: 'community-service-chair' },
        { label: 'Web Chair', value: 'web-chair' },
        { label: 'Member', value: 'member' },
      ],
      required: true,
    },
    {
      name: 'bio',
      type: 'textarea',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Alumni', value: 'alumni' },
      ],
      required: true,
      defaultValue: 'active',
    },
    {
      name: 'linkedIn',
      type: 'text',
      admin: {
        description: 'LinkedIn profile URL',
      },
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        description: 'Link to user account if this brother has login access',
      },
    },
  ],
};

export default Brothers;
