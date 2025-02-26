import type { CollectionConfig } from 'payload';
import { isAdmin, isAdminFieldLevel, isAdminOrSelf } from '../access';

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role'],
  },
  access: {
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    create: isAdmin,
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
      name: 'profileImage',
      type: 'upload',
      relationTo: 'media',
      access: {
        read: () => true,
        update: isAdminOrSelf,
      },
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      access: {
        update: isAdminFieldLevel,
      },
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Web Chair', value: 'web-chair' },
        { label: 'Executive', value: 'executive' },
        { label: 'Community Service Chair', value: 'comm-serve' },
        { label: 'Professional Chair', value: 'professional' },
        { label: 'Brotherhood Chair', value: 'brotherhood' },
        { label: 'Member', value: 'member' },
      ],
      defaultValue: 'member',
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
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Alumni', value: 'alumni' },
      ],
      defaultValue: 'active',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'graduationYear',
      type: 'number',
    },
  ],
};

export default Users;
