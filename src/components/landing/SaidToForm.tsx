import { shared } from "@/content/landings";
import { HeroLive } from "./HeroLive";

/** Lo que dijo el cliente y lo que va al formulario: la frase, y al lado el producto haciéndolo. */
export function SaidToForm() {
  return (
    <section className="on-dark border-t border-ink-line">
      <div className="wrap grid items-center gap-x-12 gap-y-12 py-20 lg:grid-cols-12 lg:py-28">
        <h2 className="max-w-[16ch] font-serif text-[clamp(2rem,1.3rem+2.6vw,3.5rem)] leading-[1.08] tracking-[-0.02em] lg:col-span-6">
          {shared.hero.caption}
        </h2>
        <HeroLive bare className="mx-auto w-full max-w-[34rem] lg:col-span-5 lg:col-start-8 lg:mx-0 lg:max-w-none" />
      </div>
    </section>
  );
}
