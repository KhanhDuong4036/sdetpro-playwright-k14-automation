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

    // Test the Shopping Cart Page
    const shoppingCartPage: ShoppingCartPage = new ShoppingCartPage(page);
    const cartItemRowComponentList = await shoppingCartPage.cartItemRowComponentList();
    const totalComponent = await shoppingCartPage.totalComponent();
    for(let cartItemRowComponent of cartItemRowComponentList){
        const unitPrice = await cartItemRowComponent.unitPrice();
        const quantity = await cartItemRowComponent.quantity();
        const subTotal = await cartItemRowComponent.subTotal();
        console.log(`unitPrice: ${unitPrice}, quantity: ${quantity},subTotal: ${subTotal} `);
        
    }
    
    const priceCategories = await totalComponent.priceCategories();
    console.log(`priceCategories: ${JSON.stringify(priceCategories)}`);

})