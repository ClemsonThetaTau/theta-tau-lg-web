import type { Access } from 'payload'

/**
 * Admins have full access
 * Following Payload's recommended pattern
 */
export const admins: Access = ({ req: { user } }) => {
  // Scenario 1 - Check if user has the 'admin' role
  if (user && user.role === 'admin') {
    return true
  }
  
  // Scenario 2 - Disallow all others
  return false
}

/**
 * Only admins or the user themselves can access
 * Following Payload's recommended pattern
 */
export const adminsOrSelf: Access = ({ req: { user }, id }) => {
    console.log('adminsOrSelf', user, id)
    console.log('user is admin', user?.role === 'admin')
  // Scenario 1 - Check if user has the 'admin' role
  if (user && user.role === 'admin') {
    return true
  }
  
  // Scenario 2 - Allow only if user is accessing their own document
  if (user && id) {
    return user.id === id
  }
  
  // Scenario 3 - Disallow all others
  return false
}

/**
 * Public can read published content, admins can read all
 * Following Payload's recommended pattern
 */
export const adminsOrPublished: Access = ({ req: { user } }) => {
  // Scenario 1 - Admins can see everything
  if (user && user.role === 'admin') {
    return true
  }
  
  // Scenario 2 - Public can only see published content
  return {
    status: {
      equals: 'published',
    },
  }
}

/**
 * Authors can access their own content, admins can access all
 * Following Payload's recommended pattern
 */
export const adminsOrAuthor: Access = ({ req: { user } }) => {
  // Scenario 1 - Check if user has the 'admin' role
  if (user && user.role === 'admin') {
    return true
  }
  
  // Scenario 2 - Allow only documents where user is the author
  if (user) {
    return {
      author: {
        equals: user.id,
      },
    }
  }
  
  // Scenario 3 - Disallow all others
  return false
}

/**
 * For auth collections - allow first user creation, then only admins
 * Following Payload's recommended pattern
 */
export const adminsOrFirstUser: Access = ({ req: { user } }) => {
  // Scenario 1 - Allow first user creation (when no user is logged in)
  if (!user) {
    return true
  }
  
  // Scenario 2 - After that, only admins can create users
  if (user && user.role === 'admin') {
    return true
  }
  
  // Scenario 3 - Disallow all others
  return false
}

/**
 * Anyone can access
 */
export const anyone: Access = () => {
  return true
}

/**
 * Only logged-in users can access
 * Following Payload's recommended pattern
 */
export const loggedIn: Access = ({ req: { user } }) => {
  // Scenario 1 - Allow if user is logged in
  if (user) {
    return true
  }
  
  // Scenario 2 - Disallow if not logged in
  return false
}

/**
 * Public can read active/alumni members who opt-in to display
 * Logged-in users can also see their own profile
 * Admins can see everything
 * Following Payload's recommended pattern
 */
export const publicBrothersOrSelfOrAdmins = (({ req: { user } }) => {
  // Scenario 1 - Admins can see everyone
  if (user && user.role === 'admin') {
    return true
  }
  
  // Scenario 2 - Logged-in users can see their own data + public profiles
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
  
  // Scenario 3 - Public can only see displayed active/alumni members
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
}) as Access

