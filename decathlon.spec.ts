import { test, expect } from '@playwright/test';

test('Search product, apply filters, sort and add to cart', async ({ page }) => {

  // 1-2. Navigate to Decathlon India
  await page.goto('https://www.decathlon.in/', {
    waitUntil: 'domcontentloaded'
  });

  // 3. Verify home page
  await expect(page).toHaveTitle(/Decathlon/i);

  // 4. Click Search
  const searchButton = page.locator(
    'button[aria-label*="Search"], [data-testid*="search"]'
  ).first();

  await searchButton.click();

  // 5. Verify search input is enabled
  const searchInput = page.locator(
    'input[type="search"], input[placeholder*="Search"]'
  ).first();

  await expect(searchInput).toBeEnabled();

  // 6. Enter "shoes"
  await searchInput.fill('shoes');

  // 7. Press Enter
  await searchInput.press('Enter');

  // Wait for search results
  await page.waitForLoadState('domcontentloaded');

  // 8. Capture and print page title
  const pageTitle = await page.title();

  console.log('Page Title:', pageTitle);

  // 9. Verify page title
  expect(pageTitle).toBe('Search | shoes');

  // 10. Click Running category
  await clickFilter(page, 'Running');

  // 11. Click Men gender filter
  await clickFilter(page, 'Men');

  // 12. Click UK 10.5 shoe size
  await clickFilter(page, 'UK 10.5');

  // 13. Click Most relevant sorting dropdown
  await page.getByText('Most relevant', { exact: true }).click();

  // 14. Select Price: Low to High
  await page.getByText('Price: Low to High', { exact: true }).click();

  // Give results time to refresh
  await page.waitForTimeout(1500);

  // 15. Click first product
  const firstProduct = page.locator(
    '[data-testid*="product"] a, article a'
  ).first();

  await firstProduct.click();

  // Wait for product page
  await page.waitForLoadState('domcontentloaded');

  // 16. Select UK 10.5 - EU 45
  const size = page.getByText('UK 10.5 - EU 45', {
    exact: true
  });

  await expect(size).toBeVisible();
  await size.click();

  // 17. Add to Cart
  const addToCart = page.getByText('Add to Cart', {
    exact: true
  });

  await expect(addToCart).toBeVisible();
  await addToCart.click();

  // 18. Click Cart
  const cart = page.getByText('Cart', {
    exact: true
  }).first();

  await cart.click();

  // Wait for cart page
  await page.waitForLoadState('domcontentloaded');

  // 19. Fetch total cart value
  const total = page.locator(
    'text=/Total/i'
  ).locator('..').locator('text=/₹/').first();

  // 20. Print total cart amount
  const cartTotal = await total.textContent();

  console.log('Total Cart Amount:', cartTotal);

  expect(cartTotal).not.toBeNull();
});


async function clickFilter(page: any, filterName: string) {

  const filter = page.getByText(filterName, {
    exact: true
  }).first();

  await expect(filter).toBeVisible();

  await filter.scrollIntoViewIfNeeded();

  await filter.click();

  // Allow filter results to update
  await page.waitForTimeout(1000);
}
