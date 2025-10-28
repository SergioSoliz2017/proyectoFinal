import { test, expect } from "../../utils/fixture.js";
import { TrabajadoresPage } from "../../pages/trabajadoresPage.js";
import lisTrabajadores from "../../data/dataTrabajador.json";
import { Logger, screenshotPath } from "../../utils/helper.js"; 


/*
test("@ui @smoke ingresar un usuario nuevo", async ({ loginFixture }) => {
    const trabajadoresPage = new TrabajadoresPage(loginFixture);
    await trabajadoresPage.gotoTrabajadores();
    await trabajadoresPage.ingresarTrabajador("Jose Cansejo","1995-09-11","Maestro","contraseña");
    await trabajadoresPage.verificarTrabajadorPorNombre("Jose Cansejo");
});
*/
for (const trabajador of lisTrabajadores) {
  test(`@ui @negative Crear un trabajador con: "${trabajador.tipeTest}"`, async ({ loginFixture }) => {
    const trabajadoresPage = new TrabajadoresPage(loginFixture);
    Logger.info("ingresando al apartado trabajadores");
    await trabajadoresPage.gotoTrabajadores();
    Logger.info(`Intentando crear trabajador: ${trabajador.nombre} con rol ${trabajador.rol}`);
    try{
    await trabajadoresPage.ingresarTrabajador(trabajador.nombre,trabajador.fecha,trabajador.rol,trabajador.contraseña);
    Logger.info("consultando si dicha inserción fue exitosa");
    if (trabajador.pased){
        Logger.info("verificando que exista el trabajador ingresado en la lista");
        await trabajadoresPage.verificarTrabajadorPorNombre(trabajador.nombre);
    }
    Logger.info("obteniendo la lista de errores");
    const errorMsg = await trabajadoresPage.getErrorMessages();
    Logger.info("comparando la lista de errores con la cantidad de errores esperados");
    expect(errorMsg.length).toBe(trabajador.errores);
    //expect(errorMsg.length).toBeGreaterThan(trabajador.errores);
    } catch (err) {
          await loginFixture.screenshot({ path: screenshotPath(`ERROR AL ingresar trabajador con ${trabajador.tipeTest}`) });
          Logger.error(err);
          throw err;
        }
  });
}