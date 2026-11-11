import { ArrowDown } from "lucide-react";
import { coverPhoto } from "@/assets/images";
import { buttonClass } from "@/components/ui/button";
import { HashLink } from "@/components/site/HashLink";
import { shared, type LandingContent } from "@/content/landings";
import { ANCHORS, nav, WALKTHROUGH_HREF } from "@/content/site";

/**
 * El inicio. El texto arriba a la izquierda y, entrando desde abajo a la
 * derecha, la foto del I-589: lo que recibe el estudio. La foto va recortada
 * con transparencia para apoyar sobre el negro de la marca.
 */
export function Hero({ content }: { content: LandingContent["hero"] }) {
  return (
    <section className="on-dark relative overflow-hidden">
      <div className="wrap relative z-10 pb-10 pt-12 sm:pt-14 xl:min-h-[max(680px,min(836px,calc(100dvh-64px)))] xl:pb-0 xl:pt-[68px]">
        <div className="xl:max-w-[44rem]">
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
          <p
            className="mt-7 max-w-[31rem] animate-hero-in text-[18px] leading-[1.55] text-paper/80"
            style={{ animationDelay: "70ms" }}
          >
            {content.text}
          </p>
          <div className="mt-8 flex animate-hero-in flex-wrap gap-3" style={{ animationDelay: "140ms" }}>
            <HashLink to={`#${ANCHORS.demo}`} className={buttonClass({ variant: "paper" })}>
              {shared.hero.seeCase}
              <ArrowDown size={17} strokeWidth={2} />
            </HashLink>
            <a href={WALKTHROUGH_HREF} className={buttonClass({ variant: "ghostDark" })}>
              {nav.walkthrough}
            </a>
          </div>
          <p
            className="mt-7 max-w-[25rem] animate-hero-in text-[14.5px] leading-[1.5] text-ink-muted"
            style={{ animationDelay: "210ms" }}
          >
            {content.note}
          </p>
        </div>
      </div>
      <img
        src={coverPhoto.large}
        srcSet={`${coverPhoto.small} 1200w, ${coverPhoto.large} 2400w`}
        sizes="(min-width: 1280px) 122vw, 150vw"
        alt={shared.hero.photoAlt}
        width={coverPhoto.width}
        height={coverPhoto.height}
        {...{ fetchpriority: "high" }}
        className="pointer-events-none relative -mb-[14%] ml-[-18%] mt-2 w-[150%] max-w-none animate-hero-in select-none md:ml-[-6%] md:w-[112%] xl:absolute xl:left-auto xl:right-[-22%] xl:top-[132px] xl:m-0 xl:w-[122%]"
        style={{ animationDelay: "120ms" }}
      />
    </section>
  );
}
