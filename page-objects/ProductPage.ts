import { test, expect, Page, Locator } from '@playwright/test';
import { ProductUI } from '../page-UI/ProductUI';

export class ProductPage {
    readonly page: Page;
    readonly sideNav: Locator;
    readonly producSettings: Locator;
    readonly productMenu: Locator;
    readonly buttonCreate: Locator;
    readonly buttonAddOddProduct: Locator;
    readonly brand: Locator;
    readonly brandResult: Locator;
    readonly nextPageButton: Locator;
    readonly productNameInput: Locator;
    readonly descriptionInput: Locator;
    readonly packingInput:Locator;
    readonly propertyInput:Locator;
    readonly addPropertyButton: Locator;
    readonly property: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sideNav = page.locator(ProductUI.sideNav);
        this.producSettings = page.locator(ProductUI.producSettings, { hasText: "Cấu Hình Sản Phẩm" });
        this.productMenu = page.locator(ProductUI.productMenu, { hasText: "Sản Phẩm" });
        this.buttonCreate = page.locator(ProductUI.buttonCreate);
        this.buttonAddOddProduct = page.locator(ProductUI.buttonAddOddProduct);
        this.brand = page.locator(ProductUI.brand);
        this.brandResult = page.locator(ProductUI.brandResult);
        this.nextPageButton = page.locator(ProductUI.nextPageButton).filter({ hasText: 'Tiếp tục' });
        this.productNameInput = page.locator(ProductUI.productNameInput);
        this.descriptionInput = page.locator(ProductUI.descriptionInput);
        this.packingInput = page.locator(ProductUI.packingInput);
        this.propertyInput = page.locator(ProductUI.propertyInput);
        this.addPropertyButton = page.locator(ProductUI.addPropertyButton);
        this.property = page.locator(ProductUI.property);
    }

    // Dùng function thay vì lưu giá trị cố định trong constructor
    private getCategoryLevel1(categoryName: string): Locator {
        return this.page.getByText(categoryName);
    }

    private getCategoryLevel2(categoryName: string): Locator {
        return this.page.locator(ProductUI.categoryLevel2, { hasText: categoryName });
    }

    private getCategoryLevel3(categoryName: string): Locator {
        return this.page.locator(ProductUI.categoryLevel3, { hasText: categoryName });
    }

    async goToProductPage() {
        await this.sideNav.hover();
        await this.producSettings.click();
        await this.productMenu.click();
    }

    async addProductButton() {
        await this.buttonCreate.click();
        await this.buttonAddOddProduct.click();
    }

    async addBrand(brandName: string) {
        await this.brand.click();
        await this.brand.type(brandName);
       
        await this.page.waitForTimeout(1000);
        
        const filtered = this.page.locator("div#mat-autocomplete-0", { hasText: brandName });
        await filtered.click();
        // const count = await filtered.count();
    
        // for (let i = 1; i <= count; i++) {
        //     await this.page.locator("div#mat-autocomplete-0", { hasText: brandName }).first().click();
        // }
    }
    

    async addCategoryLevel1(categoryNameLevel1: string) {
        // Lấy locator động theo category name
        const categoryLevel1 = this.getCategoryLevel1(categoryNameLevel1);
        await categoryLevel1.scrollIntoViewIfNeeded();
        await categoryLevel1.click();
    }

    async addCategoryLevel2(categoryNameLevel2: string) {
        const categoryLevel2 = this.getCategoryLevel2(categoryNameLevel2);
        await categoryLevel2.scrollIntoViewIfNeeded();
        await categoryLevel2.click();

    }

    async addCategoryLevel3(categoryNameLevel3: string) {
        const categoryLevel3 = this.getCategoryLevel2(categoryNameLevel3);
        await categoryLevel3.scrollIntoViewIfNeeded();
        await categoryLevel3.click();
    }

    async clickNextPageButton() {
        await this.nextPageButton.first().click();
    }

    async fillProductName(productName: string) {
        await this.productNameInput.click();
        await this.productNameInput.fill(productName);
    }

    async fillProductDescription(productDescription: string) {
        await this.descriptionInput.click();
        await this.descriptionInput.fill(productDescription);
    }

    async clickNextPageButton1() {
        await this.nextPageButton.nth(1).click();
    }

    async clickOnPackingInput(){
        await this.packingInput.click();
    }
    
    async fillPackingInput(packingName: string) {
        await this.packingInput.fill(packingName);
    
        // Lấy các mat-option chứa tên packingName
        const filtered = this.page.locator("mat-option", { hasText: packingName });
        const count = await filtered.count();
    
        // Lặp qua từng phần tử mat-option
        for (let i = 0; i < count; i++) {
            const option = filtered.nth(i);
            const optionText = await option.textContent();
    
            // Kiểm tra xem nội dung có trùng với packingName không
            if (optionText!.trim() === packingName) {
                await option.click();
                return;
            }
        }
    }

    async clickOnPropertyInput(){
        await this.propertyInput.click();
    }

    async fillPropertyInput(propertyName: string) {
        await this.propertyInput.click();
        await this.propertyInput.type(propertyName);
    
        // Đợi option hiển thị và click
        // await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(1000);
        const option = this.page.locator('.mat-autocomplete-panel', { hasText: propertyName });
        await option.click();
    }
    
    async clickOnAddPropertyButton(){
        const addButton = this.page.locator(ProductUI.addPropertyButton,{hasText:"Thêm thuộc tính"})
        await addButton.click();
    }
    
    async addProperty(property: string){
        await this.property.click();
        await this.property.fill(property);
    
        await this.page.waitForLoadState('networkidle');
        
        const filtered = this.page.locator('div#mat-autocomplete-4', { hasText: property });
        const count = await filtered.count();
        // Lặp qua từng phần tử mat-option
        for (let i = 0; i < count; i++) {
            const option = filtered.nth(i);
            const optionText = await option.textContent();
    
            // Kiểm tra xem nội dung có trùng với packingName không
            if (optionText!.trim() === property) {
                await option.click();
                return;
            }
        }
    }       
    
    async clickOnAddVariantButton(){
        const addButton = this.page.locator(ProductUI.addPropertyButton,{hasText:"Tạo variant"})
        await addButton.click();
    }

    async clickOnSubmitButton(){
        const submitButton = this.page.locator(ProductUI.submitButton);
        await submitButton.click();
    }

}
