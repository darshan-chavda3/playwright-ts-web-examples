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

  // Assertion on new tab
  await expect(newTab).toHaveURL("https://demoqa.com/sample");
  await expect(newTab.locator("//h1[@id='sampleHeading']")).toHaveText("This is a sample page");
  await page.waitForTimeout(5000);
  await newTab.close();
  await page.waitForTimeout(5000);
});
