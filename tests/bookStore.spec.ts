import { test, expect, takeArchive } from "@chromaui/test-archiver";
import {chromium} from "@playwright/test";
test.use({ disableAutoCapture: true,resourceArchiveTimeout:1000*60 });
test("Book Store", async ({ page }, testInfo) => {    
  await page.goto("https://automationbookstore.dev/");
  await expect(page).toHaveTitle('Automation Bookstore');  
  await takeArchive(page, 'Home Page', testInfo);
  await page.locator('[id="searchBar"]').fill('Playwright');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2000);
  await takeArchive(page, "Books", testInfo);
  await page.locator('[id="searchBar"]').fill('Test Automation');
  await page.waitForTimeout(1000);
  await takeArchive(page, "Automation Books", testInfo);
});
test("Demoblaze",async({page},testInfo)=>{
    await page.goto("https://www.demoblaze.com/");
    await expect(page).toHaveTitle('STORE');    
    await takeArchive(page, 'Home Page', testInfo);  
    await page.locator('[class="card-title"]').nth(0).click();
    await page.locator('text="Add to cart"').waitFor({state:"visible"});  
    await takeArchive(page, "Samsung", testInfo);
    await page.locator('[id="nava"]').click();
    await takeArchive(page, "Navigating Home", testInfo);         
})
test('w3school',async({page},testInfo)=>{
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page1 = await context.newPage();
  await page1.goto('https://www.w3schools.com/');
  await page1.locator('[title="W3Schools Certificates"]').nth(0).waitFor({state:"visible"});
  await takeArchive(page1,'Homepage',testInfo);
  await page1.locator('[title="W3Schools Certificates"]').nth(0).click();
  const newPage = await Promise.all([
    await context.waitForEvent('page')
  ])
  const page2= newPage[0];
  await takeArchive(page1,'certify page ',testInfo); 
})