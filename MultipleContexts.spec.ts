import { test } from '@playwright/test';
import { chromium, webkit } from 'playwright';

test('Multiple browser contexts', async () => {

    // Launch Edge browser
    const edgeBrowser = await chromium.launch({
        channel: 'msedge',
        headless: false
    });

    const edgePage = await edgeBrowser.newPage();

    // Open RedBus
    await edgePage.goto('https://www.redbus.in');

    console.log('Red Bus Title:', await edgePage.title());
    console.log('Red Bus URL:', edgePage.url());


    // Launch WebKit browser
    const webkitBrowser = await webkit.launch({
        headless: false
    });

    const webkitPage = await webkitBrowser.newPage();

    // Open RedBus
    await webkitPage.goto('https://www.redbus.in');

    console.log('WebKit Title:', await webkitPage.title());
    console.log('WebKit URL:', webkitPage.url());


    // Close browsers
    await edgeBrowser.close();
    await webkitBrowser.close();

});