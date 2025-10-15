import type { GlobalConfig } from 'payload'

export const SiteConfig: GlobalConfig = {
  slug: 'site-config',
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      defaultValue: 'Abhinav Pandey',
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      defaultValue: 'Mumbai, India',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: {
        description: 'Public contact email',
      },
    },
    {
      name: 'socialLinks',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Twitter', value: 'twitter' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'GitHub', value: 'github' },
            { label: 'Dribbble', value: 'dribbble' },
            { label: 'Behance', value: 'behance' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'Custom', value: 'custom' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          validate: (value: unknown) => {
            if (typeof value === 'string') {
              return /^https?:\/\/.+/.test(value) || 'Must be valid URL'
            }
            return true
          },
        },
        {
          name: 'label',
          type: 'text',
          admin: {
            description: 'Optional custom label (for "Custom" platform)',
            condition: (data, siblingData) => siblingData?.platform === 'custom',
          },
        },
      ],
    },
    {
      name: 'cvFile',
      type: 'upload',
      relationTo: 'media',
      required: true,
      filterOptions: {
        mimeType: { equals: 'application/pdf' },
      },
    },
  ],
}
