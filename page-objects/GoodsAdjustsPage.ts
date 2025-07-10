import { test, expect, Page, Locator } from '@playwright/test';
import { GoodsAdjustsUI } from '../page-UI/GoodsAdjustsUI';

export class GoodsAdjustsPage {
    readonly page: Page;
     readonly sideNav: Locator;
    readonly producSettings: Locator;
    readonly productMenu: Locator;
    readonly addAdjustsButton: Locator;
    readonly branchField: Locator;
    readonly clearBranchButton: Locator;
    readonly branchName: Locator;
    readonly chooseProductButton: Locator;
    readonly skuCodeField: Locator;
    readonly allCheckbox: Locator;
    readonly searchProductButton:Locator;
    readonly addProductButton:Locator;
    readonly addAdjustsSlipButton: Locator;
    readonly slipCheckbox: Locator;
    readonly editSlipButton: Locator;
    readonly statusField: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.sideNav = page.locator(GoodsAdjustsUI.sideNav),
        this.producSettings = page.locator(GoodsAdjustsUI.producSettings,{hasText:"Bán hàng"}),
        this.productMenu = page.locator(GoodsAdjustsUI.productMenu,{hasText:"Điều chỉnh kho"}),
        this.addAdjustsButton = page.locator(GoodsAdjustsUI.addAdjustsButton),
        this.branchField = page.locator(GoodsAdjustsUI.branchField),
        // this.clearBranchButton = page.locator(GoodsAdjustsUI.clearBranchButton).nth(126),
        this.branchName = page.locator(GoodsAdjustsUI.branchName),
        this.chooseProductButton = page.locator(GoodsAdjustsUI.chooseProductButton),
        this.skuCodeField = page.locator(GoodsAdjustsUI.skuCodeField),
        this.searchProductButton = page.locator(GoodsAdjustsUI.searchProductButton),
        this.allCheckbox = page.locator(GoodsAdjustsUI.allCheckbox),
        this.addProductButton = page.locator(GoodsAdjustsUI.addProductButton), 
        this.addAdjustsSlipButton = page.locator(GoodsAdjustsUI.addAdjustsSlipButton), 
        this.slipCheckbox= page.locator(GoodsAdjustsUI.slipCheckbox), 
        this.editSlipButton = page.locator(GoodsAdjustsUI.editSlipButton), 
        this.statusField = page.locator(GoodsAdjustsUI.statusField)
    
    }

    public async goToAdjustPage(){
        await this.sideNav.hover();
        await this.producSettings.click();
        await this.productMenu.click();
    }

    public async clickOnCreateAdjustButton(){
        await this.addAdjustsButton.click();
    }

    public async clickOnBranchInput(){
        await this.branchField.click();
        await this.branchField.clear();
    }

    public async fillBranchCode(branchCode: string){
        await this.branchField.fill(branchCode);
    }

    public async chooseBranch(){
        await this.branchName.click();
    }

    public async clickOnChooseProductButton(){
        await this.chooseProductButton.click();
    }

}
