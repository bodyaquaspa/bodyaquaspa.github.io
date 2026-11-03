/* ==========================================================
   Comportamiento de la página.
   Depende de CONFIG, definido en assets/js/config.js.
   ========================================================== */

/**
 * Convierte cada elemento con data-wa="mensaje" en un enlace
 * de WhatsApp con ese mensaje ya escrito.
 */
function initWhatsappLinks() {
  document.querySelectorAll("[data-wa]").forEach((el) => {
    const texto = encodeURIComponent(el.dataset.wa);
    el.href = `https://wa.me/${CONFIG.whatsapp}?text=${texto}`;
    el.target = "_blank";
    el.rel = "noopener";
  });
}

/**
 * Encabezado transparente sobre la portada y sólido al bajar.
 * Menú desplegable en celular.
 */
function initHeader() {
  const header = document.getElementById("top");
  const burger = document.querySelector(".burger");
  const menu = document.getElementById("menu");

  const actualizarFondo = () => {
    const solido = window.scrollY > 40 || menu.classList.contains("open");
    header.classList.toggle("solid", solido);
  };

  const cerrarMenu = () => {
    menu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    actualizarFondo();
  };

  burger.addEventListener("click", () => {
    const abierto = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(abierto));
    actualizarFondo();
  });

  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", cerrarMenu));
  window.addEventListener("scroll", actualizarFondo, { passive: true });
  actualizarFondo();
}

/** Pasa "09:00" a minutos desde la medianoche (540). */
function aMinutos(hora) {
  const [h, m] = hora.split(":").map(Number);
  return h * 60 + m;
}

/** Pasa "20:00" a "8:00 p. m." */
function formatoHora(hora) {
  const [h, m] = hora.split(":").map(Number);
  const sufijo = h < 12 ? "a. m." : "p. m.";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${sufijo}`;
}

const NOMBRES_DIA = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

/**
 * Muestra "Abierto ahora" o "Cerrado ahora" según la hora en Colombia
 * y resalta el día de hoy en la tabla de horario.
 */
function initHorario() {
  const { abre, cierra, diasCerrado } = CONFIG.horario;
  const ahora = new Date(new Date().toLocaleString("en-US", { timeZone: CONFIG.zonaHoraria }));
  const dia = ahora.getDay();
  const minutos = ahora.getHours() * 60 + ahora.getMinutes();

  const abreHoy = !diasCerrado.includes(dia);
  const abierto = abreHoy && minutos >= aMinutos(abre) && minutos < aMinutos(cierra);

  let detalle;
  if (abierto) {
    detalle = `Cierra a las ${formatoHora(cierra)}`;
  } else if (abreHoy && minutos < aMinutos(abre)) {
    detalle = `Abre hoy a las ${formatoHora(abre)}`;
  } else {
    // Buscar el próximo día en que abre
    let siguiente = (dia + 1) % 7;
    while (diasCerrado.includes(siguiente)) siguiente = (siguiente + 1) % 7;
    const cuando = siguiente === (dia + 1) % 7 ? "mañana" : `el ${NOMBRES_DIA[siguiente]}`;
    detalle = `Abre ${cuando} a las ${formatoHora(abre)}`;
  }

  const estado = document.getElementById("status");
  if (estado) {
    estado.innerHTML =
      `<span class="dot ${abierto ? "on" : ""}"></span>` +
      `<b>${abierto ? "Abierto ahora" : "Cerrado ahora"}</b> · ${detalle}`;
  }

  const filaHoy = document.querySelector(`#hours tr[data-d="${dia}"]`);
  if (filaHoy) filaHoy.classList.add("today");

  const anio = document.getElementById("year");
  if (anio) anio.textContent = ahora.getFullYear();
}

/** Aparición suave de los elementos con la clase .reveal al hacer scroll. */
function initReveal() {
  const elementos = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    elementos.forEach((el) => el.classList.add("in"));
    return;
  }

  const observer = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("in");
          observer.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elementos.forEach((el) => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  initWhatsappLinks();
  initHeader();
  initHorario();
  initReveal();
});
