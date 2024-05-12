import { Locator } from "@playwright/test";
import { selector } from "./SelectorDecorator";

@selector(".product-essential")
export default class BaseItemDetailComponent {
    
    protected component: Locator;

    private allOptionSel: string = '.option-list input';
    private priceSel: string = '.product-price';
    private productQuantitySel: string = 'input[class*="qty-input"]';
    private addToCartBtn: string = 'input[id^="add-to-cart-button"]';

    protected constructor(component: Locator) {
        this.component = component;

    }

    public async getProductPrice(): Promise<number> {
        const productPriceEle: Locator = await this.component.locator(this.priceSel);
        return Number(productPriceEle.textContent());
    }

    public async getProductQuantity(): Promise<number> {
        const productQuantity: Locator = await this.component.locator(this.productQuantitySel);
        return Number(await productQuantity.getAttribute('value'));
    }

    public async unselectDefaultOption(): Promise<void> {
        const allOptions: Locator[] =await this.component.locator(this.allOptionSel).all();
        for(let option of allOptions){
            const isSelected = await option.getAttribute('checked');
            if(isSelected){
                await option.click();
            }
        }
    }

    public async clickAddToCartBtn(): Promise<void> {
        const addToCartBtn: Locator = await this.component.locator(this.addToCartBtn);
        await addToCartBtn.scrollIntoViewIfNeeded();
        await addToCartBtn.click();
    }


 
}