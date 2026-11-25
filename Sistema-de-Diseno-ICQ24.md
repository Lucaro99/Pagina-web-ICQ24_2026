# Sistema de Diseño Web · ICQ24 (2026)

> Guía de línea gráfica, tokens, componentes y secciones del sitio **icq24.com**.
> Construida a partir de las páginas del proyecto `Pagina ICQ24_2026/`:
> Home (`Home/index_v2.html`), Partners Five9 (F9, AVI, AQM, Agent Assist, Analytics, WFM, WFO),
> ICQ24 Suite (`OmniVision.html`), Soporte, Casos de Uso (+ formulario y agradecimiento),
> Landings (evento, agradecimiento), Políticas (privacidad, seguridad, continuidad, Meta), NavBar y Footer.
>
> Objetivo: que cualquier página nueva se vea, se mueva y se lea **igual** que las existentes.

---

## Índice

1. [Principios de la línea gráfica](#1-principios-de-la-línea-gráfica)
2. [Stack técnico y dependencias](#2-stack-técnico-y-dependencias)
3. [Tokens de diseño](#3-tokens-de-diseño)
   - 3.1 Color · 3.2 Tipografía · 3.3 Espaciado y layout · 3.4 Radios · 3.5 Sombras · 3.6 Movimiento · 3.7 Breakpoints · 3.8 Fondos y texturas
4. [CSS base (copiar y pegar)](#4-css-base-copiar-y-pegar)
5. [Componentes](#5-componentes)
6. [Secciones (anatomía y código)](#6-secciones-anatomía-y-código)
7. [Estructura y ritmo de una página](#7-estructura-y-ritmo-de-una-página)
8. [Responsive](#8-responsive)
9. [Redacción, iconos e imágenes](#9-redacción-iconos-e-imágenes)
10. [Accesibilidad](#10-accesibilidad)
11. [SEO / AEO en cada página](#11-seo--aeo-en-cada-página)
12. [Compatibilidad con Odoo](#12-compatibilidad-con-odoo)
13. [Inconsistencias detectadas y decisión canónica](#13-inconsistencias-detectadas-y-decisión-canónica)
14. [Plantilla de página nueva](#14-plantilla-de-página-nueva)
15. [Checklist antes de publicar](#15-checklist-antes-de-publicar)

---

## 1. Principios de la línea gráfica

| Principio | Cómo se aplica |
|---|---|
| **Enterprise, limpio y luminoso** | Fondos blancos y gris muy claro (`#f8fafc`), mucho aire, tarjetas con bordes finos `#e2e8f0` y sombras suaves. |
| **Un solo color protagonista** | El azul ICQ24 `#0263e2` es el único color de acento: palabras clave de títulos, botones, iconos, números, dots activos. Verde, amarillo y rojo solo como estados/datos. |
| **Contraste por bloques oscuros** | Cada 3–4 secciones claras aparece una sección navy/oscura (`#0b1120`–`#0f172a`) para romper el ritmo: industrias, reconocimientos, calculadora, CTA final. |
| **Tipografía única y pesada** | Montserrat en todo. Títulos 800–900 con tracking negativo; textos 400–500 en gris pizarra. |
| **Título = frase + fragmento azul** | Todo H1/H2 lleva **un** fragmento resaltado en azul (`.accent` / `text-icqBlue`). |
| **Eyebrow antes de cada título** | Etiqueta corta en mayúsculas, 11 px, tracking amplio, gris. Nunca un H2 sin eyebrow. |
| **Movimiento sutil y constante** | Hover = elevación (`translateY(-2/-4/-6px)`) + sombra azulada + borde azul translúcido. Carruseles infinitos (marquee) que se pausan al pasar el mouse. |
| **Píldoras** | Botones, chips, filtros y badges son `border-radius: 9999px`. Las tarjetas son rectángulos redondeados (12–28 px). |
| **Orientado a resultados** | Números grandes en azul (KPIs, “-40%”, “01”), listas de retos numeradas, bandas de impacto, CTAs repetidos. |

**Personalidad visual:** sobria, tecnológica, confiable, consultiva. Nada de degradados chillones, sombras negras duras ni más de un color de acento por bloque.

---

## 2. Stack técnico y dependencias

```html
<!-- Fuente -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&display=swap"
  rel="stylesheet"
/>

<!-- Iconos: Font Awesome 6 (solid) -->
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
/>
<!-- (algunas páginas usan además el kit: https://kit.fontawesome.com/3f2f44a158.js) -->
```

Hay **dos formas de construir** páginas en el proyecto; ambas comparten los mismos tokens:

| Enfoque | Páginas | Cuándo usarlo |
|---|---|---|
| **CSS propio con variables** (BEM simple: `.hero`, `.section-h2`, `.faq-item`…) | Partners Five9, Políticas | Páginas largas de producto/partner, contenido legal. |
| **Tailwind CDN + CSS de componentes** | Home, NavBar, OmniVision, Soporte, Casos de Uso, Landings | Páginas con muchos layouts distintos o prototipos rápidos. |

Configuración Tailwind estándar (pegar antes del `<style>`):

```html
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          icqBlue: "#0263e2",
          icqBlueHover: "#002d6d",
          icqBlueLight: "#eff6ff",
          icqDark: "#0f172a",
          icqNavy: "#0a192f",
          icqNavyDark: "#0b132b",
          icqGrey: "#475569",
          icqLightBg: "#f8fafc",
          icqGreen: "#3b935d",
          icqGreenLight: "#e8f5ee",
          icqRed: "#ed3d2e",
          icqRedLight: "#fef2f2",
          icqYellow: "#f0ad0f",
          icqYellowLight: "#fef6e4",
        },
        fontFamily: {
          sans: ["Montserrat", "sans-serif"],
          heading: ["Montserrat", "sans-serif"],
        },
        boxShadow: {
          dropdown: "0 20px 40px -15px rgba(2,99,226,.12), 0 8px 16px -6px rgba(15,23,42,.08)",
          megamenu: "0 25px 50px -12px rgba(2,99,226,.16), 0 10px 20px -8px rgba(15,23,42,.08)",
        },
      },
    },
  };
</script>
```

---

## 3. Tokens de diseño

### 3.1 Color

#### Marca

| Token CSS | Tailwind | Hex | Uso |
|---|---|---|---|
| `--brand-primary` | `icqBlue` | `#0263e2` | Acento único: botones, palabras clave, iconos, números, links, dots activos. |
| `--brand-primary-hover` | `icqBlueHover` | `#002d6d` | Hover de botón primario en fondo claro, hover de links/textos azules. |
| `--brand-primary-light` | `icqBlueLight` | `#eff6ff` | Fondo de botón secundario en hover, chips, icon boxes, estado “open”. |
| `--brand-primary-mid` | — | `#1d4ed8` | Azul intermedio (poco uso, degradados). |
| — | — | `#1a73e8` | Hover de botones/píldoras en el **Home**. |
| — | — | `#257bf4` | Hover “glow” de botones en **secciones oscuras**. |
| — | `blue-100` / `#dbeafe` | `#dbeafe` | Hover de `hero-pill-secondary`, chevrons activos. |
| — | `blue-200` / `#bfdbfe` | `#bfdbfe` | Borde de tabs activos del megamenú, badges de blog. |

Transparencias del azul (muy usadas — memorizarlas):

| Valor | Uso |
|---|---|
| `rgba(2,99,226,0.08)` | Glow radial del hero; sombra hover de tarjetas pequeñas. |
| `rgba(2,99,226,0.10)` | Fondo de icon boxes (`.card-icon`, `.esc-icon`, `.eco-icon`); `--shadow-card`. |
| `rgba(2,99,226,0.12)` | Sombra hover de tarjetas medianas/grandes. |
| `rgba(2,99,226,0.15)` | Borde de pills/chips. |
| `rgba(2,99,226,0.20)` | Borde hover de tarjetas; borde de FAQ abierta. |
| `rgba(2,99,226,0.30)` | Borde hover de tarjetas destacadas; sombra del `.check-icon`. |
| `rgba(2,99,226,0.35–0.45)` | Sombra de botón primario en hover. |

#### Neutros de texto

| Token | Hex | Uso |
|---|---|---|
| `--text-main` | `#0f172a` (slate-900) | Títulos y texto fuerte. |
| *body* | `#1e293b` (slate-800) | Color base del `body`. |
| `--text-muted` | `#475569` (slate-600) | Párrafos, leads, eyebrows. |
| — | `#64748b` (slate-500) | Texto secundario de tarjetas, links de footer. |
| `--text-light` | `#94a3b8` (slate-400) | Eyebrow sobre fondo oscuro, categorías, metadatos. |
| `--text-inverse` | `#ffffff` | Texto sobre azul/oscuro. |
| — | `#cbd5e1` (slate-300) | Párrafos en fondo oscuro, dots inactivos. |

Títulos del Home usan `#0a192f` (`icqNavy`) para el H1.

#### Fondos

| Token | Hex | Uso |
|---|---|---|
| `--bg-white` | `#ffffff` | Secciones principales, tarjetas. |
| `--bg-light` | `#f8fafc` (slate-50) | Secciones alternas, tarjetas en reposo, icon wrappers. |
| `--bg-card` | `#f9fafb` | Tarjeta FAQ cerrada. |
| `--bg-dark` | `#0f172a` | Banda de impacto, reconocimientos, sidebar legal, `dot.active`. |
| `--bg-dark-elevated` | `#1e293b` | Superficies sobre oscuro, texto de tarjetas. |
| `--navy` | `#0a192f` | H1 del Home, cursor del typewriter. |
| `--navy-dark` | `#0b132b` | Sección Industrias (Five9). |
| `--bg-darkest` *(propuesto)* | `#0b1120` | Secciones oscuras del Home/OmniVision (industrias, soluciones, CTA). Variantes vistas: `#0a1120`, `#070f1e`, `#060e1d` (stats ticker). |

#### Bordes

| Token | Hex | Uso |
|---|---|---|
| `--border-light` | `#e2e8f0` (slate-200) | Bordes de tarjetas, separadores de sección (`border-b border-slate-200`). |
| — | `#f1f5f9` (slate-100) | Separadores internos de listas. |
| — | `#cbd5e1` (slate-300) | Bordes de inputs. |
| `--border-dark` | `#334155` | Bordes sobre fondo oscuro. |
| — | `rgba(255,255,255,0.08)` | Bordes de tarjetas sobre oscuro. |

#### Semánticos (solo datos/estados, nunca decorativos)

| Token | Hex | Fondo | Uso |
|---|---|---|---|
| `--green` | `#3b935d` | `--green-bg #e8f5ee` | Éxito, “activo”, dot de estado en tags legales. |
| `--yellow` | `#f0ad0f` | `--yellow-bg #fef6e4` | Advertencia, tercer segmento de gráficos. |
| `--red` | `#ed3d2e` | `#fef2f2` / `#fef4f2` | Error, “antes/problema”. |
| — | `#38bdf8` (sky-400) | — | Segundo color de gráficos (donut), línea del eyebrow oscuro. |
| — | `#60a5fa` (blue-400) | — | Hover sobre oscuro (bordes de premio, eyebrow dark). |

Paleta de gráficos (OmniVision): `#0263e2` → `#38bdf8` → `#f0ad0f`.

---

### 3.2 Tipografía

**Familia única:** `"Montserrat", sans-serif` (también en footer: ver §13).
`-webkit-font-smoothing: antialiased;` siempre activo.

#### Escala

| Rol | Tamaño | Peso | Line-height | Letter-spacing | Color |
|---|---|---|---|---|---|
| **H1 Home** | 24 → 36 → 48 → 54 → **62 px** (`text-2xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[62px]`) | 900 | 1.12 | `-0.025em` (`tracking-tight`) | `#0a192f` |
| **H1 páginas internas** | `clamp(32px, 4vw, 48px)` (legal: hasta 50 px) | 800 | 1.1 | `-0.03em` | `--text-main` (legal: azul) |
| **H1 suite/OmniVision** | 24 → 30 → 36 px | 800–900 | 1.25 | tight | slate-900 |
| **H2 de sección** | `clamp(30px, 3.5vw, 42px)` · Tailwind: `text-2xl sm:text-3xl lg:text-4xl` | 800 (CSS) / 900 (Tailwind `font-black`) | 1.15 | `-0.02em` | `--text-main` / blanco en oscuro |
| **H3 tarjeta destacada** (carrusel) | 28 px | 800 | 1.2 | `-0.02em` | `--text-main` |
| **H3 tarjeta** | 18–20 px | 800 | 1.3–1.4 | — | `--text-main` |
| **H3 tarjeta pequeña** | 14–15 px | 700–800 | 1.3–1.5 | — | `--text-main` |
| **Lead de sección** | 16 px | 400 | 1.75 | — | `--text-muted`, `max-width: 680px` centrado |
| **Descripción del hero** | 17 px | 400 | 1.75 | — | `--text-muted` |
| **Body** | 15 px | 400 | 1.7 | — | `#1e293b` |
| **Texto de tarjeta** | 14–16 px | 400 | 1.6–1.75 | — | `--text-muted` / `#64748b` |
| **Pregunta FAQ** | 15 px (Tailwind: 16–18) | 700 | 1.4 | — | `--text-main` |
| **Respuesta FAQ** | 14 px | 400 | 1.75 | — | `--text-muted` |
| **Eyebrow** | 11 px | 700–800 | 1.2 | `0.12em` (hero: `0.14em`) | `--text-muted` / `--text-light` |
| **Categoría / kicker** | 11 px | 600–700 | — | `0.1em` | `--text-light` |
| **Botón** | 14–15 px | 700 | — | — | — |
| **Pill / chip** | 12.5–13 px | 600 | — | — | — |
| **KPI valor** | 25 px (cards) / 30–36 px (ROI `text-3xl sm:text-4xl`) | 800–900 | 1 | `-0.03em` | `--brand-primary` |
| **Número decorativo** (`01`, `02`) | 28–42 px | 900 | 1 | `-0.03em` | azul (reto) o `rgba(2,99,226,0.12)` / `slate-100` (marca de agua) |
| **Legal / meta** | 12–12.5 px | 500 | 1.5 | — | `#64748b` |

#### Reglas tipográficas

- **Fragmento azul:** `<span class="accent">…</span>` (CSS) o `<span class="text-icqBlue font-black">…</span>` (Tailwind). Uno por título, 3–7 palabras. En el Home el fragmento azul suele ir **al inicio** del H2; en páginas de partner, **al final**.
- `<strong>` dentro de párrafos para la idea clave (color `--text-main` en claro, blanco en oscuro).
- Un `<br>` controlado (`<br class="hidden sm:inline">`) para partir títulos en 2 líneas en desktop.
- Itálica solo para el remate del H1 en OmniVision (`font-black italic`).

---

### 3.3 Espaciado y layout

Grid de **8 pt**:

```
--space-2: 8px   --space-3: 12px  --space-4: 16px  --space-6: 24px
--space-8: 32px  --space-12: 48px --space-16: 64px --space-24: 96px  --space-32: 128px
```

| Elemento | Valor |
|---|---|
| Contenedor | `max-width: 1200px` (CSS `.section-wrap`) · `max-w-7xl` = 1280 px (Tailwind) |
| Gutter horizontal | `px-4 sm:px-6 lg:px-8` (16 / 24 / 32 px) · CSS: `padding: 0 24px` en ≤768 px |
| Contenedores estrechos | Hero: 1000 px · FAQ: 820–860 px · Comparativa/impactos: 1100 px · Lead: 680–720 px · Títulos: `max-w-3xl` (768 px) |
| Padding vertical de sección | **80 px** arriba (CSS) · `py-16 lg:py-20` (64 / 80 px) en Tailwind · FAQ 75 px · móvil `py-10` |
| Separador inferior de `.section-wrap` | `margin-bottom: 70px` |
| Header de sección → contenido | 40–56 px (`mb-10 sm:mb-12 lg:mb-14`) |
| Eyebrow → H2 | 14 px |
| H2 → lead | 16 px |
| Gap de grids de tarjetas | 24 px (`gap-6`); tarjetas pequeñas 16 px; 2 columnas texto/imagen **72 px** (40 px en tablet) |
| Gap de botones | 16 px |
| Padding de tarjetas | Pequeña 20–24 px · Media 32 px · Grande 40–48 px · Destacada 52×60 px |

---

### 3.4 Radios

| Token | Valor | Uso |
|---|---|---|
| `--radius-sm` | 8 px | Inputs, icon box del ecosistema, filas de comparativa. |
| — | 10 px | `.esc-icon`, `.sec-num`, listas legales. |
| `--radius-md` | 12 px | Tarjetas de retos, cap-cards, icon boxes 48 px, sidebar legal, botones sociales. |
| — | 16 px (`rounded-2xl`) | Tarjetas estándar (escenarios, impactos, casos de uso, industrias Home). |
| `--radius-lg` | 20 px | FAQ items, KPIs, mockups del hero, carrusel ecosistema. |
| — | 24 px (`rounded-3xl`) | Tarjeta “ganadora” de comparativa, casos de éxito, form-card, thank-you card. |
| `--radius-xl` | 28 px | Tarjetas de carrusel “cómo trabaja”, industrias Five9, premios; blog `rounded-[1.75rem]`; recursos `rounded-[2.2rem]`. |
| `--radius-pill` | 9999 px | Botones, chips, filtros, eyebrow-pill, marquee de logos, cápsulas. |
| 50 % | — | Flechas de carrusel, icono FAQ, `ind-icon-wrap`, dots. |

---

### 3.5 Sombras

```css
--shadow-sm:   0 1px 2px 0 rgba(0,0,0,.05);
--shadow-md:   0 4px 6px -1px rgba(0,0,0,.07), 0 2px 4px -1px rgba(0,0,0,.04);
--shadow-lg:   0 10px 25px -3px rgba(0,0,0,.07), 0 4px 6px -2px rgba(0,0,0,.04);
--shadow-xl:   0 20px 40px -5px rgba(0,0,0,.10), 0 10px 10px -5px rgba(0,0,0,.04);
--shadow-card: 0 4px 20px rgba(2,99,226,.10);
```

Sombras de componentes (uso real):

| Sombra | Dónde |
|---|---|
| `0 4px 12px rgba(0,0,0,.03)` | Tarjeta en reposo (cap-card, esc-card, cápsulas). |
| `0 8px 24px rgba(0,0,0,.08)` | Hover de cap-card. |
| `0 12px 24px rgba(2,99,226,.08)` | Hover estándar de tarjeta (`.five9-card-hover`, esc-card, carousel-card-full). |
| `0 14px 28px rgba(2,99,226,.12)` | Hover de partner-card (Home). |
| `0 16px 32px -6px rgba(2,99,226,.12)` | Hover de case/resource card. |
| `0 20px 40px rgba(2,99,226,.12)` | Hover de impacto-card. |
| `0 20px 50px rgba(15,23,42,.12)` | Columna “ganadora” de la comparativa. |
| `0 12px 24px -4px rgba(2,99,226,.45)` | Hover de botón primario (Home). |
| `0 0 28px rgba(37,123,244,.7), 0 10px 20px -2px rgba(0,0,0,.4)` | Hover “glow” de botón en sección oscura. |
| `0 18px 40px -4px rgba(2,99,226,.44), 0 8px 16px rgba(0,0,0,.08)` | Badge typewriter del hero. |
| `0 10px 30px rgba(0,0,0,.2)` → hover `0 20px 40px rgba(0,0,0,.4)` | Tarjetas sobre fondo oscuro (premios). |
| `0 4px 10px rgba(2,99,226,.3)` | `.check-icon`. |
| `--shadow-xl, 0 0 0 1px rgba(0,0,0,.04)` | Mockup del hero. |

Regla: **sombras azuladas** para interacción (hover), **sombras neutras** muy suaves en reposo.

---

### 3.6 Movimiento

| Token | Valor |
|---|---|
| Easing principal | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Easing tarjetas “rebote suave” | `cubic-bezier(0.25, 0.8, 0.25, 1)` |
| Easing carruseles | `cubic-bezier(0.25, 1, 0.5, 1)` |
| Easing dropdown navbar | `cubic-bezier(0.16, 1, 0.3, 1)` (0.22 s) |
| Duraciones | 0.2 s (links, dots, filas) · 0.25–0.3 s (botones, tarjetas) · 0.4 s (acordeones, slides, retos) · 0.5 s (zoom de imágenes) |

Patrones de hover:

| Elemento | Hover |
|---|---|
| Botón | `translateY(-2px)` + sombra + cambio de fondo |
| Tarjeta estándar | `translateY(-4px)` + sombra azul + `border-color: rgba(2,99,226,.2)` |
| Tarjeta destacada | `translateY(-6/-8px)` + `scale(1.02–1.03)` |
| Imagen dentro de tarjeta | `scale(1.05–1.06)` en 0.3–0.5 s |
| Link con flecha | `gap: 8px → 12px` o icono `translateX(4px)` |
| Fila de lista | `translateX(5px)` + fondo `#f0f6ff` |
| Flecha de carrusel | fondo azul + icono blanco (+ `scale(1.05–1.08)`) |
| Dot | `scale(1.25)`; activo = píldora 24–32 px |
| Chevron | `rotate(180deg)` al abrir |

Keyframes del sistema:

```css
@keyframes fadeUp   { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:none } }
@keyframes float    { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-8px) } }
@keyframes marquee  { from { transform:translateX(0) } to { transform:translateX(-50%) } }
@keyframes tw-cursor-blink { 0%,100% { opacity:1 } 50% { opacity:0 } }
@keyframes pulse-subtle { 0%,100% { opacity:1; transform:scale(1) } 50% { opacity:.7; transform:scale(.96) } }
```

- Entrada del hero en cascada: eyebrow `fadeUp .5s`, H1 `.55s .1s`, desc `.55s .2s`, botones `.55s .3s`.
- Marquees: 25 s (logos), 35 s (capacidades), 40 s (industrias), 45 s (OmniVision), 55 s (stats ticker). `linear infinite`, **pausa en `:hover`**.
- Añadir siempre `@media (prefers-reduced-motion: reduce)` (ver §10).

---

### 3.7 Breakpoints

| Nombre | Ancho | Qué cambia |
|---|---|---|
| `sm` | 640 px | Botones dejan de ser full-width; slides 2 por vista. |
| `md` | 768 px | Padding de sección a 24 px; grids 1 col → carrusel; blog a 3 columnas. |
| — | 900 px | Comparativa a 1 columna; escenarios 2 por vista. |
| `lg` | 1024 px | Hero y bloques 2 columnas pasan a 1; imágenes secundarias ocultas. |
| `xl` | 1280 px | Tamaño máximo de H1 del Home y badges. |

---

### 3.8 Fondos y texturas

```css
/* 1. Hero claro con brillo azul superior */
.gradient-hero { position: relative; background: linear-gradient(rgba(255,255,255,.92), rgba(255,255,255,.97)); }
.gradient-hero::before {
  content: ""; position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(2,99,226,.09) 0%, transparent 70%);
}

/* 2. Imagen corporativa con velo blanco (secciones "Cómo trabaja" y FAQ) */
.bg-brand-image {
  background:
    linear-gradient(to bottom, rgba(255,255,255,.6), rgba(255,255,255,.5)),
    url("https://www.icq24.com/web/image/37691-5879228f/Background.webp");
  background-size: cover; background-position: center; background-attachment: fixed;
}

/* 3. Cuadrícula técnica sutil (formularios, landings, soporte) */
.grid-lines {
  background-size: 24px 24px; /* 28–32 px en landings */
  background-image:
    linear-gradient(to right, rgba(0,0,0,.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0,0,0,.03) 1px, transparent 1px);
}

/* 4. Landing de evento: doble halo azul + verde */
.gradient-event {
  background:
    radial-gradient(circle at 15% 15%, rgba(2,99,226,.05) 0%, transparent 45%),
    radial-gradient(circle at 85% 85%, rgba(59,147,93,.04) 0%, transparent 45%),
    linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
}
```

Secciones oscuras: fondo `#0b1120` + **orbes difuminados** en esquinas:

```html
<div class="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
<div class="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
```

Bordes de carrusel (fade lateral): `::before/::after` de 80–150 px con `linear-gradient(to right, <color de fondo>, transparent)`.

---

## 4. CSS base (copiar y pegar)

Bloque mínimo para cualquier página nueva con CSS propio. Contiene tokens + elementos compartidos.

```css
/* ==========================================================================
   ICQ24 · DESIGN TOKENS
   ========================================================================== */
:root {
  /* Marca */
  --brand-primary: #0263e2;
  --brand-primary-hover: #002d6d;
  --brand-primary-light: #eff6ff;
  --brand-primary-mid: #1d4ed8;
  --brand-glow: #257bf4;
  --navy: #0a192f;
  --navy-dark: #0b132b;

  /* Semánticos */
  --green: #3b935d;  --green-bg: #e8f5ee;
  --yellow: #f0ad0f; --yellow-bg: #fef6e4;
  --red: #ed3d2e;    --red-bg: #fef2f2;

  /* Fondos */
  --bg-white: #ffffff;
  --bg-light: #f8fafc;
  --bg-card: #f9fafb;
  --bg-dark: #0f172a;
  --bg-dark-elevated: #1e293b;
  --bg-darkest: #0b1120;

  /* Texto */
  --text-main: #0f172a;
  --text-body: #1e293b;
  --text-muted: #475569;
  --text-soft: #64748b;
  --text-light: #94a3b8;
  --text-inverse: #ffffff;

  /* Bordes */
  --border-light: #e2e8f0;
  --border-input: #cbd5e1;
  --border-dark: #334155;

  /* Sombras */
  --shadow-sm: 0 1px 2px 0 rgba(0,0,0,.05);
  --shadow-md: 0 4px 6px -1px rgba(0,0,0,.07), 0 2px 4px -1px rgba(0,0,0,.04);
  --shadow-lg: 0 10px 25px -3px rgba(0,0,0,.07), 0 4px 6px -2px rgba(0,0,0,.04);
  --shadow-xl: 0 20px 40px -5px rgba(0,0,0,.10), 0 10px 10px -5px rgba(0,0,0,.04);
  --shadow-card: 0 4px 20px rgba(2,99,226,.10);
  --shadow-hover: 0 12px 24px rgba(2,99,226,.08);
  --shadow-hover-lg: 0 20px 40px rgba(2,99,226,.12);

  /* Radios */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-card: 16px;
  --radius-lg: 20px;
  --radius-2xl: 24px;
  --radius-xl: 28px;
  --radius-pill: 9999px;

  /* Espaciado 8pt */
  --space-2: 8px;  --space-3: 12px; --space-4: 16px; --space-6: 24px;
  --space-8: 32px; --space-12: 48px; --space-16: 64px; --space-24: 96px;

  /* Movimiento */
  --ease: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-soft: cubic-bezier(0.25, 0.8, 0.25, 1);
  --ease-slide: cubic-bezier(0.25, 1, 0.5, 1);
}

/* ==========================================================================
   BASE (si la página se incrusta en Odoo, limitar el reset al contenedor)
   ========================================================================== */
html { scroll-behavior: smooth; }
body {
  font-family: "Montserrat", sans-serif;
  background: var(--bg-white);
  color: var(--text-body);
  font-size: 15px;
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
h1, h2, h3, h4, h5, h6 { font-family: "Montserrat", sans-serif; letter-spacing: -0.02em; }
img { max-width: 100%; height: auto; }
summary { list-style: none; }
summary::-webkit-details-marker { display: none; }

/* ==========================================================================
   LAYOUT
   ========================================================================== */
.section-wrap   { max-width: 1200px; margin: 0 auto 70px; padding: 0; }
.section-center { text-align: center; }
.section        { padding: 80px 0; }
.section--light { background: var(--bg-light); }
.section--dark  { background: var(--bg-dark); color: var(--text-inverse); }
.section--navy  { background: var(--navy-dark); color: var(--text-inverse); }

/* ==========================================================================
   TIPOGRAFÍA DE SECCIÓN
   ========================================================================== */
.eyebrow {
  display: inline-flex; align-items: center; gap: 10px;
  font-size: 11px; font-weight: 800; line-height: 1.2;
  text-transform: uppercase; letter-spacing: .14em;
  color: var(--text-muted); margin-bottom: 14px;
  transition: color .25s ease;
}
.eyebrow:hover { color: var(--brand-primary); }
.section--dark .eyebrow,
.section--navy .eyebrow,
.eyebrow-dark { color: var(--text-light); }

.section-h2 {
  font-size: clamp(30px, 3.5vw, 42px);
  font-weight: 800; line-height: 1.15; letter-spacing: -0.02em;
  color: var(--text-main); margin-bottom: 16px;
}
.section-h2 .accent { color: var(--brand-primary); }
.section--dark .section-h2, .section--navy .section-h2 { color: var(--text-inverse); }

.section-lead {
  font-size: 16px; line-height: 1.75; font-weight: 400;
  color: var(--text-muted); max-width: 680px; margin: 0 auto 40px;
}
.section-lead strong { color: var(--text-main); }

/* ==========================================================================
   ANIMACIONES
   ========================================================================== */
@keyframes fadeUp  { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.animate-fade { animation: fadeUp .6s ease both; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; scroll-behavior: auto !important; }
}
```

---

## 5. Componentes

### 5.1 Eyebrow (etiqueta superior)

Cuatro variantes en uso:

| Variante | Aspecto | Dónde |
|---|---|---|
| **Texto** (por defecto) | 11 px, 700–800, mayúsculas, `.12–.14em`, gris `#475569`; hover → azul | Home, Five9, Soporte |
| **Con línea** | `<span>` interno de 12×2 px azul antes del texto | OmniVision, Casos de Uso, Agradecimiento |
| **Pill** | Fondo `#eff6ff`, texto azul, borde `rgba(2,99,226,.15)`, `padding: 6px 14px`, radio pill | Formularios |
| **Dark** | Texto `#94a3b8`, línea `#38bdf8`; hover → blanco / `#60a5fa` | Secciones oscuras |

```html
<span class="eyebrow">Retos de negocio</span>
<span class="eyebrow eyebrow--line"><span></span>Casos de uso</span>
<span class="eyebrow eyebrow--pill">Descarga gratuita</span>
```

```css
.eyebrow--line span { width: 12px; height: 2px; background: var(--brand-primary); display: inline-block; }
.eyebrow--pill {
  color: var(--brand-primary); background: var(--brand-primary-light);
  padding: 6px 14px; border-radius: var(--radius-pill);
  border: 1px solid rgba(2,99,226,.15); letter-spacing: .12em;
}
```

### 5.2 Botones

Todos los botones son **píldoras**, peso 700, con transición de 0.25–0.3 s y elevación de 2 px.

```css
.btn-primary, .btn-secondary, .btn-white {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  padding: 14px 32px;                 /* compacto: 12px 24px */
  font-family: inherit; font-size: 14px; font-weight: 700; text-align: center;
  border-radius: var(--radius-pill); border: 2px solid transparent;
  text-decoration: none; cursor: pointer;
  transition: transform .3s var(--ease), box-shadow .3s ease, background-color .3s ease, color .3s ease, border-color .3s ease;
}

/* Primario: azul sólido */
.btn-primary { background: var(--brand-primary); color: #fff; }
.btn-primary:hover {
  background: var(--brand-primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -3px rgba(2,99,226,.25);
}

/* Secundario: contorno gris → azul (páginas internas) */
.btn-secondary { background: transparent; color: var(--text-main); border-color: var(--border-light); }
.btn-secondary:hover { border-color: var(--brand-primary); color: var(--brand-primary); background: var(--brand-primary-light); transform: translateY(-2px); }

/* Secundario azul (Home, Casos de Uso): contorno azul → relleno azul */
.btn-secondary--blue { color: var(--brand-primary); border-color: var(--brand-primary); }
.btn-secondary--blue:hover { background: var(--brand-primary); color: #fff; }

/* Blanco (sobre fondo oscuro o azul) */
.btn-white { background: #fff; color: var(--brand-primary); border-color: #fff; }
.btn-white:hover { background: var(--brand-primary-light); transform: translateY(-2px); }

/* Primario en sección oscura: glow */
.section--dark .btn-primary:hover,
.section--navy .btn-primary:hover {
  background: var(--brand-glow);
  box-shadow: 0 0 28px rgba(37,123,244,.7), 0 10px 20px -2px rgba(0,0,0,.4);
}

/* Botón contorno pequeño dentro de tarjeta */
.btn-outline-sm {
  padding: 10px 24px; font-size: 14px; font-weight: 700; text-decoration: none;
  color: var(--brand-primary); border: 1px solid var(--brand-primary);
  border-radius: var(--radius-pill); transition: all .25s ease;
}
.btn-outline-sm:hover { background: var(--brand-primary); color: #fff; box-shadow: 0 4px 12px rgba(2,99,226,.3); }

@media (max-width: 640px) {
  .btn-primary, .btn-secondary { width: 100%; max-width: 300px; }
}
```

Píldoras del hero del Home (más pequeñas, 600):

| Clase | Reposo | Hover |
|---|---|---|
| `.hero-pill-primary` | `#0263e2`, texto blanco, `shadow-md`, `px-7 py-3`, 14 px | `#1a73e8`, `translateY(-2px)`, `0 10px 25px -2px rgba(2,99,226,.5)` |
| `.hero-pill-secondary` | `#eff6ff`, borde 1.5 px `#0263e2`, texto azul | `#dbeafe`, borde y texto `#002d6d`, `0 8px 16px -3px rgba(2,99,226,.15)` |
| `.footer-btn-white` | Blanco, texto `slate-900`, `px-7 py-3.5` | `#f1f5f9`, texto azul, `0 10px 22px -3px rgba(0,0,0,.2)` |

**Texto de CTA:** verbo en 1.ª persona o imperativo + flecha. Ej.: *“Agenda una demo personalizada”*, *“Quiero transformar mi operación →”*, *“Conoce todas las capacidades de Five9 →”*. Icono FA a la izquierda (`fa-calendar-check`) o flecha a la derecha (`→`, `fa-arrow-right`, `fa-arrow-up-right-from-square` para enlaces externos).

### 5.3 Link con flecha

```css
.card-link { display: inline-flex; align-items: center; gap: 8px; color: var(--brand-primary); font-weight: 700; font-size: 14px; text-decoration: none; transition: gap .2s; }
.card-link:hover { gap: 12px; }
```

Links de texto azul genéricos: hover `#0052cc` + subrayado.

### 5.4 Icon box (contenedor de icono)

| Tamaño | Fondo | Icono | Radio | Uso |
|---|---|---|---|---|
| 40 px | `bg-blue-50` | azul 18 px | 8 px (`rounded-lg`) | Metodología (Home) |
| 44 px | `rgba(2,99,226,.1)` | azul 20 px | 10 px | Escenarios |
| 48 px | `rgba(2,99,226,.1)` | azul 20–24 px | 12 px | Tarjetas de carrusel, impactos |
| 48 px círculo | `--brand-primary-light` | azul 20 px | 50 % | Cápsulas diferenciales |
| 48–56 px círculo | `#0263e2` sólido | blanco 22 px | 50 % | Industrias (Five9) |
| 56 px | `rgba(2,99,226,.1)` | azul 24 px | 8 px | Ecosistema |

```css
.icon-box { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center;
  border-radius: var(--radius-md); background: rgba(2,99,226,.1); color: var(--brand-primary); font-size: 20px; }
.icon-box--round { border-radius: 50%; background: var(--brand-primary-light); }
.icon-box--solid { border-radius: 50%; background: var(--brand-primary); color: #fff; }
```

En tarjetas con hover a oscuro, el icon box pasa a `background: rgba(255,255,255,.2); color: #fff`.

### 5.5 Tarjetas

| Tarjeta | Reposo | Hover | Uso |
|---|---|---|---|
| **Reto numerado** `.reto-card` | `--bg-light`, radio 12, padding 24×32, borde transparente; número `01` 32 px 900 azul | Fondo blanco, borde `--border-light`, `--shadow-lg`, `translateY(-6px)` + `scale: 1.03` (0.4 s) | Listado de problemas |
| **Capacidad** `.cap-card` | Blanco, borde `#eaeaea`, radio 12, `0 4px 12px rgba(0,0,0,.03)`, `white-space: nowrap` | `translateY(-4px)`, `0 8px 24px rgba(0,0,0,.08)` | Marquee de capacidades |
| **Destacada (slide)** `.carousel-card` | `--bg-light`, radio 28, padding 52×60, `--shadow-xl`, máx 700 px | **Se invierte a oscuro**: fondo `--bg-dark`, textos blancos | “Cómo trabaja” |
| **Escenario** `.esc-card` | Blanco, borde, radio 16, padding 32×24 | `-4px`, `0 12px 24px rgba(2,99,226,.08)`, borde `rgba(2,99,226,.2)` | Carrusel de 3 |
| **Impacto** `.impacto-card` | Blanco, borde, radio 16, padding 40×32 | `translateY(-8px) scale(1.02)`, `0 20px 40px rgba(2,99,226,.12)`, borde `.3`; sus pills se tiñen | Grid de 3 |
| **KPI** `.kpi-card` | Blanco, borde, radio 20, padding 24×20 | `-3px`, `--shadow-card`, borde `.2` | Resultados |
| **ROI** `.roi-card` | `bg-slate-50/90`, borde `slate-100`, radio 16, min-h 165 px, centrado | `-5px`, fondo blanco, borde `.3`, `0 16px 32px -8px rgba(2,99,226,.15)` | Beneficios Home |
| **Metodología** `.methodology-card` | Blanco, borde, radio 12, padding 16; número de fondo 42 px `slate-100/70` | `-4px`, borde `.4`; número `scale(1.15)` azul opacidad .22 | Fases |
| **Caso de uso** `.usecase-card` | Blanco, borde, radio 16, `overflow: hidden` | `-6px`, `0 16px 30px rgba(2,99,226,.12)`, borde `.3`, imagen `scale(1.05)` | Biblioteca de recursos |
| **Caso de éxito** `.case-card` | Blanco, borde, `rounded-3xl`, `p-2` (imagen + cuerpo), badges de stats | `-4px`, borde `.35`, `0 16px 32px -6px rgba(2,99,226,.12)` | Carrusel Home |
| **Recurso** `.resource-card` | Blanco, **borde 4 px** `slate-200/90`, `rounded-[2.2rem]`, `0 10px 30px rgba(0,0,0,.04)` | `-4px`, borde `.4` | Recursos Home |
| **Blog** | Blanco, borde `slate-100`, `rounded-[1.75rem]`, `0 10px 35px -5px rgba(0,0,0,.07)`, chip de categoría azul | `.five9-card-hover` | Blog |
| **Industria** | Blanco, radio 16–28, `shadow-lg/xl`, ancho fijo 260–320 px, centrado | `-4/-6px` | Marquee sobre oscuro |
| **Premio** (oscuro) | `rgba(255,255,255,.03)`, borde `rgba(255,255,255,.08)`, radio 28 | `-4px`, fondo `.06`, borde `rgba(96,165,250,.3)` | Reconocimientos |
| **Formulario** `.form-card` | Blanco, radio 24, sombra doble violeta+azul | Sombra más intensa | Formularios |

Utilidad genérica de hover (reutilizable en cualquier tarjeta):

```css
.card-hover { transition: transform .3s var(--ease), box-shadow .3s ease, border-color .3s ease, background-color .3s ease; border: 1px solid var(--border-light); }
.card-hover:hover { transform: translateY(-4px); box-shadow: var(--shadow-hover); border-color: rgba(2,99,226,.2); }
```

### 5.6 Pills / chips / badges

```css
/* Chip informativo */
.pill { display: inline-flex; align-items: center; padding: 8px 16px; border-radius: var(--radius-pill);
  font-size: 12.5px; font-weight: 600; background: var(--bg-light); color: var(--text-main);
  border: 1px solid rgba(2,99,226,.15); transition: background .2s; }

/* Filtro (Casos de Uso) */
.filter-pill { padding: 8px 18px; font-size: 13px; font-weight: 600; border-radius: var(--radius-pill);
  border: 1px solid var(--border-light); background: #fff; color: var(--text-muted); cursor: pointer; transition: all .2s ease; white-space: nowrap; }
.filter-pill:hover  { border-color: var(--brand-primary); color: var(--brand-primary); background: var(--brand-primary-light); }
.filter-pill.active { background: var(--brand-primary); color: #fff; border-color: var(--brand-primary); box-shadow: 0 4px 12px rgba(2,99,226,.25); }

/* Badge de categoría (blog, megamenú) */
.badge { display: inline-flex; padding: 4px 14px; border-radius: var(--radius-pill); background: #eff6ff;
  border: 1px solid #bfdbfe; color: var(--brand-primary); font-weight: 700; font-size: 11px; }

/* Tag con dot de estado (legales) */
.status-tag { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: var(--radius-pill);
  background: var(--brand-primary-light); border: 1px solid var(--border-dark); font-size: 12px; font-weight: 600; color: var(--navy); }
.status-tag .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--green); }
```

**Cápsula diferencial** (`.dif-capsule`): píldora blanca con icon box circular a la izquierda, texto 15 px 800 y número de fondo `rgba(2,99,226,.12)`; ancho 50 %, mín 320 px; hover borde `.25` + `--shadow-card` + `translateY(4px)`.

### 5.7 Navegación de carruseles (flechas y dots)

```css
.carousel-arrow {
  width: 44px; height: 44px; border-radius: 50%; flex-shrink: 0; cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center; font-size: 16px;
  background: #fff; border: 1px solid var(--border-light); color: var(--brand-primary);
  box-shadow: 0 4px 12px rgba(0,0,0,.05); transition: all .25s ease;
}
.carousel-arrow:hover, .carousel-arrow:focus-visible { background: var(--brand-primary); color: #fff; border-color: var(--brand-primary); transform: scale(1.05); outline: none; }
.carousel-arrow:disabled { opacity: .45; cursor: not-allowed; transform: none; }

.dots { display: flex; justify-content: center; gap: 8px; margin-top: 28px; }
.dot { width: 8px; height: 8px; border-radius: 50%; background: #cbd5e1; cursor: pointer; border: 0; padding: 0; transition: all .3s ease; }
.dot:hover { transform: scale(1.25); }
.dot.active { width: 24px; border-radius: 4px; background: var(--brand-primary); }
```

- Flechas: 48 px en desktop (ecosistema), 44 px estándar, 36 px en móvil.
- Dot activo azul en fondo claro; en el carrusel “Cómo trabaja” el activo es `--bg-dark`.
- Flechas del hero del Home: blancas semitransparentes `rgba(255,255,255,.9)`, hover `scale(1.08)` + `0 12px 25px -4px rgba(0,0,0,.25)`.

### 5.8 Carruseles

| Tipo | Comportamiento | Implementación |
|---|---|---|
| **Marquee infinito** | Contenido duplicado ×2, `translateX(-50%)`, `linear infinite`, pausa en hover, bordes con fade | `.marquee-container` + `.marquee-track` |
| **Slide único** | Una tarjeta activa (`display:none` / `.active`), autoplay que se detiene si `document.hidden` | “Cómo trabaja” |
| **Track desplazable** | `transform: translateX(-N*100%)`, 0.4 s `--ease-slide`, flechas + dots generados por JS | Ecosistema, escenarios |
| **Scroll-snap** | `overflow-x:auto; scroll-snap-type:x mandatory;` sin scrollbar | Soporte (experiencia, pasos) |
| **Grid en desktop → carrusel en móvil** | ≥ breakpoint: `display:grid`; < breakpoint: `display:flex` + slides al 100 % | Impactos, blog, ciclo, voice/gov (OmniVision) |

Cantidad visible: 3 (> 900 px) · 2 (600–900 px) · 1 (< 600 px).

```css
.marquee-container { display: flex; overflow: hidden; width: 100%; position: relative; }
.marquee-container::before, .marquee-container::after { content: ""; position: absolute; top: 0; width: 80px; height: 100%; z-index: 2; pointer-events: none; }
.marquee-container::before { left: 0;  background: linear-gradient(to right, var(--fade-color, #fff), transparent); }
.marquee-container::after  { right: 0; background: linear-gradient(to left,  var(--fade-color, #fff), transparent); }
.marquee-track { display: flex; gap: 24px; width: max-content; animation: marquee 35s linear infinite; }
.marquee-track:hover { animation-play-state: paused; }
```

### 5.9 Acordeón FAQ

Patrón canónico: **acordeón principal plegable** (el bloque entero arranca cerrado) que contiene preguntas individuales en `<details name="…">` (exclusivas: abrir una cierra las otras). Animación sin JS con `grid-template-rows: 0fr → 1fr`.

| Estado | Pregunta |
|---|---|
| Cerrada | Fondo `--bg-card`, borde `--border-light`, radio 20 px; icono círculo 32 px `--bg-light` gris |
| Abierta | Fondo blanco, `--shadow-lg`, borde `rgba(2,99,226,.2)`; icono `--brand-primary-light` azul rotado 180° |
| Foco | `outline: 2px solid var(--brand-primary)` en `:focus-within` |

Toggle principal: círculo 42 px blanco con borde y `--shadow-sm`, chevron azul; hover borde azul + `--shadow-md`; abierto rota 180°.

### 5.10 Formularios

```css
.form-card { background: #fff; border: 1px solid rgba(226,232,240,.8); border-radius: 24px;
  box-shadow: 0 20px 45px -10px rgba(2,99,226,.10), 0 10px 25px -5px rgba(2,99,226,.08); }

.field-label { display: block; font-size: 13px; font-weight: 600; color: var(--text-main); margin-bottom: 6px; }
.custom-input {
  width: 100%; padding: 11px 16px; font: 400 14px "Montserrat", sans-serif; color: var(--text-main);
  background: #fff; border: 1px solid var(--border-input); border-radius: var(--radius-sm); outline: none;
  transition: border-color .2s ease, box-shadow .2s ease;
}
.custom-input::placeholder { color: var(--text-light); }
.custom-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,.2); }
.custom-checkbox { width: 16px; height: 16px; accent-color: var(--brand-primary); margin-top: 3px; flex-shrink: 0; }
```

Botón de envío: usar `.btn-primary` (píldora azul). Los formularios Odoo incrustados se sobrescriben con `.odoo-form-container …` y `!important` (ver `Casos de Uso/Formularios-Casos-de-Uso.html`).

### 5.11 Tabla comparativa (“Tradicional vs Solución”)

Dos columnas `1fr 1.1fr` que se **solapan visualmente**:
- Izquierda (`.col-trad`): fondo `--bg-light`, borde, radio solo a la izquierda, texto gris claro, título 20 px 500 `#64748b`.
- Derecha (`.col-five9`): blanca, radio 24, `0 20px 50px rgba(15,23,42,.12)`, `z-index: 2`, título 24 px 800; filas 15 px 600 con `.check-icon` (círculo azul 24 px, check blanco, sombra azul); hover fila `#f0f6ff` + `translateX(5px)`.
- ≤ 900 px: 1 columna, gap 32 px, ambas con radio completo.

### 5.12 Banda de impacto

Franja oscura a todo el ancho, inmediatamente debajo de un grid (ej. retos). Frase de conclusión.

```css
.impact-band { background: var(--bg-dark); padding: 30px 100px; text-align: center; }
.impact-band p { font-size: 20px; line-height: 1.65; color: #fff; max-width: 860px; margin: 0 auto; }
@media (max-width: 1023px) { .impact-band { padding: 28px 40px; } .impact-band p { font-size: 17px; } }
@media (max-width: 639px)  { .impact-band { padding: 24px 20px; } .impact-band p { font-size: 15px; line-height: 1.5; } }
```

### 5.13 Mockups e imágenes

- Mockup del hero: ancho 100 %, radio `20px 20px 0 0`, `--shadow-xl` + `0 0 0 1px rgba(0,0,0,.04)`, **máscara de desvanecido** `mask-image: linear-gradient(to bottom, black 30%, transparent 70%)` y margen inferior negativo (`-15%`) para que la sección siguiente “suba”.
- Composición en capas: imagen principal + imagen trasera desplazada (`bottom:-20px; right:-20px; width:75%`) con `blur(2–4px)` y `opacity .6–.7`. Ocultar la trasera en ≤ 1024 px.
- Imágenes de sección: `rounded-2xl`, `object-contain`, `loading="lazy"`; hover opcional `scale(1.02)` en 0.5 s.

---

## 6. Secciones (anatomía y código)

> Cada sección = `eyebrow` → `H2 con fragmento azul` → `lead` (opcional) → contenido → cierre/CTA (opcional).

### 6.1 Navbar

| Propiedad | Valor |
|---|---|
| Posición | `sticky top-0 z-50` |
| Fondo | `bg-white/95 backdrop-blur-md`, `border-b border-slate-200/90`, `shadow-sm` |
| Altura | 80 px (`h-20`), contenedor `max-w-7xl` |
| Logo | `h-9 sm:h-10`, hover `scale(1.05)` |
| Ítems | Texto 13–14 px 600–700 slate-700; chevron 10 px que rota 180° y se vuelve azul en hover |
| Dropdown | `opacity 0 → 1`, `translateY(8px) → 0`, 0.22 s `cubic-bezier(0.16,1,0.3,1)`; abre con `:hover` y `:focus-within` |
| Megamenú | 920–980 px, `rounded-2xl`, borde, `shadow-megamenu`, grid 12 col: **4 col** lista de pestañas (`bg-slate-50/70`) + **8 col** contenido |
| Tab activa | Fondo `#eff6ff`, texto azul, borde `#bfdbfe`, icono 32 px pasa a azul sólido con icono blanco |
| Etiqueta “Nuevo” | `text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-icqBlue` |
| CTA | Píldora `bg-icqBlue`, 12–14 px **800**, `px-6 py-2.5`, `shadow-md shadow-blue-500/20`, hover `-translate-y-0.5` + `shadow-blue-500/35` |
| Scroll interno | Scrollbar 5 px, track `#f1f5f9`, thumb `#cbd5e1` → `#94a3b8` |

Menú principal: Plataformas · Soluciones · (Industrias / Recursos / Nosotros…) · CTA “Contáctanos” → `/contactus`.

### 6.2 Hero

Hay **tres variantes**. Elegir según el tipo de página.

#### A. Hero centrado con mockup (páginas de partner / producto — Five9)

Estructura: eyebrow → H1 (frase + remate azul) → descripción 17 px con `<strong>` → 2 botones (primario + secundario) → mockup con fade.

```html
<section class="hero" id="hero">
  <div class="section-wrap hero-grid">
    <div class="hero-content">
      <span class="hero-eyebrow">Five9 Cloud Contact Center Platform</span>
      <h1>
        Five9: La plataforma inteligente que transforma tu Contact Center en una
        <span class="accent">operación eficiente, automatizada y escalable.</span>
      </h1>
      <p class="hero-desc">
        El Contact Center moderno ya no se trata solo de atender llamadas…
        <strong>Five9 unifica CX, IA, automatización, WFO y analytics</strong> en una sola plataforma.
      </p>
      <div class="hero-btns">
        <a href="https://www.icq24.com/contactus" class="btn-primary"><i class="fa-solid fa-calendar-check"></i> Agenda una demo personalizada</a>
        <a href="#que-es" class="btn-secondary">Conoce todas las capacidades &nbsp;→</a>
      </div>
    </div>
    <div class="hero-mockup"><img src="…/Hero_Five9.webp" alt="Plataforma Five9 implementada por ICQ24" /></div>
  </div>
</section>
```

```css
.hero { position: relative; padding-top: 50px; background: linear-gradient(rgba(255,255,255,.9), rgba(255,255,255,.95)); }
.hero::before { content: ""; position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(2,99,226,.08) 0%, transparent 70%); }
.hero-grid    { display: flex; flex-direction: column; align-items: center; max-width: 1000px; margin: 0 auto; gap: 40px; }
.hero-content { text-align: center; display: flex; flex-direction: column; align-items: center; }
.hero-eyebrow { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .14em; color: var(--text-muted); margin-bottom: 20px; animation: fadeUp .5s ease both; }
.hero h1      { font-size: clamp(32px, 4vw, 48px); font-weight: 800; line-height: 1.1; letter-spacing: -.03em; color: var(--text-main); margin-bottom: 28px; animation: fadeUp .55s .1s ease both; }
.hero h1 .accent { color: var(--brand-primary); }
.hero-desc    { font-size: 17px; line-height: 1.75; color: var(--text-muted); margin-bottom: 36px; animation: fadeUp .55s .2s ease both; }
.hero-btns    { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; animation: fadeUp .55s .3s ease both; }
.hero-mockup  { width: 100%; margin: 30px 0 -15% 0; }
.hero-mockup img {
  width: 100%; display: block; border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  box-shadow: var(--shadow-xl), 0 0 0 1px rgba(0,0,0,.04);
  -webkit-mask-image: linear-gradient(to bottom, black 30%, transparent 70%);
          mask-image: linear-gradient(to bottom, black 30%, transparent 70%);
}
@media (max-width: 768px) { .hero { padding: 72px 24px 0; } }
@media (max-width: 640px) { .hero-btns { flex-direction: column; align-items: center; } }
```

> La sección siguiente debe tener `position: relative; z-index: 10;` y fondo blanco para tapar el mockup.

#### B. Hero en 2 columnas (ICQ24 Suite / producto propio — OmniVision)

Grid `lg:grid-cols-12`: texto `lg:col-span-5` + visual `lg:col-span-7`, `gap-12 lg:gap-16`, `pt-12 lg:pt-24 lg:pb-28`, fondo `.gradient-hero`, `border-b border-slate-100`. H1 `text-2xl sm:text-3xl lg:text-4xl font-extrabold`, remate en `block mt-2 font-black italic text-icqBlue`. Botones `btn-primary` + `btn-secondary` con icono a la derecha.

#### C. Hero Home (typewriter)

- Sección blanca `pt-6 pb-8 lg:pb-12`, `border-b border-slate-200`, contenido centrado con `min-h-[440px] lg:min-h-[520px]`.
- H1 900 navy (hasta 62 px) + **badge typewriter**: caja azul `#0263e2` con texto blanco 900, radio 14→28 px, padding 8×18 → 18×40 px, sombra azul fuerte, y **cursor** navy de 4–7 px que parpadea (`tw-cursor-blink .85s`).
- **Pilares**: fila de 4 conceptos con icono FA azul separados por barritas azules de 2.5 px (`IA | Automatización | Omnicanalidad | Analítica`), 12–17 px 700 slate-800.
- Descripción 14–17 px slate-600, máx `max-w-3xl`.
- 2 píldoras (`hero-pill-primary` + `hero-pill-secondary`).
- **Barra de partners**: texto “Implementamos & somos partners de” + píldora blanca `bg-white/95 backdrop-blur-md rounded-full border shadow-md py-3.5 px-10` con marquee de logos.

### 6.3 Stats ticker (barra de indicadores)

Franja oscura justo bajo el hero: `bg-[#060e1d] border-y border-slate-800/80 py-3`, `shadow-inner`, fades laterales del mismo color, items inline (`icono azul 16 px + texto blanco/slate-300 13 px`) separados 32–48 px, marquee 55 s.

### 6.4 Retos de negocio (grid numerado + banda)

```html
<section class="retos-section">
  <div class="section-wrap">
    <div class="section-center">
      <span class="eyebrow">Retos de negocio</span>
      <h2 class="section-h2">Cuando la operación crece, <span class="accent">la complejidad también.</span></h2>
      <p class="section-lead">Muchas organizaciones siguen operando con <strong>herramientas desconectadas…</strong>, generando:</p>
    </div>
    <div class="retos-grid">
      <div class="reto-card"><div class="reto-num">01</div><h3>Altos tiempos de espera y AHT elevado.</h3></div>
      <!-- 6 retos en total -->
    </div>
  </div>
  <div class="impact-band"><p>El problema no es el volumen de interacciones. <strong>Es operar sin una plataforma que conecte…</strong></p></div>
</section>
```

```css
.retos-section { background: #fff; position: relative; z-index: 10; padding: 40px 0 0; }
.retos-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 48px; }
.reto-card { background: var(--bg-light); border-radius: var(--radius-md); padding: 24px 32px; display: flex; align-items: center; gap: 20px; border: 1px solid transparent; transition: all .4s ease; }
.reto-card:hover { background: #fff; border-color: var(--border-light); box-shadow: var(--shadow-lg); transform: translateY(-6px); scale: 1.03; }
.reto-num { font-size: 32px; font-weight: 900; color: var(--brand-primary); line-height: 1; }
.reto-card h3 { font-size: 15px; font-weight: 500; line-height: 1.5; color: var(--bg-dark-elevated); }
@media (max-width: 1024px) { .retos-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px)  { .retos-grid { display: flex; flex-direction: column; gap: 16px; } }
```

### 6.5 “Qué es” (texto + imagen + marquee de capacidades)

- Fondo `--bg-light`, padding 80 px.
- Header centrado (H2 máx 800 px).
- Grid `1fr 1fr`, gap 72 px: visual en capas (izquierda) + párrafos 16 px (derecha) que terminan en una frase “conectora” 600 `--text-main`.
- Debajo: **marquee de capacidades** a todo el ancho (`width:100vw; margin-left: calc(-50vw + 50%)`) con `.cap-card` (icono azul + texto 16 px 600), fades de 150 px del color `--bg-light`.
- Cierre: frase 15 px 500 + botón.

### 6.6 “Cómo trabaja” (slide destacado)

- Fondo con **imagen corporativa + velo blanco** (`.bg-brand-image`).
- Una tarjeta `.carousel-card` centrada (máx 700 px, radio 28, padding 52×60): icon box → categoría 11 px → H3 28 px → texto 16 px. Hover: toda la tarjeta pasa a `--bg-dark` con textos blancos.
- Dots debajo (activo `--bg-dark`). Autoplay con pausa al ocultar la pestaña.

### 6.7 Ecosistema / módulos (carrusel manual 1 a 1)

- Fondo `--bg-light`. Viewport 900 px, radio 20, `--shadow-xl`.
- `.eco-card` centrada: icon box 56 px → H3 20 px 800 → texto 15 px → `.btn-outline-sm` (“Conocer más”).
- Flechas 48 px a los lados + dots (activo píldora 32 px azul).
- Úsalo para enlazar a las sub-páginas (AVI, AQM, WFM, WFO, Analytics, Agent Assist).

### 6.8 Por qué [solución] (comparativa)

Ver §5.11. Fondo blanco, `padding-top: 50px`, `margin-top: 64px` entre header y tabla.

### 6.9 Escenarios de uso (carrusel de 3)

- Fondo `--bg-light`. Flechas a los lados del viewport, dots debajo, CTA centrado al final (`.escenarios-cta`).
- `.esc-card`: icon box 44 → kicker 11 px → H3 18 px (puede llevar `.accent`) → texto 14 px `#64748b` → `.card-link` empujado al fondo (`margin-top:auto`).

### 6.10 Industrias (sección oscura)

| Variante | Fondo | Tarjeta |
|---|---|---|
| Five9 | `--navy-dark #0b132b` | Blanca, radio 28, 260 px, icono circular azul sólido 56 px, H3 14 px, texto 12 px |
| Home | `#0b1120` + `border-b border-slate-800` | Blanca, `rounded-2xl`, 280–320 px, icono circular `bg-blue-50` 48 px, H3 18 px 900, texto 12–14 px slate-500 |

- Eyebrow `rgba(255,255,255,.4)` / `.eyebrow-dark`, H2 blanco con fragmento azul, lead `slate-400`.
- Marquee 25–40 s con fades del color de fondo.
- Cierre: párrafo `rgba(255,255,255,.7)` con `<strong>` blanco 800 + botón primario con glow.

### 6.11 Impactos / Beneficios

- **Five9:** grid de 3 `.impacto-card` (icono 48 px + H3 18 px en línea; abajo grupo de `.pill`). En ≤ 768 px se convierte en carrusel 1×1 con flechas + dots. Cierre: frase 18 px 700 + botón.
- **Home:** grid 2 columnas: imagen (izquierda) + grid 2×2 de `.roi-card` (valor `-40%` 30–36 px 900 azul + descripción 14 px 500).

### 6.12 Resultados medibles (KPIs)

- Fondo `--bg-light`. Grid `1fr 1fr`, gap 72 px: **mockups en capas** (`.card-front` + `.card-back` desenfocada) + grid 2×2 de `.kpi-card` (valor 25 px 800 azul, `letter-spacing:-.03em`; descripción 12.5 px).
- Cierre centrado: párrafo 17 px 500 con `<strong>` 800 + botón.

### 6.13 Metodología (fases)

- Fondo `slate-50`. Grid `sm:2 lg:4` de `.methodology-card` horizontales: icon box 40 px + H3 14 px 700 + número “01–04” gigante (42 px) de marca de agua a la derecha.
- Soporte usa una variante con **timeline**: carrusel scroll-snap en móvil, grid de 4 en ≥ 768 px.

### 6.14 Por qué ICQ24 (diferenciales)

- Fondo blanco. Lead centrado 16 px (máx 720 px).
- Fila de `.dif-capsule` en 2 columnas (máx 900 px), cada una con icono circular + texto 800 + número tenue.
- Cierre centrado con botón.

### 6.15 Reconocimientos (oscuro)

- Fondo `--bg-dark`, padding `80px 0 40px`.
- Grid 2 col (máx 760 px) de `.premio-card` translúcidas: icono FA 40 px azul → H3 16 px blanco → subtexto 12 px `--text-light`.
- Cierre 15 px `#cbd5e1`.

### 6.16 Casos de éxito (Home)

- Header en fila: título a la izquierda (`max-w-3xl`) + flechas a la derecha (`md:flex-row md:items-end md:justify-between`).
- Track flex con tarjetas `w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-22px)]`.
- `.case-card`: imagen redondeada arriba (`p-2`), cuerpo con H3 (min-h 58 px) + texto (min-h 120 px) + 2–3 `.case-stat-badge` (`bg-slate-50 rounded-2xl p-3`, valor 18–20 px 900 azul; hover `scale(1.05)` blanco) + toggle “Ver más” con chevron circular.

### 6.17 Calculadora / herramienta (oscuro)

- Fondo `#0a1120` + orbes azul/esmeralda.
- Grid 2 col: texto (eyebrow dark, H2 blanco/azul hasta 36 px, `.calc-pill` blancas con “+”) + widget.
- CTA `.calc-cta-btn` (píldora azul 16 px, `px-9 py-4`, `shadow-lg`, glow al hover).
- Animaciones de datos: barra que crece (`efficiency-bar-grow 4s`), `pulse-subtle 3s`.

### 6.18 Recursos / Casos de uso / Blog

- Recursos (Home): header en fila con flechas; tarjetas `.resource-card` de 2 por vista con icono en caja `bg-slate-50 rounded-2xl`.
- **Página Casos de Uso:** hero `.gradient-hero` + `.grid-lines`, fila de `.filter-pill` y grid de `.usecase-card` (imagen arriba con zoom en hover). Formulario de descarga en página aparte con `.form-card`; luego página de agradecimiento.
- Blog: grid de 3 (`md:grid-cols-3 gap-6 lg:gap-8`), en móvil carrusel. `<article itemscope itemtype="https://schema.org/BlogPosting">`, badge de categoría azul, título, extracto, link con flecha.

### 6.19 Certificaciones & partners

Fondo `slate-50`, todo centrado, H2 con `<br class="hidden sm:inline">`, grid de logos/tarjetas `.partner-card` (hover `-4px`, logo `scale(1.06)`).

### 6.20 Preguntas frecuentes (FAQ)

Fondo `.bg-brand-image` (imagen + velo blanco .6/.5 o .75/.65), padding 75 px. Contenedor 860 px.

```html
<section class="faqs-section" id="faqs">
  <div class="section-wrap">
    <details class="faq-main-accordion">
      <summary class="faq-main-summary">
        <span class="eyebrow">Soporte &amp; Respuestas</span>
        <h2 class="section-h2">Preguntas frecuentes sobre Five9</h2>
        <div class="faq-main-toggle">
          <span class="faq-main-icon"><i class="fa-solid fa-chevron-down" aria-hidden="true"></i></span>
        </div>
      </summary>
      <div class="faq-main-content"><div class="faq-main-content-inner">
        <div class="faqs-list">
          <details name="five9-faq" class="faq-item" id="faq1">
            <summary class="faq-q">
              <span class="faq-q-text">¿Qué es Five9?</span>
              <span class="faq-icon"><i class="fa-solid fa-chevron-down" aria-hidden="true"></i></span>
            </summary>
            <div class="faq-item-content"><div class="faq-item-content-inner">
              <div class="faq-a-inner">Five9 es una plataforma CCaaS que integra omnicanalidad, IA…</div>
            </div></div>
          </details>
          <!-- más preguntas con el mismo name="" -->
        </div>
        <p class="faq-escape">¿Tienes otra pregunta? <a href="https://www.icq24.com/contactus">Habla con un especialista</a></p>
      </div></div>
    </details>
  </div>
</section>
```

```css
.faqs-section { padding: 75px 0; }
.faq-main-accordion { max-width: 860px; margin: 0 auto; }
.faq-main-summary { display: flex; flex-direction: column; align-items: center; text-align: center; cursor: pointer; user-select: none; }
.faq-main-toggle { padding-top: 16px; }
.faq-main-icon { width: 42px; height: 42px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;
  background: #fff; border: 1px solid var(--border-light); box-shadow: var(--shadow-sm); color: var(--brand-primary); font-size: 16px;
  transition: transform .3s ease, border-color .3s ease, box-shadow .3s ease; }
.faq-main-summary:hover .faq-main-icon { border-color: var(--brand-primary); box-shadow: var(--shadow-md); }
.faq-main-accordion[open] > .faq-main-summary .faq-main-icon { transform: rotate(180deg); }

/* Animación de apertura sin JS */
.faq-main-content, .faq-item-content { display: grid; grid-template-rows: 0fr; opacity: 0; transition: grid-template-rows .4s ease-in-out, opacity .4s ease-in-out; }
details[open] > .faq-main-content, details[open] > .faq-item-content { grid-template-rows: 1fr; opacity: 1; }
.faq-main-content-inner, .faq-item-content-inner { overflow: hidden; }

.faqs-list { max-width: 820px; margin: 40px auto 0; display: flex; flex-direction: column; gap: 12px; }
.faq-item { background: var(--bg-card); border: 1px solid var(--border-light); border-radius: var(--radius-lg); overflow: hidden;
  transition: box-shadow .25s ease, border-color .25s ease, background-color .25s ease; }
.faq-item:focus-within { outline: 2px solid var(--brand-primary); }
.faq-item[open] { background: #fff; box-shadow: var(--shadow-lg); border-color: rgba(2,99,226,.2); }
.faq-q { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 22px 28px; cursor: pointer; user-select: none; }
.faq-q-text { font-size: 15px; font-weight: 700; line-height: 1.4; color: var(--text-main); }
.faq-icon { width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center;
  background: var(--bg-light); color: var(--text-muted); font-size: 13px; transition: transform .3s ease, background-color .3s ease, color .3s ease; }
.faq-item[open] > .faq-q .faq-icon { background: var(--brand-primary-light); color: var(--brand-primary); transform: rotate(180deg); }
.faq-a-inner { padding: 4px 28px 24px; font-size: 14px; line-height: 1.75; color: var(--text-muted); border-top: 1px solid rgba(0,0,0,.04); }
.faq-escape { text-align: center; margin-top: 36px; font-size: 14px; color: var(--text-muted); }
.faq-escape a { color: var(--brand-primary); font-weight: 700; text-decoration: none; }
.faq-escape a:hover { text-decoration: underline; }
```

Versión Tailwind (OmniVision): `details.group` + icono `group-open:rotate-180`; ítems `bg-white border border-slate-200 rounded-2xl p-6 group/item focus-within:ring-2 focus-within:ring-icqBlue`, respuesta `mt-4 text-sm text-slate-600 border-t border-slate-100 pt-4`.

**Siempre** acompañar con JSON-LD `FAQPage` con las mismas preguntas (ver §11).

### 6.21 CTA final (oscuro)

```html
<section class="py-16 lg:py-20 bg-[#070F1E] text-white border-t border-slate-800 relative overflow-hidden" id="final-cta">
  <div class="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
  <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div class="max-w-4xl mx-auto text-center mb-10 sm:mb-12 lg:mb-14">
      <span class="eyebrow eyebrow-dark mx-auto justify-center">Tu operación merece más que tecnología instalada</span>
      <h2 class="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-[1.18] tracking-tight mt-2">
        <span class="text-icqBlue font-black">Tu operación puede hacer más,</span><br class="hidden sm:inline" />
        costar menos y escalar sin límites.
      </h2>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      <div class="lg:col-span-5 space-y-6">
        <div class="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
          <p>…</p>
          <p class="font-bold text-white">El resultado: más eficiencia, productividad y control.</p>
        </div>
        <div class="flex flex-wrap items-center gap-4 pt-2">
          <a href="https://www.icq24.com/contactus" class="btn-primary">Quiero transformar mi operación →</a>
          <a href="#calculadora" class="footer-btn-white bg-white text-slate-900 font-bold px-7 py-3.5 rounded-full shadow-md">Medir la eficiencia de mi operación</a>
        </div>
      </div>
      <div class="lg:col-span-7"><img src="…/Home_Footer.webp" alt="…" class="w-full h-auto rounded-2xl" loading="lazy" /></div>
    </div>
  </div>
</section>
```

Variante corta (OmniVision): grid 2 columnas imagen + texto, fondo `#0b1120`, un solo botón primario.

### 6.22 Footer

| Propiedad | Valor |
|---|---|
| Contenedor | `#icq24-global-footer`, fondo blanco, `border-top: 1px solid #e2e8f0`, texto `#475569` |
| Título de columna | 11 px 800 mayúsculas `.12em` `#0f172a` + **línea azul** de 16×2 px a la derecha (`::after`) |
| Links | 14 px 500 `#64748b`; hover azul + `translateX(4px)` y aparece flecha (`.link-arrow` opacidad 0→1) |
| Redes | Cuadrados 38 px radio 12, fondo `#f8fafc`, borde; hover fondo azul, icono blanco, `-3px`, `0 8px 16px -2px rgba(2,99,226,.3)` |
| Columnas | Flex columna → fila (≥ 640 px) con gaps 32/40/48/64 px |
| Ubicaciones | 12 px 500 con pin azul; hover azul |
| Legales | 12 px 500 `#64748b`; hover azul subrayado |

### 6.23 Página legal (Políticas)

- Hero blanco con **decoración diagonal** a la derecha (`clip-path: polygon(20% 0,100% 0,100% 100%,0 100%)`, degradado `--bg-light → --brand-primary-light`), H1 azul 32–50 px, `.status-tag` con dot verde (“Vigente · Actualizado …”), imagen que sobresale abajo (`margin-bottom:-70px`).
- Layout `grid-template-columns: 280px 1fr; gap: 48px; max-width: 1120px`.
- **Sidebar oscura sticky** (`top: 84px`): tarjeta `--bg-dark` radio 12 con logo, índice de links 12.5 px `rgba(255,255,255,.55)` con número azul; hover/activo blanco + borde izquierdo azul 3 px.
- Contenido: secciones acordeón `.policy-section` (blancas, borde, radio 12, `--shadow-lg`) con `.sec-num` (caja oscura 40 px, número azul 900), título 15 px 800 y chevron circular que rota.
- Listas con `.purpose-list` (filas `--bg-light`, radio 10, badge circular azul claro).
- Versiones en inglés en `Traducción a Ingles/` con la misma estructura.

### 6.24 Agradecimiento / confirmación

Fondo `#f8fafc` + `.gradient-hero`, `.thankyou-card` centrada (blanca, radio 24, `0 20px 40px -15px rgba(2,99,226,.08)`), icono de check, eyebrow con línea, H1, texto y botón primario (`padding: 13px 26px`, hover `0 12px 24px -4px rgba(2,99,226,.35)`).

### 6.25 Landing de evento / campaña

`.gradient-event` + `.grid-lines` (32 px). Mismos componentes (eyebrow, H1, botones, tarjetas de agenda/ponentes). Formulario en `.form-card`.

---

## 7. Estructura y ritmo de una página

### 7.1 Página de partner / producto (ej. Five9)

| # | Sección | Fondo |
|---|---|---|
| 1 | Hero centrado + mockup | Blanco + glow azul |
| 2 | Retos (grid numerado) + banda de impacto | Blanco → **banda oscura** |
| 3 | Qué es + marquee de capacidades | `--bg-light` |
| 4 | Cómo trabaja (slide destacado) | Imagen + velo |
| 5 | Ecosistema / módulos | `--bg-light` |
| 6 | Por qué (comparativa) | Blanco |
| 7 | Escenarios de uso | `--bg-light` |
| 8 | Industrias | **Navy oscuro** |
| 9 | Impactos al negocio | Blanco |
| 10 | Resultados medibles (KPIs) | `--bg-light` |
| 11 | Por qué ICQ24 (diferenciales) | Blanco |
| 12 | Reconocimientos | **Oscuro** |
| 13 | FAQ | Imagen + velo |

### 7.2 Home

Hero typewriter → Stats ticker (oscuro) → IA aplicada / Plataformas → Soluciones → Industrias (oscuro) → Impacto → Metodología (`slate-50`) → Casos de éxito → Calculadora (oscuro) → Recursos (`slate-50`) → Blog → Certificaciones (`slate-50`) → CTA final (oscuro).

### 7.3 Producto ICQ24 Suite (ej. OmniVision)

Hero 2 col → quick value (auto-carrusel en móvil) → cómo funciona → ciclo (3 tarjetas) → voz/gobernanza (2 tarjetas) → casos de uso → beneficios → soluciones (oscuro) → FAQ → CTA final oscuro.

### 7.4 Reglas de ritmo

1. Alternar **blanco ↔ `#f8fafc`**; nunca dos secciones del mismo fondo seguidas sin `border-b border-slate-200`.
2. Una sección oscura cada 3–4 secciones; nunca dos oscuras seguidas.
3. Repetir el CTA principal al menos 3 veces (hero, mitad, final).
4. Cerrar las secciones densas con una frase-conclusión + botón.
5. Toda página termina en FAQ y/o CTA final oscuro, y luego el Footer global.

---

## 8. Responsive

| Ancho | Reglas |
|---|---|
| ≤ 1024 px | Grids de 2 columnas → 1 columna (gap 40–48 px); retos a 2 columnas; imágenes traseras/decorativas ocultas; imágenes del hero del Home ocultas; diferenciales en grid 2. |
| ≤ 900 px | Comparativa en 1 columna; escenarios 2 por vista. |
| ≤ 768 px | `.section-wrap` con `padding: 0 24px`; hero `padding: 72px 24px 0`; retos en columna; KPIs y premios a 1 columna; impactos y blog → carrusel 1×1 con flechas + dots; hover de transformaciones desactivado en tarjetas de carrusel. |
| ≤ 640 px | Botones apilados, `width:100%`, `max-width: 290–300px`; padding de tarjetas grandes a 32×24; flechas 36 px; fades laterales de marquee a 24 px; marquees más lentos (65 s) para poder leer. |

Escala tipográfica móvil del Home (< 640 px): H1/H2 del hero 20 px · H2 sección 18 px · H3 15 px · H4 13.6 px · eyebrow 11 px (`letter-spacing .08em`) · párrafos 13 px / 1.45. Tablet (640–1023 px): H1 28 px · H2 23 px · H3 17.6 px.

Patrón “grid en desktop, carrusel en móvil”:

```css
@media (max-width: 767px) {
  .x-track { display: flex !important; transition: transform .35s var(--ease-slide); }
  .x-card  { flex: 0 0 100% !important; min-width: 100% !important; }
}
@media (min-width: 768px) {
  .x-track { display: grid !important; grid-template-columns: repeat(3, minmax(0,1fr)) !important; gap: 2rem !important; transform: none !important; }
}
```

---

## 9. Redacción, iconos e imágenes

**Tono:** consultivo, ejecutivo, orientado a resultados; español neutro (LatAm), tuteo (“tu operación”, “agenda”, “descubre”).

| Pieza | Fórmula | Ejemplo |
|---|---|---|
| Eyebrow | 1–4 palabras, sustantivo | “Retos de negocio”, “Nuestra metodología” |
| H2 | Afirmación + fragmento azul | “Cuando la operación crece, **la complejidad también.**” |
| Lead | 1–2 frases, con `<strong>` | “Muchas organizaciones siguen operando con **herramientas desconectadas…**” |
| Retos | Problema concreto, ≤ 10 palabras, termina en punto | “Agentes sin contexto completo del cliente.” |
| KPI | Cifra + unidad + beneficio | “-40% · Reducción potencial en costo por contacto” |
| CTA | Verbo + objeto + (flecha) | “Agenda una demo personalizada”, “Ver cómo funciona →” |
| Banda de impacto | “El problema no es X. **Es Y.**” | — |

**Vocabulario recurrente:** Contact Center, CX, ITSM, IA, automatización, omnicanalidad, analítica, operación, eficiencia, escalable, resultados medibles, enterprise.

**Iconos:** Font Awesome 6 **solid** (`fa-solid`). Siempre en azul dentro de icon box, o blanco sobre azul sólido. Habituales: `fa-calendar-check`, `fa-chevron-down`, `fa-arrow-right`, `fa-arrow-up-right-from-square`, `fa-microchip`, `fa-gears`, `fa-comments`, `fa-chart-line`, `fa-headset`, `fa-shield-halved`, `fa-building-columns`, `fa-magnifying-glass`, `fa-puzzle-piece`, `fa-check`. Decorativos con `aria-hidden="true"`.

**Imágenes:** formato **WebP**, alojadas en `https://www.icq24.com/web/image/...`. Mockups de plataforma con bordes redondeados y sombra; fondos corporativos (`Background.webp`, `Background_Verde.webp`). `alt` descriptivo con palabra clave; `loading="lazy"` excepto el hero; `width`/`height` cuando se conozcan.

**Logo:** `Logo ICQ24_Sencillo.svg` (navbar, h 36–40 px); versión clara para fondos oscuros (sidebar legal).

---

## 10. Accesibilidad

- Contraste: texto `#475569` sobre blanco ✅; **no** usar `#94a3b8` para párrafos sobre blanco (solo eyebrows/metadatos). Sobre oscuro usar `#cbd5e1` o blanco.
- Foco visible: `focus:ring-2 focus:ring-offset-2 focus:ring-icqBlue` (Tailwind) o `outline: 2px solid var(--brand-primary); outline-offset: 3px`.
- Un solo `<h1>` por página; H2 por sección; usar `aria-labelledby` en `<section>` apuntando al id del H2.
- FAQ con `<details>/<summary>` nativos (accesibles por teclado).
- Flechas de carrusel: `<button aria-label="Anterior">`; dots como `<button>` con `aria-label`.
- Marquees: pausa en hover y `prefers-reduced-motion`. Duplicados con `aria-hidden="true"`.
- Hero del Home con `role="banner"`; secciones con `aria-label` descriptivo cuando no hay H2.

---

## 11. SEO / AEO en cada página

Patrón que ya usan las páginas (mantenerlo):

1. `<title>` con formato **“Producto | ICQ24 – Beneficio”** y `<meta name="description">` de 150–160 caracteres.
2. Open Graph (`og:title`, `og:description`, `og:url`, `og:type`).
3. JSON-LD:
   - `Organization` (ICQ24, logo, `sameAs` LinkedIn).
   - `Service` o `Product` (nombre, `serviceType`, `provider`, `areaServed: "Latinoamérica"`).
   - `FAQPage` con **las mismas** preguntas de la sección FAQ.
   - `BlogPosting` en tarjetas de blog (`itemscope`).
4. Bloque de resumen para IA (oculto) con la definición del producto en un párrafo (GEO/AEO).
5. IDs de sección en minúsculas con guiones (`#que-es`, `#faqs`, `#casos-exito`) para anclas internas.

---

## 12. Compatibilidad con Odoo

Las páginas se publican dentro del sitio Odoo (icq24.com), que carga Bootstrap y estilos propios. Por eso:

- Los estilos críticos (botones, hovers, footer) llevan `!important` — mantener esa práctica **solo** donde Odoo los pisa.
- Prefijar componentes globales con un id contenedor (`#icq24-global-footer …`) para no romper otras páginas.
- **No** incluir el reset global (`*{margin:0;padding:0}`) cuando el bloque se pegue dentro de una página Odoo existente; limitarlo a un contenedor (`.icq24-page *`).
- Forzar `text-decoration: none !important` en `a.btn-*` (Odoo subraya enlaces).
- Formularios: envolver en `.odoo-form-container` y sobrescribir inputs y `.o_website_form_send`.
- Los carruseles “grid en desktop / carrusel en móvil” usan `!important` para ganarle a Bootstrap.

---

## 13. Inconsistencias detectadas y decisión canónica

| Tema | Lo que hay hoy | Usar en páginas nuevas |
|---|---|---|
| Hover del botón primario | `#002d6d` (Five9, Suite, Soporte, Casos) vs `#1a73e8` (Home) vs `#1d4ed8` (formularios) | **`#002d6d`** en fondo claro; **`#257bf4` + glow** en fondo oscuro. `#1a73e8` solo en las píldoras del Home. |
| Botón de formulario | `#2563eb`, radio 10 px | **`.btn-primary`** píldora `#0263e2`. |
| Sombra de `.form-card` | Mezcla violeta `rgba(124,58,237,…)` | Solo azul `rgba(2,99,226,…)`. |
| Fuente del footer | `"Plus Jakarta Sans", "Inter"` | **Montserrat** (cargar la misma fuente que el resto). |
| Fondos oscuros | `#0f172a`, `#0b132b`, `#0b1120`, `#0a1120`, `#070f1e`, `#060e1d` | `--bg-dark #0f172a` para bandas/tarjetas; **`--bg-darkest #0b1120`** para secciones oscuras completas; `#060e1d` solo para el stats ticker. |
| `icqNavyDark` en Tailwind | `#0b132b` (Home) vs `#060e1d` (NavBar) | `#0b132b`. |
| `.btn-secondary` | Gris→azul (partners) vs azul→relleno (Home/Casos) | Gris→azul en hero junto a un primario; azul→relleno cuando va solo. |
| Peso del eyebrow | 700 vs 800 | 800 en Home, 700 en internas — ambas válidas; no mezclar en una misma página. |
| Fondo de FAQ | URL de GitHub (`raw.githubusercontent`) en Soporte/OmniVision | URL oficial `https://www.icq24.com/web/image/37691-5879228f/Background.webp`. |
| Variables legales | `--gray-mid`, `--navy-mid`, `--shadow-hover` usadas sin definir | Definirlas o reemplazarlas por `--text-muted`, `--text-main`, `--shadow-hover`. |
| Landings Khomp (`Landings_v04062026/`) | Paleta propia (`#1b4fff`, `#0b1628`, teal) | Legado: **no** usar como referencia para páginas nuevas. |
| Duplicados | `Footer-ICQ24.html` = `footer.html`; `index.html` vs `index_v2.html` | Tomar `index_v2.html` y `footer.html` como fuente. |

---

## 14. Plantilla de página nueva

```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>[Producto] | ICQ24 – [Beneficio principal]</title>
  <meta name="description" content="[150–160 caracteres con la palabra clave]" />
  <meta property="og:title" content="[…]" />
  <meta property="og:description" content="[…]" />
  <meta property="og:url" content="https://www.icq24.com/[slug]" />
  <meta property="og:type" content="website" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />

  <script type="application/ld+json">{ "@context": "https://schema.org", "@type": "Service", "name": "[…]", "provider": { "@type": "Organization", "name": "ICQ24" }, "areaServed": "Latinoamérica" }</script>
  <script type="application/ld+json">{ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [ { "@type": "Question", "name": "¿…?", "acceptedAnswer": { "@type": "Answer", "text": "…" } } ] }</script>

  <style>
    /* 1. Pegar aquí el bloque de §4 (tokens + base) */
    /* 2. Pegar los componentes de §5 que se usen */
    /* 3. Pegar las secciones de §6 que se usen */
  </style>
</head>
<body>
  <!-- HERO (§6.2-A o B) -->
  <section class="hero" id="hero">…</section>

  <!-- RETOS (§6.4) -->
  <section class="retos-section" id="retos">…</section>

  <!-- QUÉ ES (§6.5) · fondo light -->
  <section class="section section--light" id="que-es">
    <div class="section-wrap">
      <div class="section-center">
        <span class="eyebrow">[Eyebrow]</span>
        <h2 class="section-h2">[Frase] <span class="accent">[fragmento azul]</span></h2>
        <p class="section-lead">[Lead con <strong>idea clave</strong>]</p>
      </div>
      <!-- contenido -->
    </div>
  </section>

  <!-- … secciones alternando fondo … -->

  <!-- SECCIÓN OSCURA (§6.10 / §6.15) -->
  <section class="section section--navy" id="industrias">…</section>

  <!-- FAQ (§6.20) -->
  <section class="faqs-section bg-brand-image" id="faqs">…</section>

  <!-- CTA FINAL (§6.21) → luego el Footer global de Odoo -->
</body>
</html>
```

---

## 15. Checklist antes de publicar

**Marca**
- [ ] Solo Montserrat; solo `#0263e2` como acento.
- [ ] Cada H2 tiene eyebrow y **un** fragmento azul.
- [ ] Botones en píldora; primario azul, hover `#002d6d` (claro) o glow (oscuro).
- [ ] Sombras de hover azuladas; en reposo, neutras y suaves.

**Estructura**
- [ ] Alternancia blanco / `#f8fafc`; una sección oscura cada 3–4.
- [ ] CTA principal en hero, mitad y final, apuntando a `https://www.icq24.com/contactus`.
- [ ] FAQ con acordeón principal + preguntas `<details name>` + JSON-LD `FAQPage`.

**Interacción**
- [ ] Tarjetas con `translateY(-4px)` + borde `rgba(2,99,226,.2)` en hover.
- [ ] Marquees pausan en hover; carruseles con flechas + dots accesibles.
- [ ] `prefers-reduced-motion` incluido.

**Responsive**
- [ ] Probado en 375, 768, 1024 y 1440 px.
- [ ] Grids → carrusel en móvil; botones a ancho completo ≤ 640 px; sin scroll horizontal.

**Técnico**
- [ ] Imágenes WebP desde icq24.com con `alt`, `loading="lazy"` (excepto hero).
- [ ] Title, description, OG y JSON-LD completos.
- [ ] Sin reset global si se incrusta en Odoo; `!important` solo donde Odoo lo pisa.
- [ ] Sin URLs de GitHub para assets.
