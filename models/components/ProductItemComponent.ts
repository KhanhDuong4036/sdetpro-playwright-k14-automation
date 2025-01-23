import { Locator } from "@playwright/test";

export default class ProductItemComponent {

    public static selector = '.product-item';
    private productTitleLocator = '.product-title';
    private productPriceLocator = 'span[class*="actual-price"]';

    constructor(private component: Locator){
        this.component = component;
    }

    productTitle(): Locator {
        return this.component.locator(this.productTitleLocator);
    }

    productPrice(): Locator {
        return this.component.locator(this.productPriceLocator);
    }

}