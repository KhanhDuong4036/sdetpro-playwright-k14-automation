import {test} from '@playwright/test';
import StandardComputerComponent from '../../models/components/computer/StandardComputerComponent';
import OrderComputerFlow from '../../test-flows/computer/OrderComputerFlow';
import testData from '../../test-data/computer/StandardComputerData.json';
import PAYMENT_METHOD from '../../constants/Payment';
import CREDIT_CARD_TYPE from '../../constants/CreditCardType';

test('Test Standard ComputerComponent', async ({page})=>{
    await page.goto('/build-your-own-computer');
    const computerFlow: OrderComputerFlow = new OrderComputerFlow(page, StandardComputerComponent, testData);
    await computerFlow.buildComputerSpecAndAddToCart();
    await computerFlow.verifyShoppingCart();
    await computerFlow.agreeTermOfServiceAndCheckout();
    await computerFlow.inputBillingAddress();
    await computerFlow.inputShippingAddress();
    await computerFlow.selectShippingMethod();
    await computerFlow.selectPaymentMethod(PAYMENT_METHOD.creditCard);
    await computerFlow.inputPaymentInformation(CREDIT_CARD_TYPE.discover);
    await computerFlow.confirmOrder();




})