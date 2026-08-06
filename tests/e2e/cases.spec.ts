import { expect, test } from '@playwright/test';

test('filters the case queue and opens details', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Cases' })).toBeVisible();
  await expect(page.getByRole('table')).toBeVisible();
  await page.getByRole('searchbox', { name: 'Search cases' }).fill('payment');
  await expect(page.getByRole('table').getByText(/Payment authorization/i).first()).toBeVisible();
  await page.getByRole('table').getByText(/Payment authorization/i).first().click();
  await expect(page.getByRole('dialog', { name: /SD-/ })).toBeVisible();
});

test('retains selection while navigating pages', async ({ page }) => {
  await page.goto('/');
  const first = page.getByRole('checkbox', { name: /^Select SD-/ }).first();
  await first.check();
  await expect(page.getByText('1 selected')).toBeVisible();
  await page.getByRole('button', { name: 'Next page' }).click();
  await expect(page.getByText('1 selected')).toBeVisible();
});
