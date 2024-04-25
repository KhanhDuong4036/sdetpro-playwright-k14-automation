import { Locator, Page } from "@playwright/test";

// Introducting Main Interaction Methods
export default class LoginPageMethod02 {
    // Scope to keep element selectors
    private usernameLoc = '#username';
    private passwordLoc = '#password';
    private loginBtnLoc = 'button[type="submit"]';

    // Constructor
    constructor(private page: Page) {
        this.page = page;
    }

    // Main interaction methods
    username(): Locator {
        return this.page.locator(this.usernameLoc);
    }
    password(): Locator {
        return this.page.locator(this.passwordLoc);
    }

    loginBtn(): Locator {
        return this.page.locator(this.loginBtnLoc);
    }

}