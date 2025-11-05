import { cookies } from 'next/headers'

const PAYLOAD_SERVER_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'

/**
 * Client-side API calls to Payload CMS
 * These should be used in server components or API routes
 */

export async function getPayloadClient() {
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')

  return {
    token: token?.value,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `JWT ${token.value}` } : {}),
    },
  }
}

export async function payloadFetch(endpoint: string, options: RequestInit = {}) {
  const client = await getPayloadClient()
  
  const response = await fetch(`${PAYLOAD_SERVER_URL}/api${endpoint}`, {
    ...options,
    headers: {
      ...client.headers,
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`Payload API error: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Authentication functions
 */

export async function signIn(email: string, password: string) {
  try {
    const response = await fetch(`${PAYLOAD_SERVER_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    })

    if (!response.ok) {
      const error = await response.json()
      return { result: null, error: error.errors?.[0]?.message || 'Login failed' }
    }

    const result = await response.json()
    return { result, error: null }
  } catch (e) {
    return { result: null, error: e instanceof Error ? e.message : 'Login failed' }
  }
}

export async function signOut() {
  try {
    await fetch(`${PAYLOAD_SERVER_URL}/api/users/logout`, {
      method: 'POST',
      credentials: 'include',
    })
    return { error: null }
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Logout failed' }
  }
}

export async function getCurrentUser() {
  try {
    const data = await payloadFetch('/users/me')
    return { user: data.user, error: null }
  } catch (e) {
    return { user: null, error: e instanceof Error ? e.message : 'Failed to get user' }
  }
}

/**
 * Data fetching functions
 */

export async function getBrothers(options?: {
  status?: string[]
  isPublic?: boolean
  limit?: number
  sort?: string
}) {
  const params = new URLSearchParams()
  
  if (options?.status) {
    params.append('where[status][in]', options.status.join(','))
  }
  if (options?.isPublic !== undefined) {
    params.append('where[isPublic][equals]', String(options.isPublic))
  }
  if (options?.limit) {
    params.append('limit', String(options.limit))
  }
  if (options?.sort) {
    params.append('sort', options.sort)
  }

  const queryString = params.toString()
  return payloadFetch(`/brothers${queryString ? `?${queryString}` : ''}`)
}

export async function getOfficers(options?: {
  isActive?: boolean
  type?: string
}) {
  const params = new URLSearchParams()
  
  if (options?.isActive !== undefined) {
    params.append('where[isActive][equals]', String(options.isActive))
  }
  if (options?.type) {
    params.append('where[type][equals]', options.type)
  }
  params.append('sort', 'displayOrder')

  const queryString = params.toString()
  return payloadFetch(`/officers${queryString ? `?${queryString}` : ''}`)
}

export async function getUsers(options?: {
  limit?: number
  sort?: string
}) {
  const params = new URLSearchParams()
  
  if (options?.limit) {
    params.append('limit', String(options.limit))
  }
  if (options?.sort) {
    params.append('sort', options.sort)
  }

  const queryString = params.toString()
  return payloadFetch(`/users${queryString ? `?${queryString}` : ''}`)
}

export async function getPageBySlug(slug: string) {
  const params = new URLSearchParams()
  params.append('where[slug][equals]', slug)
  params.append('where[status][equals]', 'published')
  
  return payloadFetch(`/pages?${params.toString()}`)
}

export async function getBlogPosts(options?: {
  limit?: number
  category?: string[]
  status?: string
}) {
  const params = new URLSearchParams()
  
  if (options?.limit) {
    params.append('limit', String(options.limit))
  }
  if (options?.category) {
    params.append('where[categories][in]', options.category.join(','))
  }
  if (options?.status) {
    params.append('where[status][equals]', options.status)
  } else {
    params.append('where[status][equals]', 'published')
  }
  params.append('sort', '-publishedDate')

  const queryString = params.toString()
  return payloadFetch(`/blog${queryString ? `?${queryString}` : ''}`)
}

export async function getBlogPostBySlug(slug: string) {
  const params = new URLSearchParams()
  params.append('where[slug][equals]', slug)
  params.append('where[status][equals]', 'published')
  
  return payloadFetch(`/blog?${params.toString()}`)
}

export async function getSettings() {
  return payloadFetch('/globals/settings')
}

export async function updateUser(userId: string, data: any) {
  return fetch(`${PAYLOAD_SERVER_URL}/api/users/${userId}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(res => res.json())
}

