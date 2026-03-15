import { test, expect, Page, Locator } from '@playwright/test';
import { LoginUI } from '../page-UI/LoginUI';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly subbmitLogin: Locator;
    readonly ecomSelection: Locator;


    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator(LoginUI.username);
        this.passwordInput = page.locator(LoginUI.password);
        this.subbmitLogin = page.getByRole("button", { name: 'Đăng nhập' });
        this.ecomSelection = page.getByText('ECOMV2');
    }

    async goToLoginPage() {
        //Mặc định lấy baseURL đã được khai báo khi để ""
        await this.page.goto("https://eco-account-dev.finviet.com.vn/authentication/?client_id=ecomv2&redirect_uri=https%3A%2F%2Fecom-portal-dev.finviet.com.vn%2F%23%2Fsso%2Flogin&state=MTc3MTM5NTcxNDg2OQ%3D%3D");
    }

    async inputUsername(username: string) {
        await this.usernameInput.fill(username);
    }

    async inputPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async buttonLogin() {
        await this.subbmitLogin.click();
    }

    async chooseEcom() {
        await this.ecomSelection.click();
    }


}

