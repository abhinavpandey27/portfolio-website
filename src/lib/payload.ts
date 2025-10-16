type PayloadCollectionResponse<T = unknown> = {
  docs: T[]
  totalDocs?: number
  hasNextPage?: boolean
  page?: number
}

type PayloadMedia = {
  id?: string
  url?: string
  alt?: string
}

type PayloadCategory = {
  name?: string
}

type PayloadOutcome = {
  text?: string
}

export interface PayloadProject {
  id?: string
  title?: string
  subtitle?: string
  slug?: string
  description?: string
  role?: string
  team?: string
  timeline?: string
  categories?: PayloadCategory[]
  outcomes?: PayloadOutcome[]
  heroImage?: PayloadMedia
  backgroundColor?: string
  carouselImages?: Array<{ image?: PayloadMedia }>
  featured?: boolean
  order?: number
  status?: string
}

export interface PayloadSiteConfig {
  name?: string
  location?: string
  email?: string
  socialLinks?: Array<{ label?: string; url?: string } | string>
  cvFile?: PayloadMedia | null
}

export interface PayloadAboutSection {
  bio?: string
  bioLeft?: string
  bioRight?: string
  imageCarousel?: Array<{ image?: PayloadMedia }>
}

const FALLBACK_SITE_CONFIG: PayloadSiteConfig = {
  name: 'Abhinav Pandey',
  location: 'Mumbai, India',
  email: 'abhinavpandey027@gmail.com',
  socialLinks: [],
  cvFile: null,
}

const FALLBACK_ABOUT: PayloadAboutSection = {
  bio: '',
  imageCarousel: [],
}

const isPayloadAvailable = () => {
  return typeof window === 'undefined' && process.env.PAYLOAD_SECRET
}

const resolveRestBaseUrl = () => {
  const baseUrl = process.env.CMS_REST_URL || process.env.NEXT_PUBLIC_CMS_URL

  if (!baseUrl) {
    return null
  }

  try {
    const url = new URL(baseUrl)
    const normalized = url.toString().replace(/\/$/, '')
    return normalized
  } catch (error) {
    console.warn('Invalid CMS REST URL configured:', error)
    return null
  }
}

const REST_BASE_URL = resolveRestBaseUrl()
const REST_API_TOKEN = process.env.PAYLOAD_REST_API_KEY

const fetchFromRest = async <T>(path: string, searchParams?: Record<string, string>) => {
  if (!REST_BASE_URL) {
    return null
  }

  try {
    const url = new URL(path.startsWith('/') ? path : `/api/${path}`, REST_BASE_URL)
    if (searchParams) {
      Object.entries(searchParams).forEach(([key, value]) => {
        if (typeof value !== 'undefined') {
          url.searchParams.set(key, value)
        }
      })
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        ...(REST_API_TOKEN ? { Authorization: `Bearer ${REST_API_TOKEN}` } : {}),
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      console.error(`Payload REST request failed for ${url.toString()} with status ${response.status}`)
      return null
    }

    const data = (await response.json()) as T
    return data
  } catch (error) {
    console.error('Error fetching from Payload REST API:', error)
    return null
  }
}

export const getProjects = async (): Promise<PayloadCollectionResponse<PayloadProject>> => {
  if (isPayloadAvailable()) {
    try {
      const { getPayloadClient } = await import('./payload-server')
      const payload = await getPayloadClient()

      if (!payload) {
        console.warn('Payload client not available')
        return { docs: [] }
      }

      const projects = (await payload.find({
        collection: 'projects',
        where: {
          status: {
            equals: 'published',
          },
        },
        sort: 'order',
      })) as PayloadCollectionResponse<PayloadProject>
      return projects
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

  const restProjects = await fetchFromRest<PayloadCollectionResponse<PayloadProject>>('/api/projects', {
    'where[status][equals]': 'published',
    sort: 'order',
  })

  if (restProjects) {
    return restProjects
  }

  return { docs: [] }
}

export const getFeaturedProject = async (): Promise<PayloadProject | null> => {
  if (isPayloadAvailable()) {
    try {
      const { getPayloadClient } = await import('./payload-server')
      const payload = await getPayloadClient()

      if (!payload) {
        console.warn('Payload client not available')
        return null
      }

      const projects = (await payload.find({
        collection: 'projects',
        where: {
          status: {
            equals: 'published',
          },
          featured: {
            equals: true,
          },
        },
        limit: 1,
      })) as PayloadCollectionResponse<PayloadProject>
      return projects.docs[0] || null
    } catch (error) {
      console.error('Error fetching featured project:', error)
    }
  }

  const featured = await fetchFromRest<PayloadCollectionResponse<PayloadProject>>('/api/projects', {
    'where[status][equals]': 'published',
    'where[featured][equals]': 'true',
    limit: '1',
  })

  if (featured?.docs?.length) {
    return featured.docs[0]
  }

  return null
}

export const getSiteConfig = async (): Promise<PayloadSiteConfig> => {
  if (isPayloadAvailable()) {
    try {
      const { getPayloadClient } = await import('./payload-server')
      const payload = await getPayloadClient()

      if (!payload) {
        console.warn('Payload client not available')
        return FALLBACK_SITE_CONFIG
      }

      const config = (await payload.findGlobal({
        slug: 'siteConfig',
      })) as PayloadSiteConfig
      return config
    } catch (error) {
      console.error('Error fetching site config:', error)
    }
  }

  const siteConfig = await fetchFromRest<PayloadSiteConfig>('/api/globals/site-config')

  if (siteConfig) {
    return siteConfig
  }

  return FALLBACK_SITE_CONFIG
}

export const getAboutSection = async (): Promise<PayloadAboutSection> => {
  if (isPayloadAvailable()) {
    try {
      const { getPayloadClient } = await import('./payload-server')
      const payload = await getPayloadClient()

      if (!payload) {
        console.warn('Payload client not available')
        return FALLBACK_ABOUT
      }

      const about = (await payload.findGlobal({
        slug: 'aboutSection',
      })) as PayloadAboutSection
      return about
    } catch (error) {
      console.error('Error fetching about section:', error)
    }
  }

  const aboutSection = await fetchFromRest<PayloadAboutSection>('/api/globals/about-section')

  if (aboutSection) {
    return aboutSection
  }

  return FALLBACK_ABOUT
}
