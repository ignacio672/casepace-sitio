import { forwardRef } from "react";
import { Link, useLocation, type LinkProps } from "react-router-dom";

/**
 * Enlace a un ancla, en esta página o en otra. React Router no vuelve a
 * desplazar la página si el ancla ya es la actual; este enlace sí.
 */
export const HashLink = forwardRef<HTMLAnchorElement, LinkProps>(function HashLink({ to, onClick, ...props }, ref) {
  const location = useLocation();
  return (
    <Link
      ref={ref}
      to={to}
      onClick={(event) => {
        onClick?.(event);
        const target = typeof to === "string" ? to : `${to.pathname ?? ""}${to.hash ?? ""}`;
        const [path, hash] = target.split("#");
        const samePage = !path || path === location.pathname;
        if (samePage && hash && `#${hash}` === location.hash) {
          document.getElementById(hash)?.scrollIntoView();
        }
      }}
      {...props}
    />
  );
});
