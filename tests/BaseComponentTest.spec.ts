import {test} from '@playwright/test';
import HomePage from '../models/pages/HomePage';

import FooterComponent from '../models/components/global/footer/FooterComponent';
import InformationColumnComponent from '../models/components/global/footer/InformationColumnComponent';
import CustomerServiceColumnComponent from '../models/components/global/footer/CustomerServiceColumnComponent';
import MyAccountColumnComponent from '../models/components/global/footer/MyAccountColumnComponent';
import FollowUsColumnComponent from '../models/components/global/footer/FollowUsColumnComponent';

test('Test Base Component in Page ', async ({page})=>{
   
    await page.goto('https://demowebshop.tricentis.com/');
    const homePage: HomePage = new HomePage(page);
    const footerComponent: FooterComponent = homePage.footerComponent();
    const informationColumnComponent: InformationColumnComponent = footerComponent.informationColumnComponent();
    const customerServiceColumnComponent: CustomerServiceColumnComponent = footerComponent.customerServiceColumnComponent();
    const myAccountColumnComponent: MyAccountColumnComponent = footerComponent.myAccountColumnComponent();
    const followUsColumnComponent: FollowUsColumnComponent = footerComponent.followUsColumnComponent();

    const informationColumnTitle = await informationColumnComponent.title().textContent();
    const customerServiceColumnTitle = await customerServiceColumnComponent.title().textContent();
    const myAccountColumnTitle = await myAccountColumnComponent.title().textContent();
    const followUsColumnTitle = await followUsColumnComponent.title().textContent();


    console.log(`informationColumnTitle:  ${informationColumnTitle}`);
    console.log(`customerServiceColumnTitle:  ${customerServiceColumnTitle}`);
    console.log(`myAccountColumnTitle:  ${myAccountColumnTitle}`);
    console.log(`followUsColumnTitle:  ${followUsColumnTitle}`);
    

    await page.waitForTimeout(2000);

})