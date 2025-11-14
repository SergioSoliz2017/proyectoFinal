import { test, expect } from "../../utils/fixture.js";
import { MateriasPage } from "../../pages/materiasPage.js";
import listMaterias from "../../data/dataMateria.json";
import listGrupos from "../../data/dataGrupos.json";
import { Logger, screenshotPath } from "../../utils/helper.js";

test.describe("Agregado de materias", () => {
    for (const materia of listMaterias) {
        test(`@ui @negative Crear un materia: "${materia.tipeTest}"`, async ({ loginFixture }) => {
            const materiasPage = new MateriasPage(loginFixture);
            Logger.info("ingresando al apartado materias");
            await materiasPage.gotoMaterias();
            try {
            Logger.debug(`registrando la materia ${materia}`);
            await materiasPage.ingresarMateria(materia.nombre);
            Logger.info("comparando el mensaje obtenido con el esperado");
            await materiasPage.mensajeDeValidación(materia.mensaje)
            } catch (err) {
                await loginFixture.screenshot({ path: screenshotPath(`ERROR AL agregar la materia con: ${materia.tipeTest}`) });
                Logger.error(err);
                throw err;
            }
        });
    }
})
test.describe("Agregado de grupos", () => {
    for (const grupo of listGrupos) {
        test(`@ui @negative Crear un grupo con: "${grupo.tipeTest}"`, async ({ loginFixture }) => {
            const materiasPage = new MateriasPage(loginFixture);
            Logger.info("ingresando al apartado materias");
            await materiasPage.gotoMaterias();
            try {
            Logger.debug(`registrando la materia ${grupo}`);
            await materiasPage.ingresarGrupoMateria("PASTELERIA", grupo.nombre, grupo.precio, grupo.cantidad, grupo.dias, grupo.hora);
            const errorMsg = await materiasPage.getErrorMessages();
            Logger.debug(`Errores obtenidos:${errorMsg}`)
            Logger.info("comparando la cantidad de mensajes obtenidos con los esperados");
            expect(errorMsg.length).toBe(grupo.errores);
            } catch (err) {
                await loginFixture.screenshot({ path: screenshotPath(`ERROR AL agregar el grupo con: ${grupo.tipeTest}`) });
                Logger.error(err);
                throw err;
            }
        });
    }
})