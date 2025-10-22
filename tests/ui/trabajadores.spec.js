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
    await trabajadoresPage.gotoTrabajadores();
    await trabajadoresPage.ingresarTrabajador(trabajador.nombre,trabajador.fecha,trabajador.rol,trabajador.contraseña);
    if (trabajador.pased){
        await trabajadoresPage.verificarTrabajadorPorNombre(trabajador.nombre);
    }
    const errorMsg = await trabajadoresPage.getErrorMessages();
    expect(errorMsg.length).toBeGreaterThan(trabajador.errores);
  });
}