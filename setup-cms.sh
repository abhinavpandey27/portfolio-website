#!/bin/bash

echo "🚧 Payload CMS Worker Setup Deprecated"
echo "======================================"
echo ""
echo "Payload CMS cannot run on Cloudflare Workers because it needs a full Node.js runtime."
echo "Use the dedicated Node server located at cms/server.ts instead."
echo ""
echo "Updated workflow:"
echo "  1. Provision a Node host (Railway, Render, Fly.io, Vercel, etc.)."
echo "  2. Set the environment variables documented in CMS_DEPLOYMENT.md."
echo "  3. Deploy Payload with: pnpm install --frozen-lockfile && pnpm cms:start"
echo ""
echo "R2 and OAuth secrets should now be configured directly on the Node host."
echo ""
echo "For details see CMS_DEPLOYMENT.md."
echo ""
exit 0
