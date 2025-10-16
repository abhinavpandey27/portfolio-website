export const runtime = 'edge'

// Temporarily disabled Payload API for clean deployment
// TODO: Re-enable when remote CMS is deployed

export async function GET(): Promise<Response> {
  return new Response('Payload CMS API - Coming Soon', { status: 503 })
}

export async function POST(): Promise<Response> {
  return new Response('Payload CMS API - Coming Soon', { status: 503 })
}

export async function PUT(): Promise<Response> {
  return new Response('Payload CMS API - Coming Soon', { status: 503 })
}

export async function DELETE(): Promise<Response> {
  return new Response('Payload CMS API - Coming Soon', { status: 503 })
}
