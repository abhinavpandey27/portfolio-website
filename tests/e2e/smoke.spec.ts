import { test, expect } from '@playwright/test';

test('homepage loads successfully', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Product Designer/);
  await expect(page.locator('h1')).toBeVisible();
});
