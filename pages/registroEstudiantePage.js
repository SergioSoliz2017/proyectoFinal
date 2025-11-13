import { expect } from "@playwright/test";

export class RegistroEstudiantePage {
  constructor(page) {
    this.page = page;
    this.nombreEstudianteInput = 'input[id="nombreEstudiante"]';
    this.apellidoEstudianteInput = 'input[id="apellidoEstudiante"]';
    this.fechaNacimientoEstudianteInput =
      'input[id="fechaNacimientoEstudiante"]';
    this.DireccionInput = 'input[id="Direccion"]';
    this.paisInput = 'input[id="Pais"]';
    this.departamentoInput = 'input[id="Departamento"]';
    this.cuidadInput = 'input[id="Cuidad"]';
    this.colegioInput = 'input[id="Colegio"]';
    this.turnoSelect = 'select[id="Turno"]';
    this.cursoSelect = 'select[id="curso"]';
    this.tipoColegioSelect = 'select[id="tipoColegio"]';
    this.generoSelect = 'select[id="genero"]';
    this.error_msg = "//div[@role='status' and @aria-live='polite']";
  }

  async gotoRegistro() {
    await this.page
      .locator("button", { hasText: "Registro de estudiantes" })
      .click();
    await expect(
      this.page.locator("span", { hasText: "Registro de estudiantes" })
    ).toBeVisible();
  }

  async gotoEstudiante() {
    await expect(
      this.page.locator("div", { hasText: /^Datos del estudiante$/ })
    ).toBeVisible();
  }

  async gotoTieneTutor() {
    await this.page.click('button:has(svg[data-icon="angle-right"])');
  }

  async llenarDatos(estudiante) {
    await this.page.fill(this.nombreEstudianteInput, estudiante.nombre);
    await this.page.fill(this.apellidoEstudianteInput, estudiante.apellido);
    await this.page.fill(
      this.fechaNacimientoEstudianteInput,
      estudiante.fechaNacimiento
    );
    await this.page.selectOption(this.generoSelect, estudiante.genero);
  }
  async llenarDatosOpcionales(estudiante) {
    await this.page.fill(this.nombreEstudianteInput, "Sergio");
    await this.page.fill(this.apellidoEstudianteInput, "Soliz");
    await this.page.fill(this.fechaNacimientoEstudianteInput, "2000-03-17");
    await this.page.selectOption(this.generoSelect, "Hombre");
    await this.page.fill(this.DireccionInput, estudiante.direccion);
    await this.page.fill(this.paisInput, estudiante.pais);
    await this.page.fill(this.departamentoInput, estudiante.departamento);
    await this.page.fill(this.cuidadInput, estudiante.ciudad);
    await this.page.fill(this.colegioInput, estudiante.colegio);
    await this.page.selectOption(this.turnoSelect, estudiante.turno);
    await this.page.selectOption(this.cursoSelect, estudiante.curso);
    await this.page.selectOption(
      this.tipoColegioSelect,
      estudiante.tipoColegio
    );
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

  async verificarTieneTutor() {
    const modal = this.page.locator("div.sc-jmnVvD.csVVUC");
    await expect(modal).toBeVisible({ timeout: 7000 });
    const texto = modal.locator("div", { hasText: "¿Tiene tutor?" }).first();
    await expect(texto).toBeVisible();
  }
}
