/* ==========================================================
   Datos del negocio que usa el sitio.
   Si cambia el número o el horario, edita solo este archivo
   (y la tabla de horario en index.html, sección "Visítanos").
   ========================================================== */
const CONFIG = {
  // Número de WhatsApp con indicativo de Colombia (57), sin "+" ni espacios
  whatsapp: "573132770742",

  // Zona horaria para calcular si el spa está abierto
  zonaHoraria: "America/Bogota",

  // Horario en formato 24 h
  horario: {
    abre: "09:00",
    cierra: "20:00",
    // Días cerrados: 0 = domingo, 1 = lunes, ..., 6 = sábado
    diasCerrado: [0],
  },
};
