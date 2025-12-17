import promptSync from "prompt-sync";
const prompt = promptSync();

/* =========================================================
   FUNCIÓN: RECOLECTAR TRANSACCIONES DESDE CONSOLA
   ========================================================= */
/**
 * Solicita al usuario los datos de las transacciones bancarias
 * Valida cada entrada antes de registrarla
 * @returns {Array<Object>} Arreglo de transacciones ingresadas
 */
function recolectarTransacciones() {
  const transacciones = [];

  while (true) {
    try {
      let id, cliente, tipo, monto, autorizado;

      // =========================
      // ID
      // =========================
        id = Number(prompt("Ingrese el ID de la transacción: "));
        

      // =========================
      // Cliente
      // =========================
        cliente = prompt("Ingrese el nombre del cliente: ").trim();

      // =========================
      // Tipo de transacción
      // =========================
        tipo = prompt("Tipo (deposito | retiro | transferencia): ").trim().toLowerCase();

      // =========================
      // Monto
      // =========================
        monto = Number(prompt("Ingrese el monto: "));

      // =========================
      // Autorización
      // =========================
        while (true) {
        const resp = prompt("¿Transacción autorizada? (si/no): ").trim().toLowerCase();
        if (resp !== "si" && resp !== "no") {
          console.log("Respuesta inválida.");
          continue;
        }
        autorizado = resp === "si";
        break;
      }

      transacciones.push({
        id,
        cliente,
        tipo,
        monto,
        autorizado,
      });

      const continuar = prompt("¿Desea registrar otra transacción? (si/no): ").trim().toLowerCase();
      if (continuar === "no"){
        break;
      }

    } catch (error) {
      console.log("Error controlado:", error.message);
    }
  }

  return transacciones;
}

/* =========================================================
   FUNCIÓN: CARGA ASÍNCRONA DE TRANSACCIONES
   ========================================================= */
/**
 * Simula la carga asíncrona de transacciones
 * @param {Array<Object>} transacciones
 * @returns {Promise<Array<Object>>}
 */
function cargarTransaccionesAsync(transacciones) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!Array.isArray(transacciones)) {
        reject(new Error("Los datos no son válidos"));
      }
      resolve([...transacciones]); // copia inmutable
    }, 1000);
  });
}

/* =========================================================
   FUNCIÓN: VALIDAR TRANSACCIÓN
   ========================================================= */
/**
 * Valida una transacción individual
 * @param {Object} t
 * @returns {string|null} Mensaje de error o null si es válida
 */
function validarTransaccion(t) {
  if (!Number.isInteger(t.id) || t.id <= 0)
    return "ID inválido";

  if (typeof t.cliente !== "string" || t.cliente.trim() === "")
    return "Cliente inválido";

  if (!["deposito", "retiro", "transferencia"].includes(t.tipo))
    return "Tipo inválido";

  if (!Number.isInteger(t.monto) || t.monto <= 0)
    return "Monto inválido";

  if (typeof t.autorizado !== "boolean")
    return "Autorización inválida";

  if (t.autorizado === false)
    return "Transacción no autorizada";

  return null;
}

/* =========================================================
   FUNCIÓN: ANALIZAR TRANSACCIONES (CALLBACK)
   ========================================================= */
/**
 * Clasifica transacciones válidas y rechazadas
 * @param {Array<Object>} transacciones
 * @param {Function} callback
 */
function analizarTransacciones(transacciones, callback) {
  const validas = [];
  const rechazadas = [];

  for (const t of transacciones) {
    const error = validarTransaccion(t);
    if (error) {
      rechazadas.push({ ...t, motivo: error });
    } else {
      validas.push({ ...t });
    }
  }

  callback(validas, rechazadas);
}

/* =========================================================
   FUNCIÓN: CALCULAR TOTALES
   ========================================================= */
/**
 * Calcula el total de depósitos y retiros
 * @param {Array<Object>} validas
 * @returns {Object}
 */
function calcularTotales(validas) {
  let totalDepositos = 0;
  let totalRetiros = 0;
  let totalTransferencia = 0;

  for (const t of validas) {
    if (t.tipo === "deposito") totalDepositos += t.monto;
    if (t.tipo === "retiro") totalRetiros += t.monto;
    if (t.tipo === "transferencia") totalTransferencia += t.monto;
  }

  return { totalDepositos, totalRetiros, totalTransferencia };
}

/* =========================================================
   EXPORTACIONES
   ========================================================= */
export {
  recolectarTransacciones,
  cargarTransaccionesAsync,
  analizarTransacciones,
  calcularTotales
};
