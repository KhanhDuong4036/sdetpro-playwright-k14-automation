import {test} from '@playwright/test';
import ComputerDetailsPage from '../../models/pages/ComputerDetailsPage';
import CheapComputerComponent from '../../models/components/computer/CheapComputerComponent';
import StandardComputerComponent from '../../models/components/computer/StandardComputerComponent';
import ComputerEssentialComponent from '../../models/components/computer/ComputerEssentialComponent';
import OrderComputerFlow from '../../test-flows/computer/OrderComputerFlow';

test('Test Cheap ComputerComponent', async ({page})=>{
    await page.goto('https://demowebshop.tricentis.com/build-your-cheap-own-computer');
    const computerFlow: OrderComputerFlow = new OrderComputerFlow(page, CheapComputerComponent);
    await computerFlow.buildComputerSpecAndAddToCart();

})