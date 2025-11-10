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
        //editar información
        this.editarInformacionButton = this.page.locator('svg[data-icon="pen-to-square"]');
        this.guardarInformacionButton = this.page.locator('svg[data-icon="floppy-disk"]');

        this.nombreEditarInput = this.page.locator('input[placeholder="Nombre"]');
        this.apellidoEditarInput = this.page.locator('input[placeholder="Apellido"]');
        this.fechaNacimientoEditarInput = this.page.locator('input[placeholder="FechaNacimiento"]');
        this.colegioEditarInput = this.page.locator('input[placeholder="Colegio"]');
        this.direccionEditarInput = this.page.locator('input[placeholder="Dirección"]');
        this.ciudadEditarInput = this.page.locator('input[placeholder="Ciudad"]');
        this.departamentoEditarInput = this.page.locator('input[placeholder="Departamento"]');
        this.paisEditarInput = this.page.locator('input[placeholder="País"]');
        this.celularEditarInput = this.page.locator('input[placeholder="Celular"]');
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

    async editarInformacionEstudiante(codEstudiante, nuevoNombre, neuvoApellido, fechaNacimiento, colegio, direccion, ciudad, departamento, pais) {
        const filaEstudiante = this.page.locator('tr', { hasText: codEstudiante });
        //const filaEstudiante = this.page.locator('tr', { hasText: nombreEstudiante }).filter({hasText: apellidoEstudiante});
        // boton inf
        const botonInformacion = filaEstudiante.locator('div[title="Información del estudiante"]');
        await expect(botonInformacion.first()).toBeVisible();
        await botonInformacion.click();
        
        await this.editarInformacionButton.click();
        
        if(nuevoNombre){
            await this.nombreEditarInput.fill(`${nuevoNombre}`);
        }
        if(neuvoApellido){
            await this.apellidoEditarInput.fill(`${neuvoApellido}`);
        }
        if(fechaNacimiento){
            await this.fechaNacimientoEditarInput.fill(`${fechaNacimiento}`);   
        }
        if(colegio){
            await this.colegioEditarInput.fill(`${colegio}`);
        }
        if(direccion){
            await this.direccionEditarInput.fill(`${direccion}`);
        }
        if(ciudad){
            await this.ciudadEditarInput.fill(`${ciudad}`);
        }
        if(departamento){
            await this.departamentoEditarInput.fill(`${departamento}`);
        }
        if(pais){
            await this.paisEditarInput.fill(`${pais}`);
        }
        await this.guardarInformacionButton.click();
        await this.page.waitForTimeout(2000);
    }

       async editarInformacionTutor(codigoTutor , nuevoNombre, neuvoApellido, fechaNacimiento, celular) {
        const filaTutor = this.page.locator('tr', { hasText: codigoTutor });

        // boton inf
        const botonInformacion = filaTutor.locator('div[title="Información del tutor"]');
        await expect(botonInformacion.first()).toBeVisible();
        await botonInformacion.click();
        
        await this.editarInformacionButton.click();
        
        if(nuevoNombre){
            await this.nombreEditarInput.fill(`${nuevoNombre}`);
        }
        if(neuvoApellido){
            await this.apellidoEditarInput.fill(`${neuvoApellido}`);
        }
        if(fechaNacimiento){
            await this.fechaNacimientoEditarInput.fill(`${fechaNacimiento}`);   
        }
        if(celular){
            await this.celularEditarInput.fill(`${celular}`);
        }
        await this.guardarInformacionButton.click();
        await this.page.waitForTimeout(2000);
        // Esperar a que aparezca el mensaje de éxito
        //await expect(this.page.locator('h2.swal2-title')).toHaveText('Cambio realizado');
        // Cerrar el mensaje
        //await this.page.locator('button.swal2-confirm').click();
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

