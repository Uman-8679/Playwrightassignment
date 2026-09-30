import { test, expect } from '@playwright/test';

test('Handle JavaScript confirm alert', async ({ page }) => {
  await page.goto(
    'https://www.w3schools.com/js/tryit.asp?filename=tryjs_confirm'
  );

  let alertMessage = '';
  let alertType = '';

  page.on('dialog', async (dialog) => {
    alertMessage = dialog.message();
    alertType = dialog.type();

    await dialog.accept();
  });

  const frame = page.frameLocator('#iframeResult');

  await frame.getByRole('button', { name: 'Try it' }).click();

  expect(alertType).toBe('confirm');
  expect(alertMessage).toBe('Press a button!');

  await expect(
    frame.locator('#demo')
  ).toHaveText('You pressed OK!');
});
