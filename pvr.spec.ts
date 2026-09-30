import { test, expect, Page } from '@playwright/test';

test.describe('PVR Cinemas - Dynamic Movie Ticket Booking', () => {

  test('Verify dynamic movie ticket booking flow', async ({ page }) => {

    // 1. Launch browser and navigate to PVR Cinemas
    await page.goto('https://www.pvrcinemas.com/', {
      waitUntil: 'domcontentloaded',
      timeout: 60_000
    });

    // 2. Handle cookie/consent popup if displayed
    await acceptPopupIfVisible(page, [
      'Accept',
      'Accept All',
      'I Agree',
      'Allow All'
    ]);

    // 3. Select city
    // Replace the locator/text according to the current PVR UI.
    const city = page.getByText('Bengaluru', { exact: true }).first();

    if (await city.isVisible().catch(() => false)) {
      await city.click();
    }

    // 4. Click Cinema option
    await page.getByText('Cinema', { exact: true }).click();

    // 5. Open Select Cinema dropdown
    const cinemaDropdown = page.getByText(/Select Cinema/i).first();
    await cinemaDropdown.click();

    // 6. Dynamically select first available cinema
    const cinemas = page.locator(
      '[role="option"]:visible'
    );

    const cinemaCount = await cinemas.count();

    if (cinemaCount === 0) {
      throw new Error('No cinema is available for the selected city.');
    }

    await cinemas.first().click();

    // 7. Select an available date
    const availableDates = page.locator(
      'button:visible'
    ).filter({
      hasText: /Today|Tomorrow/
    });

    if (await availableDates.count() > 0) {
      await availableDates.first().click();
    } else {
      // Fallback: select the first enabled date
      const dates = page.locator(
        '[data-date]:visible:not([disabled])'
      );

      if (await dates.count() === 0) {
        throw new Error('No available date found.');
      }

      await dates.first().click();
    }

    // 8. Select an available movie dynamically
    const movies = page.locator(
      '[data-movie]:visible'
    );

    if (await movies.count() > 0) {
      await movies.first().click();
    } else {
      // Generic fallback for movie cards
      const movieCards = page.locator(
        '.movie-card:visible, .movie-item:visible'
      );

      if (await movieCards.count() === 0) {
        throw new Error('No movie available.');
      }

      await movieCards.first().click();
    }

    // 9. Select an available show time
    const shows = page.locator(
      '[data-show-time]:visible'
    );

    if (await shows.count() > 0) {
      await shows.first().click();
    } else {
      const showTimes = page.locator(
        '.show-time:visible, .timing:visible'
      );

      if (await showTimes.count() === 0) {
        throw new Error('No show time available.');
      }

      await showTimes.first().click();
    }

    // 10. Click Submit
    const submitButton = page.getByRole('button', {
      name: /submit/i
    });

    await expect(submitButton).toBeVisible();
    await submitButton.click();

    // 11 & 12. Handle any popup/confirmation
    await acceptPopupIfVisible(page, [
      'Accept',
      'Accept All',
      'I Agree',
      'Continue',
      'Confirm',
      'Proceed'
    ]);

    // Wait for seating layout
    await page.waitForLoadState('domcontentloaded').catch(() => {});

    // 13. Select any available seat
    const availableSeats = page.locator(
      '[data-seat]:visible:not(.selected):not(.occupied):not(.disabled)'
    );

    let seat;

    if (await availableSeats.count() > 0) {
      seat = availableSeats.first();
    } else {
      // Generic fallback
      const seats = page.locator(
        '.seat.available:visible, ' +
        '.available-seat:visible, ' +
        '[class*="seat"][class*="available"]:visible'
      );

      if (await seats.count() === 0) {
        throw new Error('No available seat found.');
      }

      seat = seats.first();
    }

    await seat.click();

    // 14. Verify selected seat information
    const selectedSeatInfo = page.locator(
      '.selected-seat:visible, ' +
      '[data-selected-seat]:visible, ' +
      '.seat-info:visible'
    );

    await expect(selectedSeatInfo.first()).toBeVisible({
      timeout: 10_000
    });

    // 15. Verify total ticket amount
    const totalAmount = page.locator(
      '[data-total]:visible, ' +
      '.total-amount:visible, ' +
      '.total-price:visible, ' +
      '.grand-total:visible'
    );

    await expect(totalAmount.first()).toBeVisible({
      timeout: 10_000
    });

    // Verify that an amount is displayed
    const amountText = await totalAmount.first().innerText();

    expect(amountText).toMatch(
      /₹|Rs\.?|INR|\d/
    );

    // 16. Verify page title
    const title = await page.title();

    expect(title.length).toBeGreaterThan(0);

    console.log(`Page title: ${title}`);
    console.log(`Total amount: ${amountText}`);

    // 17. Click Proceed
    const proceedButton = page.getByRole('button', {
      name: /proceed/i
    }).first();

    await expect(proceedButton).toBeVisible();
    await expect(proceedButton).toBeEnabled();

    await proceedButton.click();

    // Verify that the flow moved forward
    await page.waitForLoadState('domcontentloaded').catch(() => {});

    expect(page.url()).not.toBe('https://www.pvrcinemas.com/');
  });
});


/**
 * Accept popup if it appears.
 */
async function acceptPopupIfVisible(
  page: Page,
  buttonNames: string[]
): Promise<void> {

  for (const name of buttonNames) {

    const button = page.getByRole('button', {
      name: new RegExp(`^${name}$`, 'i')
    }).first();

    if (await button.isVisible().catch(() => false)) {
      await button.click();
      await page.waitForTimeout(500);
      return;
    }
  }
}
