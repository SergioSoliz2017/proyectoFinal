import { expect } from "@playwright/test";

export class MateriasPage {
    constructor(page) {
        this.page = page;
        this.materiasButton = this.page.getByRole('button', { name: 'Materias' });
        this.tituloMaterias = this.page.locator('span:has-text("Materias")');
        //agregar materia 
        this.newMateriaButton = this.page.locator('button[class="sc-efBctP gcivou"]');
        this.ventanaEmergenteNewMateria = this.page.locator('div.sc-eXBvqI.ifiwsm', { hasText: 'AÑADIR NUEVA MATERIA' });
        //formualrio materia
        this.nombreMateriaLabel = this.page.locator('input[id="Curso"]');
        this.crearMateriaFormularioButton = this.page.getByRole('button', { name: 'Crear materia' });
        //formulario grupo materia
        this.agregarGrupoButton = this.page.locator('button[title="Agregar grupo"]');
        this.nombreGrupoLabel = this.page.locator('input[id="Grupo"]');
        this.precioGrupoLabel = this.page.locator('input[id="precio"]');
        this.cantidadGrupoLabel = this.page.locator('input[id="Cantidad"]');
        this.diasGrupoLabel = this.page.locator('input[id="search_input"]');
        this.horaGrupoLabel = this.page.locator('select[class="sc-hZFzCs fZPHZ"]');
        this.grupoMateriasFormularioButton = this.page.getByRole('button', { name: 'Añadir' });
        //copiadito de sergey
        this.error_msg = "//div[@role='status' and @aria-live='polite']";
    }

    async gotoMaterias() {
        //await this.page.waitForTimeout(3000);
        await this.materiasButton.click();
        await expect(this.tituloMaterias).toBeVisible();
    }


    async ingresarMateria(nombreMateria) {
        await this.newMateriaButton.click();
        await expect(this.ventanaEmergenteNewMateria).toBeVisible();
        await this.nombreMateriaLabel.fill(`${nombreMateria}`);
        await this.crearMateriaFormularioButton.click();
        await this.page.waitForTimeout(1000);
    }

    async mensajeDeValidación(mensajeEsperado) {
        const mensaje = this.page.locator('div[role="status"]').first();
        await expect(mensaje).toHaveText(mensajeEsperado);
    }

    async verificarMateriaPorNombre(nombreMateria) {
        const materiaConNombre = this.page.locator('td', { hasText: nombreMateria });
        await expect(materiaConNombre.first()).toBeVisible();
    }

    async ingresarGrupoMateria(nombreMateria, nombreGrupo, precioGrupo, cantidadGrupo, diasGrupo, horaGrupo) {

        const filaMateria = this.page.locator('tr', { hasText: nombreMateria });
        await expect(filaMateria.first()).toBeVisible();

        const botonVerGrupos = filaMateria.locator('div[title="Ver grupos"]');
        await botonVerGrupos.click();

        const ventanaEmergentMaterias = this.page.locator('div', { hasText: `MATERIA DE ${nombreMateria}` }).first();
        await expect(ventanaEmergentMaterias).toBeVisible();
        await this.agregarGrupoButton.click();

        //rellenando datos
        if (nombreGrupo) {
            await this.nombreGrupoLabel.fill(`${nombreGrupo}`);
        }
        if (precioGrupo) {
            //await this.precioGrupoLabel.fill(`${precioGrupo}`);
            await this.precioGrupoLabel.pressSequentially(`${precioGrupo}`);
        }
        if (cantidadGrupo) {
            await this.cantidadGrupoLabel.fill(`${cantidadGrupo}`);
        }
        if (diasGrupo) {
            await this.diasGrupoLabel.click();
            for (const dia of diasGrupo) {
                await this.page.locator('li.option', { hasText: dia }).click();
            }
        }
        //await this.diasGrupoLabel.fill('Lunes');
        if (horaGrupo) {
            await this.horaGrupoLabel.selectOption(`${horaGrupo}`);
        }
        await this.grupoMateriasFormularioButton.click();
        await this.page.waitForTimeout(2000);
    }

    async getErrorMessages() {
        const locators = this.page.locator(this.error_msg);
        try {
            await locators.first().waitFor({ state: "visible", timeout: 3000 });
            const count = await locators.count();
            const messages = [];
            for (let i = 0; i < count; i++) {
                const element = locators.nth(i);
                if (await element.isVisible()) {
                    const text = await element.textContent();
                    if (text) {
                        const trimmedText = text.trim();
                        if (trimmedText !== "Inicio Correcto") {
                            messages.push(trimmedText);
                        }
                    }
                }
            }
            return [...new Set(messages)];
        } catch (e) {
            return [];
        }
    }

}