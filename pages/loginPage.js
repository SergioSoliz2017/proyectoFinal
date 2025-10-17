import { expect } from "@playwright/test";

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = 'input[id="id"]';
    this.passwordInput = 'input[id="contraseña"]';
    this.loginButton = '//*[@id="root"]/div/div[1]/div/div[2]/button';
  }

  async gotoLogin() {
    await this.page.goto(process.env.BASE_URL);
    await expect(this.page).toHaveURL("https://sistema.clubinfinitychess.com/");
  }

  async login(email, password) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }
}
