# Deployment Setup Guide

## GitHub Secrets Configuration

For GitHub Actions to deploy successfully, you need to add these secrets:

### Step-by-Step Instructions

1. **Go to your GitHub repository**:
   - URL: https://github.com/abhinavpandey27/portfolio-website

2. **Navigate to Settings**:
   - Click the "Settings" tab (top navigation bar)

3. **Go to Secrets**:
   - In the left sidebar, click "Secrets and variables"
   - Click "Actions" (dropdown will appear)

4. **Add New Secret**:
   - Click the green "New repository secret" button

### Required Secrets

**Secret #1: CLOUDFLARE_API_TOKEN**

1. Go to: https://dash.cloudflare.com/profile/api-tokens
2. Click "Create Token" button
3. Use template: "Edit Cloudflare Workers" OR create custom token with:
   - Account: Workers Scripts (Edit)
   - Account: Cloudflare Pages (Edit)
   - Account: D1 (Edit)
   - Account: R2 (Edit)
4. Click "Continue to summary" → "Create Token"
5. **COPY THE TOKEN** (you won't see it again!)
6. Go back to GitHub → New repository secret
   - Name: `CLOUDFLARE_API_TOKEN`
   - Secret: Paste the token you copied
   - Click "Add secret"

**Secret #2: CLOUDFLARE_ACCOUNT_ID**

1. Go to: https://dash.cloudflare.com
2. Look at the right sidebar - you'll see "Account ID"
3. Click to copy it (it looks like: `724d702e5eb5521c9a346a5b84bdfb1c`)
4. Go back to GitHub → New repository secret
   - Name: `CLOUDFLARE_ACCOUNT_ID`
   - Secret: Paste the Account ID
   - Click "Add secret"

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

## Cloudflare Pages Compatibility Flag

**IMPORTANT:** You need to enable Node.js compatibility in Cloudflare Pages dashboard.

### Steps to Add nodejs_compat Flag:

1. Go to: https://dash.cloudflare.com
2. Click **"Workers & Pages"** in left sidebar
3. Click on **"portfolio-website"** project
4. Click **"Settings"** tab
5. Scroll to **"Compatibility flags"** section
6. Click **"Add flag"**
7. Type: `nodejs_compat`
8. Click **"Save"**

This enables Node.js APIs needed for the app to run on Cloudflare Workers.

## Current Deployment Status

- ✅ Frontend Code: Complete and working
- ✅ Build: Passing locally and in CI
- ✅ Cloudflare Pages Project: Created
- ✅ GitHub Secrets: Configured
- ⏳ Compatibility Flag: Needs to be added in dashboard
- 🌐 Live URL: https://9f1732a1.portfolio-website-9xv.pages.dev

## Next Steps

1. ✅ Add GitHub secrets (DONE)
2. **Add nodejs_compat flag in Cloudflare dashboard** (see above)
3. Redeploy: `pnpm deploy`
4. Verify site works correctly
