---
name: MeruemArt
description: Personal site of Luis Arteaga, DevOps Engineer — a technical portfolio with a lime signal on a green-black base.
colors:
  # Tema claro (intacto): crema + violeta.
  accent: "#6b3fc4"
  accent-hover: "#5a2eb8"
  accent-light: "#8b6ee0"
  accent-dark: "#4c1d95"
  on-accent-light: "#ffffff"
  cream: "#fbf8f3"
  cream-raised: "#f4efe6"
  cream-sunken: "#ece4d7"
  ink: "#241f1a"
  ink-muted: "#574e42"
  ink-faint: "#6b6154"
  hairline: "#e3dacb"
  hairline-soft: "#efe8dc"
  # Tema oscuro (por defecto): verde casi negro + lima.
  accent-on-dark: "#c8ff00"
  accent-hover-on-dark: "#d6ff3d"
  accent-light-on-dark: "#e0ff66"
  accent-dark-on-dark: "#a6d600"
  on-accent-dark: "#06110d"
  green-black: "#06110d"
  green-black-raised: "#0c1a16"
  green-black-sunken: "#13241e"
  ink-on-dark: "#e9f1ed"
  ink-muted-on-dark: "#a3b4ac"
  ink-faint-on-dark: "#7a8c84"
  hairline-on-dark: "#17261f"
  hairline-soft-on-dark: "#20332b"
typography:
  display:
    fontFamily: "Space Grotesk Variable, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 6.4vw, 5.5rem)"
    fontWeight: 600
    lineHeight: 1.0
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Space Grotesk Variable, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 2.2vw, 1.95rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  rowTitle:
    fontFamily: "Space Grotesk Variable, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Inter Variable, system-ui, sans-serif"
    fontSize: "1.02rem"
    lineHeight: 1.6
  lede:
    fontFamily: "Inter Variable, system-ui, sans-serif"
    fontSize: "1.375rem"
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono Variable, ui-monospace, monospace"
    fontSize: "0.72rem"
    fontWeight: 600
    letterSpacing: "0.1em"
    textTransform: "uppercase"
spacing:
  gutter: "3.5rem"
  section: "clamp(4rem, 7vw, 6.5rem)"
  row: "1.9rem"
  rail-col: "20rem"
  measure: "66ch"
---

# MeruemArt — sistema visual

Personal site de Luis Arteaga, ingeniero DevOps. La dirección es
**técnica**: una persona y su trabajo medido, no un panel de métricas. La
base verde casi negra y el lima como única señal, más una tipografía de
sistema (grotesca + sans + mono), sostienen ese carácter.

## Lo que sostiene el sistema

### 1. Una sola grilla

Todo lo que no es el hero usa las mismas dos columnas:

| columna | ancho | qué vive ahí |
|---|---|---|
| títulos | `20rem` | `.block-title`, y el retrato en `/` |
| contenido | resto | filas, listas, prosa, menciones |

El shell mide `72rem`, no `82rem`. Con `82rem` la columna de contenido
llegaba a 888px mientras la prosa se topaba en 594px (`66ch`): quedaban
294px de vacío a la derecha de cada fila que la grilla prometía y la
medida no ocupaba. Estrechar el shell deja que la medida *sea* la columna.

Los bordes izquierdos medidos en 1440px son **161px y 537px**, sin
excepción: el retrato, todos los títulos de sección y el footer caen en
161px; el contenido cae en 537px. Ese es el criterio para detectar
regresiones de alineación: si aparece un tercer borde, algo se salió de la
grilla.

Por debajo de `64em` las dos columnas se apilan y el título precede a su
contenido con `2rem` de separación.

El hero sin retrato (`/about/`, `/mentions/`, `/work/[slug]`) hace que su
título ocupe `grid-column: 1 / -1`. Sin esto el `h1` de 88px caería en la
columna de 320px y se partiría en tres líneas.

### 2. Dos voces de texto y una firma mono

- **Space Grotesk** (grotesca geométrica) para display: h1, títulos de
  sección, títulos de fila.
- **Inter** (sans neutra de lectura) para el cuerpo, la entradilla y las
  etiquetas. Las etiquetas dejaron de ir en monoespaciada y mayúsculas: eran
  la parte más fría del sistema y hacían leer la página como un panel.
- **JetBrains Mono** queda para un único sitio: el inventario de stack del
  rail. Una lista de herramientas en minúsculas se lee como un manifiesto,
  no como prosa. Es la firma técnica, no la voz general.

Escala medida en 1440px, con ratios visibles entre niveles:

| nivel | tamaño | ratio con el siguiente |
|---|---|---|
| h1 | 88px | 2.82× |
| título de sección | 31.2px | 1.42× |
| título de fila | 22px | 1.35× |
| detalle de fila | 16.3px | 1.42× |
| marca de fila | 11.5px | — |

Antes el título de fila estaba en 19.2px y quedaba a **1.18×** del detalle:
una fila se leía como un párrafo más. Subirlo a 22px (`--text-lg`) abre el
salto a 1.35× sin tocar el resto de la escala.

La escala no se escribe a mano: son seis tokens en `global.css`
(`--text-display`, `--text-title`, `--text-lg`, `--text-base`,
`--text-sm`, `--text-xs`) y ningún `font-size` literal. Lo mismo con el
espaciado: seis tokens `--space-*` más `--section` y `--row`, en vez de
veinticuatro literales sueltos.

`font-optical-sizing: auto` solo actúa sobre Inter (que trae eje `opsz`);
Space Grotesk y JetBrains Mono lo ignoran. No se fija `opsz` a mano.

### 3. El ritmo viene del aire, no de las rayas

Las secciones se separan con `clamp(4rem, 7vw, 6.5rem)` de margen y **sin
línea divisoria**. Cuatro rayas horizontales a la misma distancia leen como
formulario. Las líneas se reservan para lo que de verdad es una lista
(`.row`) y para el riel de metadatos.

### 4. Superficies: base verde casi negra, señal lima

El gris neutro azulado (`#0a0a14`, `#f8f9fa`) hacía que la página se sintiera
como un dashboard. El tema oscuro (por defecto) se apoya en un verde casi
negro y el tema claro conserva la crema cálida:

- claro: crema `#fbf8f3` → `#f4efe6` → `#ece4d7`
- oscuro: verde casi negro `#06110d` → `#0c1a16` → `#13241e`

Las superficies oscuras suben solo lo justo para separar planos (1.07× y
1.19×): la jerarquía la hace el aire, no el color. El lima `#c8ff00` es la
única señal; nunca es la superficie.

La profundidad sale de elevaciones con tinte, no de negro puro: un negro
puro se ve sucio sobre crema e invisible sobre verde casi negro, así que las
sombras viven como tokens que cambian con el tema (`--shadow-card`,
`--shadow-lift`, `--shadow-accent`). El hover de fila hunde el plano en
`--color-surface-secondary` y deja aflorar una barra de acento de 2px como
`inset`: da profundidad sin mover el texto un píxel. El footer cierra la
página como un plano propio.

## El acento tiene dos papeles

Es la decisión de contraste más importante del sistema, y está escrita como
token (`--color-on-accent`) para que no se deshaga:

- **En claro**, el relleno del botón es violeta profundo (`#7a4bd0` →
  `#5c33ac`) y el texto va en blanco. Peor parada: **5.61:1**.
- **En oscuro**, el relleno es lima `#c8ff00` y el texto pasa a la tinta
  verde casi negra `#06110d`. El par mide **16.24:1** de sobra.

El lima y el verde casi negro son el par principal: 16.24:1, así que el
acento puede ser tinta (enlaces, `aria-current`) o relleno (botones) sin
cambiar de token. La regla que antes evitaba blanco sobre lavanda se
mantiene: **el texto sobre el acento siempre es `var(--color-on-accent)`**,
nunca un color fijo.

Verificado: **170 comprobaciones de contraste computadas en navegador, 0
fallando**, en claro y oscuro, sobre las 5 plantillas.

## Capas decorativas

Dos, y las dos son ambiente: nunca informa y nunca sostiene texto.

- **Luz de borde** (`BackgroundPattern.astro`). Cuatro elipses con
  `blur(40px)` que suben escalonadas detrás del patrón de números, en los dos
  bordes. El color sale de `--color-accent-glow`, que ya trae el alfa por tema
  (violeta `0.28` en claro, lima `0.22` en oscuro): un solo token para dos
  climas. El pico de opacidad es `0.85` en claro y `0.7` en oscuro — se ve que
  está, no grita.
- **Nevada** (`SnowEffect.astro`). Estacional: del **1 de diciembre 00:00 al
  6 de enero 23:59**, hora local del visitante. Para probarla sin esperar a
  diciembre: `/?snow=1`.

Las dos se anulan con `prefers-reduced-motion: reduce`.

## Reglas que no se negocian

1. **Nada de gradiente sobre texto.** El acento es un color sólido.
2. **Los botones nunca llevan un color de texto fijo**: siempre
   `var(--color-on-accent)`. En oscuro la tinta sobre lima es `#06110d`.
3. **El estado activo de navegación se marca con subrayado**, no con fondo.
   Un tinte de acento de fondo bajaba el texto a ~1.8:1 en oscuro.
4. **La prosa se topa a `66ch`.** Medido: 41–79 caracteres por línea.
5. **El hero se define una sola vez**, en `shell.css`. Cuatro páginas
   declaraban su propia versión y el mismo título cambiaba de tamaño al
   navegar.
6. **Las etiquetas no van en mayúsculas monoespaciadas.** La mono se reserva
   al inventario de stack; una etiqueta en versalitas convierte la página en
   un panel.

## Componentes

| componente | archivo | notas |
|---|---|---|
| Shell / grilla | `src/styles/shell.css` | columnas, ritmo, hero, filas |
| Tokens | `src/styles/global.css` | color, tipografía, temas |
| Nav | `src/components/Nav.astro` | subrayado activo, sin cápsula |
| Footer | `src/components/Footer.astro` | mismo ancho que el shell |
| Contacto | `src/components/ContactCTA.astro` | formulario Netlify replegado |
| Retrato | `src/pages/index.astro` | 20rem, marco neutro |
| Luz de borde | `src/components/BackgroundPattern.astro` | elipses tras el patrón, `--color-accent-glow` |
| Nevada | `src/components/SnowEffect.astro` | 1 dic → 6 ene, `/?snow=1` para probarla |
| Foto de trabajo | `src/pages/about.astro` | `at-work.jpg`, mismo plano que el retrato |

## Pendiente

- `/assets/Luis_Carlos_Arteaga_Espitia_CV.pdf` sigue diciendo "3 plantillas
  (Angular, .NET/EKS, Next.js)" y no menciona SAM, AgentCore, SQL ni la caché
  de binarios. El sitio ya va por 8; el PDF quedó atrás.
- Las miniaturas `starmeup-*` ya no aparecen en el home: las filas de
  Resultados son solo texto. En `/work/*` y `/mentions/` sí se ven.
