import {test} from '@playwright/test';
import CheapComputerComponent from '../../models/components/computer/CheapComputerComponent';
import OrderComputerFlow from '../../test-flows/computer/OrderComputerFlow';
import testData from '../../test-data/computer/CheapComputerData.json';
import PAYMENT_METHOD from '../../constants/Payment';
import CREDIT_CARD_TYPE from '../../constants/CreditCardType';

testData.forEach(computerData => {
    test(`Test Cheap ComputerComponent | RAM: ${computerData.ram}`, async ({page})=>{
        await page.goto('https://demowebshop.tricentis.com/build-your-cheap-own-computer');
        let computerFlow: OrderComputerFlow = new OrderComputerFlow(page, CheapComputerComponent, computerData);
        await computerFlow.buildComputerSpecAndAddToCart();
        await computerFlow.verifyShoppingCart();
        await computerFlow.agreeTermOfServiceAndCheckout();
        await computerFlow.inputBillingAddress();
        await computerFlow.inputShippingAddress();
        await computerFlow.selectShippingMethod();
        await computerFlow.selectPaymentMethod(PAYMENT_METHOD.creditCard);
        await computerFlow.inputPaymentInformation(CREDIT_CARD_TYPE.discover);
        await computerFlow.confirmOrder();
    
        await page.waitForTimeout(3*1000)
    
    })
})
