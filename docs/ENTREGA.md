# Entrega del sitio de Casepace

10 de noviembre de 2026. Todo el trabajo está en la rama `sitio`, sin push.
El plan original está en `docs/PLAN.md`; lo que cambió al construir está
anotado acá, en "Decisiones que conviene revisar".

## El inicio: la pantalla de revisión

Arriba el título, el texto y los dos llamados. Debajo, a todo el ancho, **la
pantalla con la que el estudio revisa el caso**: cinco campos del formulario
que se completan de a uno, cada uno con el documento o la entrevista de donde
salió. El último es lo que contó la clienta.

Es la dirección que usan los sitios más cercanos al rubro (Harvey, Linear): el
producto como imagen, no una foto. Y es lo que piden las instrucciones cuando
hablan de un elemento vivo del producto.

**El inicio está hecho para leerse despacio.** La primera versión era correcta
y fría: mucha densidad, tipografía chica y una animación rápida. Se corrigió
con escala y aire, no con más elementos: titular más grande, menos cosas en la
primera pantalla, cinco filas en vez de ocho, y el ritmo de la animación casi
al doble de lento (950 ms por fila). Si alguna vez se vuelve a sentir frío,
ese es el lugar donde mirar: densidad y ritmo, antes que color.

- Componente: `src/components/landing/HeroWindow.tsx`. Tiempos en
  `src/lib/demo/review.ts`, filas en `src/content/sampleCase.ts`
  (`reviewRows`), armadas con los mismos datos del paso Documents y la misma
  frase que escribe el paso Interview.
- Se fueron `HeroLive` y la sección "Lo que dijo el cliente y lo que va al
  formulario", que hacían el mismo gesto dos veces. La frase aprobada "Every
  sentence traces back to something the client said." quedó como pie del
  inicio.

### Los colores

**Toda la marca vive en variables**, en `:root` dentro de `src/index.css`, y
Tailwind las toma de ahí (`ink`, `paper`, `accent`, `line`, `muted`, `phone`).
Cambiar la marca entera es cambiar ese bloque.

La paleta es **Celestial**, elegida después de probar cuatro temas en vivo:

| | Valor | Dónde |
|---|---|---|
| **Azul** | `#2323FF` | Franjas del inicio, la entrevista y el cierre, y todo el texto sobre blanco |
| **Amarillo** | `#FFF224` | Botón principal y resaltador |
| **Oliva** | `#6B6845` | Texto secundario sobre blanco |
| Azul claro | `#C3C3FF` | Texto secundario sobre el azul |
| Blanco cálido | `#F4F2EE` | Texto sobre el azul y escenarios del producto |
| Azul muy oscuro | `#14143A` | Pantalla del teléfono, para que las burbujas se despeguen |

**Esto reemplaza el negro y el citrón `#E4F27A` del sitio publicado.** Es un
cambio de marca, no solo del sitio: al mergear a Lovable hay que cambiarlo ahí
también, o los dos se separan. También cambian el favicon y el `theme-color`
de `index.html`.

Contrastes medidos, todos por encima del mínimo:

- blanco cálido sobre el azul, 6,8:1;
- texto secundario sobre el azul, 4,6:1;
- azul sobre blanco, 6,9:1;
- negro sobre el amarillo, 16:1;
- el oliva de la paleta, `#807D52`, da 4,2:1 sobre blanco y no alcanza para
  texto chico: se usa `#6B6845`, que da 5,1:1 sobre el blanco cálido.

Se probaron y descartaron el citrón (frío) y el ámbar `#FFBD24` sobre base
negra, que quedó documentado como "Celestial sobrio" en el historial.

**Al tocar `tailwind.config.ts` hay que reiniciar `npm run dev`** y borrar
`node_modules/.cache`: Tailwind guarda la configuración compilada y el
servidor sigue sirviendo la vieja.

### La foto del I-589: probada y descartada

Probamos la foto de tres maneras: detrás del texto, como franja a todo el ancho
y como papel vivo con la casilla tildándose sobre la hoja. Las tres quedaron
mal. Queda anotado para no repetirlo:

- **Detrás del texto no entra.** El hueco negro de la foto es un triángulo
  ancho y bajo, y el bloque de texto es alto: la hoja le pasa por encima al
  titular a cualquier escala que deje el título del formulario entero.
- **Como franja es decoración,** que es justo lo que las instrucciones no
  quieren.
- **El material sigue en el repositorio** por si vuelve: la foto y su máscara
  en `material/imagenes/portada/`, y `portada()` en
  `scripts/preparar_imagenes.py`, que ya no se llama. La casilla quedó medida
  esquina por esquina en el commit `fed8537`.
- Si alguna vez se usa, hay que confirmar los derechos de uso de la foto.

### El video de archivo

También probamos un GIF de archivo (manos con un teléfono) en horizontal y
vertical. No va: es metraje de archivo, que las instrucciones prohíben, no
muestra el producto, trae un cuarto color y en el teléfono se come la primera
pantalla. Convertido a MP4 pesa 389 KB y 332 KB, y sirve para redes, que es
para lo que estaba hecho.

## Qué hay

- **Las dos landings,** `/for-firms` y `/for-organizations`: el mismo diseño
  con textos distintos. `/` redirige a `/for-firms`.
- **El caso de muestra animado,** dentro de cada landing, en `#demo`:
  Documents, Interview y Filing package, y debajo la descarga del PDF.
  `/demo` y `/demo?from=org` redirigen ahí.
- **`/trust`,** con filtros y siete artículos, cada uno en `/trust/<slug>`.
- **El pie legal** en todas las páginas, con el año calculado.
- **`/privacy` y `/terms`,** que el pie enlaza. Solo tienen el marcador.

## Cómo correrlo

```bash
npm install
```

```bash
npm run dev
```

Abre en `http://localhost:8080`. Lo demás:

| Comando | Qué hace |
|---|---|
| `npm test` | Las 62 pruebas de Vitest |
| `npm run build` | Chequeo de tipos y build en `dist/` |
| `npm run imagenes` | Rehace `src/assets/` desde `material/imagenes/` |
| `python3 scripts/regiones_documentos.py` | Recalcula dónde está cada dato en las fotos |
| `node scripts/capturas.mjs` | Rehace `docs/capturas/` y revisa consola y desborde |

El script de capturas necesita `npm i --no-save puppeteer-core` y el sitio
corriendo. Usa el Chrome instalado en la máquina.

## Verificación

Hecha en la vista previa del navegador y repetida con el script de capturas.

| Qué | Resultado |
|---|---|
| 1440, 1280 y 375 px | Sin desborde horizontal. Capturas en `docs/capturas/` |
| Primera pantalla | A 1440 × 900 y 1280 × 720 se ven el título, el texto, los dos llamados y la frase resaltada del formulario |
| Movimiento reducido | Cada escenario muestra su estado final. Cero cambios en pantalla y cero animaciones corriendo |
| Teclado | Enlace para saltar al contenido, orden lógico y foco visible sobre negro y sobre blanco |
| Consola | Sin errores ni avisos en ninguna ruta |
| Carga | Nada salta al cargar: saltos de diseño (CLS) de 0, medido con red lenta. Recorriendo la página entera da 0,001 como máximo, por el chat que avanza dentro del teléfono |
| Fuera de pantalla | Cada escenario se detiene cuando no se ve y retoma al volver. También con el mouse encima, con la pestaña oculta y con su botón de pausa |
| Formulario | Errores en línea, foco en el primer campo con error, y el PDF se abre |
| Build y pruebas | `npm run build` y `npm test` pasan |

No se probó en Safari ni en un teléfono real: las pruebas corrieron en Chrome.

## Marcadores que quedan para completar

En la página se ven con borde punteado y fondo rayado. En el código se
encuentran buscando `data-pendiente`, `<Pending` o `type: "pending"`.

| Dónde | Qué falta | Archivo |
|---|---|---|
| Who we are | Confirmar el nombre y la biografía de cada fundador (4 marcadores) | `src/content/landings.ts`, `shared.whoWeAre` |
| `/for-organizations`, el problema | "the work that needs a lawyer": las organizaciones trabajan con representantes acreditados | `src/content/landings.ts`, `organizations.problem` |
| `/trust` y cada artículo | El dominio de `security@` | `src/content/trust.ts`, `contactDomainPending` |
| How we protect client data | Cifrado en tránsito y en reposo; acceso por rol; proveedor, región y respaldos | `src/content/trust.ts` |
| Report a vulnerability | La casilla de seguridad; plazos de respuesta y postura sobre investigación de buena fe | `src/content/trust.ts` |
| What data we process | Los documentos que sube el cliente, cuando la subida esté en el producto; datos de cuenta; quién de Human Migrate puede abrir un caso; otros usos | `src/content/trust.ts` |
| Retention and deletion | Todo: plazo, cómo se borra un caso y copias en proveedores | `src/content/trust.ts` |
| Subprocessors | Todos los proveedores además de OpenAI, con su ubicación | `src/content/trust.ts` |
| How we use AI | El plazo de retención de OpenAI | `src/content/trust.ts` |
| Your data and model training | Confirmar que Human Migrate no entrena ningún modelo con datos de clientes; enlace a los términos de OpenAI | `src/content/trust.ts` |
| `/privacy` y `/terms` | El texto legal completo | `src/content/site.ts`, `legalPages` |

Sin marcador visible, pero pendientes:

- **Video de Who we are.** El lugar está listo: se completa `videoSrc` en
  `shared.whoWeAre` y aparece debajo de las fotos.
- **Favicon.** Es provisorio: un cuadrado negro con una raya citrón. Falta un
  isotipo de la marca.
- **`guardarContacto`.** No hace nada hasta conectarla a Supabase.

## Decisiones que conviene revisar

**Estructura**

1. **"Lo que dijo el cliente y lo que va al formulario" es el elemento vivo
   del inicio** y dejó de ser una sección. En el plan iban lado a lado en una
   franja; al construir quedó mejor como una sola composición a la derecha del
   título: la hoja del I-589 y, apoyada sobre ella, la frase del cliente. Así
   la frase resaltada se ve sin scrollear en 1440 y en 1280.
2. **No usé `i589_parte_b_en.png`.** La hoja del inicio está compuesta en HTML
   con el texto de la página 5 del PDF. La imagen tiene otra redacción que el
   PDF (ver "Lo que encontré en el material") y como imagen no se leía a 375 px.
3. **El caso de muestra vive dentro de la landing.** Los pasos van con el texto
   arriba y el escenario a todo el ancho, no en 40 y 60: con el teléfono y la
   ventana lado a lado, el 60 % no alcanzaba en 1280.
4. **"Qué recibe el estudio" es el paso Filing package,** con la tarjeta de
   entrega, el párrafo del PDF editable y la descarga.
5. **Las preguntas están a la vista,** sin acordeón, con un enlace a `/trust`.
6. **Se fueron cuatro rótulos** ("the problem", "who it suits", "before you
   ask", "see it yourself"). Queda el del inicio, en cursiva y minúsculas.

**Marca**

7. **El citrón es solo el botón "Book a walkthrough" de la barra y el
   resaltador.** En el inicio y en el cierre, "Book a walkthrough" va con borde
   y el llamado lleno es "See a case prepared", en blanco cálido. La barra queda
   fija, así que el botón citrón está siempre a la vista.
8. **El fondo de página es blanco** y el blanco cálido `#F4F2EE` queda para los
   escenarios y para la franja de "Who this is for".
9. **No hay modo oscuro.** Las instrucciones nuevas no lo piden.
10. **Las fuentes se sirven desde `public/fonts`** en lugar de pedirlas a
    Google. Son las mismas. Ganan en carga y no llaman a terceros.
11. **Las fotos de los fundadores van en blanco y negro,** con el mismo recorte.
    Sirven, pero los fondos son distintos: conviene rehacerlas con el mismo
    fondo.

**Caso de muestra**

12. **Cada escenario tiene un botón de pausa chico.** El pedido 01 sacaba los
    botones, pero lo que se mueve solo más de cinco segundos tiene que poder
    detenerse con el teclado. Con movimiento reducido no aparece.
13. **Documents muestra una franja ampliada de la foto,** con el recuadro citrón
    sobre el dato, además de la miniatura de 64 × 48. En la miniatura sola el
    recuadro medía pocos píxeles y el origen no se veía.
14. **Los números de campo son los del I-589 real** ("A.I 12", "A.II 9"), no las
    claves internas del JSON.
15. **El I-94 muestra tres campos, no cuatro.** El cuarto de `documentos.json`
    (fecha de salida del país) no figura en la foto, así que no tiene origen que
    marcar.
16. **La ventana de Interview arranca con la primera frase de la declaración ya
    escrita,** para que nunca esté vacía. El pie de la ventana repite la tercera
    línea de la tarjeta de entrega.
17. **En Filing package, la página 1 queda arriba** y las páginas llegan de atrás
    hacia adelante.
18. **El PDF se abre en una pestaña nueva** y el formulario queda reemplazado por
    una confirmación con el enlace. Si falla el guardado, el PDF se abre igual.

**Enlaces y textos**

19. **"Book a walkthrough" y "Contact" abren un correo a `hola@casepace.co`,**
    el mismo destino que tiene hoy el sitio publicado. Está en
    `src/content/site.ts`.
20. **Textos que escribí yo,** todos en `src/content/`:
    - los artículos de `/trust`, solo con lo que hoy es cierto. El párrafo de
      las hojas de continuación en "How we use AI" es nuevo;
    - los rótulos de las ventanas del producto ("Documents", "Reading",
      "Interview", "Harm or mistreatment in the past");
    - los mensajes del formulario y su confirmación;
    - la descripción de cada animación para lectores de pantalla;
    - la página de dirección inexistente.
21. **Solo el inicio tiene animación de entrada.** El resto de las secciones no
    se anima al scrollear: el movimiento queda para los escenarios.

## Lo que encontré en el material

No lo corregí porque no me corresponde, pero un abogado lo puede notar.

- **El PDF de muestra no coincide con el caso.** La página 2 dice "Total number
  of children: 7" y la página 3 lista a Mateo y a Lucía. El caso tiene dos
  hijos, Santiago y Valentina.
- **Teléfono.** La página 1 del PDF dice 555-0199 en la residencia y 555-0148
  en la dirección postal. El JSON dice 555-0148 en las dos.
- **I-94.** La foto dice "Admit Until Date 03/14/2028" y el formulario,
  03/15/2028. La foto trae número de I-94 y el formulario dice N/A.
- **`i589_parte_b_en.png` tiene otra redacción que el PDF:** "On 11 March 2019,
  four men in plain clothes" contra "On March 11, 2019, four plainclothes men".
- **Campo 51.1.** `documentos.json` lo llama "Place of marriage", pero en el PDF
  ese valor está en "City and Country of Birth" y "Place of Marriage" dice N/A.
- **Textos aprobados que chocan con "Lo que hoy es cierto".** Los dejé tal cual:
  - el inicio de `/for-firms`, el paso Documents y el párrafo del PDF editable
    dan por hecha la subida de documentos, que todavía no se puede afirmar;
  - la respuesta sobre confidencialidad habla de "AI providers" en plural, y
    hoy el único es OpenAI.
- **LangSmith.** El pedido 04 dice que las conversaciones se envían ahí. No lo
  nombré en la página: o se apaga, o entra en Subprocessors.

## Cómo se mergea a Lovable

El proyecto está armado con lo que usa Lovable: Vite, React 18, TypeScript,
Tailwind 3.4, React Router 6, el alias `@` y `lucide-react`. Las dependencias de
producción son seis (`react`, `react-dom`, `react-router-dom`, `lucide-react`,
`clsx` y `tailwind-merge`). No vi el repositorio de Lovable: antes de mergear
conviene comparar las versiones con su `package.json`.

1. **Copiar tal cual:**
   - `src/content/`
   - `src/assets/`
   - `src/lib/` (si Lovable ya tiene `utils.ts` con `cn`, dejar el suyo)
   - `src/hooks/`
   - `src/components/site/`, `landing/`, `demo/`
   - `src/pages/`
   - `src/test/`
   - `public/fonts/` y `public/caso_muestra_i589_en.pdf`
2. **`src/components/ui/button.tsx`** lleva el mismo nombre que el botón de
   shadcn. Si Lovable ya tiene el suyo, renombrar este a `site-button.tsx` y
   cambiar los seis imports.
3. **Unir a mano:**
   - `tailwind.config.ts`: el bloque `extend` entero (colores, fuentes, radios,
     sombras, `keyframes` y `animation`);
   - `src/index.css`: las `@font-face`, la capa `base` y la capa `components`;
   - `index.html`: los dos `<link rel="preload">` de las fuentes y el
     `theme-color`;
   - `src/App.tsx`: las rutas, dentro del `BrowserRouter` que ya tenga Lovable.
4. **Conectar Supabase** en `src/lib/guardarContacto.ts`. Es el único lugar.
   Recibe `nombre`, `correo`, `organizacion` y `origen`.
5. **Sacar lo viejo:** la página `/demo` actual, sus componentes y el PDF
   anterior (`caso_muestra_i589.pdf`).
6. **Pruebas:** agregar a `vite.config.ts` el bloque `test`, y como dependencias
   de desarrollo `vitest`, `jsdom` y `@testing-library/react`.

Componentes, por si se mergea de a partes:

| Componente | Qué es |
|---|---|
| `site/Nav`, `site/Footer`, `site/Layout` | Barra, pie legal y armazón de página |
| `site/Pending` | El marcador visible |
| `landing/Hero`, `landing/HeroLive` | El inicio y su elemento vivo |
| `landing/Problem`, `AiSection`, `WhoFor`, `WhoWeAre`, `Questions`, `Closing` | Las demás secciones |
| `landing/SampleCase` | Cabecera y los tres pasos del caso de muestra |
| `demo/DocumentsStage`, `InterviewStage`, `FilingStage` | Los tres escenarios |
| `demo/Phone`, `AppWindow`, `Stage`, `StageControl` | Teléfono, ventana, escenario y botón de pausa |
| `demo/DownloadForm` | El formulario de descarga |
| `pages/Trust`, `pages/TrustArticle` | `/trust` y sus artículos |

Los tiempos de cada animación están en `src/lib/demo/` como constantes con su
prueba. Para cambiar un tiempo se toca ahí y no en el componente.
