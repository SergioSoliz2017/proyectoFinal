import { expect } from "@playwright/test";

export class TrabajadoresPage {
    constructor(page) {
        this.page = page;
        this.trabajdoresButton = this.page.getByRole('button', { name: 'Trabajadores' });
        this.tituloTrabajadores = this.page.locator('span:has-text("Trabajadores")');
        //agregar trabajador 
        this.newTrabajadorButton = this.page.locator('button[class="sc-efBctP gcivou"]');
        this.ventanaEmergenteNewTrabajador = this.page.locator('div.sc-eXBvqI.ifiwsm', { hasText: 'AÑADIR NUEVO TRABAJADOR' });
        //campos para agregar trabajador
        this.nombreTrabajadorLabel = this.page.locator('input[id="Nombre"]');
        this.fechaTrabajadorLabel = this.page.locator('input[id="fecha"]');
        this.rolTrabajadorLabel = this.page.locator('select[id="Rol"]');
        //this.sedeTrabajadorLabel = this.page.locator('select[id="Nombre"]');
        this.contraseñaTrabajadorLabel = this.page.locator('input[id="Contraseña"]');
        this.crearTrabajdorFromularioButton = this.page.getByRole('button', { name: 'Crear trabajador' });
    }

    async gotoTrabajadores() {
        //await this.page.waitForTimeout(3000);
        await this.trabajdoresButton.click();
        await expect(this.tituloTrabajadores).toBeVisible();
    }

    async ingresarTrabajador(nombre,fecha,rol,contraseña) {
        await this.newTrabajadorButton.click();
        await expect(this.ventanaEmergenteNewTrabajador).toBeVisible();

        if(nombre){
            await this.nombreTrabajadorLabel.fill(`${nombre}`);
        }
        if(fecha){
            await this.fechaTrabajadorLabel.fill(`${fecha}`);
        }
        if(rol){
            await this.rolTrabajadorLabel.selectOption(`${rol}`);
        }
        //await this.sedeTrabajadorLabel.selectOption('Proyecto Final');
        if(contraseña){
            await this.contraseñaTrabajadorLabel.fill(`${contraseña}`); 
        }
        await this.crearTrabajdorFromularioButton.click();
        await expect(this.tituloTrabajadores).toBeVisible();
    }

    async verificarTrabajadorPorNombre(nombreTrabajador) {
        const trabajadorDeNombre = this.page.locator('td', { hasText: nombreTrabajador });
        await expect(trabajadorDeNombre.first()).toBeVisible();
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
        return messages;
        } catch (e) {
        return [];
        }
    }

}
