# Body Aqua Spa

Página web de **Body Aqua Spa**, spa en Mariquita, Tolima. Muestra los planes y servicios con sus precios, fotos del lugar, la calificación en Google, el horario y el mapa, y cada botón abre WhatsApp con un mensaje de reserva ya escrito.

**Sitio publicado:** https://bodyaquaspa.github.io

Está hecha con HTML, CSS y JavaScript puros: no necesita instalar nada ni compilar.

## Estructura

```
bodyaquaspa.github.io/
├── index.html              # Estructura y contenido de la página
├── assets/
│   ├── css/
│   │   ├── variables.css   # Colores, tipografías, radios y sombras
│   │   ├── base.css        # Reset, tipografía y utilidades (.wrap, .eyebrow, .lead)
│   │   ├── components.css  # Botones, encabezado, menú, estrellas, botón flotante
│   │   └── sections.css    # Estilos de cada sección, en orden de aparición
│   ├── js/
│   │   ├── config.js       # Número de WhatsApp y horario del negocio
│   │   └── main.js         # Enlaces de WhatsApp, menú, estado abierto/cerrado, animaciones
│   ├── icons/              # Ícono de la pestaña (favicon), del celular y manifest
│   └── img/                # Fotos en WebP (+ jacuzzi-noche.jpg para la vista previa al compartir)
└── README.md
```

Las hojas de estilo se cargan en ese orden desde `index.html`: primero las variables, luego la base, los componentes y por último las secciones.

## Cómo verla en tu computador

Abre `index.html` en el navegador con doble clic. También puedes usar la extensión **Live Server** de VS Code para que se recargue sola al guardar.

## Cambios frecuentes

| Quiero cambiar…            | Dónde                                                                 |
| -------------------------- | --------------------------------------------------------------------- |
| Un precio o un servicio    | `index.html`, secciones **Planes** y **Servicios**. Actualiza también el texto de `data-wa` del botón, que es el mensaje que llega a WhatsApp. |
| El número de WhatsApp      | `assets/js/config.js` → `whatsapp`, y el teléfono visible en `index.html` (sección Visítanos y pie de página) |
| El Instagram              | `index.html`: busca `instagram.com/bodyaquaspa` (aparece en Fechas especiales, Visítanos, pie de página y en el bloque `application/ld+json`) |
| El horario                 | `assets/js/config.js` → `horario`, y la tabla de horario en `index.html` |
| Los colores                | `assets/css/variables.css`                                            |
| Una foto                   | Guárdala en `assets/img/` y cambia la ruta en `index.html`            |

### Botones de WhatsApp

Cualquier elemento con el atributo `data-wa` se convierte en un enlace de WhatsApp. El texto del atributo es el mensaje que llega escrito:

```html
<a class="btn btn-wa" data-wa="Hola, quiero reservar un masaje">Reservar</a>
```

### Fotos nuevas

Para que la página cargue rápido en celular, convierte las fotos a WebP de máximo 1400 px de ancho, por ejemplo con [Squoosh](https://squoosh.app). Antes de publicar fotos donde se vea la cara de clientes, y sobre todo de niñas o niños, pide autorización.

## Publicar

El sitio se publica con **GitHub Pages** desde la rama `main` (carpeta raíz). Cada cambio que se sube a `main` aparece en https://bodyaquaspa.github.io en uno o dos minutos.

Como el repositorio se llama `bodyaquaspa.github.io`, GitHub lo publica en la raíz de la organización. Si se cambia el nombre del repositorio o se conecta un dominio propio, hay que actualizar la dirección en `index.html` (`canonical`, `og:url`, `og:image` y el bloque `application/ld+json`).

La imagen `assets/img/jacuzzi-noche.jpg` (1200 × 630) es la que muestran WhatsApp y Facebook al compartir el enlace.
