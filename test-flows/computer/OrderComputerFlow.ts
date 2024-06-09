import { Page } from "@playwright/test";
import ComputerEssentialComponent from "../../models/components/computer/ComputerEssentialComponent";
import ComputerDetailsPage from "../../models/pages/ComputerDetailsPage";

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
          console.log(`type of basePrice : ${basePrice}`);
          console.log(`type of additionnalPrices : ${additionnalPrices}`);
          console.log(`type of productQuantity : ${this.productQuantity}`);
          console.log(`totalPrice: ${this.totalPrice}`);
          await computerComp.clickAddToCartBtn();
          const barNotificationText = await computerDetailsPage.getBarNotificationText();
          if (!barNotificationText.startsWith("The product has been added")) {
               throw new Error('Failed to add product to cart');
          }
          await computerDetailsPage.headerComponent().clickOnShoppingCartLink();

     }

     public async verifyShoppingCart(): Promise<void> {
          
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