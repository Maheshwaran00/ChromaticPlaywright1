import { test, expect, takeArchive } from "@chromaui/test-archiver";

test("Book Store", async ({ page }, testInfo) => {    
  await page.goto("https://automationbookstore.dev/");

  await expect(page).toHaveTitle('STORE');
  
  await takeArchive(page, 'Home Page', testInfo);

  await page.locator('[id="searchBar"]').fill('Playwright');
  await page.keyboard.press('Enter');

  await takeArchive(page, "Books", testInfo);
});