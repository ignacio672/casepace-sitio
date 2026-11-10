# Plan del sitio de Casepace

Escrito antes de construir, el 10 de noviembre de 2026. Lo que cambió durante la
construcción quedó anotado en `docs/ENTREGA.md`.

## Cómo leo el pedido

Una landing B2B para abogados, paralegales y directores de organizaciones que
leen rápido y desconfían de la IA. El lenguaje es editorial y sobrio: tiene que
parecer el sitio de una empresa seria y un producto preciso. Variación de
composición media, movimiento contenido y solo donde muestra el producto,
densidad media.

## Dirección visual

**La idea es el rastro del papel.** Lo que Casepace vende es que nada se
inventa: cada dato del formulario sale de un documento o de una frase del
cliente. Todo el sitio repite ese gesto con un solo recurso, el citrón usado
como un resaltador sobre papel. Marca la frase del cliente y, en el mismo
instante, pasa sobre el dato que llega al formulario. Fuera de eso, el citrón
solo aparece en el botón "Book a walkthrough" de la barra y en una frase del
problema. Así el acento significa siempre lo mismo (de acá salió esto) y no se
gasta como decoración.

**Negro para la voz del cliente, blanco para la mesa del estudio.** El inicio,
la entrevista y el cierre van sobre el negro de la marca; el resto, sobre
blanco, con los escenarios del producto en el blanco cálido `#F4F2EE`, que acá
funciona como gris cálido muy claro y no como fondo de página. El fondo de la
página es blanco puro para alejarse del crema. La alternancia tiene sentido y no
es un adorno: el cliente responde de noche desde el teléfono, el equipo revisa
de día. El papel del formulario tiene esquinas rectas; las ventanas del
producto, 12 px; los escenarios, 16 px; los botones, 10 px. Esa regla de formas
se cumple en todo el sitio.

**Tipografía que hace el trabajo.** Newsreader a tamaño grande y con su corte
óptico de titular para los títulos, Figtree para el texto y la interfaz, e IBM
Plex Mono para números de campo e identificadores, que es la que más se parece
a un formulario tipeado. Las fuentes se sirven desde el propio sitio para que
nada salte al cargar y para no llamar a terceros. No hay rótulos en mayúsculas
espaciadas: de los rótulos chicos del sitio actual queda uno solo, el del
inicio ("for immigration attorneys"), porque responde para quién es, y va en
Newsreader cursiva, en minúsculas. Los demás se van. Tampoco hay tarjetas con
borde de color, barras laterales, íconos en fila, degradados ni emojis. Donde
hay tres ideas en fila (cómo usamos la IA) van como una lista de definiciones
con filetes, no como tres tarjetas iguales.

## Orden de las secciones

Las dos landings comparten todo menos los textos.

1. **Inicio** (negro). Rótulo, título, texto, los dos llamados y la nota. Debajo,
   el elemento vivo: a la izquierda lo que dijo el cliente, en español con su
   traducción; a la derecha, la hoja del I-589 con la frase en inglés. El
   resaltador une las dos.
2. **El problema** (blanco). Título grande y los dos párrafos en dos columnas,
   como una página de diario. Cierra con la frase final a tamaño de título.
3. **Cómo funciona: el caso de muestra** (blanco, negro, blanco). La cabecera y
   los tres pasos, cada uno con su texto y su escenario a todo el ancho:
   - Documents;
   - Interview, en la franja negra;
   - Filing package, con la tarjeta de entrega y, debajo, la descarga del PDF.
4. **Cómo usamos la IA** (blanco). Título, párrafo y los tres bloques como lista
   de definiciones.
5. **Para quién es** (blanco cálido). Una declaración corta, a una columna.
6. **Quiénes somos** (blanco). El texto de la empresa y los dos fundadores.
7. **Preguntas** (blanco). Las tres a la vista, sin acordeón, y el enlace a
   `/trust`.
8. **Cierre** (negro) y **pie legal** (negro).

Aparte: `/trust` con sus siete artículos, y `/privacy` y `/terms` como páginas
con marcador, porque el pie las enlaza y su contenido es legal.

## Qué uno y qué saco

- **"Lo que dijo el cliente y lo que va al formulario" pasa al inicio.** Es la
  mejor demostración de cinco segundos que tiene el sitio, y como sección
  aparte repetía lo que ya muestra el paso Interview. Los dos estados del
  conmutador se ven a la vez, uno al lado del otro.
- **"Qué recibe el estudio" es el paso Filing package.** La tarjeta de entrega,
  el párrafo del PDF editable y el formulario de descarga van juntos, en ese
  orden.
- **El caso de muestra vive dentro de la landing,** en `#demo`. `/demo` queda
  como redirección para no romper enlaces viejos.
- **Se van cuatro rótulos:** "the problem", "who it suits", "before you ask" y
  "see it yourself".
- **Las preguntas no son un acordeón.** Son tres y el lector desconfía: es
  mejor que las respuestas estén a la vista.

## Decisiones técnicas

- Vite 5, React 18, TypeScript, Tailwind 3.4 y React Router 6, que es lo que usa
  Lovable. Alias `@` a `src`, utilidad `cn` y carpeta `components/ui` como en
  shadcn. Íconos de `lucide-react`, que Lovable ya trae.
- Sin biblioteca de animación. Los tiempos de cada escenario son funciones puras
  con sus pruebas en Vitest, y un solo gancho las recorre con temporizadores.
  Los escenarios se pausan fuera de pantalla, con el mouse encima, con la
  pestaña oculta y con su botón de pausa. Con movimiento reducido se ve el
  estado final quieto.
- Textos en `src/content/`. Imágenes optimizadas en `src/assets/` con un script
  que parte de `material/imagenes/`. El PDF, en `public/`.
- `guardarContacto` aislada en `src/lib/`, sin efecto por ahora.
- Lo que falta con contenido legal o biográfico se muestra con un componente de
  marcador visible y se lista en la entrega.

## Verificación

Vista previa en 1440, 1280 y 375 px, con movimiento reducido, con teclado y con
la consola a la vista. Build y pruebas en verde. Capturas por sección en
`docs/capturas/`.
