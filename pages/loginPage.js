import { expect } from "@playwright/test";

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = 'input[id="id"]';
    this.passwordInput = 'input[id="contraseña"]';
    this.loginButton = '//*[@id="root"]/div/div[1]/div/div[2]/button';
    this.error_msg = "//div[@role='status' and @aria-live='polite']";
  }

  async gotoLogin() {
    await this.page.goto(process.env.BASE_URL);
    await expect(this.page).toHaveURL("https://sistema.clubinfinitychess.com/");
  }

  async login(username, password, enter) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    if (enter) {
      await this.page.keyboard.press("Enter");
    } else {
      await this.page.click(this.loginButton);
    }
  }
  async getErrorMessage() {
    const locator = this.page.locator(this.error_msg);
    try {
      await locator.waitFor({ state: "visible", timeout: 3000 });
      return await locator.textContent();
    } catch (e) {
      return "";
    }
  }

  async isLoggedIn() {
    try {
      await this.page.waitForURL("**/home/**", { timeout: 5000 });
      const url = this.page.url();
      return url.includes("/home/");
    } catch (e) {
      return false;
    }
  }
}
