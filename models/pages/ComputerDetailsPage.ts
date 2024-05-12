import { Locator, Page } from "@playwright/test";
import ComputerEssentialComponent from "../components/computer/ComputerEssentialComponent";
import HeaderComponent from "../components/global/header/HeaderComponent";

type ComputerComponentConstructor<T extends ComputerEssentialComponent> = new(component: Locator) => T;

export default class ComputerDetailsPage {

    private barNotificationSel = '#bar-notification p';
    constructor(private page: Page){
        this.page = page;
    }

    public async getBarNotificationText(): Promise<string>{
        return await this.page.locator(this.barNotificationSel).textContent();
    }

    public headerComponent(): HeaderComponent {
        return new HeaderComponent(this.page.locator(HeaderComponent.selector));
    }

    computerComp<T extends ComputerEssentialComponent>(computerComponentClass: ComputerComponentConstructor<T>): T {
        return new computerComponentClass(this.page.locator(computerComponentClass.selectorValue));

    }

    
}