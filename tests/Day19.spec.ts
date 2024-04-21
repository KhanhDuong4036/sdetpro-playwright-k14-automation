import { test } from '@playwright/test';

test('Link Text - XPath', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    const footerLinkEle = await page.waitForSelector('//a[contains(text(), "Elemental_1")]', { timeout: 10000 });
    await footerLinkEle.click();
    page.pause();

})

test('Link Text - CSS', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    const footerLinkEle = await page.locator('a:has-text("Elemental")');
    await footerLinkEle.click();
    await page.waitForTimeout(2000);
})

test('Link Text - Filtering', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    const footerLinkEle = await page.locator('a').filter({ hasText: "Elemental" });
    await footerLinkEle.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);

    await footerLinkEle.click();
    await page.waitForTimeout(2000);
})

test('Multiple matching', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    const footerLinkEles = await page.locator('a').elementHandles();
    await footerLinkEles[10].click();
    await page.waitForTimeout(2000);
})

test('Handle Login form', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    // Navigate to form authentication
    await page.locator('a').filter({ hasText: "Form Authentication" }).click();
    await page.waitForLoadState("domcontentloaded");

    // Form interaction
    await page.locator("#username").fill("khanh@gmail.com");
    await page.locator("#password").fill("123123123");
    await page.waitForTimeout(2000);
    await page.locator('button[type="submit"]').click();
    await page.waitForLoadState("domcontentloaded");

    await page.waitForTimeout(2000);
})

test.only('Element attribute, page title, url, ...', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    // Navigate to form authentication
    await page.locator('a').filter({ hasText: "Form Authentication" }).click();
    await page.waitForLoadState("domcontentloaded");

    // Form interaction
    await page.locator("#username").fill("khanh@gmail.com");
    await page.locator("#password").fill("123123123");
    await page.waitForTimeout(2000);
    await page.locator('button[type="submit"]').click();
    await page.waitForLoadState("domcontentloaded");

    // Get Text
    const textContent = await page.locator('h4').textContent();
    const innerText = await page.locator('h4').innerText();

    console.log(textContent);
    console.log(innerText);
    

    await page.waitForTimeout(2000);
})