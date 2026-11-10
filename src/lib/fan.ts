/**
 * El abanico de páginas del paso Filing package.
 *
 * Todo se mide en porcentaje de su panel, así el abanico entra entero a
 * cualquier ancho: si las cuentas dan dentro del panel, no hay recorte.
 */
export type FanOptions = {
  /** Cantidad de páginas. */
  pages: number;
  /** Alto del panel dividido por su ancho. */
  boxRatio: number;
  /** Ancho de una página, en % del ancho del panel. */
  pageWidth: number;
  /** Grados entre una página y la siguiente. */
  step: number;
  /** Radio del arco, en % del ancho del panel. Más radio, abanico más plano. */
  radius: number;
};

export type Leaf = {
  /** Centro de la página, en % del ancho y del alto del panel. */
  left: number;
  top: number;
  /** Giro en grados. */
  rotation: number;
};

export type Bounds = { left: number; top: number; right: number; bottom: number };

/** Proporción de una hoja carta: 8,5 x 11 pulgadas. */
export const LETTER = 11 / 8.5;

function raw(options: FanOptions) {
  const { pages, pageWidth, step, radius } = options;
  const pageHeight = pageWidth * LETTER;
  return Array.from({ length: pages }, (_, i) => {
    const rotation = (i - (pages - 1) / 2) * step;
    const a = (rotation * Math.PI) / 180;
    // Centro de la página en unidades de ancho de panel, con el pivote abajo.
    const cx = radius * Math.sin(a);
    const cy = radius * (1 - Math.cos(a));
    const corners = [
      [-pageWidth / 2, -pageHeight / 2],
      [pageWidth / 2, -pageHeight / 2],
      [pageWidth / 2, pageHeight / 2],
      [-pageWidth / 2, pageHeight / 2],
    ].map(([x, y]) => [cx + x * Math.cos(a) - y * Math.sin(a), cy + x * Math.sin(a) + y * Math.cos(a)]);
    return { rotation, cx, cy, corners };
  });
}

/** Posición de cada página, con el abanico centrado en su panel. */
export function fan(options: FanOptions): Leaf[] {
  const leaves = raw(options);
  const xs = leaves.flatMap((l) => l.corners.map((c) => c[0]));
  const ys = leaves.flatMap((l) => l.corners.map((c) => c[1]));
  const boxHeight = 100 * options.boxRatio;
  const dx = 50 - (Math.min(...xs) + Math.max(...xs)) / 2;
  const dy = boxHeight / 2 - (Math.min(...ys) + Math.max(...ys)) / 2;
  return leaves.map((l) => ({
    left: l.cx + dx,
    top: ((l.cy + dy) / boxHeight) * 100,
    rotation: l.rotation,
  }));
}

/** El rectángulo que ocupa el abanico entero, en % del ancho y del alto del panel. */
export function fanBounds(options: FanOptions): Bounds {
  const leaves = raw(options);
  const xs = leaves.flatMap((l) => l.corners.map((c) => c[0]));
  const ys = leaves.flatMap((l) => l.corners.map((c) => c[1]));
  const boxHeight = 100 * options.boxRatio;
  const width = Math.max(...xs) - Math.min(...xs);
  const height = Math.max(...ys) - Math.min(...ys);
  return {
    left: 50 - width / 2,
    right: 50 + width / 2,
    top: ((boxHeight - height) / 2 / boxHeight) * 100,
    bottom: ((boxHeight + height) / 2 / boxHeight) * 100,
  };
}

/** Si el abanico entra en su panel dejando `margin` % libre en cada borde. */
export function fanFits(options: FanOptions, margin: number): boolean {
  const b = fanBounds(options);
  return b.left >= margin && b.top >= margin && b.right <= 100 - margin && b.bottom <= 100 - margin;
}
