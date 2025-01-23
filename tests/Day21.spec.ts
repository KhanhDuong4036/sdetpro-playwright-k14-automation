import { Page, test } from '@playwright/test'
import { scrollToBottom } from '../utils/PageHelper';
import { getAdParams } from '../utils/AdHelper';

const jsAlertUrl = 'https://the-internet.herokuapp.com/javascript_alerts';
const floatingMenuUrl = 'https://the-internet.herokuapp.com/floating_menu';
const foodAndWineUrl = 'https://www.foodandwine.com';

test('Handle JS Alert', async ({ page }) => {
    await page.goto(jsAlertUrl);
    const jsAlertBtnEle = await page.locator('[onclick="jsAlert()"]')

    // MUST DEFINE EVENT FIRST
    page.on('dialog', async dialog => {
        await dialog.accept();
    });

    await jsAlertBtnEle.click();
    await page.waitForTimeout(3000);

})

test('Handle JS Confirm', async ({ page }) => {
    await page.goto(jsAlertUrl);
    const jsConfirmBtnEle = await page.locator('[onclick="jsConfirm()"]')

    // MUST DEFINE EVENT FIRST
    page.on('dialog', async dialog => {
        console.log(`Alert content is: ${dialog.message()}`);
        await dialog.dismiss();
    });

    await jsConfirmBtnEle.click();
    await page.waitForTimeout(3000);

})

test('Handle JS Prompt', async ({ page }) => {
    await page.goto(jsAlertUrl);
    const jsPrompt = await page.locator('[onclick="jsPrompt()"]')

    // MUST DEFINE EVENT FIRST
    page.on('dialog', async dialog => {
        console.log(`Alert content is: ${dialog.message()}`);
        await dialog.accept("Khanh Duong");
    });

    await jsPrompt.click();
    await page.waitForTimeout(3000);

})

test('Execute JS without parameters', async ({ page }) => {
    await page.goto(floatingMenuUrl);
    // Scroll to bottom
    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    });

    // Wait 2s
    await page.waitForTimeout(2000);

    // Scroll to top
    await page.evaluate(() => {
        window.scrollTo(0, 0);
    });

    await page.waitForTimeout(2000);

})

test('Execute JS with parameters', async ({ page }) => {
    await page.goto(floatingMenuUrl);
    // Scroll to bottom
    await scrollToBottom(page, 0.5);

    // Wait 2s
    await page.waitForTimeout(2000);
})

test.only('Execute JS and return value', async ({ page }) => {
    await page.goto(foodAndWineUrl);
    await page.waitForSelector('div[id="leaderboard-flex-1"]', {timeout: 10000});
    await scrollToBottom(page, 1);
    await page.waitForTimeout(1000);
    const returnAdValue = await getAdParams(page, 'leaderboard-flex-1');
    console.log(returnAdValue);
    
})


