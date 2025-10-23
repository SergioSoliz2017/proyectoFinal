import { test, expect } from "../../utils/fixture.js";
import { MateriasPage } from "../../pages/materiasPage.js";
import listMaterias from "../../data/dataMateria.json";
import listGrupos from "../../data/dataGrupos.json";
//import users from "../../data/users.json" assert { type: "json" };
//import { Logger, screenshotPath } from "../../utils/helpers.js"; 

for (const materia of listMaterias) {
    test(`@ui @negative Crear un materia: "${materia.tipeTest}"`, async ({ loginFixture }) => {
        const materiasPage = new MateriasPage(loginFixture);
        Logger.info("ingresando al apartado materias");
        await materiasPage.gotoMaterias();
        Logger.info("registrando la materia");
        await materiasPage.ingresarMateria(materia.nombre);
        Logger.info("comparando el mensaje obtenido con el esperado");
        await materiasPage.mensajeDeValidación(materia.mensaje)
    });
}

for (const grupo of listGrupos) {
    test(`@ui @negative Crear un grupo con: "${grupo.tipeTest}"`, async ({ loginFixture }) => {
        const materiasPage = new MateriasPage(loginFixture);
        Logger.info("ingresando al apartado materias");
        await materiasPage.gotoMaterias();
        Logger.info("registrando el grupo en la materia");
        await materiasPage.ingresarGrupoMateria("DIBUJO", grupo.nombre, grupo.precio, grupo.cantidad, grupo.dias, grupo.hora);
        const errorMsg = await materiasPage.getErrorMessages();
        Logger.info("comparando la cantidad de mensajes obtenidos con los esperados");
        expect(errorMsg.length).toBe(grupo.errores);
    });
}