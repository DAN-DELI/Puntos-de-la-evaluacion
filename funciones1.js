// ---------------------------------------------------------------
//                     FUNCIONES DE SOLICITUDES
// ---------------------------------------------------------------

export function validarSolicitud(solicitud) {
  try {
    if (
      typeof solicitud.id !== "number" || solicitud.id <= 0 ||
      typeof solicitud.usuario !== "string" || solicitud.usuario.trim() === "" ||
      !["hardware", "software", "red"].includes(solicitud.tipo) ||
      typeof solicitud.prioridad !== "number" || solicitud.prioridad < 1 || solicitud.prioridad > 5 ||
      typeof solicitud.descripcion !== "string" || solicitud.descripcion.length < 10 ||
      typeof solicitud.activo !== "boolean"
    ) {
      return { ...solicitud, estado: "Inválida", motivo: "Datos incompletos o incorrectos" };
    }
    return { ...solicitud, estado: "Válida" };
  } catch (error) {
    return { ...solicitud, estado: "Inválida", motivo: `Error al validar: ${error.message}` };
  }
}

export function clasificarPrioridad(prioridad) {
  if (prioridad >= 4) return "Alta";
  if (prioridad >= 2) return "Media";
  return "Baja";
}

// ---------------------------------------------------------------
//                  PROCESAMIENTO ASÍNCRONO
// ---------------------------------------------------------------

export function procesarConCallback(solicitud, callback) {
  setTimeout(() => {
    try {
      if (!solicitud.activo) throw new Error("Solicitud inactiva");
      callback(null, { ...solicitud, resultado: "Procesada con callback" });
    } catch (err) {
      callback(err, { ...solicitud, resultado: "Fallo en callback" });
    }
  }, 500);
}

export function procesarConPromesa(solicitud) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!solicitud.activo) reject({ ...solicitud, resultado: "Fallo en promesa", motivo: "Solicitud inactiva" });
      else resolve({ ...solicitud, resultado: "Procesada con promesa" });
    }, 700);
  });
}

export async function procesarAsync(solicitud) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!solicitud.activo) reject({ ...solicitud, resultado: "Fallo en async", motivo: "Solicitud inactiva" });
      else resolve({ ...solicitud, resultado: "Procesada con async/await" });
    }, 600);
  });
}
