import { Locator } from "@playwright/test";
import { selector } from "../SelectorDecorator";

@selector("#opc-shipping_method")
export default class ShippingMethodComponent {
    static selectorValue(selectorValue: any): any {
        throw new Error("Method not implemented.");
    }
    
    protected component: Locator;

    private methodListSel = "div[class='method-name']";
    private readonly continueBtnSel = "input[type='button']";


    protected constructor(component: Locator) {
        this.component = component;

    }

    public async selectRandomMethod(): Promise<void> {
        const  methodShipping = await this.component.locator(this.methodListSel).all();
        let shippingMethod: string[] = [];
        for (const method of methodShipping) {
           const methodText = await method.innerText();
           console.log(methodText);
           shippingMethod.push(methodText);         
        }       
        const randomIndex = Math.floor(Math.random() * shippingMethod.length);
        await methodShipping[randomIndex].click();
        console.log(`Clicked on shipping method: ${shippingMethod[randomIndex]}`);
    }

    public async clickOnContinueBtn(): Promise<void> {
        await this.component.locator(this.continueBtnSel).click();
        await this.component.locator(this.continueBtnSel).waitFor({state: "hidden", timeout: 5 *1000});
    }

    
}