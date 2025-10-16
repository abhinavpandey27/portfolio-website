// Cloudflare Workers stub for Payload CMS Admin
// Payload now runs on a dedicated Node.js runtime. Workers cannot host Payload
// because it relies on full Node APIs (fs, child_process, etc.).

const message = JSON.stringify(
  {
    error: 'Payload CMS is not available on this Cloudflare Worker.',
    action: 'Deploy the Payload admin server to a Node.js host (e.g., Vercel, Railway, Render).',
    docs: 'See CMS_DEPLOYMENT.md for the updated deployment workflow.',
  },
  null,
  2
)

const workerHandler = {
  async fetch(): Promise<Response> {
    return new Response(message, {
      status: 501,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    })
  },
}

export default workerHandler
