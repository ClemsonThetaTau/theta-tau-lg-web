import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Officers } from './collections/Officers'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Blog } from './collections/Blog'
import { Settings } from './collections/Settings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // Basic config
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-here',
  
  // Database
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || '',
  }),
  
  // Collections & Globals
  collections: [Users, Officers, Media, Pages, Blog],
  globals: [Settings],
  
  // Editor
  editor: lexicalEditor(),
  
  // TypeScript
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  
  // Admin panel
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- Theta Tau Lambda Gamma',
    },
    livePreview: {
      // Enable live preview for all collections that support it
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  
  // Server URL for live preview
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  
  // CORS
  cors: [
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  ].filter(Boolean),
  
  // CSRF
  csrf: [
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  ].filter(Boolean),
})
