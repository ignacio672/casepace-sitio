import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ROUTES, type Audience } from "@/content/site";

const KEY = "casepace:audience";

function remembered(): Audience {
  try {
    return window.sessionStorage.getItem(KEY) === "organizations" ? "organizations" : "firms";
  } catch {
    return "firms";
  }
}

/**
 * Para quién está armada la página que se ve. En las landings sale de la ruta;
 * en las demás páginas se recuerda la última landing visitada, así "See the
 * demo" vuelve a la que la persona venía leyendo.
 */
export function useAudience(): Audience {
  const { pathname } = useLocation();
  const fromRoute: Audience | null = pathname.startsWith(ROUTES.organizations)
    ? "organizations"
    : pathname.startsWith(ROUTES.firms)
      ? "firms"
      : null;

  useEffect(() => {
    if (!fromRoute) return;
    try {
      window.sessionStorage.setItem(KEY, fromRoute);
    } catch {
      // Sin almacenamiento disponible: se usa la landing de estudios.
    }
  }, [fromRoute]);

  return fromRoute ?? remembered();
}
