import { test, expect, Page, Locator } from '@playwright/test';
import { GoodsAdjustsUI } from '../page-UI/GoodsAdjustsUI';

export class GoodsAdjustsPage {
    readonly page: Page;
     readonly sideNav: Locator;
    readonly producSettings: Locator;
    readonly productMenu: Locator;
    readonly addAdjustsButton: Locator;
    readonly branchField: Locator;
    // readonly clearBranchButton: Locator;
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
    readonly submitButton: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.sideNav = page.locator(GoodsAdjustsUI.sideNav),
        this.producSettings = page.locator(GoodsAdjustsUI.producSettings,{hasText:"Bán hàng"}).first(),
        this.productMenu = page.locator(GoodsAdjustsUI.productMenu,{hasText:"Điều chỉnh kho"}),
        this.addAdjustsButton = page.locator(GoodsAdjustsUI.addAdjustsButton),
        this.branchField = page.locator(GoodsAdjustsUI.branchField),
        // this.clearBranchButton = page.locator(GoodsAdjustsUI.clearBranchButton).nth(126),
        this.branchName = page.locator(GoodsAdjustsUI.branchName),
        this.chooseProductButton = page.locator(GoodsAdjustsUI.chooseProductButton,{hasText:"Chọn sản phẩm"}),
        this.skuCodeField = page.locator(GoodsAdjustsUI.skuCodeField),
        this.searchProductButton = page.locator(GoodsAdjustsUI.searchProductButton,{hasText:"Tìm kiếm"}),
        this.allCheckbox = page.locator(GoodsAdjustsUI.allCheckbox),
        this.addProductButton = page.locator(GoodsAdjustsUI.addProductButton,{hasText:"Thêm"}).nth(1), 
        this.addAdjustsSlipButton = page.locator(GoodsAdjustsUI.addAdjustsSlipButton), 
        this.slipCheckbox= page.locator(GoodsAdjustsUI.slipCheckbox), 
        this.editSlipButton = page.locator(GoodsAdjustsUI.editSlipButton), 
        this.statusField = page.locator(GoodsAdjustsUI.statusField)
        this.submitButton = page.locator(GoodsAdjustsUI.submitButton,{hasText:"Thêm mới"})
    }

    public async goToAdjustPage(){
        await this.sideNav.hover();
        await this.page.waitForTimeout(3000);
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

    public async fillSkuCode(skuCode: string){
        await this.skuCodeField.click();
        await this.skuCodeField.fill(skuCode);
    }

    public async searchSku(){
        await this.searchProductButton.click();
    }

    public async chooseAllProduct(){
        await this.page.waitForLoadState("networkidle");
        await this.allCheckbox.click();
    }

    public async clickOnAddProductButton(){
        await this.page.waitForTimeout(1000);
        await this.addProductButton.click();
    }

    public async clickOnSubmitButton(){
        await this.page.waitForTimeout(1000);
        await this.submitButton.click();
    }
}
