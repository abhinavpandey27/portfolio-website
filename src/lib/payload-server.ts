import type { Payload } from 'payload'

// Only initialize Payload when running on Node.js (not Cloudflare Workers)
const isNodeRuntime = () => {
  return typeof process !== 'undefined' && process.versions && process.versions.node
}

interface PayloadCache {
  client: Payload | null
  promise: Promise<Payload> | null
}

const globalContext = globalThis as typeof globalThis & { payload?: PayloadCache }

const cached: PayloadCache = globalContext.payload || {
  client: null,
  promise: null,
}

if (!globalContext.payload) {
  globalContext.payload = cached
}

export const getPayloadClient = async () => {
  // Return null if not running on Node.js
  if (!isNodeRuntime()) {
    console.warn('Payload CMS requires Node.js runtime. Skipping initialization.')
    return null
  }

  if (cached.client) {
    return cached.client
  }

  try {
    const { getPayload } = await import('payload')
    const payloadConfig = await import('../../payload.config')

    if (!cached.promise) {
      cached.promise = getPayload({
        config: payloadConfig.default,
      })
    }

    cached.client = await cached.promise
    return cached.client
  } catch (error) {
    console.error('Failed to initialize Payload:', error)
    return null
  }
}
