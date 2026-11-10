/**
 * Paso 1 del caso de muestra: el cliente saca una foto de cada documento y el
 * equipo ve los campos que ese documento respalda.
 *
 * Tiempos de material/pedidos_anteriores/07_demo_rapido_y_entrega.md.
 */
export const DOCS_TIMING = {
  /** Lo que tarda cada documento en el teléfono. */
  perDocument: 1100,
  /** El visor de la cámara muestra la foto. */
  camera: 450,
  /** Destello blanco. */
  flash: 120,
  /** La foto ya está en la lista, con "Uploading". */
  uploading: 280,
  /** Entre el "Done" del teléfono y la entrada en la lista del equipo. */
  teamDelay: 150,
  /** Fundido de las filas al cambiar de documento. */
  swap: 200,
  /** Entre un campo y el siguiente. */
  field: 80,
  /** Lo que dura el resaltador sobre un valor. */
  highlight: 250,
  /** Quieto al final, antes de volver a empezar. */
  hold: 2000,
} as const;

export type DocEvent =
  | { at: number; doc: number; kind: "camera" | "flash" | "uploading" | "done" | "listed" | "read" }
  | { at: number; doc: number; kind: "field"; field: number };

export type DocsTimeline = {
  events: DocEvent[];
  marks: number[];
  /** La vuelta arranca con el primer documento subido y sus campos a medio completar. */
  loopStart: number;
  end: number;
};

export function documentsTimeline(fieldCounts: readonly number[]): DocsTimeline {
  const T = DOCS_TIMING;
  const events: DocEvent[] = [];

  fieldCounts.forEach((count, doc) => {
    const cameraAt = doc * T.perDocument;
    const flashAt = cameraAt + T.camera;
    const uploadingAt = flashAt + T.flash;
    const doneAt = uploadingAt + T.uploading;
    const listedAt = doneAt + T.teamDelay;
    const firstFieldAt = listedAt + T.swap;

    events.push(
      { at: cameraAt, doc, kind: "camera" },
      { at: flashAt, doc, kind: "flash" },
      { at: uploadingAt, doc, kind: "uploading" },
      { at: doneAt, doc, kind: "done" },
      { at: listedAt, doc, kind: "listed" },
    );
    for (let field = 0; field < count; field += 1) {
      events.push({ at: firstFieldAt + field * T.field, doc, kind: "field", field });
    }
    events.push({ at: firstFieldAt + (count - 1) * T.field + T.highlight, doc, kind: "read" });
  });

  events.sort((a, b) => a.at - b.at);

  const halfway = Math.min(2, Math.max(0, (fieldCounts[0] ?? 1) - 1));
  const loopStart = events.find((e) => e.kind === "field" && e.doc === 0 && e.field === halfway)?.at ?? 0;
  const last = events[events.length - 1]?.at ?? 0;

  return { events, marks: events.map((e) => e.at), loopStart, end: last + T.hold };
}

export type DocsState = {
  /** Documento que está en el visor de la cámara, si hay alguno. */
  camera: number | null;
  /** Cuántos destellos hubo: sirve de clave para repetir la animación. */
  flashes: number;
  /** Estado de cada documento en la lista del teléfono. */
  phone: ("uploading" | "done")[];
  /** Estado de cada documento en la lista del equipo. */
  team: ("reading" | "done")[];
  /** Documento cuyos campos se están mostrando. */
  active: number | null;
  /** Cuántos campos de ese documento ya se completaron. */
  filled: number;
};

/** El estado visible después de los primeros `step` eventos. */
export function documentsState(events: readonly DocEvent[], step: number): DocsState {
  const state: DocsState = { camera: null, flashes: 0, phone: [], team: [], active: null, filled: 0 };
  for (const event of events.slice(0, step)) {
    switch (event.kind) {
      case "camera":
        state.camera = event.doc;
        break;
      case "flash":
        state.flashes += 1;
        break;
      case "uploading":
        state.camera = null;
        state.phone[event.doc] = "uploading";
        break;
      case "done":
        state.phone[event.doc] = "done";
        break;
      case "listed":
        state.team[event.doc] = "reading";
        state.active = event.doc;
        state.filled = 0;
        break;
      case "field":
        if (state.active === event.doc) state.filled = event.field + 1;
        break;
      case "read":
        state.team[event.doc] = "done";
        break;
    }
  }
  return state;
}
