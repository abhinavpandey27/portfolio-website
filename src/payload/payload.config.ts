import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Projects } from './collections/Projects'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { AboutSection } from './globals/AboutSection'
import { SiteConfig } from './globals/SiteConfig'

export default buildConfig({
  editor: lexicalEditor({}),
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || 'file:./dev.db',
    },
  }),
  collections: [Users, Media, Projects],
  globals: [AboutSection, SiteConfig],
  typescript: {
    outputFile: 'src/payload/types.ts',
  },
  graphQL: {
    schemaOutputFile: 'src/payload/schema.graphql',
  },
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-here',
})
