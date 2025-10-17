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

    async ingresarTrabajador() {
        await this.newTrabajadorButton.click();
        await expect(this.ventanaEmergenteNewTrabajador).toBeVisible();
        await this.nombreTrabajadorLabel.fill('Jose Luis');
        await this.fechaTrabajadorLabel.fill('2000-10-14');
        await this.rolTrabajadorLabel.selectOption('Maestro');
        //await this.sedeTrabajadorLabel.selectOption('Proyecto Final');
        await this.contraseñaTrabajadorLabel.fill('CONTRASEÑA');   
        await this.crearTrabajdorFromularioButton.click();
        await expect(this.tituloTrabajadores).toBeVisible();
    }

    async verificarTrabajadorPorNombre(nombreTrabajador) {
        const trabajadorDeNombre = this.page.locator('td', { hasText: nombreTrabajador });
        await expect(trabajadorDeNombre.first()).toBeVisible();
    }



}
