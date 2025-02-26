import type { Access, FieldAccess, User } from 'payload';

export const isAdmin: Access = ({ req }) => {
  const user = req.user as User | null;
  return Boolean(user?.role === 'admin' || user?.role === 'web-chair');
};

export const isExecutive: Access = ({ req }) => {
  const user = req.user as User | null;
  return Boolean(
    user?.role === 'executive' || 
    isAdmin({ req }) as boolean
  );
};

export const isChair: Access = ({ req }) => {
  const user = req.user as User | null;
  return Boolean(
    user?.role === 'comm-serve' ||
    user?.role === 'professional' ||
    user?.role === 'brotherhood' ||
    isExecutive({ req }) as boolean
  );
};

export const isAdminFieldLevel: FieldAccess = ({ req }) => {
  const user = req.user as User | null;
  return Boolean(user?.role === 'admin' || user?.role === 'web-chair');
};

export const isExecutiveFieldLevel: FieldAccess = ({ req }) => {
  const user = req.user as User | null;
  return Boolean(
    user?.role === 'executive' || 
    user?.role === 'admin' || 
    user?.role === 'web-chair'
  );
};

export const isChairFieldLevel: FieldAccess = ({ req }) => {
  const user = req.user as User | null;
  return Boolean(
    user?.role === 'comm-serve' ||
    user?.role === 'professional' ||
    user?.role === 'brotherhood' ||
    user?.role === 'executive' ||
    user?.role === 'admin' ||
    user?.role === 'web-chair'
  );
};

export const isAdminOrSelf: Access = ({ req }) => {
  const user = req.user as User | null;
  
  if (user?.role === 'admin' || user?.role === 'web-chair') return true;
  
  // Check if the user is accessing their own document
  if (req.url?.includes(`/api/users/${user?.id}`)) return true;
  
  return false;
};
