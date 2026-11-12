import { ArrowDown } from "lucide-react";
import { buttonClass } from "@/components/ui/button";
import { HashLink } from "@/components/site/HashLink";
import { shared, type LandingContent } from "@/content/landings";
import { ANCHORS, nav, WALKTHROUGH_HREF } from "@/content/site";
import { HeroWindow } from "./HeroWindow";

/**
 * El inicio. Arriba, qué es y para quién, con los dos llamados. Debajo, a todo
 * el ancho, la pantalla con la que el estudio revisa el caso.
 */
export function Hero({ content }: { content: LandingContent["hero"] }) {
  return (
    <section className="on-dark">
      <div className="wrap pb-24 pt-14 sm:pt-20 xl:pb-32 xl:pt-24">
        <p className="animate-hero-in pb-0.5 font-serif text-[21px] italic leading-[1.3] text-paper/70 sm:text-[23px]">
          {content.label}
        </p>
        <h1 className="mt-5 max-w-[52rem] animate-hero-in font-serif text-[clamp(1.85rem,8vw,4.25rem)] font-normal leading-[1.04] tracking-[-0.02em] xl:text-[clamp(3.5rem,5vw,4.5rem)]">
          {content.title.map((line) => (
            <span key={line} className="block">
              {line}{" "}
            </span>
          ))}
        </h1>
        <div className="mt-10 grid gap-x-12 gap-y-9 lg:grid-cols-12 xl:mt-12">
          <p
            className="max-w-[34rem] animate-hero-in text-[19px] leading-[1.6] text-paper/80 lg:col-span-6 xl:text-[21px]"
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
          </div>
        </div>

        <HeroWindow className="mt-16 animate-hero-in xl:mt-20" />
        <div className="mt-7 flex flex-col gap-x-12 gap-y-3 text-[14.5px] leading-[1.5] text-ink-muted lg:flex-row lg:items-baseline lg:justify-between">
          <p>{shared.hero.caption}</p>
          <p className="max-w-[31rem] lg:text-right">{content.note}</p>
        </div>
      </div>
    </section>
  );
}
