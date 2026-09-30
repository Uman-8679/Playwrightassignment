const { chromium } = require('playwright');

(async () => {

    // 1. Launch browser
    const browser = await chromium.launch({
        headless: false
    });

    const page = await browser.newPage();

    // 2. Navigate to Leaftaps
    await page.goto('http://leaftaps.com/opentaps/control/main');

    // 3. Enter username
    await page.locator('#username').fill('democsr2');

    // 4. Enter password
    await page.locator('#password').fill('crmsfa');

    // 5. Click Login
    await page.locator('.decorativeSubmit').click();

    // 6. Click CRM/SFA
    await page.locator('a[href*="crmsfa"]').click();

    // 7. Click Leads
    await page.locator('a[href*="leads"]').click();

    // 8. Click Create Lead
    await page.locator('a[href*="createLead"]').click();

    // 9. Fill Company Name
    await page.locator('input[name="companyName"]').fill('TestLeaf');

    // 10. Fill First Name
    await page.locator('input[name="firstName"]').fill('Uma');

    // 11. Fill Last Name
    await page.locator('input[name="lastName"]').fill('Maheswari');

    // 12. Fill Salutation
    await page.locator('input[name="personalTitle"]').fill('Mrs');

    // 13. Fill Title
    await page.locator('input[name="generalProfTitle"]').fill('QA Engineer');

    // 14. Fill Annual Revenue
    await page.locator('input[name="annualRevenue"]').fill('500000');

    // 15. Fill Department
    await page.locator('input[name="departmentName"]').fill('Testing');

    // 16. Locate Source dropdown using CSS selector
    const sourceDropdown = page.locator('select[name="dataSourceId"]');

    // 17. Iterate through all options
    const options = await sourceDropdown.locator('option').all();

    // 18. Print each dropdown value/text
    for (const option of options) {

        const text = await option.textContent();
        const value = await option.getAttribute('value');

        console.log('Text:', text?.trim(), '| Value:', value);
    }

    // 19. Fill Phone Number
    await page.locator('input[name="primaryPhoneNumber"]').fill('9876543210');

    // 20. Click Create Lead
    await page.locator('input[value="Create Lead"]').click();

    console.log('Lead created successfully');

    // Keep browser open for a few seconds
    await page.waitForTimeout(3000);

    await browser.close();

})();