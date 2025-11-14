import { expect } from "@playwright/test";
import { Logger } from "../utils/helper";

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = 'input[id="id"]';
    this.passwordInput = 'input[id="contraseña"]';
    this.loginButton = '//*[@id="root"]/div/div[1]/div/div[2]/button';
    this.error_msg = "//div[@role='status' and @aria-live='polite']";
    this.logoutButton = this.page.getByRole("button", {
      name: "Cerrar sesion",
    });
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
  async getErrorMessages() {
    const locators = this.page.locator(this.error_msg);
    try {
      await locators.first().waitFor({ state: "visible", timeout: 3000 });
      const count = await locators.count();
      const messages = [];
      for (let i = 0; i < count; i++) {
        const element = locators.nth(i);
        if (await element.isVisible()) {
          const text = await element.textContent();
          if (text) {
            const trimmedText = text.trim();
            if (trimmedText !== "Inicio Correcto") {
              messages.push(trimmedText);
            }
          }
        }
      }
      return messages;
    } catch (e) {
      return [];
    }
  }

  async isLoggedIn() {
    try {
      return await this.page.waitForURL("**/home/**", { timeout: 5000 });
    } catch (e) {
      Logger.error(e);
      return false;
    }
  }
  async gotoLogout() {
    await this.logoutButton.click();
    await expect(this.page).toHaveURL("/");
  }

  async pageGoBack() {
    await this.page.goBack();
    await expect(this.page).toHaveURL("/");
  }
}
