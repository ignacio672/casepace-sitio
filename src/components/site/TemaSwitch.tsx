import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Selector de tema, para elegir los colores mirándolos.
 *
 * Es una herramienta de trabajo, no parte del sitio: solo aparece con
 * `npm run dev` y el build la deja afuera. Cuando el tema esté decidido, sus
 * valores pasan a `:root` en src/index.css y este archivo se borra, junto con
 * los bloques `[data-tema]` de ese archivo.
 */
const TEMAS = [
  { id: "", nombre: "Casepace", nota: "negro y citrón", muestra: ["#121212", "#F4F2EE", "#E4F27A"] },
  { id: "mostaza", nombre: "Mostaza", nota: "la base con acento cálido", muestra: ["#121212", "#F4F2EE", "#F2C14E"] },
  {
    id: "celestial-sobrio",
    nombre: "Celestial sobrio",
    nota: "ámbar y oliva de la paleta",
    muestra: ["#121212", "#807D52", "#FFBD24"],
  },
  {
    id: "celestial",
    nombre: "Celestial",
    nota: "la paleta entera, azul de fondo",
    muestra: ["#2323FF", "#807D52", "#FFF224"],
  },
] as const;

const CLAVE = "casepace:tema";

export function TemaSwitch() {
  const [tema, setTema] = useState<string>("");
  const [abierto, setAbierto] = useState(true);

  useEffect(() => {
    setTema(sessionStorage.getItem(CLAVE) ?? "");
  }, []);

  useEffect(() => {
    if (tema) document.documentElement.setAttribute("data-tema", tema);
    else document.documentElement.removeAttribute("data-tema");
    sessionStorage.setItem(CLAVE, tema);
  }, [tema]);

  return (
    <div className="fixed bottom-4 left-4 z-50 w-[232px] rounded-window border border-line-strong bg-white p-3 text-ink shadow-window">
      <button
        type="button"
        onClick={() => setAbierto((a) => !a)}
        className="flex w-full items-center justify-between gap-4 text-[12px] leading-none text-muted"
      >
        Tema · solo en desarrollo
        <span className="font-mono text-[11px]">{abierto ? "–" : "+"}</span>
      </button>
      {abierto && (
        <ul className="mt-3 space-y-1.5">
          {TEMAS.map((t) => (
            <li key={t.id}>
              <button
                type="button"
                onClick={() => setTema(t.id)}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-[8px] border p-2 text-left transition-colors duration-150",
                  tema === t.id ? "border-ink bg-paper" : "border-transparent hover:bg-paper",
                )}
              >
                <span className="flex shrink-0 overflow-hidden rounded-[5px] border border-line-strong">
                  {t.muestra.map((c) => (
                    <span key={c} className="block h-6 w-[18px]" style={{ backgroundColor: c }} />
                  ))}
                </span>
                <span className="min-w-0">
                  <span className="block text-[13px] font-medium leading-tight">{t.nombre}</span>
                  <span className="block truncate text-[11.5px] leading-tight text-muted">{t.nota}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
