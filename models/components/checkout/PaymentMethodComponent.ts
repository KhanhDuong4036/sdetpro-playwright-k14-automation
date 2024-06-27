import { Locator } from "@playwright/test";
import { selector } from "../SelectorDecorator";

@selector("#opc-payment_method")
export default class PaymentMethodComponent {
    static selectorValue(selectorValue: any): any {
        throw new Error("Method not implemented.");
    }
    
    protected component: Locator;

    private CODSel = "[value='Payments.CashOnDelivery']";
    private checkMoneyOrderSel = "[value='Payments.CheckMoneyOrder']";
    private creditCardSel = "[value='Payments.Manual']";
    private purchaseOrderSel = "[value='Payments.PurchaseOrder']";
    private continueBtnSel = "input[type='button']";


    protected constructor(component: Locator) {
        this.component = component;

    }

    public async selectCODMethod(): Promise<void> {
        await this.component.locator(this.CODSel).click();
    }

    public async selectCheckMoneyOrderMethod(): Promise<void> {
        await this.component.locator(this.checkMoneyOrderSel).click();
    }

    public async selectCreditCardMethod(): Promise<void> {
        await this.component.locator(this.creditCardSel).click();
    }

    public async selectPurchaseOrderMethod(): Promise<void> {
        await this.component.locator(this.purchaseOrderSel).click();
    }

    public async clickOnContinueBtn(): Promise<void> {
        await this.component.locator(this.continueBtnSel).click();
        await this.component.locator(this.continueBtnSel).waitFor({state: "hidden", timeout: 5 *1000});
    }

  
}