
import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/loginPage.js";
import dotenv from "dotenv";

dotenv.config();

export const test = base.extend({
  loginFixture: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLogin();
    await loginPage.login(
      process.env.USER_LOGIN,
      process.env.PASSWORD
    );
    await page.waitForURL('https://sistema.clubinfinitychess.com/home/*', { timeout: 15000 });
    await use(page);
  }
});

export const expect = base.expect;
