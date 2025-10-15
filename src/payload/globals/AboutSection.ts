import type { GlobalConfig } from 'payload'

export const AboutSection: GlobalConfig = {
  slug: 'about-section',
  admin: {
    group: 'Content',
  },
  fields: [
    {
      name: 'bio',
      type: 'richText',
      required: true,
      admin: {
        description: 'About section bio (2-3 paragraphs)',
      },
    },
    {
      name: 'imageCarousel',
      type: 'array',
      required: true,
      minRows: 4,
      maxRows: 12,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
