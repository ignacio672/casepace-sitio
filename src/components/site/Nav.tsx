import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/casepace-blanco.png";
import { buttonClass } from "@/components/ui/button";
import { ANCHORS, nav, ROUTES, WALKTHROUGH_HREF } from "@/content/site";
import { useAudience } from "@/hooks/useAudience";
import { cn } from "@/lib/utils";
import { HashLink } from "./HashLink";

const linkClass = "rounded-[6px] text-[15px] text-paper/75 transition-colors duration-200 hover:text-paper";

function AudienceSwitch({ className }: { className?: string }) {
  const item = ({ isActive }: { isActive: boolean }) =>
    cn(
      "rounded-[7px] px-3 py-1.5 text-[14px] transition-colors duration-200",
      isActive ? "bg-paper text-ink" : "text-paper/75 hover:text-paper",
    );
  return (
    <div className={cn("flex items-center rounded-control border border-ink-line p-[3px]", className)}>
      <NavLink to={ROUTES.firms} className={item}>
        {nav.forFirms}
      </NavLink>
      <NavLink to={ROUTES.organizations} className={item}>
        {nav.forOrganizations}
      </NavLink>
    </div>
  );
}

/**
 * Barra superior. Siempre sobre el negro de la marca: el logo es la versión
 * blanca y el botón citrón queda a la vista en todo el sitio.
 */
export function Nav() {
  const audience = useAudience();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const base = ROUTES[audience];

  // El menú del teléfono se cierra al navegar y con Escape.
  useEffect(() => setOpen(false), [location.pathname, location.hash]);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = (
    <>
      <HashLink to={`${base}#${ANCHORS.who}`} className={linkClass}>
        {nav.whoItsFor}
      </HashLink>
      <HashLink to={`${base}#${ANCHORS.demo}`} className={linkClass}>
        {nav.seeTheDemo}
      </HashLink>
      <Link to="/trust" className={linkClass}>
        {nav.trust}
      </Link>
    </>
  );

  return (
    <header className="on-dark sticky top-0 z-40 border-b border-ink-line">
      <a
        href="#main"
        className="absolute left-4 top-3 z-50 -translate-y-20 rounded-control bg-paper px-4 py-2 text-[14.5px] font-medium text-ink focus:translate-y-0"
      >
        {nav.skip}
      </a>
      <div className="wrap flex h-16 items-center gap-4">
        <Link to={base} className="-ml-1 shrink-0 rounded-[6px] p-1" aria-label="Casepace">
          <img src={logo} alt="" width={78} height={30} className="h-[30px] w-[78px]" />
        </Link>
        <nav aria-label="Main" className="ml-7 hidden items-center gap-7 lg:flex">
          {links}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <AudienceSwitch className="hidden md:flex" />
          <a href={WALKTHROUGH_HREF} className={buttonClass({ variant: "citron", size: "sm" })}>
            {nav.walkthrough}
          </a>
          <button
            type="button"
            className="-mr-2 grid h-10 w-10 place-items-center rounded-control text-paper lg:hidden"
            aria-expanded={open}
            aria-controls="menu"
            aria-label={open ? nav.close : nav.menu}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
          </button>
        </div>
      </div>
      {open && (
        <div id="menu" className="animate-fade-in border-t border-ink-line lg:hidden">
          <nav aria-label="Main" className="wrap flex flex-col gap-1 py-5 [&>a]:py-2 [&>a]:text-[17px]">
            {links}
          </nav>
          <div className="wrap pb-6 md:hidden">
            <AudienceSwitch className="w-fit" />
          </div>
        </div>
      )}
    </header>
  );
}
