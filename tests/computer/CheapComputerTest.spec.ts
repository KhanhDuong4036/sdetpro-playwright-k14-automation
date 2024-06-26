import {test} from '@playwright/test';
import CheapComputerComponent from '../../models/components/computer/CheapComputerComponent';
import OrderComputerFlow from '../../test-flows/computer/OrderComputerFlow';
import testData from '../../test-data/computer/CheapComputerData.json';
import ShoppingCartPage from '../../models/pages/ShoppingCartPage';


test('Test Cheap ComputerComponent', async ({page})=>{
    await page.goto('https://demowebshop.tricentis.com/build-your-cheap-own-computer');
    const computerFlow: OrderComputerFlow = new OrderComputerFlow(page, CheapComputerComponent, testData);
    await computerFlow.buildComputerSpecAndAddToCart();
    await computerFlow.verifyShoppingCart();
    await computerFlow.agreeTermOfServiceAndCheckout();
    await computerFlow.inputBillingAddress();
    await computerFlow.inputShippingAddress();
    await computerFlow.selectShippingMethod();


})