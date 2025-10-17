import { test, expect } from "../../utils/fixture.js";
import { ListasPage } from "../../pages/listasPage.js";
//import users from "../../data/users.json" assert { type: "json" };
//import { Logger, screenshotPath } from "../../utils/helpers.js"; 

test("@ui @negative Validar ingreso a la pagina Trabajadores", async ({ loginFixture }) => {
    const listasPage = new ListasPage(loginFixture);
    await listasPage.gotoListas();
    
    await listasPage.gotoTutores();
    //await listasPage.gotoEstudiantes();
    //await listasPage.recargarListas();
    //await listasPage.buscarFiltroTexto("Jose");
    //await listasPage.buscarFiltroOptions("Tutor legal");
    await listasPage.seleccionarRegistrosPorPagina("20");

});

