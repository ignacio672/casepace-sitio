Tercera vuelta de `/demo`. Lo vi publicado y hay que corregir cuatro cosas:
- todo va muy lento y tiene demasiadas cosas;
- el teléfono está en español;
- el paquete final se ve recortado;
- al diseño le falta decisión.

Cambiá lo que sigue y no toques el resto.

## 0. Qué tiene que entender quien mira

Casepace es software para estudios de inmigración. El estudio le manda un enlace a su cliente. El cliente, desde el teléfono, sube sus documentos y hace la entrevista en su idioma. El equipo del estudio recibe todo armado en inglés y lo revisa.

Cada sección muestra **los dos lados**:
- arriba del teléfono, en gris y chico: **"Client's phone"**;
- arriba de la ventana del producto: **"Your team's view"**.

## 1. Velocidad: tres veces más rápido, sin esperas

- **Transiciones:** entre 180 y 250 ms, con ease-out. Nada de fundidos de más de 300 ms ni de acercamientos lentos.
- **Nunca un panel vacío.** Cuando la sección entra en pantalla, ya hay algo pasando: el primer documento subido y sus campos a medio completar. Fuera las listas largas de campos con "—".
- **Tiempos por vuelta:**
  - Documents, unos 6 s;
  - Interview, unos 14 s;
  - Filing package pasa una sola vez, en 1,5 s (ver abajo).
- **Pausa:** la pausa con el mouse encima se queda.

## 2. El teléfono en inglés

En el teléfono va **todo en inglés**:
- "Your documents", "Take a photo", "Uploading", "Done";
- los nombres de los documentos: "Passport", "Marriage certificate", "Birth certificate", "I-94 record".

La conversación de la entrevista sigue en español, con la traducción al inglés debajo de cada mensaje: eso es lo que muestra que el cliente habla en su idioma.

## 3. Documents

**Las fotos.** Te adjunto las cinco, sacadas sobre una mesa como desde un celular y con la marca SAMPLE:
- `pasaporte.jpg`
- `acta_de_matrimonio.jpg`
- `partida_santiago.jpg`
- `partida_valentina.jpg`
- `i94.jpg`

Reemplazan los recuadros grises en todos lados.

**En el teléfono, cada documento tarda unos 1,1 s:**
- el visor de la cámara muestra la foto;
- un destello blanco de 120 ms;
- la foto se achica y queda en la lista con "Done".

**En la vista del estudio:**
- **La lista de documentos.** Cada documento entra con su miniatura real, de 64 × 48 px, 150 ms después del "Done" del teléfono.
- **A la derecha, solo los campos del documento que se está leyendo,** entre 4 y 6 filas. Se completan cada 80 ms, con el resaltador citrón de 250 ms.
- **El origen.** En la miniatura, un recuadro citrón marca de dónde sale el dato.
- **El documento siguiente** reemplaza esas filas con un fundido de 200 ms.
- **Al final,** quieto 2 s y vuelve a empezar.

## 4. Interview

**Turnos.** Solo seis, en este orden: 4, 7, 10, 11, 28 y 29.
- Los tres puntos de "escribiendo" duran 300 ms.
- Cada mensaje queda 30 ms por carácter, con un mínimo de 1,2 s y un máximo de 2,4 s.
- Al final, quieto 3 s y vuelve a empezar.

**Del lado del estudio:**
- **Political opinion** se tilda en el turno 7.
- La declaración suma tres frases, tal cual ya las tenés:
  - en el turno 7, la de la protesta;
  - en el turno 11, la de la detención;
  - en el turno 29, la del miedo a volver, bajo "Fear of return".
- Las otras dos casillas quedan visibles y sin tildar.

## 5. Filing package: una entrega, no una animación

Fuera la pila que hace acercamientos y el ciclo en bucle. Cuando la sección entra en pantalla, pasa esto **una sola vez y en menos de 1,5 s**:
1. **Las páginas llegan.** Las 7 páginas del I-589 entran desde abajo y quedan en abanico, una sobre otra.
   - Cada una tarda 300 ms, con 60 ms entre una y otra.
   - Escaladas para entrar **enteras** en el panel: ni una página recortada. Que se lea que son hojas del formulario, no el texto.
   - Las páginas son opacas: nunca se ven dos superpuestas por transparencia.
2. **Aparece el paquete.** 300 ms después, al lado de la pila, entra deslizándose una tarjeta. Es el momento de la entrega:

> ✓ **Filing package ready**
> Form I-589, current edition · 12 pages
> Continuation sheets · 5 pages
> Part B account, written in English from the interview
> 202 answers · 53 checkboxes · 109 blanks marked N/A
> [Download the sample PDF]

El botón lleva al formulario de correo de abajo, como ahora. Al pasar el mouse sobre una página de la pila, esa página sube 6 px.

## 6. Diseño: más decisión

- **Escenario.** Cada sección en dos columnas:
  - a la izquierda, un 40 %, con el título en la serif a 44 px y el texto a 18 px, de 420 px como máximo;
  - a la derecha, un 60 %, un **escenario**: un fondo gris cálido muy claro con 16 px de radio, que contiene el teléfono y la ventana uno al lado del otro.
- **El teléfono:**
  - 260 × 520 px, marco negro de 10 px y 36 px de radio;
  - una barra de estado mínima y la pantalla blanca;
  - en Interview, la pantalla es oscura.
- **La ventana:**
  - blanca, con borde de 1 px gris cálido, 12 px de radio y la sombra `0 12px 32px rgba(0,0,0,.08)`;
  - barra de 36 px con los tres puntos y "Rivas, María · I-589".
- **Tipografía:**
  - valores en Figtree semibold de 15 px;
  - rótulos de 12 px en gris;
  - números de campo en monoespaciada de 11 px.
- **Interview:**
  - la franja negra sigue;
  - los mensajes de María van en burbujas blancas con texto negro;
  - los de Casepace, en gris oscuro con texto blanco;
  - la traducción, de 12 px en gris claro.
- **En el teléfono** (menos de 640 px): el escenario queda en una columna, primero el teléfono a 220 px de ancho y debajo la ventana.

## Lo que no cambia

- Arriba de la página, los textos y la línea "Sample case…".
- La barra superior y las landings.
- El formulario de correo, la descarga y la nota de las diecisiete páginas.
- `?from=` y `?stage=`.
- Con movimiento reducido, se ve el estado final quieto.
