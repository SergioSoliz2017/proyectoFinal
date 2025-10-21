import { test, expect } from "../utils/fixture.js";
import { RegistroCursoInscritoPage } from "../pages/registroCursoInscrito.js";
import { Logger, screenshotPath } from "../utils/helper.js";
import {
  testCasesRegistroCursoInscrito,
  testCasesPagoCursos,
  testCasesDescuentos,
  testCasesDescuentosLista,
} from "../data/testCasesRegistro.js";
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
  await registro.verificarCursoInscrito(".sc-ehmTmK.loHxwa");
  Logger.info(`Verificar calculo de pago`);
  await registro.verificarPago("10", "81");
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
      if (tipo === "monetario") {
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
        Logger.info(`Verificar descuento`);
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
      Logger.info(`Llenar descuento total`);
      Logger.debug(`Descuento: 10"`);

      if (tipo === "monetario") {
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
  await registro.verificarCambioTipoDescuento(0);
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
  await registro.verificarCambioTipoDescuento(1);
  Logger.info(`Tipo de descuento verificado`);
});

test(`Test verificar cambio icono descuento - listas`, async ({ listas }) => {
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
  Logger.info(`Verificar tipo de descuento`);
  await registro.verificarCambioTipoDescuento(0, "sc-hQRsPl.gAfhmQ");
  Logger.info(`Tipo de descuento verificado`);
});

test(`Test verificar cambio icono descuento total - listas`, async ({
  listas,
}) => {
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
  Logger.info(`Agregar curso inscrito`);
  await registro.agregarCursoInscritoRegistro();
  Logger.info(`Verificar tipo de descuento`);
  await registro.verificarCambioTipoDescuento(2, "sc-hQRsPl.gAfhmQ");
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
  await registro.verificarCambioIconoDescuento();
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
  const cursoEnHorario = await registro.verificarCursoEnHorario();
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
  const cursoEnHorario = await registro.verificarCursoEnHorario();
  expect(cursoEnHorario).toBe(true);
  Logger.info(`Curso en horario`);
  Logger.info(`Eliminar curso en horario`);
  await registro.eliminarCursoEnHorario("Curso01");
  Logger.info(`Verificar curso en horario`);
  const cursoEnHorarioEliminado = await registro.verificarCursoEnHorario();
  expect(cursoEnHorarioEliminado).toBe(false);
  Logger.info(`Curso en horario eliminado`);
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
      Logger.info(`Seleccionar grupo`);
      Logger.debug(`Grupo: ${registroCursosInscritos[key].grupo}`);
      await registro.seleccionarGrupo(registroCursosInscritos[key].grupo);
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
      expect(errorMsg.length).toBeGreaterThan(0);
      Logger.error("Registro estudiante fallido");
      Logger.error(`Mensaje de error para ${key}: ${errorMsg}`);
      Logger.info(`Verificar curso inscrito`);
      await registro.verificarCursoInscrito(".sc-ehmTmK.loHxwa");
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
      await registro.verificarCursoInscrito(".sc-ehmTmK.loHxwa");
      Logger.info(`Verificar calculo de pago`);
      await registro.verificarPago(
        pagoCursosInscritos[key].descuento,
        pagoCursosInscritos[key].pago,
        ".sc-ehmTmK.loHxwa"
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
      const registro = new RegistroCursoInscritoPage(cursos);
      Logger.info(`Seleccionar curso`);
      Logger.debug(`Curso: ${registroCursosInscritos[key].curso}`);
      await registro.seleccionarCurso(registroCursosInscritos[key].curso);
      Logger.info(`Seleccionar grupo`);
      Logger.debug(`Grupo: ${registroCursosInscritos[key].grupo}`);
      await registro.seleccionarGrupo(registroCursosInscritos[key].grupo);
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
      expect(errorMsg.length).toBeGreaterThan(0);
      Logger.error("Registro estudiante fallido");
      Logger.error(`Mensaje de error para ${key}: ${errorMsg}`);
      Logger.info(`Verificar curso inscrito`);
      await registro.verificarCursoInscrito("sc-fjqEFS.fBtMmT");
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
      await registro.verificarCursoInscrito("sc-fjqEFS.fBtMmT");
      Logger.info(`Verificar calculo de pago`);
      await registro.verificarPago(
        pagoCursosInscritos[key].descuento,
        pagoCursosInscritos[key].pago,
        "sc-fjqEFS.fBtMmT"
      );
      Logger.info(`Verificar mensaje de error`);
      const errorMsg = await registro.getErrorMessages();
      expect(errorMsg.length).toBeGreaterThan(0);
    });
  }
});
