import { test, expect } from "../../utils/fixture.js";
import { MateriasPage } from "../../pages/materiasPage.js";
//import users from "../../data/users.json" assert { type: "json" };
//import { Logger, screenshotPath } from "../../utils/helpers.js"; 

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

