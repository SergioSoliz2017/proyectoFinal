import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/loginPage.js";
import dotenv from "dotenv";
import { RegistroEstudiantePage } from "../pages/registroEstudiantePage.js";
import { Logger } from "./helper.js";

dotenv.config();

export const test = base.extend({
  loginFixture: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    Logger.info(`Ingresando al sistema`);
    await loginPage.gotoLogin();
    Logger.info(`Entrando registro datos estudiante`);
    Logger.debug(`Usuario: ${process.env.USER}`);
    Logger.debug(`Contraseña: ${process.env.PASSWORD}`);
    await loginPage.login(process.env.USER, process.env.PASSWORD);
    const loggedIn = await loginPage.isLoggedIn();
    Logger.info(`Inicio correcto`);
    expect(loggedIn).toBe(true);
    await use(page);
  },
  datosEstudiantes: async ({ loginFixture }, use) => {
    const registro = new RegistroEstudiantePage(loginFixture);
    Logger.info(`Entrando registro datos estudiante`);
    await registro.gotoRegistro();
    Logger.info("Llenar datos");
    Logger.debug({
      nombre: "Carlos",
      apellido: "Perez",
      fechaNacimiento: "2000-01-01",
      genero: "Hombre",
    });
    await registro.llenarDatos({
      nombre: "Carlos",
      apellido: "Perez",
      fechaNacimiento: "2000-01-01",
      genero: "Hombre",
    });
    Logger.info("Datos llenado");
    Logger.info("Ir ¿Tiene tutor?");
    await registro.gotoTieneTutor();
    await registro.verificarTieneTutor();
    await use(loginFixture);
  },
});

export const expect = base.expect;
