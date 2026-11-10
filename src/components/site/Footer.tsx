import { Link } from "react-router-dom";
import logo from "@/assets/casepace-blanco.png";
import { ANCHORS, CONTACT_HREF, footer, ROUTES } from "@/content/site";
import { useAudience } from "@/hooks/useAudience";
import { HashLink } from "./HashLink";

const linkClass = "rounded-[6px] text-paper/75 transition-colors duration-200 hover:text-paper";

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-[14px] text-ink-muted">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-[15.5px]">{children}</ul>
    </div>
  );
}

/** Pie legal de todas las páginas. El año se calcula solo. */
export function Footer() {
  const audience = useAudience();
  const base = ROUTES[audience];
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark border-t border-ink-line">
      <div className="wrap grid gap-x-12 gap-y-12 pb-12 pt-16 md:grid-cols-12 lg:pt-20">
        <div className="md:col-span-4 lg:col-span-5">
          <Link to={base} className="-ml-1 inline-block rounded-[6px] p-1" aria-label="Casepace">
            <img src={logo} alt="" width={104} height={40} className="h-10 w-[104px]" />
          </Link>
        </div>
        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 md:col-span-8 lg:col-span-7"
        >
          <Column title={footer.columns.product}>
            <li>
              <Link to={ROUTES.firms} className={linkClass}>
                {footer.links.forFirms}
              </Link>
            </li>
            <li>
              <Link to={ROUTES.organizations} className={linkClass}>
                {footer.links.forOrganizations}
              </Link>
            </li>
            <li>
              <HashLink to={`${base}#${ANCHORS.demo}`} className={linkClass}>
                {footer.links.demo}
              </HashLink>
            </li>
          </Column>
          <Column title={footer.columns.company}>
            <li>
              <HashLink to={`${base}#${ANCHORS.whoWeAre}`} className={linkClass}>
                {footer.links.whoWeAre}
              </HashLink>
            </li>
            <li>
              <Link to="/trust" className={linkClass}>
                {footer.links.trust}
              </Link>
            </li>
            <li>
              <a href={CONTACT_HREF} className={linkClass}>
                {footer.links.contact}
              </a>
            </li>
          </Column>
          <Column title={footer.columns.legal}>
            <li>
              <Link to="/privacy" className={linkClass}>
                {footer.links.privacy}
              </Link>
            </li>
            <li>
              <Link to="/terms" className={linkClass}>
                {footer.links.terms}
              </Link>
            </li>
          </Column>
        </nav>
      </div>
      <div className="wrap">
        <div className="space-y-1.5 border-t border-ink-line pb-10 pt-7 text-[13.5px] leading-[1.55] text-ink-muted">
          <p>{footer.trademark(year)}</p>
          <p>{footer.address}</p>
          <p className="pt-3">{footer.notLawFirm}</p>
          <p>{footer.sampleCase}</p>
        </div>
      </div>
    </footer>
  );
}
