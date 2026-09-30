const { test, expect } = require('@playwright/test');

test('Handle Prompt Dialog', async ({ page }) => {
  // 1. Launch the URL
  await page.goto('https://www.leafground.com/alert.xhtml');

  // 2 & 3. Handle the JavaScript prompt
  page.once('dialog', async dialog => {
    expect(dialog.type()).toBe('prompt');
    expect(dialog.message()).toContain('Please enter your name');

    // 4. Accept the prompt with the required value
    await dialog.accept('Playwright');
  });

  // Click "Prompt Dialog"
  await page.getByText('Prompt Dialog', { exact: true }).click();
});
