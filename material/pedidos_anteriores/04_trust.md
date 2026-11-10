Página nueva: `/trust`. Enlace en el menú y en el pie.

**Referencia:** juro.com/trust. Arriba, un título y una línea. Debajo, filtros
por tema (All, Security, Privacy, AI) y una grilla de tarjetas. Cada tarjeta
tiene su tema, un título, dos líneas y el tiempo de lectura, y abre una página
con el artículo completo. Al final, un correo para reportar problemas de
seguridad.

**Texto de la cabecera:**

## Trust at Casepace

Your clients' files are some of the most sensitive documents a person has.
Here is how we handle them.

**Tarjetas** (el título y la bajada van tal cual; los artículos completos te
los paso de a uno):

| Tema | Título | Bajada |
|---|---|---|
| Security | How we protect client data | Encryption, access by role, and where the data is stored. |
| Security | Report a vulnerability | How to reach us, and what we do when you write. |
| Privacy | What data we process | The data in a case, who can see it, and why we need it. |
| Privacy | Retention and deletion | How long a case is kept and how a firm deletes it. |
| Privacy | Subprocessors | Every company that processes data on our behalf, and for what. |
| AI | How we use AI | The models we use, what they see, and what they never decide. |
| AI | Your data and model training | Why your clients' files are never used to train a model. |

**Pie de la página:** "Security questions: security@[dominio]".

---

**Antes de publicar** (esto no va en la página):

Cada artículo tiene que describir lo que ya existe. Hoy faltan cosas que la
página daría por hechas, anotadas en `docs/VULNERABILIDADES.md`:
- **Claves:** rotar las claves expuestas (S-01).
- **Acceso al chat:** la identidad la toma del navegador (H-01).
- **Archivos privados:** los PDF y los documentos todavía son públicos (H-02 y S-04).
- **HTTPS:** el sitio de la aplicación todavía no lo tiene (H-14).
- **Datos a terceros:** las conversaciones se envían a LangSmith (S-03). O se
  apaga, o va en la lista de subprocesadores.

Lo que conviene sumar después:
- **SOC 2 Type I**, la primera certificación que piden los estudios grandes. Se
  hace con una plataforma como Vanta o Drata y una auditoría; lleva unos meses.
- Mientras tanto, la página no menciona certificaciones.
