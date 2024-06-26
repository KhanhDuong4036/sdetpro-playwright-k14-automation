import { Page } from "@playwright/test";
import ComputerEssentialComponent from "../../models/components/computer/ComputerEssentialComponent";
import ComputerDetailsPage from "../../models/pages/ComputerDetailsPage";
import ShoppingCartPage from "../../models/pages/ShoppingCartPage";
import CheckoutOptionsPage from "../../models/pages/CheckoutOptionsPage";
import defaultCheckoutUserData from "../../test-data/computer/DefaultCheckoutUser.json";
import CheckoutPage from "../../models/pages/CheckoutPage";
import BillingAddressComponent from "../../models/components/checkout/BillingAddressComponent";
import ShippingAddressComponent from "../../models/components/checkout/ShippingAddressComponent";
import ShippingMethodComponent from "../../models/components/checkout/ShippingMethodComponent";

export default class OrderComputerFlow {

     private totalPrice: number;
     private productQuantity: number;
     basePrice: number;


     constructor(
          private readonly page: Page,
          private readonly computerComponentClass: ComputerComponentConstructor<ComputerEssentialComponent>,
          private readonly computerData: any
     ) {
          this.page = page;
          this.computerComponentClass = computerComponentClass;
          this.computerData = computerData;
     }

     async buildComputerSpecAndAddToCart(): Promise<void> {
          const computerDetailsPage: ComputerDetailsPage = new ComputerDetailsPage(this.page);
          const computerComp = computerDetailsPage.computerComp(this.computerComponentClass);
          await computerComp.unselectDefaultOption();
          const selectedProcessorText = await computerComp.selectProcessorType(this.computerData.processorType);
          const selectedRAMText = await computerComp.selectRAMType(this.computerData.ram);
          const selectedHDDText = await computerComp.selectHDDType(this.computerData.hdd);
          const selectdSoftwareText = await computerComp.selectSoftwareType(this.computerData.software);
          let additionalOsPrice = 0;
          if (this.computerData.os) {
               const selectedOsText = await computerComp.selectOS(this.computerData.os);
               additionalOsPrice = this.extractAdditionalPrice(selectedOsText);

          }
          // Calculate current product prices
          const basePrice = await computerComp.getProductPrice();
          const additionnalPrices =
               this.extractAdditionalPrice(selectedProcessorText)
               + this.extractAdditionalPrice(selectedRAMText)
               + this.extractAdditionalPrice(selectedHDDText)
               + this.extractAdditionalPrice(selectdSoftwareText)
               + additionalOsPrice;
          this.productQuantity = await computerComp.getProductQuantity();
          this.totalPrice = (basePrice + additionnalPrices) * this.productQuantity;
          await computerComp.clickAddToCartBtn();
          const barNotificationText = await computerDetailsPage.getBarNotificationText();
          if (!barNotificationText.startsWith("The product has been added")) {
               throw new Error('Failed to add product to cart');
          }
          await computerDetailsPage.headerComponent().clickOnShoppingCartLink();

     }

     public async verifyShoppingCart(): Promise<void> {
          // Test the Shopping Cart Page
          const shoppingCartPage: ShoppingCartPage = new ShoppingCartPage(this.page);
          const cartItemRowComponentList = await shoppingCartPage.cartItemRowComponentList();
          const totalComponent = await shoppingCartPage.totalComponent();
          for (let cartItemRowComponent of cartItemRowComponentList) {
               const unitPrice = await cartItemRowComponent.unitPrice();
               const quantity = await cartItemRowComponent.quantity();
               const subTotal = await cartItemRowComponent.subTotal();
               console.log(`unitPrice: ${unitPrice}, quantity: ${quantity},subTotal: ${subTotal} `);

          }
          const priceCategories = await totalComponent.priceCategories();
          console.log(`priceCategories: ${JSON.stringify(priceCategories)}`);

     }

     public async agreeTermOfServiceAndCheckout(): Promise<void> {
          const shoppingCartPage: ShoppingCartPage = new ShoppingCartPage(this.page);
          await shoppingCartPage.totalComponent().acceptTermOfService();
          await shoppingCartPage.totalComponent().clickCheckoutBtn();
          const checkoutOptionsPage: CheckoutOptionsPage = new CheckoutOptionsPage(this.page);
          await checkoutOptionsPage.checkoutAsGuest();
     }

     public async inputBillingAddress(): Promise<void> {
          const {
               firstName, lastName, email, country, state, city, add1, add2, zipCode, phoneNumber
          } = defaultCheckoutUserData;
          const checkoutPage: CheckoutPage = new CheckoutPage(this.page);
          const billingAddressComponent: BillingAddressComponent = checkoutPage.billingAddressComponent();
          await billingAddressComponent.inputFirstname(firstName);
          await billingAddressComponent.inputLastName(lastName);
          await billingAddressComponent.inputEmailAddress(email);
          await billingAddressComponent.selectCountry(country);
          await billingAddressComponent.selectState(state);
          await billingAddressComponent.inputCity(city);
          await billingAddressComponent.inputAddress01(add1);
          await billingAddressComponent.inputAddress02(add2);
          await billingAddressComponent.inputZipCode(zipCode);
          await billingAddressComponent.inputPhoneNumber(phoneNumber);
          await billingAddressComponent.clickOnContinueBtn();

     }
     
     public async inputShippingAddress(): Promise<void> {
          const checkoutPage: CheckoutPage = new CheckoutPage(this.page);
          const shippingAddressComponent: ShippingAddressComponent = checkoutPage.shippingAddressComponent();
          await shippingAddressComponent.clickOnContinueBtn();
     }

     public async selectShippingMethod(): Promise<void> {
          const checkoutPage: CheckoutPage = new CheckoutPage(this.page);
          const shippingMethodComponent: ShippingMethodComponent = checkoutPage.shippingMethodComponent();
          await shippingMethodComponent.selectRandomMethod();
          await shippingMethodComponent.clickOnContinueBtn();

     }


     private extractAdditionalPrice(fullText: string): number {
          const regex = /\+\d+\.\d+/g;
          const matches = fullText.match(regex);
          if (matches) {
               return Number(matches[0].replace('+', ''));
          }
          return 0;
     }
}