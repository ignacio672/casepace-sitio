import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Selector del color de acento, para elegirlo mirándolo.
 *
 * Es una herramienta de trabajo, no parte del sitio: solo aparece con
 * `npm run dev` y el build la deja afuera. Cuando el color esté decidido, se
 * escribe en `--acento` (src/index.css) y este archivo se borra.
 *
 * Los cuatro pasan de sobra el contraste con el texto negro encima, que es
 * como se usa el acento: botón principal y resaltador.
 */
const COLORES = [
  { nombre: "Citrón", hex: "#E4F27A", nota: "el de hoy" },
  { nombre: "Mostaza", hex: "#F2C14E", nota: "cálido y serio" },
  { nombre: "Ámbar", hex: "#FFB020", nota: "más presente" },
  { nombre: "Naranja", hex: "#FF7A45", nota: "el más llamativo" },
] as const;

const CLAVE = "casepace:acento";

export function ColorSwitch() {
  const [hex, setHex] = useState<string>(COLORES[0].hex);
  const [abierto, setAbierto] = useState(true);

  useEffect(() => {
    const guardado = sessionStorage.getItem(CLAVE);
    if (guardado) setHex(guardado);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--acento", hex);
    sessionStorage.setItem(CLAVE, hex);
  }, [hex]);

  const elegido = COLORES.find((c) => c.hex === hex);

  return (
    <div className="fixed bottom-4 left-4 z-50 rounded-window border border-line-strong bg-white p-3 text-ink shadow-window">
      <button
        type="button"
        onClick={() => setAbierto((a) => !a)}
        className="flex w-full items-center justify-between gap-6 text-[12px] leading-none text-muted"
      >
        Acento · solo en desarrollo
        <span className="font-mono text-[11px]">{abierto ? "–" : "+"}</span>
      </button>
      {abierto && (
        <>
          <div className="mt-3 flex gap-2">
            {COLORES.map((color) => (
              <button
                key={color.hex}
                type="button"
                onClick={() => setHex(color.hex)}
                title={`${color.nombre} ${color.hex}`}
                className={cn(
                  "h-9 w-9 rounded-[8px] border transition-transform duration-150 hover:scale-105",
                  hex === color.hex ? "border-ink ring-2 ring-ink ring-offset-2" : "border-line-strong",
                )}
                style={{ backgroundColor: color.hex }}
              >
                <span className="sr-only">{color.nombre}</span>
              </button>
            ))}
          </div>
          <p className="mt-3 text-[12.5px] leading-tight">
            {elegido?.nombre} <span className="text-muted">{elegido?.nota}</span>
            <br />
            <span className="font-mono text-[11.5px] text-muted">{hex}</span>
          </p>
        </>
      )}
    </div>
  );
}
