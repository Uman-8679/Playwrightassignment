const { test, expect } = require('@playwright/test');

test('Create a Lead using Playwright Locators', async ({ page }) => {

    // 1. Navigate to Leaftaps
    await page.goto('http://leaftaps.com/opentaps/control/main');

    // 2. Enter username
    await page.locator('#username').fill('Demosalesmanager');

    // 3. Enter password
    await page.locator('#password').fill('crmsfa');

    // 4. Click Login
    await page.locator('.loginButton').click();

    // 5. Click CRM/SFA
    await page.getByText('CRM/SFA', { exact: true }).click();

    // 6. Click Leads
    await page.getByText('Leads', { exact: true }).click();

    // 7. Click Create Lead
    await page.getByText('Create Lead', { exact: true }).click();

    // 8. Company Name
    await page.locator('#createLeadForm_companyName')
        .fill('TestLeaf Technologies');

    // 9. First Name
    await page.locator('#createLeadForm_firstName')
        .fill('Uma');

    // 10. Last Name
    await page.locator('#createLeadForm_lastName')
        .fill('Maheswari');

    // 11. Salutation
    await page.locator('#createLeadForm_personalTitle')
        .fill('Ms.');

    // 12. Title
    await page.locator('#createLeadForm_generalProfTitle')
        .fill('QA Engineer');

    // 13. Annual Revenue
    await page.locator('#createLeadForm_annualRevenue')
        .fill('1000000');

    // 14. Department
    await page.locator('#createLeadForm_departmentName')
        .fill('Testing');

    // 15. Phone Number
    await page.locator('#createLeadForm_primaryPhoneNumber')
        .fill('9876543210');

    // 16. Click Create Lead
    await page.getByRole('button', { name: 'Create Lead' }).click();

    console.log('Lead created successfully!');
});