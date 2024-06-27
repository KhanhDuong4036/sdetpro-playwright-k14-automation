import { Locator } from "@playwright/test";
import { selector } from "../SelectorDecorator";

@selector("#opc-billing")
export default class BillingAddressComponent {
    static selectorValue(selectorValue: any): any {
        throw new Error("Method not implemented.");
    }
    
    protected component: Locator;
    private readonly firstNameSel = "#BillingNewAddress_FirstName";
    private readonly lastNameSel = "#BillingNewAddress_LastName";
    private readonly emailSel = "#BillingNewAddress_Email";
    private readonly countryDropdownSel = "#BillingNewAddress_CountryId";
    private readonly stateDropdownSel = "#BillingNewAddress_StateProvinceId";
    private readonly citySel = "#BillingNewAddress_City";
    private readonly address01Sel = "#BillingNewAddress_Address1";
    private readonly address02Sel = "#BillingNewAddress_Address2";
    private readonly zipCodeSel = "#BillingNewAddress_ZipPostalCode";
    private readonly phoneNumberSel = "#BillingNewAddress_PhoneNumber";
    private readonly continueBtn = "input[type='button']";

    protected constructor(component: Locator) {
        this.component = component;

    }
    
    public async inputFirstname(firstname: string): Promise<void> {
        await this.component.locator(this.firstNameSel).fill(firstname);
    }

    public async inputLastName(lastname: string): Promise<void> {
        await this.component.locator(this.lastNameSel).fill(lastname);
    }

    public async inputEmailAddress(email: string): Promise<void> {
        await this.component.locator(this.emailSel).fill(email);
    }

    public async selectCountry(country: string): Promise<void> {
        await this.component.locator(this.countryDropdownSel).selectOption({label: country});
    }

    public async selectState(state: string): Promise<void> {
        await this.component.locator(this.stateDropdownSel).selectOption({label: state});
    }

    public async inputCity(city: string): Promise<void> {
        await this.component.locator(this.citySel).fill(city);
    }

    public async inputAddress01(address1: string): Promise<void> {
        await this.component.locator(this.address01Sel).fill(address1);
    }

    public async inputAddress02(address2: string): Promise<void> {
        await this.component.locator(this.address02Sel).fill(address2);
    }

    public async inputZipCode(zipcode: string): Promise<void> {
        await this.component.locator(this.zipCodeSel).fill(zipcode);
    }

    public async inputPhoneNumber(phone: string): Promise<void> {
        await this.component.locator(this.phoneNumberSel).fill(phone);
    }

    public async clickOnContinueBtn(): Promise<void> {
        await this.component.locator(this.continueBtn).click();
        await this.component.locator(this.continueBtn).waitFor({state: "hidden", timeout: 5 * 1000});
    }

}