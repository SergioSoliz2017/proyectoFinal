import { expect } from "@playwright/test";

export class TieneTutorPage {
  constructor(page) {
    this.page = page;
    this.modal = this.page.locator("div.sc-jmnVvD.csVVUC");
    this.nombreTutorInput = 'input[id="nombreTutor"]';
    this.apellidoTutorInput = 'input[id="apellidoTutor"]';
    this.fechaNacimientoTutorInput = 'input[id="fechaNacimientoTutor"]';
    this.generoSelect = 'select[id="genero"]';
    this.nombreEstudianteInput = 'input[id="nombreEstudiante"]';
    this.apellidoEstudianteInput = 'input[id="apellidoEstudiante"]';
    this.fechaNacimientoEstudianteInput =
      'input[id="fechaNacimientoEstudiante"]';
    this.inputTutor = this.page.locator('input[name="busquedatutores"]');
    this.error_msg = "//div[@role='status' and @aria-live='polite']";
  }

  async siTieneTutor() {
    await this.modal.locator("button", { hasText: "Si" }).click();
  }

  async verificarSiTieneTutor() {
    const nombre = await this.page.locator(this.nombreTutorInput).inputValue();
    const apellido = await this.page
      .locator(this.apellidoTutorInput)
      .inputValue();
    const fecha = await this.page
      .locator(this.fechaNacimientoTutorInput)
      .inputValue();
    const genero = await this.page.locator(this.generoSelect).inputValue();
    expect(nombre).toBe("");
    expect(apellido).toBe("");
    expect(fecha).toBe("");
    expect(genero).toBe("");
  }

  async noTieneTutor() {
    await this.modal.locator("button", { hasText: "No" }).click();
  }
  async verificarNoTieneTutor() {
    const nombreTutor = await this.page
      .locator(this.nombreTutorInput)
      .inputValue();
    const apellidoTutor = await this.page
      .locator(this.apellidoTutorInput)
      .inputValue();
    const fechaTutor = await this.page
      .locator(this.fechaNacimientoTutorInput)
      .inputValue();
    const generoTutor = await this.page.locator(this.generoSelect).inputValue();
    expect(nombreTutor).toBe("Carlos");
    expect(apellidoTutor).toBe("Perez");
    expect(fechaTutor).toBe("2000-01-01");
    expect(generoTutor).toBe("Hombre");
  }
  async existeTutor() {
    await this.modal.locator("button", { hasText: "Existe" }).click();
  }
  async verificarExisteTutor() {
    await expect(this.inputTutor).toBeVisible();
  }

  async ingresarTutor(tutor, relacion) {
    await this.inputTutor.fill(tutor);
    await this.page
      .locator("select.sc-fytwQQ.iZcxev")
      .selectOption({ value: relacion });
  }

  async gotoCursos() { 
    await this.page
      .locator("button", { hasText: "Tutor seleccionado" })
      .click();
      await expect(this.page.locator("div", { hasText: /^Registro de cursos$/ })).toBeVisible();
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
