import { expect, test } from '@playwright/test';

test('opens command search from keyboard and navigates results', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press(process.platform === 'darwin' ? 'Meta+K' : 'Control+K');
  const search = page.getByRole('searchbox', { name: 'Search all cases' });
  await expect(search).toBeFocused();
  await search.fill('SD-1001');
  await expect(page.getByRole('option').first()).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog', { name: /SD-1001/ })).toBeVisible();
});
