import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Al cambiar de página va arriba; si la dirección trae un ancla, va al ancla.
 * Al llegar a una página el salto es inmediato. Dentro de la misma página, el
 * desplazamiento es suave, salvo que la persona haya pedido menos movimiento.
 */
export function ScrollManager() {
  const { key, pathname, hash } = useLocation();
  const last = useRef<{ key: string; pathname: string } | null>(null);

  useEffect(() => {
    if (last.current?.key === key) return;
    const samePage = last.current?.pathname === pathname;
    last.current = { key, pathname };

    if (hash) {
      const element = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (element) {
        element.scrollIntoView({ behavior: samePage ? "auto" : "instant" });
        return;
      }
    }
    if (!samePage) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [key, pathname, hash]);

  return null;
}
