# Sitio de Casepace: instrucciones

Vas a construir y terminar de diseñar el sitio de Casepace en este proyecto,
empezando por el inicio. Hoy el sitio vive en Lovable
(`https://brief-to-buildmap.lovable.app/for-firms`); este proyecto es aparte y
después lo vamos a mergear a Lovable. Trabajá con autonomía hasta terminarlo.

## Qué es Casepace y quién mira el sitio

Casepace es software para estudios de inmigración y organizaciones de ayuda
legal de Estados Unidos.
1. El estudio le manda un enlace a su cliente.
2. El cliente, desde el teléfono y en su idioma, sube sus documentos y
   responde una entrevista.
3. El equipo del estudio recibe en inglés:
   - el formulario de USCIS completo, con hojas de continuación;
   - el relato redactado;
   - de dónde salió cada dato.
4. El equipo lo revisa, lo corrige y lo firma. Casepace prepara; el abogado o
   el representante acreditado decide.

Quien mira el sitio es un abogado, un paralegal o el director de una
organización. Lee en inglés, tiene poco tiempo y desconfía de la IA. Lo primero
que se pregunta es si esto inventa datos y qué pasa con la información de sus
clientes. El sitio tiene que transmitir que somos una empresa seria y
consolidada, y que el producto es preciso.

## Qué hay que construir

1. **Las dos landings,** `/for-firms` y `/for-organizations`, con el mismo
   diseño y textos distintos. `/` redirige a `/for-firms`.
   - **El inicio.** En la primera pantalla, en cinco segundos, se entiende qué
     es, para quién es y qué recibe el estudio. Lleva un elemento vivo del
     producto en lugar de una imagen decorativa, y dos llamados: ver el caso de
     muestra y pedir una reunión.
   - **El resto, ordenado como un relato que avanza:** el problema, cómo
     funciona (el caso de muestra en tres pasos animados), qué recibe el
     estudio, lo que dijo el cliente y lo que va al formulario, para quién es,
     cómo usamos la IA, quiénes somos, preguntas y cierre. Decidí el orden y qué
     se une. Menos secciones mejor resueltas es preferible a muchas.
2. **El caso de muestra animado,** con sus tres pasos: Documents, Interview y
   Filing package.
   - El comportamiento está en `material/pedidos_anteriores/07_demo_rapido_y_entrega.md`,
     que es la versión vigente.
   - La 06 tiene el contexto de la marca y de la "transformación" de lo que
     entra a lo que sale.
   - Dos correcciones que ya se aplicaron después de la 07:
     - del lado del estudio, los valores van en inglés ("Married",
       "Humanitarian parole", "Venezuelan");
     - en Filing package, el abanico de páginas entra entero en su panel, sin
       tocar los bordes.
   - Los datos del caso están en `material/textos/*.json`: documentos, campos y
     el guion de la entrevista con sus 34 turnos.
   - Las fotos están en `material/imagenes/`.
3. **La página `/trust`.**
4. **El pie legal** en todas las páginas.
5. **El formulario de descarga del PDF.** Que guarde con una función aislada
   (`guardarContacto`), que por ahora no hace nada: en Lovable se conecta a
   Supabase. Que abra `material/caso_muestra_i589_en.pdf`.

## Tecnología

- **El stack de Lovable,** para que después se pueda mergear sin traducir nada:
  - Vite, React, TypeScript y Tailwind;
  - componentes de shadcn/ui si te sirven;
  - React Router.
- **Organización:** los textos en `src/content/`, separados de los componentes.
  Las imágenes, en `src/assets/` o `public/`.
- **Pruebas:** Vitest para los tiempos de las animaciones y la lógica pura.
- **Sin backend.**

## La marca

- **Colores, medidos del sitio publicado:**
  - negro `#121212`;
  - blanco cálido `#F4F2EE`;
  - citrón `#E4F27A`, el del botón "Book a walkthrough".

  El citrón es el acento y se usa poco: el botón principal y un resaltado
  puntual, nunca de fondo de bloques enteros. Los escenarios del producto van
  sobre un gris cálido muy claro.
- **El logo:** `material/imagenes/casepace_blanco.png` es la versión blanca,
  para fondos oscuros. Si necesitás la versión oscura, invertila.
- **Tipografía:** Newsreader para los títulos y Figtree para el texto, las dos
  de Google Fonts. Una monoespaciada sobria para números de campo e
  identificadores.
- **Referencias:**
  - **juro.com:** cada sección con su texto y, al lado, el producto moviéndose
    solo. También su página `/trust`.
  - **La página de OpenAI sobre Intelligent UI:** cada pieza muestra una
    transformación de lo que entra a lo que sale.
- **Lo que hace que un sitio parezca armado con IA,** y acá no va:
  - fondos crema amarillentos;
  - rótulos en mayúsculas espaciadas sobre cada título. Los rótulos chicos que
    tiene hoy el sitio, como "the problem", decidí si se quedan con otro
    tratamiento o se van;
  - recuadros con una barra de color a la izquierda;
  - tarjetas muy redondeadas con borde de color;
  - íconos genéricos en fila;
  - degradados;
  - emojis;
  - fotos de stock.

Dentro de eso, el diseño lo decidís vos. Quiero criterio y oficio: jerarquía
clara, buen ritmo entre secciones, espacios generosos, movimiento con sentido y
detalles cuidados. Que una persona diga que lo hizo un estudio de diseño.

## Cómo se escribe

El sitio va en inglés. Los textos aprobados están en
`material/textos/landings_aprobadas.md` y no se reescriben. Podés mover, unir o
sacar secciones, pero el texto que queda va tal cual.

Para lo poco que tengas que escribir vos:
- Frases cortas y claras. Nada de signos de exclamación.
- Nada de la fórmula "no es X, es Y", ni de sus variantes.
- Nada de "revolutionary", "AI-powered", "effortless", "transform your
  practice" ni parecidas.
- Ninguna cifra inventada, ningún testimonio, ningún logo de clientes, ninguna
  certificación.
- No hay listas de formularios ni palabras de hoja de ruta ("coming soon",
  "next", "available today"). El I-589 del demo es un ejemplo: el motor sirve
  para cualquier formulario.
- El idioma del cliente no se nombra como límite: el demo está en español como
  ejemplo.
- Si te falta un texto con contenido legal, no lo escribas: dejá un marcador
  visible.

## Lo que hoy es cierto

Esto manda sobre cualquier texto que diga otra cosa.
- **IA:** los modelos de lenguaje son de OpenAI, por su API comercial. Bajo
  esos términos no se usan para entrenar. Todo lo demás es propio:
  - el motor que ubica cada dato en su campo;
  - los controles de fechas y de coherencia;
  - las hojas de continuación;
  - la revisión.

  Anthropic o Claude no se nombran.
- **Seguridad que ya existe:**
  - la identidad sale de la sesión del servidor;
  - los formularios generados se guardan en un lugar privado y solo se
    descargan con sesión;
  - cada cuenta tiene su historial separado;
  - el panel de administración no está en una ruta pública conocida.
- **Lo que todavía no se puede afirmar:**
  - HTTPS en la aplicación;
  - respaldos fuera del servidor;
  - cualquier certificación;
  - que la subida de documentos ya esté en el producto.

## Textos nuevos que van tal cual

**Who we are.** Lo que está entre corchetes se muestra como marcador visible,
porque lo completamos nosotros. Las fotos están en
`material/imagenes/fundadores/`: usalas con el mismo tamaño y el mismo
tratamiento, o dejá el lugar listo si no sirven.

> Casepace is built by Human Migrate LLC. We work on one problem: the hours a legal team spends turning a client's story and documents into a complete, accurate immigration form.
>
> Our team combines immigration practice with software engineering. Every rule in the product, from how a date is written to when a field reads "N/A", comes from the form instructions and from how attorneys review a filing.
>
> **[Ignacio Pérez Maraggi]** — Co-founder. [Lawyer admitted in Argentina. Leads legal operations and the form content: what each question asks and how the answers must be written.]
>
> **[Francisco De Castro]** — Co-founder. [Software engineer. Leads the platform: the form engine, the integrations and the security of client data.]

**How we use AI:**

> **AI-native, with our own engine**
>
> Casepace was designed around AI from the first line of code. The language models come from OpenAI, used through its commercial API. Under those terms, your data is not used to train their models. Everything around the models is ours.
>
> **The form engine.** Each answer is mapped to its exact field, checkbox and continuation sheet by rules we wrote from the form instructions. The model never decides where a value goes.
>
> **The checks.** Dates, names, and the consistency between documents and the interview are verified before anything reaches the form. If something does not match, your team sees it.
>
> **Your review.** Nothing is filed without a person on your team reading and approving it. Casepace prepares; your attorney or accredited representative decides.

**`/trust`.** Como la de Juro: un título, una línea, filtros por tema (All,
Security, Privacy, AI) y tarjetas que abren un artículo.

> **Trust at Casepace**
> Your clients' files are some of the most sensitive documents a person has. Here is how we handle them.

Las tarjetas son estas siete:
- How we protect client data;
- Report a vulnerability;
- What data we process;
- Retention and deletion;
- Subprocessors;
- How we use AI;
- Your data and model training.

Cada artículo se escribe solo con lo que figura en "Lo que hoy es cierto". Lo
que no se puede afirmar queda como marcador visible.

**El pie, en todas las páginas.** Va con columnas Product, Company y Legal, y
cierra así:

> Casepace™ is a trademark of Human Migrate LLC. © {año actual} Human Migrate LLC. All rights reserved.
> 5442 Ventura Blvd., Ste 201-1625, Sherman Oaks, CA 91403, United States
> Casepace prepares immigration forms. It is not a law firm and does not provide legal advice.
> Sample case figures come from a fictional applicant. No real client file is used in any demonstration.

## Cómo trabajar

1. **Leé todo `material/`** antes de empezar.
2. **Escribí el plan en `docs/PLAN.md`:**
   - la dirección visual, en dos o tres párrafos, con el porqué;
   - el orden de las secciones;
   - qué unís y qué sacás.

   No esperes aprobación: seguí con la construcción.
3. **Commits chicos,** con mensajes en español. No hay remoto: no hagas push.
4. **Verificá con la vista previa del navegador antes de dar algo por
   terminado:**
   - en 1440, 1280 y 375 px;
   - con `prefers-reduced-motion`;
   - que se pueda navegar con el teclado y se vea el foco;
   - sin errores en la consola;
   - que el build y las pruebas pasen;
   - que nada salte de lugar mientras carga y que las animaciones se pausen
     fuera de pantalla.
5. **Al terminar, dejá:**
   - capturas de cada sección en escritorio y en teléfono, en `docs/capturas/`;
   - en `docs/ENTREGA.md`:
     - cómo correrlo;
     - los marcadores que quedan para completar;
     - las decisiones que tomaste vos y conviene revisar;
     - cómo se mergea a Lovable (qué archivos y qué componentes).

## Terminado es

- Las dos landings, con el inicio resuelto y las secciones nuevas.
- El caso de muestra animado.
- `/trust` y el pie legal en todas las páginas.
- Todo coherente con la marca y verificado como dice el punto 4.
