import {
  recolectarSolicitudes,
  validarSolicitudes,
  clasificarPorPrioridad,
  procesarCallback,
  procesarPromesa,
  procesarAsync
} from "./funciones1.js";

// =========================================================
// FUNCIÓN PRINCIPAL
// =========================================================
async function ejecutarEjercicio1() {
  try {
    // 1. Entrada
    const solicitudes = recolectarSolicitudes();

    if (solicitudes.length === 0) {
      console.log("No se ingresaron solicitudes.");
      return;
    }

    // 2. Validación
    const { validas, invalidas } = validarSolicitudes(solicitudes);

    console.log("\n===== RESUMEN =====");
    console.log("Total recibidas:", solicitudes.length);
    console.log("Válidas:", validas.length);
    console.log("Inválidas:", invalidas.length);

    if (invalidas.length > 0) {
      console.log("\nSolicitudes inválidas:");
      invalidas.forEach(s =>
        console.log(`ID ${s.id}: ${s.motivo}`)
      );
    }

    // 3. Clasificación
    const clasificadas = clasificarPorPrioridad(validas);

    console.log("\n===== PROCESAMIENTO =====");

    // 4. Procesamiento asíncrono
    for (let i = 0; i < clasificadas.length; i++) {
      const s = clasificadas[i];

      try {
        if (i % 3 === 0) {
          procesarCallback(s, (err, res) => {
            if (err) console.log(`ID ${s.id} - Error: ${err.message}`);
            else console.log(`ID ${s.id} - ${res}`);
          });

        } else if (i % 3 === 1) {
          const res = await procesarPromesa(s);
          console.log(`ID ${s.id} - ${res}`);

        } else {
          const res = await procesarAsync(s);
          console.log(`ID ${s.id} - ${res}`);
        }

      } catch (error) {
        console.log(`ID ${s.id} - Fallo: ${error.message}`);
      }
    }

    console.log("\n===== LISTADO FINAL =====");
    clasificadas.forEach(s => {
      console.log(
        `ID: ${s.id} | Tipo: ${s.tipo} | Prioridad: ${s.prioridadTexto} | Activo: ${s.activo}`
      );
    });

    console.log("\nEjercicio 1 ejecutado correctamente.");

  } catch (error) {
    console.log("Error general controlado:", error.message);
  }
}

// EJECUCIÓN
ejecutarEjercicio1();
