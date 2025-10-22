import { test, expect } from "../../utils/fixture.js";
import { ListasPage } from "../../pages/listasPage.js";
import listFiltrosEstudiantes from "../../data/dataFiltroEstudiante.json";
import listFiltrosTurores from "../../data/dataFiltroTutor.json";
//import users from "../../data/users.json" assert { type: "json" };
//import { Logger, screenshotPath } from "../../utils/helpers.js"; 

test("@ui @negative Validar borrado de filtros", async ({ loginFixture }) => {
    const listasPage = new ListasPage(loginFixture);
    await listasPage.gotoListas();
    await listasPage.buscarFiltroOptions("Mujer");
    const cantidadFiltros = await listasPage.resultadoFiltro();
    expect(cantidadFiltros).toBe(3);
    await listasPage.recargarListas();
    const cantidadFiltros2 = await listasPage.resultadoFiltro();
    expect(cantidadFiltros2).toBe(5);
});

test("@ui @negative Cambiar pagina", async ({ loginFixture }) => {
    const listasPage = new ListasPage(loginFixture);
    await listasPage.gotoListas();
    await listasPage.nextPage();
    const siguientePagina = await listasPage.resultadoFiltro();
    expect(siguientePagina).toBe(2);
    await listasPage.previusPage();
    const anteriorPagina = await listasPage.resultadoFiltro();
    expect(anteriorPagina).toBe(5);
});

test("@ui @negative Validar cantidad a mostrar por pagina", async ({ loginFixture }) => {
    const listasPage = new ListasPage(loginFixture);
    await listasPage.gotoListas();
    await listasPage.seleccionarRegistrosPorPagina("20");
    const cantidadFiltros = await listasPage.resultadoFiltro();
    expect(cantidadFiltros).toBe(7);
});

for (const filtro of listFiltrosEstudiantes) {
    test(`@ui @negative Realizar filtro estudiante : "${filtro.tipeTest}"`, async ({ loginFixture }) => {
        const listasPage = new ListasPage(loginFixture);
        await listasPage.gotoListas();
        await listasPage.buscarFiltroCompleto(filtro.texto, filtro.fechaIni, filtro.fechaFin, filtro.genero, filtro.colegio);
        const cantidadFiltros = await listasPage.resultadoFiltro();
        expect(cantidadFiltros).toBe(filtro.resultados);
    });
}

for (const filtroT of listFiltrosTurores) {
    test(`@ui @negative Realizar filtro tutor : "${filtroT.tipeTest}"`, async ({ loginFixture }) => {
        const listasPage = new ListasPage(loginFixture);
        await listasPage.gotoListas();
        await listasPage.gotoTutores();
        await listasPage.buscarFiltroCompleto(filtroT.texto, filtroT.fechaIni, filtroT.fechaFin, filtroT.genero, filtroT.relacion);
        const cantidadFiltros = await listasPage.resultadoFiltro();
        expect(cantidadFiltros).toBe(filtroT.resultados);
    });
}

