import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const OUT_DIR = '/Users/ireya/.qclaw/workspace-agent-be42ef82/yangxin-website/screenshots';
fs.mkdirSync(OUT_DIR, { recursive: true });

const pages = [
  { name: 'home', url: 'http://localhost:3002', label: '首页' },
  { name: 'about', url: 'http://localhost:3002/about', label: '关于我们' },
  { name: 'services', url: 'http://localhost:3002/services', label: '业务服务' },
  { name: 'resources', url: 'http://localhost:3002/resources', label: '广告资源' },
  { name: 'cases', url: 'http://localhost:3002/cases', label: '案例展示' },
  { name: 'news', url: 'http://localhost:3002/news', label: '新闻资讯' },
  { name: 'contact', url: 'http://localhost:3002/contact', label: '联系我们' },
  { name: 'admin-login', url: 'http://localhost:3002/admin/login', label: '后台登录' },
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  // Capture front-end pages
  for (const p of pages) {
    console.log(`Capturing: ${p.label} (${p.name})...`);
    const page = await context.newPage();
    try {
      await page.goto(p.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(3000); // wait for client-side rendering
      await page.screenshot({
        path: path.join(OUT_DIR, `${p.name}.png`),
        fullPage: true,
        timeout: 30000,
      });
      console.log(`  ✓ ${p.name}.png`);
    } catch (e) {
      console.error(`  ✗ ${p.name}: ${e.message}`);
    }
    await page.close();
  }

  // Admin login + screenshots
  console.log('Logging into admin...');
  const adminPage = await context.newPage();
  try {
    await adminPage.goto('http://localhost:3002/admin/login', { waitUntil: 'domcontentloaded', timeout: 15000 });
    await adminPage.waitForTimeout(2000);

    // Screenshot login page
    await adminPage.screenshot({
      path: path.join(OUT_DIR, 'admin-login.png'),
      fullPage: true,
    });
    console.log('  ✓ admin-login.png');

    // Fill login form
    const usernameInput = await adminPage.$('input[type="text"], input[name="username"]');
    const passwordInput = await adminPage.$('input[type="password"]');
    if (usernameInput && passwordInput) {
      await usernameInput.fill('admin');
      await passwordInput.fill('admin123');
      const submitBtn = await adminPage.$('button[type="submit"]') || await adminPage.$('button');
      if (submitBtn) {
        await submitBtn.click();
        await adminPage.waitForTimeout(3000);
      }
    }

    // Screenshot dashboard after login
    await adminPage.screenshot({
      path: path.join(OUT_DIR, 'admin-dashboard.png'),
      fullPage: true,
    });
    console.log('  ✓ admin-dashboard.png');

    // Admin sub-pages
    const adminPages = [
      { name: 'admin-news', url: 'http://localhost:3002/admin/news' },
      { name: 'admin-cases', url: 'http://localhost:3002/admin/cases' },
      { name: 'admin-resources', url: 'http://localhost:3002/admin/resources' },
      { name: 'admin-contacts', url: 'http://localhost:3002/admin/contacts' },
    ];

    for (const ap of adminPages) {
      try {
        await adminPage.goto(ap.url, { waitUntil: 'domcontentloaded', timeout: 10000 });
        await adminPage.waitForTimeout(2000);
        await adminPage.screenshot({
          path: path.join(OUT_DIR, `${ap.name}.png`),
          fullPage: true,
        });
        console.log(`  ✓ ${ap.name}.png`);
      } catch (e) {
        console.error(`  ✗ ${ap.name}: ${e.message}`);
      }
    }
  } catch (e) {
    console.error(`  Admin failed: ${e.message}`);
  }

  await browser.close();
  console.log('Done! All screenshots saved to:', OUT_DIR);
})();
