import { test, expect } from "../../utils/fixture.js";
import { ListasPage } from "../../pages/listasPage.js";
import listFiltrosEstudiantes from "../../data/dataFiltroEstudiante.json";
import listFiltrosTurores from "../../data/dataFiltroTutor.json";
import listDatosEstudiantes from "../../data/dataEditarInformacionEstudiante.json";
import listDatosTutores from "../../data/dataEditarInformacionTutor.json";

import { Logger, screenshotPath } from "../../utils/helper.js"; 
//import users from "../../data/users.json" assert { type: "json" };

for (const datosEstudiante of listDatosEstudiantes) {
    test(`@ui @negative editar información Estudiante : "${datosEstudiante.tipeTest}"`, async ({ loginFixture }) => {
        const listasPage = new ListasPage(loginFixture);
        Logger.info("ingresando al apartado listas");
        await listasPage.gotoListas();
        try{
        Logger.info("editando información de estudiante");
        await listasPage.editarInformacionEstudiante("20251018JUAMOR",datosEstudiante.nombre, datosEstudiante.apellido, datosEstudiante.fecha, datosEstudiante.colegio, datosEstudiante.direccion, datosEstudiante.ciudad, datosEstudiante.departamento, datosEstudiante.pais);
        Logger.info("verificando si existen mensajes de error");
        if(!datosEstudiante.pased){
            const errorMsg = await listasPage.getErrorMessages();
            Logger.info("comparando la cantidad de mensajes obtenidos con los esperados");
            expect(errorMsg.length).toBe(1);
        }
        } catch (err) {
            await loginFixture.screenshot({ path: screenshotPath(`ERROR AL editar los datos de etudiante ${datosEstudiante.tipeTest}`) });
            Logger.error(err);
            throw err;
        }
    });
}

for (const datosTutor of listDatosTutores) {
    test(`@ui @negative editar información Tutor : "${datosTutor.tipeTest}"`, async ({ loginFixture }) => {
        const listasPage = new ListasPage(loginFixture);
        Logger.info("ingresando al apartado listas");
        await listasPage.gotoListas();
        Logger.info("ingresando al apartado listas de tutores");
        await listasPage.gotoTutores();
        try{
        Logger.info("editando información de estudiante");
        await listasPage.editarInformacionTutor("20251018JUAMOR",datosTutor.nombre, datosTutor.apellido, datosTutor.fecha, datosTutor.celular);
        Logger.info("verificando si existen mensajes de error");
        if(!datosTutor.pased){
            const errorMsg = await listasPage.getErrorMessages();
            Logger.info("comparando la cantidad de mensajes obtenidos con los esperados");
            expect(errorMsg.length).toBe(1);
        }
        } catch (err) {
            await loginFixture.screenshot({ path: screenshotPath(`ERROR AL editar datos de tutor ${datosTutor.tipeTest}`) });
            Logger.error(err);
            throw err;
        }
    });
}

/*
test("@ui @negative Validar borrado de filtros", async ({ loginFixture }) => {
    const listasPage = new ListasPage(loginFixture);
    Logger.info("ingresando al apartado listas");
    await listasPage.gotoListas();
    Logger.info("filtrando por genero Mujer");
    await listasPage.buscarFiltroOptions("Mujer");
    Logger.info("comparando resultados obtenidos con esperados");
    const cantidadFiltros = await listasPage.resultadoFiltro();
    expect(cantidadFiltros).toBe(3);
    try{
    Logger.info("borrando el filtro anterior");
    await listasPage.recargarListas();
    Logger.info("comparando resultados obtenidos con esperados");
    const cantidadFiltros2 = await listasPage.resultadoFiltro();
    expect(cantidadFiltros2).toBe(5);
    } catch (err) {
        await loginFixture.screenshot({ path: screenshotPath(`ERROR AL ingresar trabajador con ${trabajador.tipeTest}`) });
        Logger.error(err);
        throw err;
    }
});

test("@ui @negative Cambiar pagina", async ({ loginFixture }) => {
    const listasPage = new ListasPage(loginFixture);
    Logger.info("ingresando al apartado listas");
    await listasPage.gotoListas();
    try{
    Logger.info("cambiando de pagina");
    await listasPage.nextPage();
    Logger.info("comparando resultados obtenidos con esperados");
    const siguientePagina = await listasPage.resultadoFiltro();
    expect(siguientePagina).toBe(2);
    Logger.info("retornando a la anterior pagina");
    await listasPage.previusPage();
    Logger.info("comparando resultados obtenidos con esperados");
    const anteriorPagina = await listasPage.resultadoFiltro();
    expect(anteriorPagina).toBe(5);
    } catch (err) {
        await loginFixture.screenshot({ path: screenshotPath(`ERROR AL ingresar trabajador con ${trabajador.tipeTest}`) });
        Logger.error(err);
        throw err;
    }
});

test("@ui @negative Validar cantidad a mostrar por pagina", async ({ loginFixture }) => {
    const listasPage = new ListasPage(loginFixture);
    Logger.info("ingresando al apartado listas");
    await listasPage.gotoListas();
    try{
    Logger.info("cambiando la cantidad a mostrar a 20");
    await listasPage.seleccionarRegistrosPorPagina("20");
    Logger.info("comparando resultados obtenidos con esperados");
    const cantidadFiltros = await listasPage.resultadoFiltro();
    expect(cantidadFiltros).toBe(7);
    } catch (err) {
        await loginFixture.screenshot({ path: screenshotPath(`ERROR AL ingresar trabajador con ${trabajador.tipeTest}`) });
        Logger.error(err);
        throw err;
    }
});

for (const filtro of listFiltrosEstudiantes) {
    test(`@ui @negative Realizar filtro estudiante : "${filtro.tipeTest}"`, async ({ loginFixture }) => {
        const listasPage = new ListasPage(loginFixture);
        Logger.info("ingresando al apartado listas");
        await listasPage.gotoListas();
        try{
        Logger.info("realizando el filtro");
        await listasPage.buscarFiltroCompleto(filtro.texto, filtro.fechaIni, filtro.fechaFin, filtro.genero, filtro.colegio);
        Logger.info("comparando resultados obtenidos con esperados");
        const cantidadFiltros = await listasPage.resultadoFiltro();
        expect(cantidadFiltros).toBe(filtro.resultados);
        } catch (err) {
            await loginFixture.screenshot({ path: screenshotPath(`ERROR AL ingresar trabajador con ${trabajador.tipeTest}`) });
            Logger.error(err);
            throw err;
        }
    });
}

for (const filtroT of listFiltrosTurores) {
    test(`@ui @negative Realizar filtro tutor : "${filtroT.tipeTest}"`, async ({ loginFixture }) => {
        const listasPage = new ListasPage(loginFixture);
        Logger.info("ingresando al apartado listas");
        await listasPage.gotoListas();
        Logger.info("ingresando al apartado de listas tutores");
        await listasPage.gotoTutores();
        try{
        Logger.info("realizando el filtro");
        await listasPage.buscarFiltroCompleto(filtroT.texto, filtroT.fechaIni, filtroT.fechaFin, filtroT.genero, filtroT.relacion);
        Logger.info("comparando resultados obtenidos con esperados");
        const cantidadFiltros = await listasPage.resultadoFiltro();
        expect(cantidadFiltros).toBe(filtroT.resultados);
        } catch (err) {
            await loginFixture.screenshot({ path: screenshotPath(`ERROR AL ingresar trabajador con ${trabajador.tipeTest}`) });
            Logger.error(err);
            throw err;
        }
    });
}
*/
