import { test, expect, Page, Locator } from '@playwright/test';
import { GoodsAdjustsUI } from '../page-UI/GoodsAdjustsUI';

export class GoodsAdjustsPage {
    readonly page: Page;
    

    constructor(page: Page) {
        this.page = page;
       
    }
}