import {
  recolectarTransacciones,
  cargarTransaccionesAsync,
  analizarTransacciones,
  calcularTotales
} from "./funciones2.js";

/* =========================================================
   FUNCIÓN PRINCIPAL
   ========================================================= */
async function ejecutarEjercicio2() {
  try {
    // 1. Recolectar datos
    const datosEntrada = recolectarTransacciones();

    if (datosEntrada.length === 0) {
      console.log("No se ingresaron transacciones.");
      return;
    }

    // 2. Cargar datos de forma asíncrona
    const transacciones = await cargarTransaccionesAsync(datosEntrada);

    // 3. Analizar transacciones usando callback
    analizarTransacciones(transacciones, (validas, rechazadas) => {

      console.log("\n===== RESUMEN GENERAL =====");
      console.log("Total procesadas:", transacciones.length);
      console.log("Transacciones válidas:", validas.length);
      console.log("Transacciones rechazadas:", rechazadas.length);

      if (rechazadas.length > 0) {
        console.log("\nDetalle de transacciones rechazadas:");
        rechazadas.forEach(t =>
          console.log(`ID ${t.id}: ${t.motivo}`)
        );
      }

      // 4. Calcular totales
      const totales = calcularTotales(validas);

      console.log("\nTotales:");
      console.log("Total en depósitos:", totales.totalDepositos);
      console.log("Total en retiros:", totales.totalRetiros);
      console.log("Total en transferencias:", totales.totalTransferencia);

      console.log("\nEjercicio 2 ejecutado correctamente.");
    });

  } catch (error) {
    console.log("Error general controlado:", error.message);
  }
}

// Llamar a la función principal para ejecutar el ejercicio
ejecutarEjercicio2();
