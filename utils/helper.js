import fs from "fs";
import path from "path";
import winston from "winston";

/**
 * Genera un path para guardar un screenshot.
 * Crea la carpeta si no existe.
 * @param {string} name - Nombre base del archivo.
 * @returns {string} Ruta completa al archivo.
 */
export function screenshotPath(name) {
  const outDir = path.join("reports", "screenshots");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const ts = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace("T", "_")
    .split(".")[0];

  return path.join(outDir, `${ts}_${name}.png`);
}

const logsDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

export const Logger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ timestamp, level, message }) => {
      const msg =
        typeof message === "object"
          ? JSON.stringify(message, null, 2)
          : message;
      return `${timestamp} ${level.toUpperCase()} ${msg}`;
    })
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(logsDir, "test_log.log"),
      options: { flags: "a" },
    }),
    new winston.transports.Console(),
  ],
});
