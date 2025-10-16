// Temporarily disabled admin API for clean deployment
// TODO: Re-enable when remote CMS is deployed

export async function GET() {
  return new Response(JSON.stringify({
    message: 'Payload CMS Admin - Coming Soon',
    status: 'not-configured'
  }), {
    headers: { 'Content-Type': 'application/json' }
  })
}
