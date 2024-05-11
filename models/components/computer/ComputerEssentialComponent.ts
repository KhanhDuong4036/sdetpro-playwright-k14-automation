import { Locator } from "@playwright/test";

export default abstract class ComputerEssentialComponent {

    protected component: Locator;
    protected constructor(component: Locator) {
        this.component = component;

    }

    public abstract selectProcessorType(type: string): Promise<void>;
    public abstract selectRAMType(type: string): Promise<void>;

    public async selectHDDType(type: string): Promise<void>{
        await this.selectCompOption(type);
        
    }

    public async selectOS(type: string): Promise<void>{
        await this.selectCompOption(type);

    }

    public async selectSoftwareType(type: string): Promise<void>{
        await this.selectCompOption(type);

    }

    protected async selectCompOption(type: string): Promise<void> {
        const selectorValue = `//label[contains(text(),"${type}")]`;
        const optionElements: Locator[] = await this.component.locator(selectorValue).all();
        const FIRST_ELEMENT_INDEX = 0;
        await optionElements[FIRST_ELEMENT_INDEX].scrollIntoViewIfNeeded();
        await optionElements[FIRST_ELEMENT_INDEX].click();
    }
}