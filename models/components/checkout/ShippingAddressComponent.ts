import { Locator } from "@playwright/test";
import { selector } from "../SelectorDecorator";

@selector("#opc-shipping")
export default class ShippingAddressComponent {
    
    protected component: Locator;

    private readonly continueBtnSel = "input[type='button']";

    protected constructor(component: Locator) {
        this.component = component;

    }

    public async clickOnContinueBtn(): Promise<void> {
        await this.component.locator(this.continueBtnSel).click();
        await this.component.locator(this.continueBtnSel).waitFor({state: "hidden", timeout: 5 *1000});

    }

}