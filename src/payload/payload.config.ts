import { buildConfig } from 'payload';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { slateEditor } from '@payloadcms/richtext-slate';
import path from 'path';
import sharp from 'sharp';

// Import collections
import Users from './collections/users';
import Media from './collections/media';
import HomePageContent from './collections/homePageContent';
import AboutUsContent from './collections/aboutUsContent';
import CountdownEvents from './collections/countdownEvents';
import Brothers from './collections/brothers';

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  editor: slateEditor({}),
  collections: [
    Users,
    Media,
    HomePageContent,
    AboutUsContent,
    CountdownEvents,
    Brothers,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || 'mongodb://localhost/theta-tau-lg',
  }),
  cors: [
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  ].filter(Boolean),
  csrf: [
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  ].filter(Boolean),
  // Add secret key for JWT tokens
  secret: process.env.PAYLOAD_SECRET || 'your-payload-secret-key-change-me-in-production',
  // Add sharp for image processing
  sharp,
});
