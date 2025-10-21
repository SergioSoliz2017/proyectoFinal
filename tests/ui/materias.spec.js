import { test, expect } from "../../utils/fixture.js";
import { MateriasPage } from "../../pages/materiasPage.js";
import listMaterias from "../../data/dataMateria.json";
import listGrupos from "../../data/dataGrupos.json";
//import users from "../../data/users.json" assert { type: "json" };
//import { Logger, screenshotPath } from "../../utils/helpers.js"; 
/*
test("@ui @negative Validar ingreso a la pagina Trabajadores", async ({ loginFixture }) => {
    const materiasPage = new MateriasPage(loginFixture);
    await materiasPage.gotoMaterias();
    //await materiasPage.ingresarMateria("1a");
    //await materiasPage.mensajeDeValidación("Materia no válida. Verifica el formato.")
    //await materiasPage.verificarMateriaPorNombre("AJEDREZ");
    await materiasPage.ingresarGrupoMateria("AJEDREZ", "nombreGrupo");
    //mensaje de validación corecto
    //await materiasPage.mensajeDeValidación('Materia creada correctamente ✅')

    //codigo copiado de sergey
    //const errorMsg = await login.getErrorMessages();
    //expect(errorMsg.length).toBeGreaterThan(0);
});

for (const materia of listMaterias) {
    test(`@ui @negative Crear un materia: "${materia.tipeTest}"`, async ({ loginFixture }) => {
        const materiasPage = new MateriasPage(loginFixture);
        await materiasPage.gotoMaterias();
        await materiasPage.ingresarMateria(materia.nombre);
        await materiasPage.mensajeDeValidación(materia.mensaje)
    });
}
*/
for (const grupo of listGrupos) {
    test(`@ui @negative Crear un grupo con: "${grupo.tipeTest}"`, async ({ loginFixture }) => {
        const materiasPage = new MateriasPage(loginFixture);
        await materiasPage.gotoMaterias();
        await materiasPage.ingresarGrupoMateria("DIBUJO", grupo.nombre, grupo.precio, grupo.cantidad, grupo.dias, grupo.hora);
        const errorMsg = await materiasPage.getErrorMessages();
        expect(errorMsg.length).toBeGreaterThan(grupo.errores);
    });
}