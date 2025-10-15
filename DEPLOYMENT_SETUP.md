# Deployment Setup Guide

## GitHub Secrets Configuration

For GitHub Actions to deploy successfully, you need to add these secrets:

### Required Secrets

Go to: **GitHub Repository → Settings → Secrets and variables → Actions → New repository secret**

1. **CLOUDFLARE_API_TOKEN**
   - Get from: https://dash.cloudflare.com/profile/api-tokens
   - Click "Create Token"
   - Use template: "Edit Cloudflare Workers"
   - Or create custom with permissions: Workers, Pages, D1, R2
   - Copy the token and add as secret

2. **CLOUDFLARE_ACCOUNT_ID**
   - Get from: https://dash.cloudflare.com
   - Copy Account ID from right sidebar
   - Add as secret

### Verification

Once secrets are added:
1. Push any commit to `main` branch
2. Check Actions tab: https://github.com/abhinavpandey27/portfolio-website/actions
3. Deployment should succeed

## Manual Deployment (Alternative)

If you want to deploy manually without GitHub Actions:

```bash
# Build the project
pnpm build

# Deploy to Cloudflare Pages
pnpm wrangler pages deploy .next --project-name=portfolio-website
```

## Current Deployment Status

- ✅ Frontend Code: Complete and working
- ✅ Build: Passing locally
- ✅ Cloudflare Pages Project: Created
- ⏳ GitHub Actions: Needs secrets configuration
- 🌐 Live URL: https://a60f36b6.portfolio-website-9xv.pages.dev

## Next Steps

1. Add GitHub secrets (CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID)
2. Push a commit to trigger deployment
3. Verify deployment succeeds in Actions tab
4. Check live URL works correctly
