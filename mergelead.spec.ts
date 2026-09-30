import { test, expect } from '@playwright/test';

test('Merge two leads in Leaftaps', async ({ page }) => {
  // 1. Navigate to Leaftaps
  await page.goto('http://leaftaps.com/opentaps/control/main');

  // 2. Login
  await page.locator('input[name="USERNAME"]').fill('DemoSalesManager');
  await page.locator('input[name="PASSWORD"]').fill('crmsfa');

  await page.getByRole('button', { name: /login/i }).click();

  // 3. CRM/SFA
  await page.getByText('CRM/SFA', { exact: true }).click();

  // 4. Leads -> Merge Leads
  await page.getByText('Leads', { exact: true }).click();
  await page.getByText('Merge Leads', { exact: true }).click();

  // ---------------------------------------------------------
  // 5. From Lead
  // Clicking the widget opens a new browser window/tab.
  // ---------------------------------------------------------
  const fromLeadPopupPromise = page.waitForEvent('popup');

  await page.getByRole('button', { name: /from lead/i }).click();

  const fromLeadPage = await fromLeadPopupPromise;
  await fromLeadPage.waitForLoadState();

  // Select the first resulting lead ID
  await fromLeadPage.locator('table tbody tr').first().locator('a').first().click();

  // ---------------------------------------------------------
  // 6. To Lead
  // ---------------------------------------------------------
  const toLeadPopupPromise = page.waitForEvent('popup');

  await page.getByRole('button', { name: /to lead/i }).click();

  const toLeadPage = await toLeadPopupPromise;
  await toLeadPage.waitForLoadState();

  // Select the second resulting lead ID
  await toLeadPage.locator('table tbody tr').nth(1).locator('a').first().click();

  // ---------------------------------------------------------
  // 7. Click Merge
  // ---------------------------------------------------------
  await page.getByRole('button', { name: /^merge$/i }).click();

  // 8. Capture the JavaScript alert
  const alertMessage = await new Promise(async (resolve) => {
    page.once('dialog', async dialog => {
      console.log('Alert type:', dialog.type());
      console.log('Alert message:', dialog.message());

      expect(dialog.type()).toBe('alert');

      resolve(dialog.message());
      await dialog.accept();
    });
  });

  console.log('Alert message:', alertMessage);

  // ---------------------------------------------------------
  // 9. Click Merge again
  // ---------------------------------------------------------
  await page.getByRole('button', { name: /^merge$/i }).click();

  // ---------------------------------------------------------
  // 10. Assert page title
  // ---------------------------------------------------------
  await expect(page).toHaveTitle(/View Lead/i);
});
