import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 800,
        height: 600,
        position: 'centre',
      },
      {
        name: 'large',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
    formatOptions: {
      format: 'webp',
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
