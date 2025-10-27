import { test, expect } from "../utils/fixture.js";
import { RegistroCursoInscritoPage } from "../pages/registroCursoInscrito.js";
import { Logger, screenshotPath } from "../utils/helper.js";
import {
  testCasesRegistroCursoInscrito,
  testCasesPagoCursos,
  testCasesDescuentos,
  testCasesDescuentosLista,
} from "../data/testCasesRegistro.js";
import { ListasPage } from "../pages/listasPage.js";
const registroCursosInscritos = require("../data/cursosIncritos.json");
const pagoCursosInscritos = require("../data/pagoCursosInscritos.json");

test(`Test registro de nuevo curso inscrito valido`, async ({ cursos }) => {
  Logger.info(`Test verificar registro de curso inscrito valido`);
  const registro = new RegistroCursoInscritoPage(cursos);
  Logger.info(`Seleccionar curso`);
  Logger.debug(`Curso: APOYO`);
  await registro.seleccionarCurso("APOYO");
  Logger.info(`Seleccionar grupo`);
  Logger.debug(`Grupo: Curso01`);
  await registro.seleccionarGrupo("Curso01 ✅");
  Logger.info(`Llenar meses`);
  Logger.debug(`Meses: 2`);
  await registro.llenarMeses("2");
  Logger.info(`Llenar descuento`);
  Logger.debug(`Descuento: 10`);
  await registro.llenarDescuento("10");
  Logger.info(`Agregar curso inscrito`);
  await registro.agregarCursoInscritoRegistro();
  Logger.info(`Verificar curso inscrito`);
  await registro.verificarCursoInscrito(".sc-ehmTmK.loHxwa");
});

test(`Test registro de nuevo curso inscrito valido - listas`, async ({
  listas,
}) => {
  Logger.info(`Test verificar registro de curso inscrito valido - listas`);
  const registro = new RegistroCursoInscritoPage(listas);
  Logger.info(`Seleccionar curso`);
  Logger.debug(`Curso: APOYO`);
  await registro.seleccionarCurso("APOYO");
  Logger.info(`Seleccionar grupo`);
  Logger.debug(`Grupo: Curso01`);
  await registro.seleccionarGrupo("Curso01 ✅");
  Logger.info(`Llenar meses`);
  Logger.debug(`Meses: 2`);
  await registro.llenarMeses("2");
  Logger.info(`Llenar descuento`);
  Logger.debug(`Descuento: 10`);
  await registro.llenarDescuento("10");
  Logger.info(`Agregar curso inscrito`);
  await registro.agregarCursoInscritoRegistro();
  Logger.info(`Verificar curso inscrito`);
  await registro.verificarCursoInscrito(".sc-ehmTmK.loHxwa");
});

test(`Test registro de pago nuevo curso inscrito valido`, async ({
  cursos,
}) => {
  Logger.info(`Test verificar pago registro de curso inscrito valido`);
  const registro = new RegistroCursoInscritoPage(cursos);
  Logger.info(`Seleccionar curso`);
  Logger.debug(`Curso: APOYO`);
  await registro.seleccionarCurso("APOYO");
  Logger.info(`Seleccionar grupo`);
  Logger.debug(`Grupo: Curso01`);
  await registro.seleccionarGrupo("Curso01 ✅");
  Logger.info(`Llenar meses`);
  Logger.debug(`Meses: 2`);
  await registro.llenarMeses("2");
  Logger.info(`Llenar descuento`);
  Logger.debug(`Descuento: 10`);
  await registro.llenarDescuento("10");
  Logger.info(`Agregar curso inscrito`);
  await registro.agregarCursoInscritoRegistro();
  Logger.info(`Verificar curso inscrito`);
  await registro.verificarCursoInscrito(
    ".sc-ehmTmK.loHxwa",
    2,
    ".sc-ckMVTt.cqecnN",
    ".sc-fXynhf.gCDMpl"
  );
  Logger.info(`Verificar calculo de pago`);
  await registro.verificarPago(
    "10",
    "81",
    ".sc-ehmTmK.loHxwa",
    2,
    ".sc-ckMVTt.cqecnN",
    ".sc-fXynhf.gCDMpl"
  );
});

test(`Test registro de pago nuevo curso inscrito valido - listas`, async ({
  listas,
}) => {
  Logger.info(`Test verificar pago registro de curso inscrito valido - listas`);
  const registro = new RegistroCursoInscritoPage(listas);
  Logger.info(`Seleccionar curso`);
  Logger.debug(`Curso: APOYO`);
  await registro.seleccionarCurso("APOYO");
  Logger.info(`Seleccionar grupo`);
  Logger.debug(`Grupo: Curso01`);
  await registro.seleccionarGrupo("Curso01 ✅");
  Logger.info(`Llenar meses`);
  Logger.debug(`Meses: 2`);
  await registro.llenarMeses("2");
  Logger.info(`Llenar descuento`);
  Logger.debug(`Descuento: 10`);
  await registro.llenarDescuento("10");
  Logger.info(`Agregar curso inscrito`);
  await registro.agregarCursoInscritoRegistro();
  Logger.info(`Verificar curso inscrito`);
  await registro.verificarCursoInscrito(".sc-ehmTmK.loHxwa");
  Logger.info(`Verificar calculo de pago`);
  await registro.verificarPago(
    "10",
    "81",
    ".sc-ehmTmK.loHxwa",
    1,
    ".sc-hQRsPl.gAfhmQ",
    ".sc-fjqEFS.fBtMmT"
  );
});

test.describe("Verificacion descuentos", () => {
  const testCases = testCasesDescuentos;
  const testCasesLista = testCasesDescuentosLista;

  for (const {
    key,
    clase,
    opcion,
    claseDiv,
    claseSpan,
    tipo,
    opcionInput,
  } of testCases) {
    test(`Test verificar descuento: ${key} - ${tipo}`, async ({ cursos }) => {
      Logger.info(`Test verificar descuento ${tipo}}`);
      const registro = new RegistroCursoInscritoPage(cursos);
      Logger.info(`Seleccionar curso`);
      Logger.debug(`Curso: APOYO`);
      await registro.seleccionarCurso("APOYO");
      Logger.info(`Seleccionar grupo`);
      Logger.debug(`Grupo: Curso01`);
      await registro.seleccionarGrupo("Curso01 ✅");
      Logger.info(`Llenar meses`);
      Logger.debug(`Meses: 2`);
      await registro.llenarMeses("2");
      if (tipo === "monetario" && opcion === 0) {
        Logger.info(`Click en cambio icono`);
        await registro.clickDescuento(clase, opcion);
      }
      if (opcion === 0) {
        await registro.verificarDescuento(
          clase,
          opcion,
          claseDiv,
          claseSpan,
          opcionInput,
          tipo
        );
      } else {
        Logger.info(`Agregar curso inscrito`);
        await registro.agregarCursoInscritoRegistro();
        if (tipo === "monetario") {
          Logger.info(`Click en cambio icono`);
          await registro.clickDescuento(clase, opcion);
        }
        await registro.verificarDescuento(
          clase,
          opcion,
          claseDiv,
          claseSpan,
          opcionInput,
          tipo
        );
      }
    });
  }

  for (const {
    key,
    clase,
    opcion,
    claseDiv,
    claseSpan,
    tipo,
    opcionInput,
  } of testCasesLista) {
    test(`Test verificar descuento listas: ${key} - ${tipo}`, async ({
      listas,
    }) => {
      Logger.info(`Test verificar descuento ${tipo}}`);
      const registro = new RegistroCursoInscritoPage(listas);
      Logger.info(`Seleccionar curso`);
      Logger.debug(`Curso: APOYO`);
      await registro.seleccionarCurso("APOYO");
      Logger.info(`Seleccionar grupo`);
      Logger.debug(`Grupo: Curso01`);
      await registro.seleccionarGrupo("Curso01 ✅");
      Logger.info(`Llenar meses`);
      Logger.debug(`Meses: 2`);
      await registro.llenarMeses("2");
      Logger.info(`Llenar descuento total`);
      Logger.debug(`Descuento: 10`);
      if (tipo === "monetario" && opcion === 0) {
        await registro.clickDescuento(clase, opcion);
      }
      if (opcion === 0) {
        await registro.verificarDescuento(
          clase,
          opcion,
          claseDiv,
          claseSpan,
          opcionInput,
          tipo
        );
      } else {
        Logger.info(`Agregar curso inscrito`);
        await registro.agregarCursoInscritoRegistro();
        if (tipo === "monetario") {
          Logger.info(`Click en cambio icono`);
          await registro.clickDescuento(clase, opcion);
        }
        await registro.verificarDescuento(
          clase,
          opcion,
          claseDiv,
          claseSpan,
          opcionInput,
          tipo
        );
      }
    });
  }
});

test(`Test verificar cambio icono descuento`, async ({ cursos }) => {
  Logger.info(`Test verificar cambio icono descuento`);
  const registro = new RegistroCursoInscritoPage(cursos);
  Logger.info(`Seleccionar curso`);
  Logger.debug(`Curso: APOYO`);
  await registro.seleccionarCurso("APOYO");
  Logger.info(`Seleccionar grupo`);
  Logger.debug(`Grupo: Curso01`);
  await registro.seleccionarGrupo("Curso01 ✅");
  Logger.info(`Llenar meses`);
  Logger.debug(`Meses: 2`);
  await registro.llenarMeses("2");
  Logger.info(`Verificar tipo de descuento`);
  await registro.verificarCambioTipoDescuento(0, ".sc-ikZpkk.bgHuoS");
  Logger.info(`Tipo de descuento verificado`);
});

test(`Test verificar cambio icono descuento total`, async ({ cursos }) => {
  Logger.info(`Test verificar cambio icono descuento total`);
  const registro = new RegistroCursoInscritoPage(cursos);
  Logger.info(`Seleccionar curso`);
  Logger.debug(`Curso: APOYO`);
  await registro.seleccionarCurso("APOYO");
  Logger.info(`Seleccionar grupo`);
  Logger.debug(`Grupo: Curso01`);
  await registro.seleccionarGrupo("Curso01 ✅");
  Logger.info(`Llenar meses`);
  Logger.debug(`Meses: 2`);
  await registro.llenarMeses("2");
  Logger.info(`Agregar curso inscrito`);
  await registro.agregarCursoInscritoRegistro();
  Logger.info(`Verificar tipo de descuento`);
  await registro.verificarCambioTipoDescuento(1, ".sc-ikZpkk.bgHuoS");
  Logger.info(`Tipo de descuento verificado`);
});

test(`Test verificar cambio icono descuento - listas`, async ({ listas }) => {
  Logger.info(`Test verificar cambio icono descuento - listas`);
  const registro = new RegistroCursoInscritoPage(listas);
  Logger.info(`Seleccionar curso`);
  Logger.debug(`Curso: APOYO`);
  await registro.seleccionarCurso("APOYO");
  Logger.info(`Seleccionar grupo`);
  Logger.debug(`Grupo: Curso01`);
  await registro.seleccionarGrupo("Curso01 ✅");
  Logger.info(`Llenar meses`);
  Logger.debug(`Meses: 2`);
  await registro.llenarMeses("2");
  Logger.info(`Verificar tipo de descuento`);
  await registro.verificarCambioTipoDescuento(0, ".sc-lgVVsH.dmjdke");
  Logger.info(`Tipo de descuento verificado`);
});

test(`Test verificar cambio icono descuento total - listas`, async ({
  listas,
}) => {
  Logger.info(`Test verificar cambio icono descuento total - listas`);
  const registro = new RegistroCursoInscritoPage(listas);
  Logger.info(`Seleccionar curso`);
  Logger.debug(`Curso: APOYO`);
  await registro.seleccionarCurso("APOYO");
  Logger.info(`Seleccionar grupo`);
  Logger.debug(`Grupo: Curso01`);
  await registro.seleccionarGrupo("Curso01 ✅");
  Logger.info(`Llenar meses`);
  Logger.debug(`Meses: 2`);
  await registro.llenarMeses("2");
  Logger.info(`Agregar curso inscrito`);
  await registro.agregarCursoInscritoRegistro();
  Logger.info(`Verificar tipo de descuento`);
  await registro.verificarCambioTipoDescuento(1, ".sc-lgVVsH.dmjdke");
  Logger.info(`Tipo de descuento verificado`);
});

test(`Test verificar cambio icono descuento diferente`, async ({ cursos }) => {
  Logger.info(`Test verificar cambio icono descuento diferente`);
  const registro = new RegistroCursoInscritoPage(cursos);
  Logger.info(`Seleccionar curso`);
  Logger.debug(`Curso: APOYO`);
  await registro.seleccionarCurso("APOYO");
  Logger.info(`Seleccionar grupo`);
  Logger.debug(`Grupo: Curso01`);
  await registro.seleccionarGrupo("Curso01 ✅");
  Logger.info(`Llenar meses`);
  Logger.debug(`Meses: 2`);
  await registro.llenarMeses("2");
  Logger.info(`Agregar curso inscrito`);
  await registro.agregarCursoInscritoRegistro();
  Logger.info(`Verificar icono de descuento`);
  await registro.verificarCambioIconoDescuento(".sc-ikZpkk.bgHuoS");
  Logger.info(`Tipo de descuento verificado`);
});
test(`Test verificar cambio icono descuento diferente - listas`, async ({
  listas,
}) => {
  Logger.info(`Test verificar cambio icono descuento diferente - listas`);
  const registro = new RegistroCursoInscritoPage(listas);
  Logger.info(`Seleccionar curso`);
  Logger.debug(`Curso: APOYO`);
  await registro.seleccionarCurso("APOYO");
  Logger.info(`Seleccionar grupo`);
  Logger.debug(`Grupo: Curso01`);
  await registro.seleccionarGrupo("Curso01 ✅");
  Logger.info(`Llenar meses`);
  Logger.debug(`Meses: 2`);
  await registro.llenarMeses("2");
  Logger.info(`Agregar curso inscrito`);
  await registro.agregarCursoInscritoRegistro();
  Logger.info(`Verificar icono de descuento`);
  await registro.verificarCambioIconoDescuento(".sc-lgVVsH.dmjdke");
  Logger.info(`Tipo de descuento verificado`);
});

test(`Test verificar curso inscrito en horario`, async ({ cursos }) => {
  Logger.info(`Test verificar curso inscrito en horario`);
  const registro = new RegistroCursoInscritoPage(cursos);
  Logger.info(`Seleccionar curso`);
  Logger.debug(`Curso: APOYO`);
  await registro.seleccionarCurso("APOYO");
  Logger.info(`Seleccionar grupo`);
  Logger.debug(`Grupo: Curso01`);
  await registro.seleccionarGrupo("Curso01 ✅");
  Logger.info(`Llenar meses`);
  Logger.debug(`Meses: 2`);
  await registro.llenarMeses("2");
  Logger.info(`Agregar curso inscrito`);
  await registro.agregarCursoInscritoRegistro();
  Logger.info(`Verificar curso en horario`);
  const cursoEnHorario = await registro.verificarCursoEnHorario(
    ".sc-iTONeN.lCDtO",
    ".sc-iNWwEs"
  );
  expect(cursoEnHorario).toBe(true);
  Logger.info(`Curso en horario`);
});

test(`Test verificar eliminar curso inscrito en horario`, async ({
  cursos,
}) => {
  Logger.info(`Test verificar eliminar curso inscrito en horario`);
  const registro = new RegistroCursoInscritoPage(cursos);
  Logger.info(`Seleccionar curso`);
  Logger.debug(`Curso: APOYO`);
  await registro.seleccionarCurso("APOYO");
  Logger.info(`Seleccionar grupo`);
  Logger.debug(`Grupo: Curso01`);
  await registro.seleccionarGrupo("Curso01 ✅");
  Logger.info(`Llenar meses`);
  Logger.debug(`Meses: 2`);
  await registro.llenarMeses("2");
  Logger.info(`Agregar curso inscrito`);
  await registro.agregarCursoInscritoRegistro();
  Logger.info(`Verificar curso en horario`);
  const cursoEnHorario = await registro.verificarCursoEnHorario(
    ".sc-iTONeN.lCDtO",
    ".sc-iNWwEs"
  );
  expect(cursoEnHorario).toBe(true);
  Logger.info(`Curso en horario`);
  Logger.info(`Eliminar curso en horario`);
  await registro.eliminarCursoEnHorario(
    "Curso01",
    ".sc-iTONeN.lCDtO",
    ".sc-iNWwEs"
  );
  Logger.info(`Verificar curso en horario`);
  const cursoEnHorarioEliminado = await registro.verificarCursoEnHorario(
    ".sc-iTONeN.lCDtO",
    ".sc-iNWwEs"
  );
  expect(cursoEnHorarioEliminado).toBe(false);
  Logger.info(`Curso en horario eliminado`);
});

test(`Test verificar curso inscrito en horario - listas`, async ({
  listas,
}) => {
  Logger.info(`Test verificar curso inscrito en horario - listas`);
  const registro = new RegistroCursoInscritoPage(listas);
  Logger.info(`Seleccionar curso`);
  Logger.debug(`Curso: APOYO`);
  await registro.seleccionarCurso("APOYO");
  Logger.info(`Seleccionar grupo`);
  Logger.debug(`Grupo: Curso01`);
  await registro.seleccionarGrupo("Curso01 ✅");
  Logger.info(`Llenar meses`);
  Logger.debug(`Meses: 2`);
  await registro.llenarMeses("2");
  Logger.info(`Agregar curso inscrito`);
  await registro.agregarCursoInscritoRegistro();
  Logger.info(`Verificar curso en horario`);
  const cursoEnHorario = await registro.verificarCursoEnHorario(
    ".sc-kGhOqx.kpCxXS",
    ".sc-bAKPPm.eUPazL"
  );
  expect(cursoEnHorario).toBe(true);
  Logger.info(`Curso en horario`);
});

test(`Test verificar eliminar curso inscrito en horario - listas`, async ({
  listas,
}) => {
  Logger.info(`Test verificar eliminar curso inscrito en horario - listas`);
  const registro = new RegistroCursoInscritoPage(listas);
  Logger.info(`Seleccionar curso`);
  Logger.debug(`Curso: APOYO`);
  await registro.seleccionarCurso("APOYO");
  Logger.info(`Seleccionar grupo`);
  Logger.debug(`Grupo: Curso01`);
  await registro.seleccionarGrupo("Curso01 ✅");
  Logger.info(`Llenar meses`);
  Logger.debug(`Meses: 2`);
  await registro.llenarMeses("2");
  Logger.info(`Agregar curso inscrito`);
  await registro.agregarCursoInscritoRegistro();
  Logger.info(`Verificar curso en horario`);
  const cursoEnHorario = await registro.verificarCursoEnHorario(
    ".sc-kGhOqx.kpCxXS",
    ".sc-bAKPPm.eUPazL"
  );
  expect(cursoEnHorario).toBe(true);
  Logger.info(`Curso en horario`);
  Logger.info(`Eliminar curso en horario`);
  await registro.eliminarCursoEnHorario(
    "Curso01",
    ".sc-kGhOqx.kpCxXS",
    ".sc-bAKPPm.eUPazL"
  );
  Logger.info(`Verificar curso en horario`);
  const cursoEnHorarioEliminado = await registro.verificarCursoEnHorario(
    ".sc-kGhOqx.kpCxXS",
    ".sc-bAKPPm.eUPazL"
  );
  expect(cursoEnHorarioEliminado).toBe(false);
  Logger.info(`Curso en horario eliminado`);
});

test(`Test verificar registro sin cursos inscritos`, async ({ cursos }) => {
  Logger.info(`Test verificar registro sin cursos inscritos`);
  const registro = new RegistroCursoInscritoPage(cursos);
  Logger.info("Click siguiente");
  await registro.gotoFinalizar();
  Logger.info(`Verificar mensaje de error`);
  const errorMsg = await registro.getErrorMessages();
  Logger.error(`Mensaje de error: ${errorMsg}`);
  expect(errorMsg.length).toBeGreaterThanOrEqual(0);
});

test(`Test verificar registro sin cursos inscritos - listas`, async ({
  listas,
}) => {
  Logger.info(`Test verificar registro sin cursos inscritos - listas`);
  const registro = new RegistroCursoInscritoPage(listas);
  Logger.info("Click siguiente");
  await registro.gotoFinalizarListas();
  Logger.info(`Verificar mensaje de error`);
  const errorMsg = await registro.getErrorMessages();
  Logger.error(`Mensaje de error: ${errorMsg}`);
expect(errorMsg.length).toBeGreaterThan(0);
});

test(`Test verificar registro virtual completado`, async ({ cursos }) => {
  Logger.info(`Test verificar registro virtual completado`);
  const registro = new RegistroCursoInscritoPage(cursos);
  Logger.info(`Seleccionar curso`);
  Logger.debug(`Curso: APOYO`);
  await registro.seleccionarCurso("APOYO");
  Logger.info(`Seleccionar grupo`);
  Logger.debug(`Grupo: Curso01`);
  await registro.seleccionarGrupo("Curso01 ✅");
  Logger.info(`Llenar meses`);
  Logger.debug(`Meses: 2`);
  await registro.llenarMeses("2");
  Logger.info(`Agregar curso inscrito`);
  await registro.agregarCursoInscritoRegistro();
  Logger.info(`Verificar curso en horario`);
  const cursoEnHorario = await registro.verificarCursoEnHorario(
    ".sc-iTONeN.lCDtO",
    ".sc-iNWwEs"
  );
  expect(cursoEnHorario).toBe(true);
  Logger.info(`Curso en horario`);
  Logger.info(`Click siguiente`);
  await registro.gotoFinalizar();
  Logger.info(`Seleccionar registro virtual`);
  await registro.gotoRegistroVirtual();
  Logger.info("Verificar mensaje de confirmacion");
  await registro.verficarRegistroCompleto();
});

test(`Test verificar registro virtual completado - listas`, async ({
  listas,
}) => {
  Logger.info(`Test verificar registro virtual completado - listas`);
  const registro = new RegistroCursoInscritoPage(listas);
  Logger.info(`Seleccionar curso`);
  Logger.debug(`Curso: APOYO`);
  await registro.seleccionarCurso("APOYO");
  Logger.info(`Seleccionar grupo`);
  Logger.debug(`Grupo: Curso01`);
  await registro.seleccionarGrupo("Curso01 ✅");
  Logger.info(`Llenar meses`);
  Logger.debug(`Meses: 2`);
  await registro.llenarMeses("2");
  Logger.info(`Agregar curso inscrito`);
  await registro.agregarCursoInscritoRegistro();
  Logger.info(`Verificar curso en horario`);
  const cursoEnHorario = await registro.verificarCursoEnHorario(
    ".sc-kGhOqx.kpCxXS",
    ".sc-bAKPPm.eUPazL"
  );
  expect(cursoEnHorario).toBe(true);
  Logger.info(`Curso en horario`);
  Logger.info(`Click guardar`);
  await registro.gotoFinalizarListas();
  Logger.info("Verificar mensaje de confirmacion");
  await registro.verficarRegistroCompleto();
});

test(`Test verificar registro curso sin tutor seleccionado - listas`, async ({
  loginFixture,
}) => {
  Logger.info(`Test verificar registro curso sin tutor seleccionado - listas`);
  const listas = new ListasPage(loginFixture);
  Logger.info("Ir modulo listas");
  await listas.gotoListas();
  Logger.info("Seleccionar asignar curso");
  await listas.asignarCurso();
  Logger.info("Siguiente");
  await listas.gotoSiguiente();
  Logger.info("Verificar mensaje de error");
});

test.describe("Registro de cursos inscritos", () => {
  const testCases = testCasesRegistroCursoInscrito;
  for (const { key } of testCases) {
    test(`Test registro de nuevo curso inscrito: ${registroCursosInscritos[key].descripcion}`, async ({
      cursos,
    }) => {
      Logger.info(`Test verificar registro de curso inscrito`);
      const registro = new RegistroCursoInscritoPage(cursos);
      Logger.info(`Seleccionar curso`);
      Logger.debug(`Curso: ${registroCursosInscritos[key].curso}`);
      await registro.seleccionarCurso(registroCursosInscritos[key].curso);
      if (registroCursosInscritos[key].curso !== "Seleccionar Curso") {
        Logger.info(`Seleccionar grupo`);
        Logger.debug(`Grupo: ${registroCursosInscritos[key].grupo}`);
        await registro.seleccionarGrupo(registroCursosInscritos[key].grupo);
      }
      Logger.info(`Llenar meses`);
      Logger.debug(`Meses: ${registroCursosInscritos[key].meses}`);
      await registro.llenarMeses(registroCursosInscritos[key].meses);
      Logger.info(`Llenar descuento`);
      Logger.debug(`Descuento: ${registroCursosInscritos[key].descuento}`);
      await registro.llenarDescuento(registroCursosInscritos[key].descuento);
      Logger.info(`Agregar curso inscrito`);
      await registro.agregarCursoInscritoRegistro();
      Logger.info(`Verificar mensaje de error`);
      const errorMsg = await registro.getErrorMessages();
      Logger.error(`Mensaje de error para ${key}: ${errorMsg}`);
      expect(errorMsg.length).toBeGreaterThanOrEqual(
        registroCursosInscritos[key].errores
      );
      Logger.info(`Verificar curso inscrito`);
      await registro.verificarCursoInscrito(".sc-ehmTmK.loHxwa", 1);
      Logger.info("Registro curso fallido");
    });
  }
});

test.describe("Registro de pago cursos inscritos", () => {
  const testCases = testCasesPagoCursos;
  for (const { key } of testCases) {
    test(`Test registro de pago nuevo curso inscrito: ${pagoCursosInscritos[key].descripcion}`, async ({
      cursos,
    }) => {
      Logger.info(`Test verificar pago registro de curso inscrito`);
      const registro = new RegistroCursoInscritoPage(cursos);
      Logger.info(`Seleccionar curso`);
      Logger.debug(`Curso: APOYO`);
      await registro.seleccionarCurso("APOYO");
      Logger.info(`Seleccionar grupo`);
      Logger.debug(`Grupo: Curso01`);
      await registro.seleccionarGrupo("Curso01 ✅");
      Logger.info(`Llenar meses`);
      Logger.debug(`Meses: 2`);
      await registro.llenarMeses("2");
      Logger.info(`Llenar descuento`);
      Logger.debug(`Descuento: 10`);
      await registro.llenarDescuento("10");
      Logger.info(`Agregar curso inscrito`);
      await registro.agregarCursoInscritoRegistro();
      Logger.info(`Verificar curso inscrito`);
      await registro.verificarCursoInscrito(".sc-ehmTmK.loHxwa", 1, true);
      Logger.info(`Verificar calculo de pago`);
      await registro.verificarPago(
        pagoCursosInscritos[key].descuento,
        pagoCursosInscritos[key].pago,
        ".sc-ehmTmK.loHxwa",
        2,
        ".sc-ckMVTt.cqecnN",
        ".sc-fXynhf.gCDMpl"
      );
      Logger.info(`Verificar mensaje de error`);
      const errorMsg = await registro.getErrorMessages();
      expect(errorMsg.length).toBeGreaterThan(0);
    });
  }
});

test.describe("Registro de cursos inscritos lista", () => {
  const testCases = testCasesRegistroCursoInscrito;
  for (const { key } of testCases) {
    test(`Test registro de nuevo curso inscrito lista: ${registroCursosInscritos[key].descripcion}`, async ({
      listas,
    }) => {
      Logger.info(`Test verificar registro de curso inscrito lista`);
      const registro = new RegistroCursoInscritoPage(listas);
      Logger.info(`Seleccionar curso`);
      Logger.debug(`Curso: ${registroCursosInscritos[key].curso}`);
      await registro.seleccionarCurso(registroCursosInscritos[key].curso);
      if (registroCursosInscritos[key].curso !== "Seleccionar Curso") {
        Logger.info(`Seleccionar grupo`);
        Logger.debug(`Grupo: ${registroCursosInscritos[key].grupo}`);
        await registro.seleccionarGrupo(registroCursosInscritos[key].grupo);
      }
      Logger.info(`Llenar meses`);
      Logger.debug(`Meses: ${registroCursosInscritos[key].meses}`);
      await registro.llenarMeses(registroCursosInscritos[key].meses);
      Logger.info(`Llenar descuento`);
      Logger.debug(`Descuento: ${registroCursosInscritos[key].descuento}`);
      await registro.llenarDescuento(registroCursosInscritos[key].descuento);
      Logger.info(`Agregar curso inscrito`);
      await registro.agregarCursoInscritoRegistro();
      Logger.info(`Verificar mensaje de error`);
      const errorMsg = await registro.getErrorMessages();
      Logger.error(`Mensaje de error para ${key}: ${errorMsg}`);
      expect(errorMsg.length).toBeGreaterThanOrEqual(
        registroCursosInscritos[key].errores
      );
      Logger.info(`Verificar curso inscrito`);
      await registro.verificarCursoInscrito(".sc-ehmTmK.loHxwa", 0);
      Logger.info("Registro curso fallido");
    });
  }
});

test.describe("Registro de pago cursos inscritos lista", () => {
  const testCases = testCasesPagoCursos;
  for (const { key } of testCases) {
    test(`Test registro de pago nuevo curso inscrito lista : ${pagoCursosInscritos[key].descripcion}`, async ({
      listas,
    }) => {
      Logger.info(`Test verificar pago registro de curso inscrito lista`);
      const registro = new RegistroCursoInscritoPage(listas);
      Logger.info(`Seleccionar curso`);
      Logger.debug(`Curso: APOYO`);
      await registro.seleccionarCurso("APOYO");
      Logger.info(`Seleccionar grupo`);
      Logger.debug(`Grupo: Curso01`);
      await registro.seleccionarGrupo("Curso01 ✅");
      Logger.info(`Llenar meses`);
      Logger.debug(`Meses: 2`);
      await registro.llenarMeses("2");
      Logger.info(`Llenar descuento`);
      Logger.debug(`Descuento: 10`);
      await registro.llenarDescuento("10");
      Logger.info(`Agregar curso inscrito`);
      await registro.agregarCursoInscritoRegistro();
      Logger.info(`Verificar curso inscrito`);
      await registro.verificarCursoInscrito(".sc-ehmTmK.loHxwa", 0, true);
      Logger.info(`Verificar calculo de pago`);
      await registro.verificarPago(
        pagoCursosInscritos[key].descuento,
        pagoCursosInscritos[key].pago,
        ".sc-ehmTmK.loHxwa",
        1,
        ".sc-hQRsPl.gAfhmQ",
        ".sc-fjqEFS.fBtMmT"
      );
      Logger.info(`Verificar mensaje de error`);
      const errorMsg = await registro.getErrorMessages();
      expect(errorMsg.length).toBeGreaterThan(0);
    });
  }
});
