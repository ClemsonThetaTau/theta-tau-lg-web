import type { CollectionConfig } from 'payload';

import { isAdmin, isChair } from '../access';

export const CountdownEvents: CollectionConfig = {
  slug: 'countdown-events',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'targetDate', 'isActive'],
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
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'targetDate',
      type: 'date',
      required: true,
      admin: {
        description: 'The date and time the countdown is counting down to',
        date: {
          pickerAppearance: 'dayAndTime',
          timeFormat: '24hr',
        },
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      admin: {
        description: 'Only one countdown can be active at a time. The most recently activated countdown will be displayed.',
      },
    },
    {
      name: 'displayLocation',
      type: 'select',
      options: [
        { label: 'Home Page', value: 'home' },
        { label: 'Rush Page', value: 'rush' },
        { label: 'Both', value: 'both' },
      ],
      required: true,
    },
  ],
};

export default CountdownEvents;
