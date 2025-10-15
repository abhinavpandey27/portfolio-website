import { test, expect } from '@playwright/test';

test.describe('Full User Flow', () => {
  test('complete navigation and interaction flow', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Verify page loads
    await expect(page).toHaveTitle(/Abhinav Pandey - Product Designer/);
    
    // Check NavHeader
    await expect(page.getByText('Abhinav Pandey')).toBeVisible();
    await expect(page.getByText('Now in Mumbai, India')).toBeVisible();
    
    // Check navigation links
    const workButton = page.getByRole('button', { name: '☩ Work' });
    const aboutButton = page.getByRole('button', { name: '☩ About' });
    await expect(workButton).toBeVisible();
    await expect(aboutButton).toBeVisible();
    
    // Check social links
    await expect(page.getByRole('link', { name: 'Twitter ↗' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'LinkedIn ↗' })).toBeVisible();
    
    // Click About button and verify scroll
    await aboutButton.click();
    await page.waitForTimeout(1500);
    expect(page.url()).toContain('#about');
    
    // Verify About section visible
    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeInViewport();
  });

  test('keyboard navigation works', async ({ page }) => {
    await page.goto('/');
    
    // Tab to skip link
    await page.keyboard.press('Tab');
    const skipLink = page.getByText('Skip to content');
    await expect(skipLink).toBeFocused();
    
    // Tab to navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Should be on Work button
    const workButton = page.getByRole('button', { name: '☩ Work' });
    await expect(workButton).toBeFocused();
  });

  test('responsive mobile layout', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Verify mobile layout
    await expect(page.getByText('Abhinav Pandey')).toBeVisible();
    await expect(page.getByRole('button', { name: 'MENU' })).toBeVisible();
    
    // No horizontal scroll
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
  });
});
