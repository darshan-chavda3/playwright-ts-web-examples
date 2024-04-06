import { test, expect } from "@playwright/test";
import moment from "moment";

test("calendar input", async ({ page }) => {
  await page.goto("https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo");
  let birthday = "2001-02-11";
  await page.locator("//*[@id='birthday']").fill(birthday);
  await page.waitForTimeout(5000);
});

test("date picker using moment", async ({ page }) => {
  await page.goto("https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo");
  await selectDate(10, "March 2025");

  async function selectDate(date: number, monthYear: string) {
    const mmYYYY = page.locator("//*[@class='datepicker-switch']").nth(0);
    const prev = page.locator("//*[@class='prev']").nth(0);
    const next = page.locator("//*[@class='next']").nth(0);
    const thisMonth = moment(monthYear, "MMMM YYYY").isBefore();

    await page.locator("//*[@placeholder='Start date']").click();
    while ((await mmYYYY.textContent()) != monthYear) {
      if (thisMonth) {
        await prev.click();
      } else {
        await next.click();
      }
    }
    await page.locator(`//td[@class='day'][text()='${date}']`).click();
  }

  await page.waitForTimeout(5000);
});
