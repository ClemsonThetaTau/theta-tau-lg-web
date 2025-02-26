import { getPayload } from 'payload';
import config from './payload.config';

// This file is used to access the Payload CMS instance from the client-side
// It's a singleton to prevent multiple instances from being created

let cached = (global as any).payload;

if (!cached) {
  cached = (global as any).payload = { client: null, promise: null };
}

interface Args {
  initializePayload?: boolean;
}

/**
 * Get the Payload CMS client
 * @param args - Arguments for getting the Payload CMS client
 * @returns The Payload CMS client
 */
export const getPayloadClient = async ({ initializePayload = true }: Args = {}) => {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  if (cached.client) {
    return cached.client;
  }

  if (!cached.promise) {
    cached.promise = getPayload({
      // Make sure this matches the config in payload.config.ts
      config,
      options: {
        local: initializePayload,
      },
    });
  }

  try {
    cached.client = await cached.promise;
  } catch (e: unknown) {
    cached.promise = null;
    throw e;
  }

  return cached.client;
};

// Export a convenience function to get the Payload CMS client
export const payload = {
  find: async (collection: string, query = {}) => {
    const client = await getPayloadClient();
    return client.find({ collection, ...query });
  },
  findByID: async (collection: string, id: string) => {
    const client = await getPayloadClient();
    return client.findByID({ collection, id });
  },
  create: async (collection: string, data = {}) => {
    const client = await getPayloadClient();
    return client.create({ collection, data });
  },
  update: async (collection: string, id: string, data = {}) => {
    const client = await getPayloadClient();
    return client.update({ collection, id, data });
  },
  delete: async (collection: string, id: string) => {
    const client = await getPayloadClient();
    return client.delete({ collection, id });
  },
};
