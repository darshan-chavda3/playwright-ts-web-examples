import { test, expect } from "@playwright/test";

test("iframe test", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/iframe");
  const frame0 = page.frameLocator("#mce_0_ifr").locator("#tinymce");
  await frame0.click();
  await frame0.fill("Welcome to playwright automated text");
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
