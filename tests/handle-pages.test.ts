import { test, expect } from "@playwright/test";

test("handle multiple pages", async ({ context }) => {
  // Page setup
  const page = await context.newPage();
  await page.goto("https://demoqa.com/browser-windows");
  await page.locator("//*[@id='tabButton']").click();

  // New Tab setup
  const pagePromise = context.waitForEvent("page");
  const newTab = await pagePromise;
  await newTab.waitForLoadState();

  // Assertions on new tab
  await expect(newTab).toHaveURL("https://demoqa.com/sample");
  await expect(newTab.locator("//h1[@id='sampleHeading']")).toHaveText("This is a sample page");
  await newTab.waitForTimeout(5000);
  await newTab.close();
  await page.waitForTimeout(5000);
});

test("handle new page without context", async ({ page }) => {
  // Page setup
  await page.goto("https://demoqa.com/browser-windows");
  await page.locator("//*[@id='tabButton']").click();

  // New Tab setup
  const [newPage] = await Promise.all([page.waitForEvent("popup")]);
  const newTab = newPage;
  await newTab.waitForLoadState();

  // Assertions on new tab
  await expect(newTab).toHaveURL("https://demoqa.com/sample");
  await expect(newTab.locator("//h1[@id='sampleHeading']")).toHaveText("This is a sample page");
  await newTab.waitForTimeout(5000);
  await newTab.close();
  await page.waitForTimeout(5000);
});

test.only("Open and manage multiple pages", async ({ context }) => {
  // Setup page1
  const page1 = await context.newPage();
  await page1.goto("https://demoqa.com/automation-practice-form");
  await page1.waitForLoadState("load")
  await expect(page1.locator("#firstName")).toBeVisible({ timeout: 5000 });

  // Setup Page2
  const page2 = await context.newPage();
  await page2.goto("https://demoqa.com/login");
  await page1.waitForLoadState("load")
  await expect(page2.locator("#userName")).toBeVisible({ timeout: 5000 });

  // Navigate back to Page1
  await page1.bringToFront();
  await expect(page1).toHaveURL("https://demoqa.com/automation-practice-form");
  await expect(page1.locator("#firstName")).toBeVisible({ timeout: 5000 });
});
