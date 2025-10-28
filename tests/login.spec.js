import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage.js";
import { Logger, screenshotPath } from "../utils/helper.js";
const USERS = require("../data/users.json");

test.describe("Login tests", () => {
  const testCases = [
    { key: "Usuario valido_Contraseña valida", expectSuccess: true }, // caso exitoso
    { key: "Usuario valido_Contraseña invalida", expectSuccess: false }, // contraseña incorrecta
    { key: "Usuario valido_Contraseña > 10 caracteres", expectSuccess: false }, // contraseña muy larga
    {
      key: "Usuario valido_Contraseña <= 10 caracteres e invalida",
      expectSuccess: false,
    },
    { key: "Usuario invalido_Contraseña valida", expectSuccess: false }, // usuario inexistente
    { key: "Usuario invalido_Contraseña invalida", expectSuccess: false }, // ambos inválidos
    { key: "Usuario > 22 caracteres_Contraseña valida", expectSuccess: false }, // usuario demasiado largo
    {
      key: "Usuario <= 22 caracteres y valido_Contraseña valida",
      expectSuccess: true,
    },
  ];

  for (const { key, expectSuccess } of testCases) {
    test(`Test login con credenciales: ${key}`, async ({ page }) => {
      try {
        const login = new LoginPage(page);
        Logger.info(`Test login con credenciales: ${key}`);
        Logger.info("Abrir pagina de login");
        await login.gotoLogin("/");
        const creds = USERS[key];
        Logger.debug(`Usuario: ${creds.username}`);
        Logger.debug(`Contraseña: ${creds.password}`);
        await login.login(creds.username, creds.password);
        if (expectSuccess) {
          const loggedIn = await login.isLoggedIn();
          expect(loggedIn).toBe(true);
          Logger.info("Login exitoso");
        } else {
          const errorMsg = await login.getErrorMessages();
          expect(errorMsg.length).toBeGreaterThan(0);
          Logger.error("Login fallido");
          Logger.error(`Mensaje de error para ${key}: ${errorMsg}`);
          const typedValueUserName = await page
            .locator(login.usernameInput)
            .inputValue();
          if (typedValueUserName.length !== creds.username.length) {
            Logger.error(
              `No se pudo ingresar el username completo. Longitud esperada: ${creds.username.length}, longitud actual: ${typedValueUserName.length}`
            );
          }
          const typedValuePassword = await page
            .locator(login.passwordInput)
            .inputValue();
          if (typedValuePassword.length !== creds.password.length) {
            Logger.error(
              `No se pudo ingresar la contraseña completa. Longitud esperada: ${creds.password.length}, longitud actual: ${typedValuePassword.length}`
            );
          }
        }
      } catch (err) {
        await page.screenshot({
          path: screenshotPath(`Test login con credenciales: ${key}`),
        });
        Logger.error(err);
        throw err;
      }
    });
  }
});

test(`Test login con enter`, async ({ page }) => {
  try {
    const login = new LoginPage(page);
    Logger.info(`Test login con enter`);
    Logger.info("Abrir pagina de login");
    await login.gotoLogin("/");
    Logger.debug(`Usuario: 2025829SERGI`);
    Logger.debug(`Contraseña: 123123`);
    await login.login("2025829SERGI", "123123", true);
    const loggedIn = await login.isLoggedIn();
    expect(loggedIn).toBe(true);
    Logger.info("Login exitoso");
  } catch (err) {
    await page.screenshot({
      path: screenshotPath(`Test login con enter`),
    });
    Logger.error(err);

    throw err;
  }
});
