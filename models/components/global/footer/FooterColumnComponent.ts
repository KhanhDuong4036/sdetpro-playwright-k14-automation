import { Locator } from "@playwright/test";

// NOTE: a base component has NO selector
export default class FooterColumnComponent {

    private titleSel: string = 'h3';
    private linkSel: string = 'li a';

    constructor(private component: Locator) {
        this.component = component;
    }

    title(): Locator {
        return this.component.locator(this.titleSel);
    }

    link(): Promise<Array<Locator>> {
        return this.component.locator(this.linkSel).all();
    }
}