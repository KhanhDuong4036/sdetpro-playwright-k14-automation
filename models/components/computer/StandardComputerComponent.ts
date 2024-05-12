import { Locator } from "@playwright/test";
import ComputerEssentialComponent from "./ComputerEssentialComponent";
import { selector } from "../SelectorDecorator";

@selector(".product-essential")
export default class StandardComputerComponent extends ComputerEssentialComponent {

    private productAttributeSelector = 'select[id^="product_attribute"]';

    constructor(component: Locator){
        super(component);
    }

    async selectProcessorType(type: string): Promise<string> {
        const allDropdown: Locator[] = await this.component.locator(this.productAttributeSelector).all();
        const PROCESSOR_DROPDOWN_INDEX = 0;
        return await this.selectOption(allDropdown[PROCESSOR_DROPDOWN_INDEX], type);

    }
    async selectRAMType(type: string): Promise<string> {
        const RAM_DROPDOWN_INDEX = 1;
        const allDropdown: Locator[] = await this.component.locator(this.productAttributeSelector).all();
        return await this.selectOption(allDropdown[RAM_DROPDOWN_INDEX], type);

    }
    
    private async selectOption(dropdown: Locator, type: string): Promise<string> {
        const allOptions = await dropdown.locator('option').all();
        let optionIndex = undefined;
        let optionFullText: string = '';
        for(const option of allOptions){
            optionFullText = await option.textContent();
            if(optionFullText?.startsWith(type)){
                optionIndex = allOptions.indexOf(option);
                break;
            }
        }
        if(optionIndex = undefined){
            throw new Error(`There is no matching option for ${type}`);
        }
        
        await dropdown.selectOption({index: optionIndex})
        return optionFullText;

    }
}