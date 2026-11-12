import { Outlet } from "react-router-dom";
import { ColorSwitch } from "./ColorSwitch";
import { Footer } from "./Footer";
import { Nav } from "./Nav";
import { ScrollManager } from "./ScrollManager";

/**
 * Capas del sitio (z-index): contenido 0 · piezas dentro de un escenario 10 a 30 ·
 * barra superior 40 · enlace para saltar al contenido 50.
 */
export function Layout() {
  return (
    <>
      <ScrollManager />
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      {/* Herramienta de trabajo: el build la deja afuera. */}
      {import.meta.env.DEV && <ColorSwitch />}
    </>
  );
}
