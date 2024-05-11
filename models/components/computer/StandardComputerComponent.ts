import { Locator } from "@playwright/test";
import ComputerEssentialComponent from "./ComputerEssentialComponent";
import { selector } from "../SelectorDecorator";

@selector(".product-essential")
export default class StandardComputerComponent extends ComputerEssentialComponent {

    private productAttributeSelector = 'select[id^="product_attribute"]';

    constructor(component: Locator){
        super(component);
    }

    async selectProcessorType(type: string): Promise<void> {
        const allDropdown: Locator[] = await this.component.locator(this.productAttributeSelector).all();
        const PROCESSOR_DROPDOWN_INDEX = 0;
        await this.selectOption(allDropdown[PROCESSOR_DROPDOWN_INDEX], type);

    }
    async selectRAMType(type: string): Promise<void> {
        const RAM_DROPDOWN_INDEX = 1;
        const allDropdown: Locator[] = await this.component.locator(this.productAttributeSelector).all();
        await this.selectOption(allDropdown[RAM_DROPDOWN_INDEX], type);

    }
    
    private async selectOption(dropdown: Locator, type: string): Promise<void> {
        const allOptions = await dropdown.locator('option').all();
        let optionIndex = 0;
        for(const option of allOptions){
            const optionText = await option.textContent();
            if(optionText?.startsWith(type)){
                optionIndex = allOptions.indexOf(option);
                break;
            }
        }
        await dropdown.selectOption({index: optionIndex})

    }
}