import { ArrowDown } from "lucide-react";
import { coverPhoto } from "@/assets/images";
import { buttonClass } from "@/components/ui/button";
import { HashLink } from "@/components/site/HashLink";
import { shared, type LandingContent } from "@/content/landings";
import { ANCHORS, nav, WALKTHROUGH_HREF } from "@/content/site";

/**
 * El inicio. Arriba, apenas debajo de la barra, una franja con la foto del
 * I-589: lo que el estudio recibe. Debajo, sobre el negro de la marca, el
 * título y los dos llamados.
 *
 * La franja recorta la foto por el borde superior de la hoja, que en el
 * archivo es transparente: así el papel entra en diagonal desde la derecha y
 * se apoya sobre el negro, sin un corte recto a la vista.
 */
export function Hero({ content }: { content: LandingContent["hero"] }) {
  return (
    <section className="on-dark">
      <div className="h-[196px] w-full overflow-hidden sm:h-[clamp(200px,23vw,364px)]">
        {/* En pantallas chicas la foto se acerca, para que el formulario se lea. */}
        <img
          src={coverPhoto.large}
          srcSet={`${coverPhoto.small} 1200w, ${coverPhoto.large} 2400w`}
          sizes="(min-width: 640px) 100vw, 230vw"
          alt={shared.hero.photoAlt}
          width={coverPhoto.width}
          height={coverPhoto.height}
          {...{ fetchpriority: "high" }}
          className="ml-[-85%] h-full w-[230%] max-w-none animate-hero-in select-none object-cover sm:ml-0 sm:w-full"
          style={{ objectPosition: "50% 38%" }}
        />
      </div>
      <div className="wrap pb-16 pt-12 sm:pt-14 xl:pb-24 xl:pt-16">
        <div className="max-w-[48rem]">
          <p className="animate-hero-in pb-0.5 font-serif text-[19px] italic leading-[1.3] text-paper/70 sm:text-[21px]">
            {content.label}
          </p>
          <h1 className="mt-4 animate-hero-in font-serif text-[clamp(1.7rem,7.5vw,3.75rem)] font-normal leading-[1.05] tracking-[-0.02em] xl:text-[clamp(3.25rem,4.4vw,3.6875rem)]">
            {content.title.map((line) => (
              <span key={line} className="block">
                {line}{" "}
              </span>
            ))}
          </h1>
        </div>
        <div className="mt-8 grid gap-x-12 gap-y-8 lg:grid-cols-12 xl:mt-10">
          <p
            className="max-w-[33rem] animate-hero-in text-[18px] leading-[1.55] text-paper/80 lg:col-span-6 xl:text-[19px]"
            style={{ animationDelay: "70ms" }}
          >
            {content.text}
          </p>
          <div className="animate-hero-in lg:col-span-5 lg:col-start-8" style={{ animationDelay: "140ms" }}>
            <div className="flex flex-wrap gap-3">
              <HashLink to={`#${ANCHORS.demo}`} className={buttonClass({ variant: "paper" })}>
                {shared.hero.seeCase}
                <ArrowDown size={17} strokeWidth={2} />
              </HashLink>
              <a href={WALKTHROUGH_HREF} className={buttonClass({ variant: "ghostDark" })}>
                {nav.walkthrough}
              </a>
            </div>
            <p className="mt-6 max-w-[27rem] text-[14.5px] leading-[1.5] text-ink-muted">{content.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
