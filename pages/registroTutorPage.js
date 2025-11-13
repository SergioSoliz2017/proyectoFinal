import { expect } from "@playwright/test";

export class RegistroTutorPage {
  constructor(page) {
    this.page = page;
    this.nombreTutorInput = 'input[id="nombreTutor"]';
    this.apellidoTutorInput = 'input[id="apellidoTutor"]';
    this.fechaNacimientoTutorInput = 'input[id="fechaNacimientoTutor"]';
    this.correoTutorInput = 'input[id="Correo electronico del tutor"]';
    this.relacionSelect = 'select[id="curso"]';
    this.generoSelect = 'select[id="genero"]';
    this.celular = this.page.locator('input[id="CelularTutor"]').nth(0);
    this.alternativo = this.page.locator('input[id="CelularTutor"]').nth(1);
    this.ocupacion = 'input[id="ocupacionTutor"]';
    this.error_msg = "//div[@role='status' and @aria-live='polite']";
  }

  async gotoTutor() {
    await expect(
      this.page.locator("div", { hasText: /^Datos del tutor$/ })
    ).toBeVisible();
  }

  async gotoCursos() {
    await this.page.click('button:has(svg[data-icon="angle-right"])');
  }

  async llenarDatos(tutor) {
    await this.page.fill(this.nombreTutorInput, tutor.nombre);
    await this.page.fill(this.apellidoTutorInput, tutor.apellido);
    await this.page.fill(this.fechaNacimientoTutorInput, tutor.fechaNacimiento);
    await this.page.fill(this.correoTutorInput, tutor.correo);
    await this.page.selectOption(this.relacionSelect, tutor.relacion);
    await this.page.selectOption(this.generoSelect, tutor.genero);
  }
  async llenarDatosOpcionales(tutor) {
    await this.page.fill(this.nombreTutorInput, "Sergio");
    await this.page.fill(this.apellidoTutorInput, "Soliz");
    await this.page.fill(this.fechaNacimientoTutorInput, "2000-03-17");
    await this.page.fill(this.correoTutorInput, "sergio@gmail.com");
    await this.page.selectOption(this.relacionSelect, "Padre");
    await this.page.selectOption(this.generoSelect, "Hombre");
    await this.celular.fill(tutor.celular);
    await this.alternativo.fill(tutor.alternativo);
    await this.page.fill(this.ocupacion, tutor.ocupacion);
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

  async verificarRegistroCursos() {
    await expect(
      this.page.locator("div", { hasText: /^Registro de cursos$/ })
    ).toBeVisible();
  }
}
