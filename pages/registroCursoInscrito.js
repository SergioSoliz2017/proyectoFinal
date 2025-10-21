import { expect } from "@playwright/test";
import { Logger } from "../utils/helper";
import { de } from "@faker-js/faker";

export class RegistroCursoInscritoPage {
  constructor(page) {
    this.page = page;
    this.cursoSelect = 'select[id="cursos"]';
    this.grupoSelect = 'select[id="grupos"]';
    this.mesesInput = 'input[placeholder="Meses"]';
    this.descuentoInput = 'input[placeholder="Descuento"]';
    this.pagoInput = 'input[placeholder="Monto"]';
  }

  async seleccionarCurso(curso) {
    await this.page.selectOption(this.cursoSelect, curso);
  }

  async seleccionarGrupo(grupo) {
    await this.page.selectOption(this.grupoSelect, { label: grupo });
  }

  async llenarMeses(meses) {
    await this.page.fill(this.mesesInput, meses);
  }

  async llenarDescuento(descuento) {
    await this.page.fill(this.descuentoInput, descuento);
  }

  async llenarDescuentoTotal(descuento) {
    const descuentoTotalInput = this.page
      .locator('input[placeholder="Descuento"]')
      .nth(1);
    await descuentoTotalInput.fill(descuento);
  }

  async llenarPago(pago) {
    await this.page.fill(this.pagoInput, pago);
  }

  async clickDescuento(clase, opcion) {
    // 🔹 Seleccionar el bloque específico

    const bloque = this.page.locator(clase).nth(opcion);

    // 🔹 Localizar el botón de porcentaje dentro del bloque
    const boton = bloque
      .locator('div:has-text("Descuento") >> div.sc-ikZpkk.bgHuoS')
      .click();

    // 🔹 Opcional: pausa para depuración
  }

  async verificarDescuento(
    clase,
    opcion,
    claseDiv,
    claseSpan,
    opcionInput,
    tipo
  ) {
    await this.page.pause();

    const bloque = this.page.locator(clase).nth(opcion);
    const inputDescuento = bloque.locator('input[placeholder="Descuento"]');
    const totalSpan = bloque.locator(claseDiv).nth(0).locator(claseSpan);
    const totalInicialTexto = (await totalSpan.textContent())
      ?.replace(/[^\d.-]/g, "")
      .trim();
    const totalInicial = parseFloat(totalInicialTexto) || 0;
    Logger.info("Llenar descuento");
    const descuentoInput = this.page
      .locator('input[placeholder="Descuento"]')
      .nth(opcionInput);
    let descuentoValor = 0;
    if (tipo === "porcentaje") {
      Logger.debug("Descuento tipo porcentaje: 5%");
      descuentoValor = 5;
    } else if (tipo === "monetario") {
      Logger.debug("Descuento tipo monetario: 10 Bs.");
      descuentoValor = 10;
    } else {
      Logger.error(`Tipo de descuento desconocido: ${tipo}`);
      return;
    }
    await descuentoInput.fill(descuentoValor.toString());
    const descuentoTexto = await inputDescuento.inputValue();
    const descuentoLeido = parseFloat(descuentoTexto) || 0;
    Logger.debug(
      `Total inicial: ${totalInicial} | Descuento: ${descuentoLeido} ${tipo}`
    );
    Logger.info("Calcular total esperado");
    let totalEsperado = 0;
    if (tipo === "porcentaje") {
      totalEsperado = totalInicial - (totalInicial * descuentoLeido) / 100;
    } else {
      totalEsperado = totalInicial - descuentoLeido;
    }

    if (totalEsperado < 0) totalEsperado = 0;
    const totalNuevoTexto = (await totalSpan.textContent())
      ?.replace(/[^\d.-]/g, "")
      .trim();
    const totalNuevo = parseFloat(totalNuevoTexto) || 0;
    if (Math.abs(totalNuevo - totalEsperado) > 0.1) {
      Logger.error(
        `Total incorrecto. Esperado: ${totalEsperado}, obtenido: ${totalNuevo}`
      );
    } else {
      Logger.info(`Total correcto (${totalNuevo} Bs.)`);
    }
  }

  async verificarDescuentoMonetario() {}

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

  async agregarCursoInscritoRegistro() {
    await this.page.click('button:has(svg[data-icon="plus"])');
  }

  async verificarCursoInscrito(clase) {
    const precioSpan = this.page.locator(clase).nth(1);
    const textoPrecio = await precioSpan.textContent();
    const precio = textoPrecio.trim();
    const filas = this.page.locator(".sc-lbOyJj.iQiVOs");
    const cantidadDespues = await filas.count();
    const precios = await this.page
      .locator(".sc-lbOyJj.iQiVOs .sc-gFGZVQ.MPyKX:nth-child(3)")
      .allTextContents();
    const hayNaN = precios.some((p) => p.trim().includes("NaN"));
    if (precio.includes("NaN")) {
      Logger.info(
        "El precio mostrado era NaN, el curso no debería haberse agregado"
      );
      if (hayNaN) {
        Logger.error(
          "Se detectó un curso con precio NaN agregado incorrectamente"
        );
      } else {
        Logger.debug("El curso con NaN no se agregó (correcto)");
      }
    } else {
      Logger.debug("Precio correcto:", precio);

      if (hayNaN) {
        Logger.error("Hay un curso con precio NaN en la lista, algo falló");
      } else if (cantidadDespues === 0) {
        Logger.error("No se agregó ningún curso aunque el precio era válido");
      } else {
        Logger.debug("El curso se agregó correctamente a la lista");
      }
    }
  }

  async verificarPago(descuento, pago, clase) {
    const bloque = this.page.locator(clase).nth(2);
    const inputDescuento = bloque.locator('input[placeholder="Descuento"]');
    const inputPago = bloque.locator('input[placeholder="Monto"]');
    const totalSpan = bloque
      .locator(".sc-ckMVTt.cqecnN")
      .nth(0)
      .locator(".sc-fXynhf.gCDMpl");
    const saldoSpan = bloque
      .locator(".sc-ckMVTt.cqecnN")
      .nth(1)
      .locator(".sc-fXynhf.gCDMpl");
    const totalInicialTexto = (await totalSpan.textContent())
      ?.replace(/[^\d.-]/g, "")
      .trim();
    const totalInicial = parseFloat(totalInicialTexto) || 0;
    Logger.info("Llenar descuento total");
    Logger.debug(`Descuento: ${descuento}`);
    await this.llenarDescuentoTotal(descuento);
    Logger.info("Llenar pago");
    Logger.debug(`Pago: ${pago}`);
    await this.llenarPago(pago);
    const descuentoTexto = await inputDescuento.inputValue();
    const descuentoLeido = parseFloat(descuentoTexto) || 0;
    const pagoTexto = await inputPago.inputValue();
    const pagoLeido = parseFloat(pagoTexto) || 0;
    Logger.debug(
      `Total inicial: ${totalInicial} | Descuento: ${descuentoLeido}% | Pago: ${pagoLeido}`
    );
    if (pagoLeido < 0) {
      Logger.error(`Pago inválido: no puede ser negativo (${pagoLeido})`);
    }
    Logger.info("Calcular descuento esperado");
    let totalEsperado = totalInicial - (totalInicial * descuentoLeido) / 100;
    if (totalEsperado < 0) totalEsperado = 0;
    const totalNuevoTexto = (await totalSpan.textContent())
      ?.replace(/[^\d.-]/g, "")
      .trim();
    const totalNuevo = parseFloat(totalNuevoTexto) || 0;
    if (Math.abs(totalNuevo - totalEsperado) > 0.1) {
      Logger.error(
        `Total incorrecto. Esperado: ${totalEsperado}, obtenido: ${totalNuevo}`
      );
    } else {
      Logger.info(`Total correcto (${totalNuevo} Bs.)`);
    }
    if (pagoLeido >= 0) {
      Logger.info("Calcular saldo esperado");
      let saldoEsperado = totalNuevo - pagoLeido;
      if (saldoEsperado < 0) saldoEsperado = 0;
      const saldoTexto = (await saldoSpan.textContent())
        ?.replace(/[^\d.-]/g, "")
        .trim();
      const saldoActual = parseFloat(saldoTexto) || 0;
      if (Math.abs(saldoActual - saldoEsperado) > 0.1) {
        Logger.error(
          `Saldo incorrecto. Esperado: ${saldoEsperado}, obtenido: ${saldoActual}`
        );
      } else {
        Logger.info(`Saldo correcto (${saldoActual} Bs.)`);
      }
    } else {
      Logger.info("No se verifica saldo porque el pago es inválido");
    }

    // 🔹 Retornar estado de validación si necesitas usarlo después
  }

  async verificarCambioTipoDescuento(opcion) {
    const botonesDescuento = this.page.locator(
      'div:has-text("Descuento") >> div.sc-ikZpkk.bgHuoS'
    );

    await expect(botonesDescuento.nth(opcion).locator("svg")).toHaveAttribute(
      "data-icon",
      "percent"
    );
    await botonesDescuento.nth(opcion).click();
    await expect(botonesDescuento.nth(opcion).locator("svg")).toHaveAttribute(
      "data-icon",
      "money-bill"
    );
  }

  async verificarCambioIconoDescuento() {
    const botonesDescuento = this.page.locator(
      'div:has-text("Descuento") >> div.sc-ikZpkk.bgHuoS'
    );
    await expect(botonesDescuento.nth(0).locator("svg")).toHaveAttribute(
      "data-icon",
      "percent"
    );
    await expect(botonesDescuento.nth(1).locator("svg")).toHaveAttribute(
      "data-icon",
      "percent"
    );
    await botonesDescuento.nth(0).click();
    await expect(botonesDescuento.nth(0).locator("svg")).toHaveAttribute(
      "data-icon",
      "money-bill"
    );
    await expect(botonesDescuento.nth(1).locator("svg")).toHaveAttribute(
      "data-icon",
      "percent"
    );
  }

  async verificarCursoEnHorario() {
    const celdas = this.page.locator(
      "div.sc-iTONeN.lCDtO table tbody td div.sc-iNWwEs"
    );
    const existeCurso = await celdas.filter({ hasText: "Curso01" }).count();
    if (existeCurso > 0) {
      return true;
    } else {
      return false;
    }
  }

  async eliminarCursoEnHorario(nombreGrupo) {
    const celdaGrupo = page.locator(
      `div.sc-iTONeN.lCDtO table tbody td div.sc-iNWwEs`,
      { hasText: nombreGrupo }
    );
    await celdaGrupo.click();
  }
}
