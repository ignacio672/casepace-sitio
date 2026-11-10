import { shared } from "@/content/landings";
import { ANCHORS } from "@/content/site";

/** Para quién es: una declaración corta y sus dos casos, lado a lado. */
export function WhoFor() {
  const { who } = shared;
  return (
    <section id={ANCHORS.who} aria-labelledby="who-title" className="bg-paper">
      <div className="wrap py-24 lg:py-32">
        <h2 id="who-title" className="font-serif text-[26px] leading-[1.2] text-muted">
          {who.title}
        </h2>
        <p className="mt-5 max-w-[24ch] font-serif text-[clamp(2rem,1.3rem+2.6vw,3.5rem)] leading-[1.1] tracking-[-0.02em]">
          {who.statement}
        </p>
        <div className="mt-12 grid gap-x-12 text-[19px] leading-[1.55] md:grid-cols-2 lg:mt-16">
          <p className="border-t border-line-strong py-6 text-ink/75 md:pr-8">{who.few}</p>
          <p className="border-t border-ink py-6 md:pr-8">{who.many}</p>
        </div>
      </div>
    </section>
  );
}
