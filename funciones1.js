import promptSync from "prompt-sync";
const prompt = promptSync();

// =========================================================
// FUNCIÓN: RECOLECTAR SOLICITUDES
// =========================================================
function recolectarSolicitudes() {
  const solicitudes = [];

  while (true) {
    try {
      const id = Number(prompt("ID (entero positivo): "));
      const usuario = prompt("Usuario: ").trim();
      const tipo = prompt("Tipo (hardware | software | red): ").trim().toLowerCase();
      const prioridad = Number(prompt("Prioridad (1-5): "));
      const descripcion = prompt("Descripción (mín 10 caracteres): ").trim();

      let activo;
      while (true) {
        const resp = prompt("Activo? (si/no): ").trim().toLowerCase();
        if (resp !== "si" && resp !== "no") {
          console.log("Respuesta inválida.");
          continue;
        }
        activo = resp === "si";
        break;
      }

      solicitudes.push({ id, usuario, tipo, prioridad, descripcion, activo });

      const continuar = prompt("¿Agregar otra solicitud? (si/no): ").trim().toLowerCase();
      if (continuar !== "si") break;

    } catch (error) {
      console.log("Error controlado:", error.message);
    }
  }

  return solicitudes;
}

// =========================================================
// FUNCIÓN: VALIDAR SOLICITUDES
// =========================================================
function validarSolicitudes(solicitudes) {
  const validas = [];
  const invalidas = [];

  for (const s of solicitudes) {
    let motivo = null;

    if (!Number.isInteger(s.id) || s.id <= 0)
      motivo = "ID inválido";
    else if (typeof s.usuario !== "string" || s.usuario === "")
      motivo = "Usuario inválido";
    else if (!["hardware", "software", "red"].includes(s.tipo))
      motivo = "Tipo inválido";
    else if (!Number.isInteger(s.prioridad) || s.prioridad < 1 || s.prioridad > 5)
      motivo = "Prioridad inválida";
    else if (typeof s.descripcion !== "string" || s.descripcion.length < 10)
      motivo = "Descripción inválida";
    else if (typeof s.activo !== "boolean")
      motivo = "Estado activo inválido";

    if (motivo) {
      invalidas.push({ ...s, motivo });
    } else {
      validas.push({ ...s });
    }
  }

  return { validas, invalidas };
}

// =========================================================
// FUNCIÓN: CLASIFICAR PRIORIDAD
// =========================================================
function clasificarPorPrioridad(validas) {
  return validas.map(s => {
    let prioridadTexto = "Baja";
    if (s.prioridad >= 4) prioridadTexto = "Alta";
    else if (s.prioridad >= 2) prioridadTexto = "Media";

    return { ...s, prioridadTexto };
  });
}

// =========================================================
// PROCESAMIENTO ASÍNCRONO
// =========================================================
function procesarCallback(solicitud, callback) {
  setTimeout(() => {
    if (!solicitud.activo) {
      callback(new Error("Solicitud inactiva"));
    } else {
      callback(null, "Procesada con callback");
    }
  }, 800);
}

function procesarPromesa(solicitud) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!solicitud.activo) reject(new Error("Solicitud inactiva"));
      else resolve("Procesada con promesa");
    }, 800);
  });
}

async function procesarAsync(solicitud) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!solicitud.activo) reject(new Error("Solicitud inactiva"));
      else resolve("Procesada con async/await");
    }, 800);
  });
}

// =========================================================
// EXPORTACIONES
// =========================================================
export {
  recolectarSolicitudes,
  validarSolicitudes,
  clasificarPorPrioridad,
  procesarCallback,
  procesarPromesa,
  procesarAsync
};
