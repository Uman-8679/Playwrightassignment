import { test, expect } from '@playwright/test';


// ============================================================
// CREDENTIALS
// ============================================================
// Set these in PowerShell before running:
//
// $env:SF_USERNAME="your_salesforce_username"
// $env:SF_PASSWORD="your_salesforce_password"
// $env:LEAFTAPS_USERNAME="your_leaftaps_username"
// $env:LEAFTAPS_PASSWORD="your_leaftaps_password"
// ============================================================

const SF_USERNAME = 'your_salesforce_username';
const SF_PASSWORD = 'your_salesforce_password';

const LEAFTAPS_USERNAME = 'your_actual_leaftaps_username';
const LEAFTAPS_PASSWORD = 'your_actual_leaftaps_password';


// ============================================================
// SALESFORCE LOGIN
// ============================================================

async function loginSalesforce(page) {

    await page.goto('https://login.salesforce.com', {
        waitUntil: 'domcontentloaded'
    });

    await page.locator('#username').fill(SF_USERNAME);
    await page.locator('#password').fill(SF_PASSWORD);

    // Salesforce Login button
    await page.locator('#Login').click();

    // Wait for Salesforce to load
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
}


// ============================================================
// SALESFORCE APP LAUNCHER
// ============================================================

async function openSalesApp(page) {

    // Toggle/App Launcher button
    const appLauncher = page.getByRole('button', {
        name: /App Launcher/i
    });

    await appLauncher.click();

    // View All
    await page.getByText('View All', {
        exact: true
    }).click();

    // Sales application
    await page.getByText('Sales', {
        exact: true
    }).click();

    await page.waitForTimeout(2000);
}


// ============================================================
// ASSIGNMENT 1
// CREATE LEAD
// ============================================================

test('Assignment 1 - Create Lead', async ({ page }) => {

    await loginSalesforce(page);

    // 1, 2, 3 - Open Sales
    await openSalesApp(page);

    // 4 - Click Leads
    await page.getByRole('link', {
        name: 'Leads',
        exact: true
    }).click();

    await page.waitForTimeout(2000);

    // 5 - Click New
    await page.getByRole('button', {
        name: 'New',
        exact: true
    }).click();

    await page.waitForTimeout(1500);

    // 6 - Select Salutation
    const salutation = page.getByLabel('Salutation');

    if (await salutation.count() > 0) {
        await salutation.click();

        await page.getByRole('option', {
            name: 'Mr.'
        }).click();
    }

    // 7 - Last Name
    await page.getByLabel('Last Name').fill('Uma');

    // 8 - Company
    await page.getByLabel('Company').fill('Playwright Company');

    // 9 - Save
    await page.getByRole('button', {
        name: 'Save',
        exact: true
    }).click();

    await page.waitForTimeout(2000);

    // Verify Lead created
    await expect(
        page.getByText('Uma', {
            exact: true
        }).first()
    ).toBeVisible();

    console.log('Assignment 1 PASSED - Lead created successfully');
});


// ============================================================
// ASSIGNMENT 2
// EDIT LEAD - LEAFTAPS
// ============================================================

test('Assignment 2 - Edit Lead', async ({ page }) => {

    // 1 - Launch browser / open website
    await page.goto(
        'http://leaftaps.com/opentaps/control/main',
        {
            waitUntil: 'domcontentloaded'
        }
    );

    // 2 - Username
    await page.locator('#username').fill(
        LEAFTAPS_USERNAME
    );

    // 3 - Password
    await page.locator('#password').fill(
        LEAFTAPS_PASSWORD
    );

    // 4 - Login
    await page.locator('input[type="submit"]').click();

    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1500);

    // 5 - CRM/SFA
    await page.getByText('CRM/SFA', {
        exact: true
    }).click();

    // 6 - Leads
    await page.getByText('Leads', {
        exact: true
    }).click();

    // 7 - Create Lead
    await page.getByText('Create Lead', {
        exact: true
    }).click();

    // 8 - Company
    await page.locator(
        '#createLeadForm_companyName'
    ).fill('Playwright Company');

    // 9 - First Name
    await page.locator(
        '#createLeadForm_firstName'
    ).fill('Uma');

    // 10 - Last Name
    await page.locator(
        '#createLeadForm_lastName'
    ).fill('Maheswari');

    // 11 - Create Lead
    await page.getByRole('submit', {
        name: /Create Lead/i
    }).click();

    await page.waitForLoadState('domcontentloaded');

    // 12 - Edit
    await page.getByText('Edit', {
        exact: true
    }).click();

    // 13 - Change Company
    await page.locator(
        '#updateLeadForm_companyName'
    ).fill('Updated Playwright Company');

    // 14 - Update
    await page.getByRole('submit', {
        name: /Update/i
    }).click();

    await page.waitForLoadState('domcontentloaded');

    // Verify updated company
    await expect(
        page.getByText(
            'Updated Playwright Company',
            { exact: true }
        )
    ).toBeVisible();

    console.log('Assignment 2 PASSED - Lead edited successfully');
});


// ============================================================
// ASSIGNMENT 3
// CREATE INDIVIDUAL
// ============================================================

test('Assignment 3 - Create Individual', async ({ page }) => {

    await loginSalesforce(page);

    // 1, 2, 3 - Open Individuals application
    const appLauncher = page.getByRole('button', {
        name: /App Launcher/i
    });

    await appLauncher.click();

    // View All
    await page.getByText('View All', {
        exact: true
    }).click();

    // Individuals application
    await page.getByText('Individuals', {
        exact: true
    }).click();

    await page.waitForTimeout(2000);

    // 4 - Click dropdown/action button in Individuals
    const actionButtons = page.locator(
        'button[title*="action" i]'
    );

    if (await actionButtons.count() > 0) {

        await actionButtons.first().click();

    } else {

        // Alternative Salesforce action button
        await page.getByRole('button', {
            name: /Show.*actions/i
        }).first().click();
    }

    // 5 - New Individual
    await page.getByText(
        'New Individual',
        { exact: true }
    ).click();

    await page.waitForTimeout(1500);

    // 6 - Last Name
    await page.getByLabel('Last Name').fill('Uma');

    // 7 - Save
    await page.getByRole('button', {
        name: 'Save',
        exact: true
    }).click();

    await page.waitForTimeout(2000);

    // Verify Individual
    await expect(
        page.getByText('Uma', {
            exact: true
        }).first()
    ).toBeVisible();

    console.log(
        'Assignment 3 PASSED - Individual created successfully'
    );
});


// ============================================================
// ASSIGNMENT 4
// EDIT INDIVIDUAL
// ============================================================

test('Assignment 4 - Edit Individual', async ({ page }) => {

    await loginSalesforce(page);

    // 1, 2, 3 - Open Individuals
    const appLauncher = page.getByRole('button', {
        name: /App Launcher/i
    });

    await appLauncher.click();

    await page.getByText('View All', {
        exact: true
    }).click();

    await page.getByText('Individuals', {
        exact: true
    }).click();

    await page.waitForTimeout(2000);

    // 4 - Click Individuals tab
    await page.getByRole('link', {
        name: 'Individuals',
        exact: true
    }).click();

    await page.waitForTimeout(1500);

    // 5 - Search Individual Last Name
    const searchBox = page.getByPlaceholder(
        /Search this list/i
    );

    await searchBox.fill('Uma');
    await searchBox.press('Enter');

    await page.waitForTimeout(2000);

    // 6 - Click dropdown/action menu
    const rowAction = page.getByRole('button', {
        name: /Show.*actions/i
    }).last();

    await rowAction.click();

    // Select Edit
    await page.getByText(
        'Edit',
        { exact: true }
    ).click();

    await page.waitForTimeout(1500);

    // 7 - Salutation = Mr
    const salutation = page.getByLabel(
        'Salutation'
    );

    await salutation.click();

    await page.getByRole('option', {
        name: /^Mr\.?$/
    }).click();

    // 8 - First Name
    await page.getByLabel(
        'First Name'
    ).fill('Uma');

    // 9 - Save
    await page.getByRole('button', {
        name: 'Save',
        exact: true
    }).click();

    await page.waitForTimeout(2000);

    // Verify First Name
    await expect(
        page.getByText('Uma', {
            exact: true
        }).first()
    ).toBeVisible();

    console.log(
        'Assignment 4 PASSED - Individual edited successfully'
    );
});