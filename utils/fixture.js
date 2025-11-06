import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/loginPage.js";
import dotenv from "dotenv";
import { RegistroEstudiantePage } from "../pages/registroEstudiantePage.js";
import { Logger } from "./helper.js";
import { TieneTutorPage } from "../pages/tieneTutorPage.js";
import { RegistroTutorPage } from "../pages/registroTutorPage.js";
import { ListasPage } from "../pages/listasPage.js";
dotenv.config();
import { fakerES  } from "@faker-js/faker";

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
    Logger.info("Llenar datos estudiante");
    const datosFaker = {
      nombre: fakerES.person.firstName(),
      apellido: fakerES.person.lastName(),
      fechaNacimiento: fakerES.date
        .birthdate({ min: 1990, max: 2020, mode: "year" })
        .toISOString()
        .split("T")[0],
      genero: fakerES.helpers.arrayElement(["Hombre", "Mujer"]),
    };
    Logger.debug(datosFaker);
    await registro.llenarDatos(datosFaker);
    Logger.info("Datos llenado");
    Logger.info("Ir ¿Tiene tutor?");
    await registro.gotoTieneTutor();
    await registro.verificarTieneTutor();
    await use(loginFixture);
  },
  datosEstudiantesNoTutor: async ({ loginFixture }, use) => {
    const registro = new RegistroEstudiantePage(loginFixture);
    Logger.info(`Entrando registro datos estudiante`);
    await registro.gotoRegistro();
    Logger.info("Llenar datos estudiante");
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
  datosTutores: async ({ datosEstudiantes }, use) => {
    Logger.info(`Test si tiene tutor`);
    const tieneTutor = new TieneTutorPage(datosEstudiantes);
    Logger.info(`Seleccionar opcion Si`);
    await tieneTutor.siTieneTutor();
    Logger.info(`Verificar campos tutor vacios`);
    await tieneTutor.verificarSiTieneTutor();
    await use(datosEstudiantes);
  },
  cursos: async ({ datosTutores }, use) => {
    const registro = new RegistroTutorPage(datosTutores);
    Logger.info("Llenar datos tutor");
    const datosFaker = {
      nombre: fakerES.person.firstName(),
      apellido: fakerES.person.lastName(),
      fechaNacimiento: fakerES.date
        .birthdate({ min: 1990, max: 2020, mode: "year" })
        .toISOString()
        .split("T")[0],
      genero: fakerES.helpers.arrayElement(["Hombre", "Mujer"]),
      correo: fakerES.internet.email(),
      relacion: fakerES.helpers.arrayElement(["Padre", "Madre", "Tutor legal"]),
    };
    Logger.debug(datosFaker);
    await registro.llenarDatos(datosFaker);
    Logger.info("Datos llenado");
    Logger.info("Ir registrar cursos");
    await registro.gotoCursos();
    Logger.info("Verificar registro cursos");
    await registro.verificarRegistroCursos();
    await use(datosTutores);
  },
  listas: async ({ loginFixture }, use) => {
    const listas = new ListasPage(loginFixture);
    Logger.info("Ir modulo listas");
    await listas.gotoListas();
    Logger.info("Seleccionar asignar curso");
    await listas.asignarCurso();
    Logger.info("Seleccionar tutor");
    await listas.asignarTutor();
    await use(loginFixture);
  },
});

export const expect = base.expect;
