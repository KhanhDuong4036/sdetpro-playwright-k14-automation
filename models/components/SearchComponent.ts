import { Locator, Page } from "@playwright/test";

export default class SearchComponent {

    public static selector = '.search-box';

    private searchBoxLocator = 'input[id="small-searchterms"]';
    private searchBtnLocator = 'input[class*="search-box-button"]';

    constructor(private component: Locator){
        this.component = component;

    }

    searchBox(): Locator{
        return this.component.locator(this.searchBoxLocator);
    }

    searchBtn(): Locator{
        return this.component.locator(this.searchBtnLocator);
    }
}