Dos cambios en `/demo`: que corra solo y más rápido, y sacarle el aspecto de plantilla.

## 1. El demo corre solo, las tres etapas a la vez

Hoy hay que apretar botones y la entrevista tarda un minuto. Lo quiero como las secciones de juro.com: cada etapa es una sección de la página, una debajo de la otra, y en cada una el producto se mueve solo.

**Estructura de la página**
- Arriba: el título y una línea de texto. Debajo, una sola línea chica: "Sample case. María Rivas is fictional and every document is fabricated." Sin recuadro.
- Tres secciones, una debajo de la otra:
  1. **Documents**: a la izquierda el título y dos líneas de texto; a la derecha el panel animado (documentos → campos extraídos).
  2. **Interview**: el texto a la derecha y el panel a la izquierda (conversación en español con su traducción → campos de la Parte B).
  3. **Filing package**: el texto a la izquierda y el panel a la derecha (las páginas del I-589 apareciendo y los contadores subiendo), con la descarga.
- En el teléfono, cada sección queda en una columna: primero el texto, después el panel.

**Cómo corre**
- Arranca solo al cargar la página, sin ningún botón. Las tres secciones corren **al mismo tiempo**.
- Todo dura unos **10 segundos**, seis veces menos que hoy:
  - Interview: un turno cada **280 ms**. Los 34 turnos tardan unos 9,5 s; hoy tardan 58 s.
  - Documents: los 5 documentos repartidos en esos mismos 10 s, unos 2 s cada uno. Mientras se lee uno, sus campos se encienden de a uno.
  - Filing package: las páginas aparecen de a una y los contadores suben hasta 13 páginas, 187 campos, 34 casillas y 1 hoja de Supplement B, terminando junto con la entrevista.
- Al terminar, quedan quietas **6 segundos** en el estado final y vuelven a empezar. Las tres reinician juntas.
- Una sección que no está en pantalla se pausa, y retoma cuando vuelve a verse.
- Con `prefers-reduced-motion`, nada se anima: se muestra directamente el estado final.
- Se sacan los botones de "Read the documents", "Play", "Step", "Skip", "Next" y las pastillas de etapas 01, 02 y 03. Ya no hacen falta: todo está a la vista.
- La descarga del PDF con el formulario de correo queda en la sección 3, debajo del panel, sin animación.

## 2. Que no parezca una plantilla

El demo tiene las marcas típicas de un sitio armado con IA. Sacalas:

- **Fondo crema y verde lima.** Fondo blanco. Un solo color de marca, oscuro y sobrio (azul tinta o verde petróleo), solo para botones y enlaces. Los campos completados se marcan con un tinte muy suave y un punto del color de marca, sin bloques de color lleno.
- **Rótulos en mayúsculas espaciadas** ("DOCUMENTS", "THE FORM"). Se sacan todos. Cada sección tiene su título y listo.
- **Recuadros con una barra de color a la izquierda.** Se sacan.
- **Tarjetas muy redondeadas con borde de color.** Radio de 6 px como máximo, borde gris de 1 px, sin sombras de colores.
- **Títulos con serif liviana en todos lados.** Una sola familia sans-serif para todo, con contraste por peso y tamaño. La serif, si se queda, solo en el título principal.
- **"from the passport" en verde debajo de cada campo.** Va como una etiqueta chica y gris a la derecha del valor ("Passport"), igual que en un programa real.
- **Íconos genéricos de documento.** Reemplazalos por miniaturas de los documentos de muestra (te las paso como imágenes).

Que los paneles parezcan el producto: filas densas tipo tabla, los números de campo y el A-Number en tipografía monoespaciada, estados con etiquetas chicas. Menos aire entre elementos que ahora.

## Lo que no cambia

- Todo el texto visible va tal cual, salvo la línea nueva de arriba.
- Los turnos en español con la traducción debajo.
- El formulario de contacto y su guardado en Supabase.
- El parámetro `?from=org` o `?from=firm`.
- El modo oscuro.

Pasame el plan antes de escribir código.
