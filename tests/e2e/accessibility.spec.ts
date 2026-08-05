import { expect, test } from '@playwright/test';

test('main interactive controls expose accessible names', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Search cases' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Workspace navigation' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Cases pagination' })).toBeVisible();
  await page.getByRole('button', { name: 'Open preferences' }).click();
  await expect(page.getByRole('dialog', { name: 'Preferences' })).toBeVisible();
  await expect(page.getByRole('checkbox', { name: 'Compact rows' })).toBeVisible();
});
