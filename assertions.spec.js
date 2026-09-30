import { test, expect } from '@playwright/test';

test('LeafGround Input Page - Playwright Practice', async ({ page }) => {

  await page.goto('https://leafground.com/input.xhtml');

  await expect(page).toHaveTitle(/Input Components/);

  const nameTextbox = page.getByPlaceholder('Type your name');

  await expect(nameTextbox).toBeVisible();
  await expect(nameTextbox).toBeEnabled();
  await expect(nameTextbox).toBeEditable();

  await nameTextbox.fill('Uma Maheswari');

  await expect(nameTextbox).toHaveValue('Uma Maheswari');

  // Soft assertion
  await expect.soft(nameTextbox).toBeEnabled();

  console.log('Soft assertion executed');

  await nameTextbox.fill('Playwright Learning');

  await expect(nameTextbox).toHaveValue('Playwright Learning');

  console.log('Test execution completed');
});