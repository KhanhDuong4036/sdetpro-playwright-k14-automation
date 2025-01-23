import { Locator } from "@playwright/test";
import FooterColumnComponent from "./FooterColumnComponent";

export default class MyAccount extends FooterColumnComponent{
    public static selector: string = ".column.my-account";
    constructor (component: Locator){
        super(component) ;
    }
}