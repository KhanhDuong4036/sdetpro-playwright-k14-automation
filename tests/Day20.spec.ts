import { test } from '@playwright/test';

test('Handle Dropdown', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dropdown');
    const dropdownEle = await page.locator('#dropdown');

    // Select Option 1
    await dropdownEle.selectOption({index: 1});
    await page.waitForTimeout(2000);
    // Select Option 2
    await dropdownEle.selectOption({value: '2'});
    await page.waitForTimeout(2000);

})

test('Handle iFrame', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/iframe');
    const iframeEle = await page.frameLocator('iframe[id^="mce"]');

    // Find edit text area
    const editTextArea = await iframeEle.locator('body p');
    await editTextArea.click();
    await editTextArea.clear();
    await editTextArea.fill('Khanh Duong 4036');

    // Interact with the main frame's elements
    const footerLinkEle = await page.locator('a:has-text("Elemental")');
    await footerLinkEle.click();
    await page.waitForTimeout(2000);

})

test.only('Handle Mouse hover and narrow down searching scope', async ({page})=>{

    await page.goto('https://the-internet.herokuapp.com/hovers');

    // Find all figures
    const allFigureEles = await page.locator('.figure').all();
    
    // Loop and narrow down searching scope
    for(const figureEle of allFigureEles){
        const imgEle = await figureEle.locator('img');

        const usernameEle = await figureEle.locator('h5');
        const viewProfileEle = await figureEle.locator('a');
        const isUserNameVisible = await usernameEle.isVisible();
        const isViewProfileVisible = await viewProfileEle.isVisible();
        console.log(`isUserNameVisible: ${isUserNameVisible}`);
        console.log(`isViewProfileVisible: ${isViewProfileVisible}`);
              
        await imgEle.hover();
        const isAfterUserNameVisible = await usernameEle.isVisible();
        const isAfterViewProfileVisible = await viewProfileEle.isVisible();

        console.log(`isAfterUserNameVisible: ${isAfterUserNameVisible}`);
        console.log(`isAfterViewProfileVisible: ${isAfterViewProfileVisible}`);

        await page.waitForTimeout(2000);
    }
})

test('Checking element status and hanlde dynamic states', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');

    const checkboxComp = await page.locator('#checkbox-example');
    
    // Checkbox Component
    const checkboxEle = await checkboxComp.locator('#checkbox input');
    const isEnabled = await checkboxEle.isEnabled();
    let isSelected = await checkboxEle.isChecked();
    
    console.log(`Is checkbox enabled: ${isEnabled}`);
    console.log(`Is checkbox selected: ${isSelected}`);
    
    if(!isSelected){
        await checkboxEle.click();
    }
    
    isSelected = await checkboxEle.isChecked();
    
    if(!isSelected){
        await checkboxEle.click();
    }
    
    const removeBtnEle =await checkboxComp.locator('button');
    await removeBtnEle.click();
    await page.waitForSelector('#checkbox-example #checkbox input', {state: 'hidden', timeout: 5 * 1000});
    
    // Input Example Component
    const inputExampleComp = await page.locator('#input-example');
    const inputTextBoxEle = await inputExampleComp.locator('input');
    const enabledBtnEle = await inputExampleComp.locator('button');
    const isEditabled = await inputTextBoxEle.isEditable();
    console.log(`Is input example field editabled: ${isEditabled}`);

    if(!isEditabled){
        await enabledBtnEle.click();
        await isEditabled;
        await inputTextBoxEle.fill('Khanh Duong');
    }
      
})