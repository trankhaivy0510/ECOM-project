import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import fs from 'fs';

const account = JSON.parse(fs.readFileSync('data-test/account.json', 'utf8'));

test.beforeEach('Test login', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goToLoginPage();
}
)

test('Verify credentials using credential authentication', async ({ page }) => {
  const login = new LoginPage(page);
  await login.inputUsername("qctest@finviet.com.vn");
  await login.inputPassword("QCfinviet12@@");
  await login.buttonLogin();
  // await login.chooseEcom();
});


test('Verify that login with invalid password', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goToLoginPage();
  await login.inputUsername("qctest@finviet.com.vn");
  await login.inputPassword("QCfinviet12@@@@@@");
  await login.buttonLogin();
  await page.waitForSelector('div.ant-message-notice-content');
  const errorMess = await page.locator('div.ant-message-notice-content').textContent();
  expect(errorMess).toEqual('Tên đăng nhập hoặc mật khẩu không chính xác.');
});


test('Verify that account not exist in DB', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goToLoginPage();
  await login.inputUsername("qctest");
  await login.inputPassword("QCfinviet12@@");
  await login.buttonLogin();
  await page.waitForLoadState("load");
  await page.waitForSelector('div.ant-message-notice-content');
  const errorMess = await page.locator('div.ant-message-notice-content').textContent();
  expect(errorMess).toEqual('Người dùng không tồn tại');
});

test('Verify that error message display leaves the password field blank', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goToLoginPage();
  await login.inputUsername("qctest@finviet.com.vn");
  await login.inputPassword("");
  await login.buttonLogin();
  await page.waitForSelector('div.ant-message-notice-content');
  const errorMess = await page.locator('div.ant-message-notice-content').textContent();
  expect(errorMess).toEqual('Mật khẩu mới (password) phải là kiểu dữ liệu chuỗi!Mật khẩu mới (password) là bắt buộc!');
});

test('Verify that error message display leaves the username field blank', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goToLoginPage();
  await login.inputUsername("");
  await login.inputPassword("QCfinviet12@@");
  await login.buttonLogin();
  await page.waitForSelector('div.ant-message-notice-content');
  const errorMess = await page.locator('div.ant-message-notice-content').textContent();
  expect(errorMess).toEqual(' (username) phải là kiểu dữ liệu chuỗi! (username) là bắt buộc!');
});




