import { Link } from "react-router-dom";
import { buttonClass } from "@/components/ui/button";
import { notFound, ROUTES } from "@/content/site";
import { useAudience } from "@/hooks/useAudience";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function NotFound() {
  const audience = useAudience();
  useDocumentTitle(`${notFound.title} Casepace`);
  return (
    <div className="wrap py-32 lg:py-44">
      <h1 className="font-serif text-[clamp(2.25rem,1.3rem+3.2vw,4rem)] leading-[1.05] tracking-[-0.02em]">
        {notFound.title}
      </h1>
      <Link to={ROUTES[audience]} className={buttonClass({ variant: "ink", className: "mt-10" })}>
        {notFound.back}
      </Link>
    </div>
  );
}
