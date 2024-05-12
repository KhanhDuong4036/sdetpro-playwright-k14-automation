import { Page } from "@playwright/test";
import ComputerEssentialComponent from "../../models/components/computer/ComputerEssentialComponent";
import ComputerDetailsPage from "../../models/pages/ComputerDetailsPage";

export default class OrderComputerFlow {

     private totalPrice: number;
     private productQuantity: number;


     constructor(private page: Page, private computerComponentClass: ComputerComponentConstructor<ComputerEssentialComponent>) {
          this.page = page;
          this.computerComponentClass = computerComponentClass;
     }

     async buildComputerSpecAndAddToCart(): Promise<void> {
          const computerDetailsPage: ComputerDetailsPage = new ComputerDetailsPage(this.page);
          const computerComp = computerDetailsPage.computerComp(this.computerComponentClass);
          await computerComp.unselectDefaultOption();
          const selectedProcessorText = await computerComp.selectProcessorType("2.2 GHz");
          const selectedRAMText = await computerComp.selectRAMType("4GB");
          const selectedHDDText = await computerComp.selectHDDType("400 GB");
          //    await computerComp.selectSoftwareType("Office Suite");
          const basePrice = await computerComp.getProductPrice();
          const additionnalPrices =
               this.extractAdditionalPrice(selectedProcessorText)
               + this.extractAdditionalPrice(selectedRAMText)
               + this.extractAdditionalPrice(selectedHDDText);

          this.productQuantity = await computerComp.getProductQuantity();
          this.totalPrice = (basePrice + additionnalPrices) * this.productQuantity;

          console.log(`totalPrice: ${this.totalPrice}`);
          await computerComp.clickAddToCartBtn();
          const barNotificationText = await computerDetailsPage.getBarNotificationText();
          if(!barNotificationText.startsWith("The product has been added")) {
               throw new Error('Failed to add product to cart');
          } 
          await computerDetailsPage.headerComponent().clickOnShoppingCartLink();         

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