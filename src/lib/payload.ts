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

  // Brothers
  async getBrothers(options?: { limit?: number; where?: any }) {
    const payload = await getPayloadInstance()
    return payload.find({
      collection: 'brothers',
      limit: options?.limit || 100,
      where: options?.where || { isPublic: { equals: true } },
    })
  },

  async getBrotherById(id: string) {
    const payload = await getPayloadInstance()
    return payload.findByID({
      collection: 'brothers',
      id,
    })
  },

  async createBrother(data: any) {
    const payload = await getPayloadInstance()
    return payload.create({
      collection: 'brothers',
      data,
    })
  },

  async updateBrother(id: string, data: any) {
    const payload = await getPayloadInstance()
    return payload.update({
      collection: 'brothers',
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
}

export default PayloadAPI