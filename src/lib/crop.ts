/**
 * Qué parte de la foto de un documento se muestra en la vista del equipo.
 *
 * La foto entera no deja ver dónde está cada dato, así que se muestra una
 * franja: la más chica que contiene todas las zonas de origen del documento y
 * tiene la proporción pedida. Todo va en porcentaje de la foto.
 */
export type Box = { x: number; y: number; w: number; h: number };

type Options = {
  /** Ancho dividido por alto de la franja en pantalla. */
  aspect: number;
  /** Ancho dividido por alto de la foto. */
  photoAspect?: number;
  /** Aire alrededor de las zonas, en % de la foto. */
  pad?: number;
  /** Ancho mínimo del recorte, para no ampliar la foto más allá de su resolución. */
  minWidth?: number;
};

export function cropAround(boxes: readonly Box[], { aspect, photoAspect = 4 / 3, pad = 2, minWidth = 60 }: Options): Box {
  const left = Math.min(...boxes.map((b) => b.x)) - pad;
  const top = Math.min(...boxes.map((b) => b.y)) - pad;
  const right = Math.max(...boxes.map((b) => b.x + b.w)) + pad;
  const bottom = Math.max(...boxes.map((b) => b.y + b.h)) + pad;

  // En unidades de %, el recorte tiene que ser `ratio` veces más ancho que alto.
  const ratio = aspect / photoAspect;
  let w = Math.max(right - left, (bottom - top) * ratio, minWidth);
  w = Math.min(w, 100, 100 * ratio);
  const h = w / ratio;

  const center = (from: number, to: number, size: number) =>
    Math.min(100 - size, Math.max(0, (from + to) / 2 - size / 2));

  return { x: center(left, right, w), y: center(top, bottom, h), w, h };
}

/** Si el recorte contiene entera cada zona. */
export function cropContains(crop: Box, boxes: readonly Box[]): boolean {
  return boxes.every(
    (b) => b.x >= crop.x && b.y >= crop.y && b.x + b.w <= crop.x + crop.w && b.y + b.h <= crop.y + crop.h,
  );
}
