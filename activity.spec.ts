import { chromium } from '@playwright/test';

const browser = await chromium.launch();
const page = await browser.newPage();

await page.goto('https://www.naukri.com/registration/createAccount');

await page.getByText("I'm experienced", { exact: true }).click();

await page.locator('input[type="file"]').setInputFiles('/path/to/your/resume.pdf');

await browser.close();
