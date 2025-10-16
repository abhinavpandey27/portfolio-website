import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { r2Storage } from '@payloadcms/storage-r2'
import { Projects } from './collections/Projects'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { AboutSection } from './globals/AboutSection'
import { SiteConfig } from './globals/SiteConfig'

const databaseUrl = process.env.DATABASE_URL || process.env.DB_URL || 'file:./dev.db'
const databaseAuthToken = process.env.DATABASE_AUTH_TOKEN
const databaseSyncUrl = process.env.DATABASE_SYNC_URL
const allowedOrigins = process.env.CMS_ALLOWED_ORIGINS
  ? process.env.CMS_ALLOWED_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean)
  : undefined

type WorkerR2Bucket = any

const workerBucket = (globalThis as { MEDIA_BUCKET?: WorkerR2Bucket }).MEDIA_BUCKET

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  editor: lexicalEditor({}),
  db: sqliteAdapter({
    client: {
      url: databaseUrl,
      authToken: databaseAuthToken,
      syncUrl: databaseSyncUrl,
    },
  }),
  collections: [Users, Media, Projects],
  globals: [AboutSection, SiteConfig],
  cors: allowedOrigins && allowedOrigins.length > 0 ? allowedOrigins : '*',
  csrf: allowedOrigins,
  serverURL: process.env.CMS_BASE_URL,
  typescript: {
    outputFile: 'src/payload/types.ts',
  },
  graphQL: {
    schemaOutputFile: 'src/payload/schema.graphql',
  },
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-here',
  upload: {
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB
    },
  },
  plugins: [
    ...(workerBucket
      ? [
          r2Storage({
            bucket: workerBucket,
            collections: {
              media: true,
            },
          }),
        ]
      : []),
  ],
})
