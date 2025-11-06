import { test, expect } from "../../utils/fixture.js";
import { TieneTutorPage } from "../../pages/tieneTutorPage.js";
import { Logger, screenshotPath } from "../../utils/helper.js";

test(`Test si tiene tutor`, async ({ datosEstudiantes }) => {
  try {
    Logger.info(`Test si tiene tutor`);
    const tieneTutor = new TieneTutorPage(datosEstudiantes);
    Logger.info(`Seleccionar opcion Si`);
    await tieneTutor.siTieneTutor();
    Logger.info(`Verificar campos tutor vacios`);
    await tieneTutor.verificarSiTieneTutor();
  } catch (err) {
    await datosEstudiantes.screenshot({
      path: screenshotPath(`Test si tiene tutor`),
    });
    Logger.error(err);
    throw err;
  }
});

test(`Test no tiene tutor`, async ({ datosEstudiantesNoTutor }) => {
  try {
    Logger.info(`Test no tiene tutor`);
    const tieneTutor = new TieneTutorPage(datosEstudiantesNoTutor);
    Logger.info(`Seleccionar opcion No`);
    await tieneTutor.noTieneTutor();
    Logger.info(`Verificar campos tutor autocompletados`);
    await tieneTutor.verificarNoTieneTutor();
  } catch (err) {
    await datosEstudiantesNoTutor.screenshot({
      path: screenshotPath(`Test no tiene tutor`),
    });
    Logger.error(err);
    throw err;
  }
});

test(`Test existe tiene tutor`, async ({ datosEstudiantes }) => {
  try {
    Logger.info(`Test existe tiene tutor`);
    const tieneTutor = new TieneTutorPage(datosEstudiantes);
    Logger.info(`Selecciona opcion Existe`);
    await tieneTutor.existeTutor();
    Logger.info(`Verificar visibilidad de tutores existentes`);
    await tieneTutor.verificarExisteTutor();
    Logger.info(`Ingresar tutor existente`);
    Logger.debug(`Tutor: Sergio Soliz`);
    Logger.debug(`Relacion: Padre`);
    await tieneTutor.ingresarTutor("Sergio Soliz", "Padre");
    Logger.info(`Tutor seleccionado`);
    await tieneTutor.gotoCursos();
  } catch (err) {
    await datosEstudiantes.screenshot({
      path: screenshotPath(`Test existe tiene tutor`),
    });
    Logger.error(err);
    throw err;
  }
});

test(`Test existe tiene tutor y relacion No tiene`, async ({
  datosEstudiantes,
}) => {
  try {
    Logger.info(`Test existe tiene tutor`);
    const tieneTutor = new TieneTutorPage(datosEstudiantes);
    Logger.info(`Selecciona opcion Existe`);
    await tieneTutor.existeTutor();
    Logger.info(`Verificar visibilidad de tutores existentes`);
    await tieneTutor.verificarExisteTutor();
    Logger.info(`Ingresar tutor existente`);
    Logger.debug(`Tutor: Sergio Soliz`);
    Logger.debug(`Relacion: No tiene`);
    await tieneTutor.ingresarTutor("Sergio Soliz", "No tiene");
    Logger.info(`Verificar mensaje de error`);
    const errorMsg = await tieneTutor.getErrorMessages();
    Logger.info(`Mensaje de error: ${errorMsg}`);
    expect(errorMsg.length).toBeGreaterThan(0);
    Logger.info(`Error al seleccionar relacion`);
    await tieneTutor.gotoCursos();
  } catch (err) {
    await datosEstudiantes.screenshot({
      path: screenshotPath(`Test existe tiene tutor y relacion No tiene`),
    });
    Logger.error(err);
    throw err;
  }
});

test(`Test existe tiene tutor y tutor no existe`, async ({
  datosEstudiantes,
}) => {
  try {
    Logger.info(`Test existe tiene tutor`);
    const tieneTutor = new TieneTutorPage(datosEstudiantes);
    Logger.info(`Selecciona opcion Existe`);
    await tieneTutor.existeTutor();
    Logger.info(`Verificar visibilidad de tutores existentes`);
    await tieneTutor.verificarExisteTutor();
    Logger.info(`Ingresar tutor no existente`);
    Logger.debug(`Tutor: Alazar452`);
    Logger.debug(`Relacion: Padre`);
    await tieneTutor.ingresarTutor("Alazar452", "Padre");
    Logger.info(`Verificar mensaje de error`);
    const errorMsg = await tieneTutor.getErrorMessages();
    Logger.info(`Mensaje de error: ${errorMsg}`);
    expect(errorMsg.length).toBeGreaterThan(0);
    Logger.info(`Error al seleccionar relacion`);
    await tieneTutor.gotoCursos();
  } catch (err) {
    await datosEstudiantes.screenshot({
      path: screenshotPath(`Test existe tiene tutor y tutor no existe`),
    });
    Logger.error(err);
    throw err;
  }
});
