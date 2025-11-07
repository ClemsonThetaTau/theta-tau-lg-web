import type { Access, PayloadRequest } from 'payload'

const ensureAuthenticatedUser = async (
  req: PayloadRequest,
): Promise<PayloadRequest['user'] | null> => {
  if (req.user) {
    return req.user
  }

  if (typeof req.payload?.auth === 'function') {
    try {
      const authResult = await req.payload.auth({
        canSetHeaders: false,
        headers: req.headers,
        req,
      })

      if (authResult?.user) {
        req.user = authResult.user
        return authResult.user
      }
    } catch (error) {
      req.payload?.logger?.debug?.(
        'Failed to hydrate user from auth strategies during access control check',
        { error },
      )
    }
  }

  return null
}

/**
 * Admins have full access
 * Following Payload's recommended pattern
 */
export const admins: Access = async ({ req }) => {
  const user = await ensureAuthenticatedUser(req)

  if (user && user.role === 'admin') {
    return true
  }

  return false
}

/**
 * Only admins or the user themselves can access
 * Following Payload's recommended pattern
 */
export const adminsOrSelf: Access = async ({ req, id }) => {
  const user = await ensureAuthenticatedUser(req)

  if (user && user.role === 'admin') {
    return true
  }

  if (user && id) {
    return user.id === id
  }

  return false
}

/**
 * Public can read published content, admins can read all
 * Following Payload's recommended pattern
 */
export const adminsOrPublished: Access = async ({ req }) => {
  const user = await ensureAuthenticatedUser(req)

  if (user && user.role === 'admin') {
    return true
  }

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
export const adminsOrAuthor: Access = async ({ req }) => {
  const user = await ensureAuthenticatedUser(req)

  if (user && user.role === 'admin') {
    return true
  }

  if (user) {
    return {
      author: {
        equals: user.id,
      },
    }
  }

  return false
}

/**
 * For auth collections - allow first user creation, then only admins
 * Following Payload's recommended pattern
 */
export const adminsOrFirstUser: Access = async ({ req }) => {
  const user = await ensureAuthenticatedUser(req)

  if (user && user.role === 'admin') {
    return true
  }

  if (user) {
    return false
  }

  const adminUserCollection = req.payload.config.admin.user
  const { totalDocs } = await req.payload.count({
    collection: adminUserCollection,
    overrideAccess: true,
  })

  return totalDocs === 0
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
export const loggedIn: Access = async ({ req }) => {
  const user = await ensureAuthenticatedUser(req)

  if (user) {
    return true
  }

  return false
}

/**
 * Public can read active/alumni members who opt-in to display
 * Logged-in users can also see their own profile
 * Admins can see everything
 * Following Payload's recommended pattern
 */
export const publicBrothersOrSelfOrAdmins = (async ({ req }) => {
  const user = await ensureAuthenticatedUser(req)

  if (user && user.role === 'admin') {
    return true
  }

  if (user) {
    return {
      or: [
        {
          id: {
            equals: user.id,
          },
        },
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

