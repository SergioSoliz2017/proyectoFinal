import { test, expect } from "../../utils/fixture.js";
import { RegistroTutorPage } from "../../pages/registroTutorPage.js";
import { Logger, screenshotPath } from "../../utils/helper.js";
import {
  testCasesTutoresObligatorios,
  testCasesTutoresOpcionales,
} from "../../data/testCasesRegistro.js";
const tutores = require("../../data/tutoresObligatorio.json");
const tutoresOpcionales = require("../../data/tutoresOpcionales.json");

test(`Test registro datos tutor valido`, async ({ datosTutores }) => {
  try {
    const registro = new RegistroTutorPage(datosTutores);
    Logger.info(`Test verificar llenado de tutor`);
    Logger.info("Llenar datos");
    Logger.debug({
      nombre: "Carlos",
      apellido: "Perez",
      fechaNacimiento: "2000-01-01",
      relacion: "Padre",
      correo: "carlos@gmail.com",
      genero: "Hombre",
    });
    await registro.llenarDatos({
      nombre: "Carlos",
      apellido: "Perez",
      fechaNacimiento: "2000-01-01",
      relacion: "Padre",
      correo: "carlos@gmail.com",
      genero: "Hombre",
    });
    Logger.info("Datos llenado");
    Logger.info("Ir registrar cursos");
    await registro.gotoCursos();
    Logger.info("Verificar registro cursos");
    await registro.verificarRegistroCursos();
  } catch (err) {
    await datosTutores.screenshot({
      path: screenshotPath(`Test registro datos tutor valido`),
    });
    Logger.error(err);
    throw err;
  }
});

test.describe("Registro de tutores campos obligatorios", () => {
  const testCases = testCasesTutoresObligatorios;
  for (const { key, expectSuccess } of testCases) {
    test(`Test registro datos obligatorios de tutores: ${tutores[key].descripcion}`, async ({
      datosTutores,
    }) => {
      try {
        const registro = new RegistroTutorPage(datosTutores);
        Logger.info(`Test verificar llenado de tutor`);
        Logger.info("Llenar datos");
        Logger.debug(tutores[key]);
        await registro.llenarDatos(tutores[key]);
        Logger.info("Datos llenado");
        Logger.info("Ir registrar cursos");
        await registro.gotoCursos();
        Logger.info(`Verificar mensaje de error`);
        const errorMsg = await registro.getErrorMessages();
        expect(errorMsg.length).toBeGreaterThan(0);
        Logger.error("Registro tutor fallido");
        Logger.error(`Mensaje de error para ${key}: ${errorMsg}`);
      } catch (err) {
        await datosTutores.screenshot({
          path: screenshotPath(
            `Test registro datos obligatorios de tutores: ${tutores[key].descripcion}`
          ),
        });
        Logger.error(err);
        throw err;
      }
    });
  }
});

test.describe("Registro de tutor campos opcionales", () => {
  const testCases = testCasesTutoresOpcionales;
  for (const { key } of testCases) {
    test(`Test registro datos opcionales de tutores: ${tutoresOpcionales[key].descripcion}`, async ({
      datosTutores,
    }) => {
      try {
        const registro = new RegistroTutorPage(datosTutores);
        Logger.info(`Test verificar llenado de tutor`);
        Logger.info("Llenar datos");
        Logger.debug(tutoresOpcionales[key]);
        await registro.llenarDatosOpcionales(tutoresOpcionales[key]);
        Logger.info("Datos llenado");
        Logger.info("Ir registrar cursos");
        await registro.gotoCursos();
        Logger.info(`Verificar mensaje de error`);
        const errorMsg = await registro.getErrorMessages();
        expect(errorMsg.length).toBeGreaterThan(0);
        Logger.error("Registro tutor fallido");
        Logger.error(`Mensaje de error para ${key}: ${errorMsg}`);
      } catch (err) {
        await datosTutores.screenshot({
          path: screenshotPath(
            `Test registro datos opcionales de tutores: ${tutoresOpcionales[key].descripcion}`
          ),
        });
        Logger.error(err);
        throw err;
      }
    });
  }
});
