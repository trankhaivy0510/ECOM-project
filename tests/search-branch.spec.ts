import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import fs from 'fs';
import { BranchPage } from '../page-objects/BranchPage';

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

test('Search like keyword ', async ({ page }) => {
    const searching = new BranchPage(page);
    await searching.goToBranchPage();
    await searching.searchingBranch("banh kem");
    await searching.searchDataTable();
})

test('Search by branch code', async ({ page }) => {
    const searching = new BranchPage(page);
    await searching.goToBranchPage();
    await searching.searchingBranch("CN0635993");
    await searching.searchBranchCode();
}
);

