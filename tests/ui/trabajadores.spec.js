import { test, expect } from "../../utils/fixture.js";
import { TrabajadoresPage } from "../../pages/trabajadoresPage.js";
import lisTrabajadores from "../../data/dataTrabajador.json";
import { Logger, screenshotPath } from "../../utils/helper.js"; 

test("@ui @positive Validar ingreso a la pagina Trabajadores", async ({ loginFixture }) => {
    const trabajadoresPage = new TrabajadoresPage(loginFixture);
    await trabajadoresPage.gotoTrabajadores();
});

test("@ui @negative ingresar uusuario nuevo", async ({ loginFixture }) => {
    const trabajadoresPage = new TrabajadoresPage(loginFixture);
    await trabajadoresPage.gotoTrabajadores();
    //await trabajadoresPage.ingresarTrabajador();
    await trabajadoresPage.verificarTrabajadorPorNombre("Jose Luis")
});

for (const trabajador of lisTrabajadores) {
  test(`Crear trabajador con: "${trabajador.tipeTest}"`, async ({ loginFixture }) => {
    const { page, cardPage } = await setupCardTest(loginFixture);
    await cardPage.cardActionAddLabel({ color: label.colorLabel, title: label.nameLabel });
    await cardPage.closeDialogCard();

    const appliedLabel = page
    .locator(`[data-testid="compact-card-label"][aria-label="Color: ${label.confirmColorLabel}, título: “${label.nameLabel}”"]`)
    .first();
  await expect(appliedLabel).toBeVisible();
  });
}