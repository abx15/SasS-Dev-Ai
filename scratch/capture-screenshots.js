const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  try {
    // Desktop screenshot
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
    await page.screenshot({ path: 'scratch/screenshot_desktop.png', fullPage: true });
    
    // Mobile screenshot
    await page.setViewport({ width: 375, height: 812 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
    await page.screenshot({ path: 'scratch/screenshot_mobile.png', fullPage: true });

    // Try dashboard
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000/dashboard', { waitUntil: 'networkidle2', timeout: 30000 });
    await page.screenshot({ path: 'scratch/screenshot_dashboard.png', fullPage: true });

    console.log('Screenshots taken successfully.');
  } catch (err) {
    console.error('Error taking screenshots:', err);
  } finally {
    await browser.close();
  }
})();
