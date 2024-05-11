import {test} from '@playwright/test';

import StandardComputerComponent from '../../models/components/computer/StandardComputerComponent';
import OrderComputerFlow from '../../test-flows/computer/OrderComputerFlow';

test('Test Standard ComputerComponent', async ({page})=>{
    await page.goto('https://demowebshop.tricentis.com/build-your-own-computer');
    const computerFlow: OrderComputerFlow = new OrderComputerFlow(page, StandardComputerComponent);
    await computerFlow.buildComputerSpecAndAddToCart();

})