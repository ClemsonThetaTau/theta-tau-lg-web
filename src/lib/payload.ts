import { getPayload } from 'payload'
import config from '../../payload.config'

// Get the Payload instance
export const getPayloadInstance = async () => {
  const payload = await getPayload({
    config,
  })
  return payload
}

// Helper functions for common operations
export const PayloadAPI = {
  // Users
  async getUsers(options?: { limit?: number; where?: any }) {
    const payload = await getPayloadInstance()
    return payload.find({
      collection: 'users',
      limit: options?.limit || 50,
      where: options?.where,
    })
  },

  async getUserById(id: string) {
    const payload = await getPayloadInstance()
    return payload.findByID({
      collection: 'users',
      id,
    })
  },

  async createUser(data: any) {
    const payload = await getPayloadInstance()
    return payload.create({
      collection: 'users',
      data,
    })
  },

  async updateUser(id: string, data: any) {
    const payload = await getPayloadInstance()
    return payload.update({
      collection: 'users',
      id,
      data,
    })
  },

  // Officers
  async getOfficers(options?: { limit?: number; where?: any }) {
    const payload = await getPayloadInstance()
    return payload.find({
      collection: 'officers',
      limit: options?.limit || 50,
      where: options?.where || { isActive: { equals: true } },
    })
  },

  async getOfficerById(id: string) {
    const payload = await getPayloadInstance()
    return payload.findByID({
      collection: 'officers',
      id,
    })
  },

  async createOfficer(data: any) {
    const payload = await getPayloadInstance()
    return payload.create({
      collection: 'officers',
      data,
    })
  },

  async updateOfficer(id: string, data: any) {
    const payload = await getPayloadInstance()
    return payload.update({
      collection: 'officers',
      id,
      data,
    })
  },

  // Media
  async getMedia(options?: { limit?: number; where?: any }) {
    const payload = await getPayloadInstance()
    return payload.find({
      collection: 'media',
      limit: options?.limit || 50,
      where: options?.where,
    })
  },

  async uploadMedia(file: File, data?: any) {
    const payload = await getPayloadInstance()
    return payload.create({
      collection: 'media',
      data: data || {},
      file,
    })
  },

  // Pages
  async getPages(options?: { limit?: number; where?: any }) {
    const payload = await getPayloadInstance()
    return payload.find({
      collection: 'pages',
      limit: options?.limit || 50,
      where: options?.where,
    })
  },

  async getPageBySlug(slug: string) {
    const payload = await getPayloadInstance()
    const result = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })
    return result.docs[0]
  },

  async getPageById(id: string) {
    const payload = await getPayloadInstance()
    return payload.findByID({
      collection: 'pages',
      id,
    })
  },

  async createPage(data: any) {
    const payload = await getPayloadInstance()
    return payload.create({
      collection: 'pages',
      data,
    })
  },

  async updatePage(id: string, data: any) {
    const payload = await getPayloadInstance()
    return payload.update({
      collection: 'pages',
      id,
      data,
    })
  },
}

export default PayloadAPI