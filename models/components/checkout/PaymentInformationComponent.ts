import { Locator } from "@playwright/test";
import { selector } from "../SelectorDecorator";
import CREDIT_CARD_TYPE from "../../../constants/CreditCardType";

@selector("#opc-payment_info")
export default class PaymentInformationComponent {

    protected component: Locator;
    private creaditCardDropdownSel = '#CreditCardType';
    private cardHolderNameSel = '#CardholderName';
    private cardNumberSel = '#CardNumber';
    private expirationMonthDropdownSel = '#ExpireMonth';
    private expirationYearDropdownSel = '#ExpireYear';
    private cardCodeSel = '#CardCode';
    private continueBtnSel = 'input[type="button"]';

    protected constructor(component: Locator) {
        this.component = component;

    }

    public async selectCardType(creditCardType: string): Promise<void> {
        const creditCardDropdown = await this.component.locator(this.creaditCardDropdownSel);
        switch (creditCardType) {
            case CREDIT_CARD_TYPE.visa:
                await creditCardDropdown.selectOption({ label: CREDIT_CARD_TYPE.visa });
                break;
            case CREDIT_CARD_TYPE.discover:
                await creditCardDropdown.selectOption({ label: CREDIT_CARD_TYPE.discover });
                break;
            case CREDIT_CARD_TYPE.mastercard:
                await creditCardDropdown.selectOption({ label: CREDIT_CARD_TYPE.mastercard });
                break;
            case CREDIT_CARD_TYPE.amex:
                await creditCardDropdown.selectOption({ label: CREDIT_CARD_TYPE.amex });
                break;
        }

    }

    public async inputCardHoderName(cardHoderName: string): Promise<void> {
        await this.component.locator(this.cardHolderNameSel).fill(cardHoderName);
    }

    public async inputCardNumber(cardNumber: string): Promise<void> {
        await this.component.locator(this.cardNumberSel).fill(cardNumber);
    }

    public async selectExpirationDate(month: string, year: string): Promise<void> {
        await this.component.locator(this.expirationMonthDropdownSel).selectOption({label: month});
        await this.component.locator(this.expirationYearDropdownSel).selectOption({label: year});
    }

    public async inputCardCode(cardCode: string): Promise<void> {
        await this.component.locator(this.cardCodeSel).fill(cardCode);
    }

    public async clickOnContinueBtn(): Promise<void> {
        await this.component.locator(this.continueBtnSel).click();
        await this.component.locator(this.continueBtnSel).waitFor({ state: "hidden", timeout: 5 * 1000 });

    }


}