import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
    // Storage handled by R2 plugin in payload.config.ts
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: undefined, // Maintain aspect ratio
        position: 'centre',
      },
      {
        name: 'card',
        width: 800,
        height: 800, // Square for cards
        position: 'centre',
      },
      {
        name: 'large',
        width: 1920,
        height: undefined, // Maintain aspect ratio
        position: 'centre',
      },
    ],
    formatOptions: {
      format: 'webp',
      options: {
        quality: 85,
      },
    },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      maxLength: 200,
      admin: {
        description: 'Accessibility: Describe the image for screen readers',
      },
    },
  ],
}
