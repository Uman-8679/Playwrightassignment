import { test } from '@playwright/test';

test('Nested frame using frameLocator', async ({ page }) => {
  await page.goto('https://www.leafground.com/frame.xhtml');

  const outerFrame = page.frameLocator('[src="page.xhtml"]');
  const innerFrame = outerFrame.frameLocator('[src="framebutton.xhtml"]');
  await innerFrame.locator('#Click').click();
})
