import { expect } from "@playwright/test";

export class ListasPage {
    constructor(page) {
        this.page = page;
        this.listasButton = this.page.getByRole('button', { name: 'Listas' });
        this.tituloListas = this.page.locator('span:has-text("Listas")');
        //ver estudiantes/tutores
        this.listasEstudiantesButton = this.page.getByRole('button', { name: 'Estudiantes' , exact: true });
        this.listasTuresButton = this.page.getByRole('button', { name: 'Tutores' });
        //filtros
        this.recargarListasButton = this.page.locator('svg.fa-arrows-rotate');
        this.buscadorLavel = this.page.locator('input[class="sc-jgbSNz hjkcWt"]');
        this.filtradorListasButton = this.page.locator('svg.fa-arrow-down-wide-short');
        this.fechaInicioInput = this.page.locator('input[type="date"]').nth(0);
        this.fechaFinInput = this.page.locator('input[type="date"]').nth(1);
        this.cerrarFiltradorButton = this.page.locator('button[class="sc-hFrEEg bRJrsP"]');
        //listas
        this.registrosCantidadSelect = this.page.getByRole('button', { name: /Filas por página:/ });
        this.previusPageButton = this.page.locator('button[title="Previous page"]');
        this.nextPageButton = this.page.locator('button[title="Next page"]');
    }

    async gotoListas() {
        //await this.page.waitForTimeout(3000);
        await this.listasButton.click();
        await expect(this.tituloListas).toBeVisible();
    }

    async gotoEstudiantes() {
        await this.listasEstudiantesButton.click();
        await this.page.waitForTimeout(1000);
    }

    async gotoTutores() {
        await this.listasTuresButton.click();
        await this.page.waitForTimeout(1000);
    }

    async recargarListas() {
        await this.recargarListasButton.click();
    }

    async buscarFiltroTexto(palabraFiltro){
        await this.buscadorLavel.fill(`${palabraFiltro}`);
    }

    async buscarFiltroOptions(optionFiltro){
        await this.filtradorListasButton.click();
        const filtroOption = this.page.locator('.sc-ddcaxn', { hasText: `${optionFiltro}` });
        await filtroOption.click();
        await this.cerrarFiltradorButton.click();
    }

    async buscarFiltroFecha(fechaIni, fechaFin){
        await this.filtradorListasButton.click();
        await this.fechaInicioInput.fill(`${fechaIni}`);
        await this.fechaFinInput.fill(`${fechaFin}`);
        await this.cerrarFiltradorButton.click();
    }

    async seleccionarRegistrosPorPagina(valor) {
    await this.registrosCantidadSelect.click();
    await this.page.getByRole('option', { name: `${valor}` }).click();
    await this.page.waitForTimeout(2000);
    }

    async resultadoFiltro() {
        const filas = this.page.locator('tbody.MuiTableBody-root tr.MuiTableRow-root');
        const count = await filas.count();
        if (count === 0) {
            return 0;
        }
        await filas.first().waitFor({ state: 'visible', timeout: 5000 });
        return await filas.count();
    }

    async buscarFiltroCompleto(texto, fechaIni, fechaFin, genero, colegio){
        if(texto){
           await this.buscarFiltroTexto(texto);
        }
        if(fechaIni && fechaFin){
            await this.buscarFiltroFecha(fechaIni, fechaFin);
        }
        if(genero){
            await this.buscarFiltroOptions(genero);
        }
        if(colegio){
            await this.buscarFiltroOptions(colegio);
        }
    }

    async previusPage(){
        await this.previusPageButton.click();
    }
    async nextPage(){
        await this.nextPageButton.click();
    }
}

