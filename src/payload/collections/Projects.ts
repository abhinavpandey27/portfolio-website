import type { CollectionConfig } from 'payload'

const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'featured', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      maxLength: 100,
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
      maxLength: 150,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier (auto-generated from title)',
      },
      hooks: {
        beforeValidate: [
          ({ data, operation }) => {
            if (operation === 'create' && data && !data.slug && data.title) {
              return slugify(data.title)
            }
            return data?.slug
          },
        ],
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      minLength: 200,
      maxLength: 500,
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      maxLength: 100,
    },
    {
      name: 'team',
      type: 'textarea',
      maxLength: 500,
    },
    {
      name: 'timeline',
      type: 'text',
      required: true,
      maxLength: 50,
      admin: {
        placeholder: 'e.g., Q2 2022 - Q4 2022',
      },
    },
    {
      name: 'categories',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'outcomes',
      type: 'array',
      minRows: 0,
      maxRows: 5,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          maxLength: 100,
        },
      ],
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'backgroundColor',
      type: 'text',
      required: true,
      defaultValue: '#090e03',
      admin: {
        description: 'Hex color for work section background (e.g., #090e03)',
      },
      validate: (value: unknown) => {
        if (typeof value === 'string') {
          return /^#[0-9A-F]{6}$/i.test(value) || 'Must be valid hex color'
        }
        return true
      },
    },
    {
      name: 'carouselImages',
      type: 'array',
      required: true,
      minRows: 3,
      maxRows: 10,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show as featured project on landing page (only one should be featured)',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Display order (lower numbers appear first)',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
  ],
  timestamps: true,
}
