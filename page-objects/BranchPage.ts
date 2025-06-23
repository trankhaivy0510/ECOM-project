import { test, expect, Page, Locator } from '@playwright/test';
import { BranchUI } from '../page-UI/BrandUI';

export class BranchPage {
    readonly page: Page;
    readonly searchField: Locator;
    readonly sideNav: Locator;
    readonly branchMenu: Locator;
    readonly buttonPaginatorNavigationNext: Locator;
    key: string;
    readonly branchCodeColumn : Locator;


    constructor(page: Page) {
        this.key = ""; //Khai báo biến instance để lưu key
        this.page = page;
        this.searchField = page.locator(BranchUI.searchField);
        this.sideNav = page.locator(BranchUI.sideNav);
        this.branchMenu = page.locator(BranchUI.brandMenu);
        this.buttonPaginatorNavigationNext = page.locator(BranchUI.buttonPaginatorNavigationNext);
        this.branchCodeColumn = page.locator(BranchUI.branchCodeColumn,{hasText:this.key});
    }

    async goToBranchPage() {
        await this.sideNav.hover();
        await this.branchMenu.click();
    }

    async searchingBranch(key) {
        this.key = key;//Lưu giá trị key vào biến instance
        await this.searchField.click();
        await this.searchField.fill(key);
        await this.page.keyboard.down('Enter');
        await this.page.waitForLoadState("networkidle");

        //lấy giá trị trong table có chứa key, kết quả trả về là một object locator
        const resultRow = this.page.locator('table tr', { hasText: key });

        //đếm số dòng có chứa key
        const count = await resultRow.count();

        await this.buttonPaginatorNavigationNext.waitFor({ state: 'visible' });
    }

    async searchDataTable(){
        do {
            // Lấy lại danh sách kết quả trong table (sau mỗi lần chuyển trang)
            const resultRow = this.page.locator('table tr', { hasText: this.key });
            const count = await resultRow.count(); // Đếm số dòng
    
            for (let i = 0; i < count; i++) {
                const rowText = (await resultRow.nth(i).innerText()).toLowerCase();
                await expect(rowText).toContain(this.key);
            }
    
            // Kiểm tra nút "Next" có tồn tại & khả dụng không
            if (await this.buttonPaginatorNavigationNext.isVisible() && await this.buttonPaginatorNavigationNext.isEnabled()) {
                await this.buttonPaginatorNavigationNext.scrollIntoViewIfNeeded();
                await this.buttonPaginatorNavigationNext.waitFor({ state: 'visible' });
                await this.buttonPaginatorNavigationNext.click();
                await this.page.waitForLoadState("networkidle"); // Chờ dữ liệu load
            } else {
                break; // Không còn trang nào để chuyển => Thoát vòng lặp
            }
    
        } while (true); // Lặp đến khi không còn trang tiếp theo và true luôn đúng, dựa vào break để thoát vòng lặp
    }

    async searchBranchCode(){
        do {
            // Lấy lại danh sách kết quả trong table (sau mỗi lần chuyển trang)
            const resultColumn = this.branchCodeColumn;
            const count = await resultColumn.count(); // Đếm số dòng
    
            for (let i = 0; i < count; i++) {
                const columnText = (await resultColumn.nth(i).innerText()).toLowerCase();
                await expect(columnText).toContain(this.key.toLowerCase());
            }
    
            // Kiểm tra nút "Next" có tồn tại & khả dụng không
            if (await this.buttonPaginatorNavigationNext.isVisible() && await this.buttonPaginatorNavigationNext.isEnabled()) {
                await this.buttonPaginatorNavigationNext.scrollIntoViewIfNeeded();
                await this.buttonPaginatorNavigationNext.waitFor({ state: 'visible' });
                await this.buttonPaginatorNavigationNext.click();
                await this.page.waitForLoadState("networkidle"); // Chờ dữ liệu load
            } else {
                break; // Không còn trang nào để chuyển => Thoát vòng lặp
            }
    
        } while (true); // Lặp đến khi không còn trang tiếp theo và true luôn đúng, dựa vào break để thoát vòng lặp
    }

}
