// fixtures.ts
import { test as base } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, use) => {
    // Navigate về trang chủ - session đã được load từ .auth/user.json
    await page.goto('/statistics');
    await page.waitForLoadState('networkidle');
    
    // Kiểm tra nếu bị redirect về login thì báo lỗi
    const url = page.url();
    if (url.includes('/sso/login') || url.includes('eco-account-dev')) {
      throw new Error('❌ Session hết hạn! Xoá .auth/user.json và chạy lại global-setup');
    }
    
    await use(page);
  },
});

export { expect } from '@playwright/test';