import { Locator } from "@playwright/test";
import { selector } from "../SelectorDecorator";

@selector("#opc-payment_info")
export default class PaymentInformationComponent {
    
    protected component: Locator;

    private priceTableRowSel = 'table tr';
    private priceTypeSel = '.cart-total-left span';
    private priceValueSel = '.cart-total-right .product-price';
    private termOfServiceSel = '#termsofservice';
    private checkoutBtn = '#checkout';

    protected constructor(component: Locator) {
        this.component = component;

    }

    public async priceCategories(): Promise<any> {
        let priceCategories = {};
        const priceTableRow = await this.component.locator(this.priceTableRowSel).all();
        for(let tableRow of priceTableRow){
            const priceTypeText = await tableRow.locator(this.priceTypeSel).textContent();
            const priceValueText = await tableRow.locator(this.priceValueSel).textContent();
            priceCategories[priceTypeText] = Number(priceValueText);
        }
        return priceCategories;
    }

    public async acceptTermOfService(): Promise<void> {
        await this.component.locator(this.termOfServiceSel).click();
    }

    public async clickCheckoutBtn(): Promise<void> {
        await this.component.locator(this.checkoutBtn).click();
    }
    
}