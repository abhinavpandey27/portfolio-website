import { NextRequest } from 'next/server'

export const runtime = 'edge'

// Temporarily disabled Payload API for clean deployment
// TODO: Re-enable when remote CMS is deployed

export async function GET(_request: NextRequest, _params: { params: Promise<{ slug: string[] }> }) {
  return new Response('Payload CMS API - Coming Soon', { status: 503 })
}

export async function POST(_request: NextRequest, _params: { params: Promise<{ slug: string[] }> }) {
  return new Response('Payload CMS API - Coming Soon', { status: 503 })
}

export async function PUT(_request: NextRequest, _params: { params: Promise<{ slug: string[] }> }) {
  return new Response('Payload CMS API - Coming Soon', { status: 503 })
}

export async function DELETE(_request: NextRequest, _params: { params: Promise<{ slug: string[] }> }) {
  return new Response('Payload CMS API - Coming Soon', { status: 503 })
}
