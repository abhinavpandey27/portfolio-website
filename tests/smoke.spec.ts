import { test, expect } from '@playwright/test';

test('homepage loads successfully', async ({ page }) => {
  await page.goto('/');
  
  await expect(page).toHaveTitle(/Product Designer/);
  
  const heading = page.locator('h1');
  await expect(heading).toBeVisible();
});
