import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import fs from 'fs';
import { ProductPage } from '../page-objects/ProductPage';

const account = JSON.parse(fs.readFileSync('data-test/account.json', 'utf8'));

// test.beforeEach('Test login', async ({ page }) => {
//     const login = new LoginPage(page);
//     await login.goToLoginPage();
//     await page.waitForLoadState('load');
//     await login.inputUsername("qctest@finviet.com.vn");
//     await login.inputPassword("QCfinviet12@@");
//     await login.buttonLogin();
// })

test('Go to Product Page', async ({ page }) => {
    const createOddProduct = new ProductPage(page);
    await createOddProduct.goToProductPage();
    await createOddProduct.addProductButton();
    await createOddProduct.addBrand("Blue Ocean");
    await createOddProduct.addCategoryLevel1("Bánh kẹo auto 1");
    await createOddProduct.addCategoryLevel2("Bánh kẹo auto 2");
    await createOddProduct.addCategoryLevel3("Bánh kẹo auto 3");
    await createOddProduct.clickNextPageButton();
    await createOddProduct.fillProductName("bánh ngọt xấu xa")
    await createOddProduct.fillProductDescription("bánh này của người xấu xa làm ra!!!")
    await createOddProduct.clickNextPageButton1();
    await createOddProduct.clickOnPackingInput();
    await createOddProduct.fillPackingInput("Bao");
    await createOddProduct.clickOnPropertyInput();
    await createOddProduct.fillPropertyInput("Màu sắc ");
    await createOddProduct.clickOnAddPropertyButton();
    await createOddProduct.addProperty("Bạc đen");
    await createOddProduct.clickOnAddVariantButton();
    await createOddProduct.clickOnSubmitButton();
})

