Segunda vuelta de `/demo`. Va mejor, pero hay tres problemas: el mensaje parece decir que solo hacemos el I-589, el azul no es nuestra marca, y las secciones todavía no muestran lo que hace el producto. Cambiá lo que sigue.

## 1. El mensaje: este es un caso, hay muchos formularios

El demo muestra un caso y un formulario. Que se lea así, sin que parezca que el I-589 es todo lo que hacemos. Reemplazá el título y los dos párrafos de arriba por este texto, tal cual:

> **Watch a case get prepared**
>
> One client and one form, start to finish. María speaks Spanish and is applying for asylum on Form I-589. Every form your team prepares goes through the same three steps: the documents, the interview, and the filing package.
>
> Nothing here is invented: every field traces back to a document or to something the client said.

Debajo queda la línea chica: "Sample case. María Rivas is fictional and every document is fabricated."

Se va el párrafo "This is one I-589, start to finish. We built it first because it is the hardest…": guardalo en el archivo de texto quitado.

## 2. La marca: la misma de las landings

Sacá el azul tinta. El demo usa la marca de las landings: negro, blanco y el citrón. El problema de antes no era el citrón sino que estaba en todos lados. Las reglas:

- **Colores.**
  - Texto en el negro de la marca.
  - Fondo blanco.
  - Los paneles en un gris muy claro y cálido, con borde de 1 px en un gris apenas más oscuro.
  - Nada de crema.
- **El citrón solo para tres cosas:**
  - el botón principal;
  - el instante en que un dato se completa, como un resaltador que pasa sobre el valor y en medio segundo se apaga;
  - la marca sobre la parte del documento o de la frase de donde salió ese dato.
  
  Nunca de fondo de una tarjeta o de una fila entera.
- **Un dato completado** queda en negro, con un tilde chico en negro y la etiqueta gris de su origen a la derecha.
- **Ritmo de la página:**
  - Documents, sobre fondo blanco;
  - Interview, en una franja negra como el héroe de las landings, con el texto en blanco;
  - Filing package, de nuevo sobre blanco.
- **Tipografía:** los títulos de sección en la serif de las landings, para que sea la misma marca. Figtree para todo lo demás y monoespaciada para números de campo y A-Number. Nada de rótulos en mayúsculas espaciadas.
- **Los paneles parecen ventanas del producto:** una barra superior fina con "Casepace — Rivas, María · I-589", radio de 8 px y una sombra muy suave.

## 3. La idea de cada sección: de lo que entra a lo que sale

Como la página de OpenAI sobre Intelligent UI, cada sección muestra una transformación: a un lado lo que llega crudo, al otro lo que el producto arma. Lo que los une es el **origen**. Cuando un dato aparece del lado del estudio, en el mismo instante se marca en citrón la parte de la foto o la frase del cliente de donde salió. Eso es lo que tiene que quedar en la cabeza: nada se inventa, todo tiene de dónde salió.

Cada sección corre sola, en bucle, mientras está en pantalla, con su propio tiempo (ya no hay un reloj compartido). Con el mouse encima, se pausa. Con movimiento reducido, se ve el estado final quieto.

### Sección 1 · Documents

**Texto:**
> **The client uploads from a phone**
> A photo of each document is enough. Casepace reads them and fills every field they support, with the source next to each value.

**Panel, de izquierda a derecha:**
1. **Un teléfono** dibujado con CSS: marco redondeado, sin muesca. Es la vista del cliente, en español: arriba "Tus documentos" y un botón "Sacar una foto". Los documentos se suben de a uno: aparece la foto, una barra de "Subiendo…" de menos de un segundo y queda "Listo".
2. **La vista del estudio:** cada documento que termina de subir entra en la lista con su foto en miniatura. Una línea de lectura recorre la foto (1,2 s) y la etiqueta pasa de "Reading" a "Done".
3. **Los campos extraídos:** se completan de a uno, con su etiqueta de origen. Mientras tanto, en la miniatura se marca en citrón la zona de donde sale cada dato.

**Documentos, en este orden:** Passport, Marriage certificate, Birth certificate (Santiago), Birth certificate (Valentina), I-94 arrival record. Te paso las cinco fotos aparte; hasta entonces dejá los recuadros grises.

**Tiempo:** unos 2,5 s por documento, 4 s quieto al final y vuelve a empezar.

### Sección 2 · Interview

Esta tiene que ir **más despacio**: es la que se lee.

**Texto:**
> **The interview, in the client's language**
> On their own time, across as many sittings as they need. Casepace asks for the detail the form requires and writes the declaration in English for your team.

**Panel:**
- **A la izquierda, el teléfono del cliente con el chat.** Los mensajes de Casepace a un lado, los de María al otro, como una aplicación de mensajes. Antes de cada mensaje, tres puntos de "escribiendo" durante 0,7 s. La traducción al inglés aparece debajo de cada mensaje 0,4 s después, más chica y en gris.
- **A la derecha, la vista del estudio:**
  - arriba, las casillas de la Parte B (Political opinion, Membership in a particular social group, Torture Convention) que se tildan cuando corresponde;
  - debajo, la declaración en inglés que se va escribiendo frase por frase.

**Turnos:** solo estos 15 de los 34, en este orden: 3, 4, 7, 8, 9, 10, 11, 12, 13, 17, 18, 19, 28, 29 y 32.

**Tiempo de lectura de cada mensaje:** 45 ms por carácter, con un mínimo de 1,8 s y un máximo de 4,5 s. La vuelta completa dura unos 40 s, queda 5 s quieta y vuelve a empezar.

**La declaración se arma así.** Cuando entra el turno, aparece la frase y la frase del cliente de donde salió se subraya en citrón. El texto va tal cual:

| Turno | Lo que se suma a la vista del estudio |
|---|---|
| 7 | "In February 2019, the hospital ran out of basic supplies. Together with fourteen other nurses, we organized a protest in front of the hospital entrance. I was one of those who spoke to the press." |
| 8 | Se tilda **Political opinion**. |
| 11 | "On March 11, 2019, four plainclothes men detained me as I left the night shift. They did not show a warrant." |
| 13 | "They took me to a SEBIN facility on Avenida 15. I was held for four days in a windowless room." |
| 18 | "They beat me on the ribs and the soles of my feet." |
| 19 | Se tilda **Torture Convention**. |
| 29 | Debajo, con el título "Fear of return": "I fear that if I return, they will detain me at the airport and this time not release me." |
| 32 | Se tilda **Membership in a particular social group** y aparece "Part B complete" en una etiqueta chica. |

### Sección 3 · Filing package

**Texto:**
> **Your team gets the filing package**
> The official form, current edition, filled and checked, with continuation sheets where the account runs long. Every blank is marked N/A, and every answer shows where it came from.

**Panel:** las páginas 1 a 7 del I-589 del caso, que te adjunto como imágenes (`i589_pagina_1.png` a `i589_pagina_7.png`, 1275 × 1650).
- Entran de a una, apiladas, cada una un poco corrida respecto de la anterior, como hojas sobre una mesa.
- En cada página, un acercamiento lento a una zona completada, con el resaltador citrón pasando sobre dos o tres valores:
  - página 1: el nombre y el A-Number;
  - página 5: las tres casillas de la Parte B y el comienzo de la declaración.
- Al costado, los contadores suben hasta estos valores, que son los reales del PDF nuevo:
  - **17** pages (12 of the form, 5 continuation);
  - **202** answers;
  - **53** checkboxes;
  - **109** blanks marked N/A.

**Tiempo:** unos 1,6 s por página, 4 s quieto al final y vuelve a empezar.

Debajo del panel queda el formulario de correo y la descarga, sin animación.

**Cambiá el PDF de la descarga por el nuevo** (`caso_muestra_i589_en.pdf`). El de ahora tiene la declaración en español dentro del formulario en inglés y el texto cortado al final del recuadro: un abogado lo nota en la primera página.

## Lo que no cambia

- La barra de arriba y las landings.
- El formulario de contacto y su guardado.
- `?from=` y `?stage=`.
- El modo oscuro: la franja de Interview ya es oscura; en modo oscuro, Documents y Filing package usan el gris más oscuro de la marca.
