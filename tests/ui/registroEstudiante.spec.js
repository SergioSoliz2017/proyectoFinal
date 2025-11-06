import { test, expect } from "../../utils/fixture.js";
import { RegistroEstudiantePage } from "../../pages/registroEstudiantePage.js";
import { Logger, screenshotPath } from "../../utils/helper.js";
import {
  testCasesEstudiantesObligatorios,
  testCasesEstudiantesOpcionales,
} from "../../data/testCasesRegistro.js";
const estudiantes = require("../../data/estudiantesObligatorio.json");
const estudiantesOpcionales = require("../../data/estudiantesOpcionales.json");

test(`Test verificar ir a registro`, async ({
  loginFixture,
}) => {
  try {
    const registro = new RegistroEstudiantePage(loginFixture);
    Logger.info(`Test ir a registro de estudiantes`);
    Logger.info(`Ir a registro`);
    await registro.gotoRegistro();
    Logger.info("Confirmado");
  } catch (err) {
    await loginFixture.screenshot({
      path: screenshotPath(`Test verificar ir a registro de estudiantes`),
    });
    Logger.error(err);
    throw err;
  }
});

test(`Test registro datos estudiante valido`, async ({ loginFixture }) => {
  try {
    const registro = new RegistroEstudiantePage(loginFixture);
    Logger.info(`Test verificar llenado de estudiante`);
    Logger.info(`Ir a registro de estudiantes`);
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
    await registro.gotoTieneTutor();
    Logger.info("Abrir modal ¿Tiene tutor?");
    await registro.verificarTieneTutor();
    Logger.info("Modal ¿Tiene tutor? abierto");
  } catch (err) {
    await loginFixture.screenshot({
      path: screenshotPath(`Test registro datos estudiante valido`),
    });
    Logger.error(err);
    throw err;
  }
});

test.describe("Registro de estudiantes campos obligatorios", () => {
  const testCases = testCasesEstudiantesObligatorios;
  for (const { key, expectSuccess } of testCases) {
    test(`Test registro datos obligatorios de estudiantes: ${estudiantes[key].descripcion}`, async ({
      loginFixture,
    }) => {
      try {
        const registro = new RegistroEstudiantePage(loginFixture);
        Logger.info(`Test verificar llenado de estudiante`);
        Logger.info(`Ir a registro de estudiantes`);
        await registro.gotoRegistro();
        Logger.info("Llenar datos");
        Logger.debug(estudiantes[key]);
        await registro.llenarDatos(estudiantes[key]);
        Logger.info("Datos llenado");
        Logger.info("Ir ¿Tiene tutor?");
        await registro.gotoTieneTutor();
        Logger.info(`Verificar mensaje de error`);
        const errorMsg = await registro.getErrorMessages();
        expect(errorMsg.length).toBeGreaterThan(0);
        Logger.error("Registro estudiante fallido");
        Logger.error(`Mensaje de error para ${key}: ${errorMsg}`);
      } catch (err) {
        await loginFixture.screenshot({
          path: screenshotPath(
            `Test registro datos obligatorios de estudiantes: ${estudiantes[key].descripcion}`
          ),
        });
        Logger.error(err);
        throw err;
      }
    });
  }
});

test.describe("Registro de estudiantes campos opcionales", () => {
  const testCases = testCasesEstudiantesOpcionales;
  for (const { key } of testCases) {
    test(`Test registro datos opcionales de estudiantes: ${estudiantesOpcionales[key].descripcion}`, async ({
      loginFixture,
    }) => {
      try {
        const registro = new RegistroEstudiantePage(loginFixture);
        Logger.info(`Test verificar llenado de estudiante`);
        Logger.info(`Ir a registro de estudiantes`);
        await registro.gotoRegistro();
        Logger.info("Llenar datos");
        Logger.debug(estudiantesOpcionales[key]);
        await registro.llenarDatosOpcionales(estudiantesOpcionales[key]);
        Logger.info("Datos llenado");
        Logger.info("Ir ¿Tiene tutor?");
        await registro.gotoTieneTutor();
        Logger.info(`Verificar mensaje de error`);
        const errorMsg = await registro.getErrorMessages();
        expect(errorMsg.length).toBeGreaterThanOrEqual(estudiantesOpcionales[key].errores);
        Logger.error("Registro estudiante fallido");
        Logger.error(`Mensaje de error para ${key}: ${errorMsg}`);
      } catch (err) {
        await loginFixture.screenshot({
          path: screenshotPath(
            `Test registro datos opcionales de estudiantes: ${estudiantesOpcionales[key].descripcion}`
          ),
        });
        Logger.error(err);
        throw err;
      }
    });
  }
});
