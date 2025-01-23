import { Locator } from "@playwright/test";
import { selector } from "../SelectorDecorator";

@selector(".cart-item-row")
export default class CartItemRowComponent {
    
    protected component: Locator;

    private unitPriceSel = '.product-unit-price';
    private quantitySel = 'input[class*="qty-input"]';
    private subTotalSel = '.product-subtotal';

    protected constructor(component: Locator) {
        this.component = component;

    }

    public async unitPrice(): Promise<number> {
        const unitPriceText = await this.component.locator(this.unitPriceSel).textContent();
        return Number(unitPriceText);
    }

    public async quantity(): Promise<number> {
        const quantityText = await this.component.locator(this.quantitySel).getAttribute("value");
        return Number(quantityText);
    }

    public async subTotal(): Promise<number> {
        const subTotalText = await this.component.locator(this.subTotalSel).textContent();
        return Number(subTotalText);
    }
    

    
} 