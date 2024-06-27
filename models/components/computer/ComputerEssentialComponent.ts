import { Locator } from "@playwright/test";
import BaseItemDetailComponent from "../BaseItemDetailComponent";

export default abstract class ComputerEssentialComponent extends BaseItemDetailComponent{

    protected component: Locator;

    private allOptionSel = '.option-list input';

    protected constructor(component: Locator) {
        super(component);
        this.component = component;

    }

    public abstract selectProcessorType(type: string): Promise<string>;
    public abstract selectRAMType(type: string): Promise<string>;

    public async selectHDDType(type: string): Promise<string> {
        return await this.selectCompOption(type);

    }

    public async selectOS(type: string): Promise<string> {
        return await this.selectCompOption(type);

    }

    public async selectSoftwareType(type: string): Promise<string> {
        return await this.selectCompOption(type);

    }
    protected async selectCompOption(type: string): Promise<string> {
        const selectorValue = `//label[contains(text(),"${type}")]`;
        const optionElements: Locator[] = await this.component.locator(selectorValue).all();
        const FIRST_ELEMENT_INDEX = 0;
        const optionEle = optionElements[FIRST_ELEMENT_INDEX];
        await optionEle.scrollIntoViewIfNeeded();
        const optionText = await optionEle.innerText();
        await optionEle.click();
        return optionText;
    }
}