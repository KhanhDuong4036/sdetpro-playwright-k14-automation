import { Page } from "@playwright/test";
import BillingAddressComponent from "../components/checkout/BillingAddressComponent";
import ShippingMethodComponent from "../components/checkout/ShippingMethodComponent";
import PaymentMethodComponent from "../components/checkout/PaymentMethodComponent";
import PaymentInformationComponent from "../components/checkout/PaymentInformationComponent";
import ConfirmOrderComponent from "../components/checkout/ConfirmOrderComponent";
import ShippingAddressComponent from "../components/checkout/ShippingAddressComponent";


export default class CheckoutPage {

    constructor(private page:Page){
        this.page = page;
    }

    public billingAddressComponent(): BillingAddressComponent {
        return new BillingAddressComponent(this.page.locator(BillingAddressComponent.selectorValue));
    }
    
    public shippingAddressComponent(): ShippingAddressComponent {
        return new ShippingAddressComponent(this.page.locator(ShippingAddressComponent.selectorValue));
    }

    public shippingMethodComponent(): ShippingMethodComponent {
        return new ShippingMethodComponent(this.page.locator(ShippingMethodComponent.selectorValue));
    }

    public paymentMethodComponent(): PaymentMethodComponent {
        return new PaymentMethodComponent(this.page.locator(PaymentMethodComponent.selectorValue));
    }

    public paymentInformationComponent(): PaymentInformationComponent {
        return new PaymentInformationComponent(this.page.locator(PaymentInformationComponent.selectorValue));
    }

    public confirmOrderComponent(): ConfirmOrderComponent {
        return new ConfirmOrderComponent(this.page.locator(ConfirmOrderComponent.selectorValue));
    }

}