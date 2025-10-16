import type { GlobalConfig } from 'payload'

export const AboutSection: GlobalConfig = {
  slug: 'about-section',
  admin: {
    group: 'Content',
  },
  fields: [
    {
      name: 'bioLeft',
      type: 'textarea',
      required: true,
      maxLength: 1000,
      admin: {
        description: 'Left bio text (first paragraph)',
      },
    },
    {
      name: 'bioRight',
      type: 'textarea',
      required: true,
      maxLength: 1000,
      admin: {
        description: 'Right bio text (second paragraph)',
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
