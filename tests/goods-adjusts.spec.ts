import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import fs from 'fs';
import { GoodsAdjustsPage } from '../page-objects/GoodsAdjustsPage';

const account = JSON.parse(fs.readFileSync('data-test/account.json', 'utf8'));

test.beforeEach('Test login', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goToLoginPage();
    await page.waitForLoadState('load');
    await login.inputUsername("qctest@finviet.com.vn");
    await login.inputPassword("QCfinviet12@@");
    await login.buttonLogin();
    // await login.chooseEcom();
}
)