import { expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import fs from 'fs';
import { GoodsAdjustsPage } from '../page-objects/GoodsAdjustsPage';
import { test } from '../fixtures';

// test.beforeEach('Test login', async ({ page }) => {
//     const login = new LoginPage(page);
//     await login.goToLoginPage();
//     await page.waitForLoadState('load');
//     await login.inputUsername("qctest@finviet.com.vn");  
//     await login.inputPassword("QCfinviet12@@");
//     await login.buttonLogin();
//     // await login.chooseEcom();
// })

test('Test increase adjustment', async ({page}) => {
    const increaseAdjust = new GoodsAdjustsPage(page);
    await increaseAdjust.goToAdjustPage();
    await increaseAdjust.clickOnCreateAdjustButton();
    await increaseAdjust.clickOnBranchInput();
    await increaseAdjust.fillBranchCode("CN0635993")
    await increaseAdjust.chooseBranch();
    await increaseAdjust.clickOnChooseProductButton();
    await increaseAdjust.fillSkuCode("SKUP118907V3345792");
    await increaseAdjust.searchSku();
    await increaseAdjust.chooseAllProduct();
    await increaseAdjust.clickOnAddProductButton();
    await increaseAdjust.clickOnSubmitButton();
})