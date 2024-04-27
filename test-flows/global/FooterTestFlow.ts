import { Page } from "@playwright/test";
import HomePage from "../../models/pages/HomePage";
import FooterComponent from "../../models/components/global/footer/FooterComponent";
import InformationColumnComponent from "../../models/components/global/footer/InformationColumnComponent";

export default class FooterTestFlow {
    constructor(private page: Page) {
        this.page = page;
    }

    // Service Method
    async verifyFooterComponent(): Promise<void> {
        await this.verifyInformationColumn();
        this.verifyCustomerServiceColumn();
        this.verifyMyAccountColumn();
        this.verifyFollowUsColumn();

    }

    // Support Method
    private async verifyInformationColumn(): Promise<void> {
        const homePage: HomePage = new HomePage(this.page);
        const footerComponent: FooterComponent = homePage.footerComponent();
        const informationColumnComponent: InformationColumnComponent = footerComponent.informationColumnComponent();
        const title = await informationColumnComponent.title().textContent();
        console.log(title);


    }

    private verifyCustomerServiceColumn(): void {

    }

    private verifyMyAccountColumn(): void {

    }

    private verifyFollowUsColumn(): void {

    }


}