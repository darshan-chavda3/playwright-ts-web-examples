import { test, expect } from "@playwright/test";

test("checkbox example", async ({ page }) => {
  await page.goto("https://www.lambdatest.com/selenium-playground/checkbox-demo");
  await expect(page.locator("[id='isAgeSelected']")).not.toBeChecked();
  await page.locator("[id='isAgeSelected']").check();
  await expect(page.locator("[id='isAgeSelected']")).toBeChecked();
  await expect(page.locator("[id='txtAge']")).toHaveText("Checked");
  await page.waitForTimeout(3000);

  await page.locator("[id='box']").click();
  await expect(page.locator("[id='ex1-check1']")).toBeChecked();
  await expect(page.locator("[id='ex1-check2']")).toBeChecked();

  // if toBeChecked assesertion failed we have work around toBeTruthy
  expect(page.locator("[id='ex1-check3']")).toBeTruthy();
  expect(page.locator("[id='ex1-check4']")).toBeTruthy();

  await expect(page.locator("//label[text()='Option 3']/preceding-sibling::input").nth(0)).toBeDisabled();
  await expect(page.locator("//label[text()='Option 3']/preceding-sibling::input").nth(0)).not.toBeChecked();
});

test("multi level checkbox", async ({ page }) => {
  await page.goto("https://demoqa.com/checkbox");
  await page.locator("//*[@aria-label='Toggle']").nth(0).click();
  await page.locator("//*[@id='tree-node-desktop']/following-sibling::span").nth(0).check();
  await expect(page.locator("//*[@id='tree-node-desktop']/following-sibling::span").nth(0)).toBeChecked();
  await page.locator("//*[@aria-label='Toggle']").nth(1).click();
  await expect(page.locator("//*[@id='tree-node-notes']/following-sibling::span").nth(0)).toBeChecked();
  await expect(page.locator("//*[@id='tree-node-commands']/following-sibling::span").nth(0)).toBeChecked();
});
