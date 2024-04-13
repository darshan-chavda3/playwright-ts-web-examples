import { test, expect } from "@playwright/test";

test("iframe test", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/iframe");
  const frame0 = page.frameLocator("#mce_0_ifr").locator("#tinymce");
  await frame0.click();
  await frame0.fill("Welcome to playwright automated text");
});

test.only("iframe test form", async ({ page }) => {
  await page.goto("https://commitquality.com/practice-iframe");
  const frame = page.frameLocator("//*[@title='Products']");
  await frame.locator("//*[@data-testid='navbar-addproduct']").click();
  await frame.locator("//*[@data-testid='product-textbox']").fill("Playwright tool");
  await frame.locator("//*[@data-testid='price-textbox']").fill("150");
  await frame.locator("//*[@data-testid='date-stocked']").click();
  await frame.locator("//*[@data-testid='date-stocked']").fill("20-12-2024");
});

test("iframe inside frame", async ({ page }) => {
  await page.goto("https://ui.vision/demo/webtest/frames/");
  const mainFrame = page.frameLocator("//*[@src='frame_3.html']");
  const iFrame = mainFrame.frameLocator("//*[contains(@src,'https://docs.google.com/forms')]");
  await iFrame.locator("#i8").click();
  await iFrame.locator("#i19").click();
  await iFrame.locator("//*[text()='Choose']/parent::div").nth(0).click();
  await iFrame.locator("//*[@data-value='Yes']").nth(1).click();
  await iFrame.locator("//*[text()='Next']/parent::span").click();
  await iFrame.locator("//*[@aria-labelledby='i1']").fill("This is short answer");
  await iFrame.locator("//*[@aria-labelledby='i5']").fill("This is long answer");
  await iFrame.locator("//*[text()='Submit']/parent::span").click();
  await page.waitForTimeout(15000);
});
