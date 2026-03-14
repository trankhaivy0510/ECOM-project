import { chromium, FullConfig } from '@playwright/test';
import { LoginPage } from './page-objects/LoginPage';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch({ headless: false }); // mở browser lên xem
  const context = await browser.newContext();
  const page = await context.newPage();

  const login = new LoginPage(page);

  console.log('🔵 Step 1: Đang mở trang login...');
  await login.goToLoginPage();
  await page.waitForLoadState('load');
  console.log('✅ Step 1 done - URL hiện tại:', page.url());

  console.log('🔵 Step 2: Đang nhập username...');
  await login.inputUsername("qctest@finviet.com.vn");
  console.log('🔵 Step 3: Đang nhập password...');
  await login.inputPassword("QCfinviet12@@");
  console.log('🔵 Step 4: Đang click login...');
  await login.buttonLogin();
  console.log('✅ Step 4 done - URL sau click:', page.url());

  console.log('🔵 Step 5: Đang chờ redirect về portal...');
  await page.waitForURL('**/ecom-portal-dev.finviet.com.vn/**', { timeout: 15000 });
  console.log('✅ Step 5 done - URL sau redirect:', page.url());

  // Chờ tới khi trang fully load và sidebar visible
  console.log('🔵 Step 6: Đang chờ trang load xong...');
  await page.waitForLoadState('networkidle');
  await page.waitForSelector('mat-sidenav#snav', { timeout: 10000 }).catch(() => {
    console.warn('⚠️ Sidebar không tìm thấy, nhưng trang vẫn load');
  });
  console.log('✅ Step 6 done - Trang đã load xong');

  await context.storageState({ path: '.auth/user.json' });
  console.log('✅ Session đã lưu vào .auth/user.json');

  await browser.close();
}

export default globalSetup;