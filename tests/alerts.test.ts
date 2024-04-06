import { expect, test } from "@playwright/test";

test("@alert confirmation", async ({ page }) => {
  await page.goto("https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo");
  page.on("dialog", async (alert) => {
    await alert.accept();
  });
  await page.locator("//button[text()='Click Me']").nth(1).click();
  await expect(page.locator("//*[@id='confirm-demo']")).toHaveText("You pressed OK!");
  await page.waitForTimeout(5000);
});

test("@alert dismiss", async ({ page }) => {
  await page.goto("https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo");
  page.on("dialog", async (alert) => {
    await alert.dismiss();
  });
  await page.locator("//button[text()='Click Me']").nth(1).click();
  await expect(page.locator("//*[@id='confirm-demo']")).toHaveText("You pressed Cancel!");
  await page.waitForTimeout(5000);
});

test("@prompt alert", async ({ page }) => {
  await page.goto("https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo");
  page.on("dialog", async (alert) => {
    await alert.accept("Hi I'm QA");
  });
  await page.locator("//button[text()='Click Me']").nth(2).click();
  await expect(page.locator("//*[@id='prompt-demo']")).toHaveText("You have entered 'Hi I'm QA' !");
  await page.waitForTimeout(5000);
});
