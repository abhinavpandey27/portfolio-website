import { getPayload } from 'payload'
import config from '@/payload/payload.config'

let payload: Awaited<ReturnType<typeof getPayload>> | null = null

async function getPayloadClient() {
  if (!payload) {
    payload = await getPayload({ config })
  }
  return payload
}

export async function getPublishedProjects() {
  const payloadClient = await getPayloadClient()
  const result = await payloadClient.find({
    collection: 'projects',
    where: { status: { equals: 'published' } },
    sort: 'order',
  })
  return result.docs
}

export async function getFeaturedProject() {
  const payloadClient = await getPayloadClient()
  const result = await payloadClient.find({
    collection: 'projects',
    where: { 
      featured: { equals: true }, 
      status: { equals: 'published' } 
    },
    limit: 1,
  })
  return result.docs[0] || null
}

export async function getSiteConfig() {
  const payloadClient = await getPayloadClient()
  return await payloadClient.findGlobal({ slug: 'site-config' })
}

export async function getAboutSection() {
  const payloadClient = await getPayloadClient()
  return await payloadClient.findGlobal({ slug: 'about-section' })
}
