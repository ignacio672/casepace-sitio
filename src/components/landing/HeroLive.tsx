import { Check } from "lucide-react";
import { StageControl } from "@/components/demo/StageControl";
import { shared } from "@/content/landings";
import { heroSaid, heroSheet } from "@/content/sampleCase";
import { useStage } from "@/hooks/useStage";
import { useTimeline } from "@/hooks/useTimeline";
import { HERO_END, HERO_MARKS, heroState } from "@/lib/demo/hero";
import { cn } from "@/lib/utils";

function FormBox({ checked }: { checked: boolean }) {
  return (
    <span className="mr-2 inline-grid h-[13px] w-[13px] translate-y-[2px] place-items-center border border-black">
      {checked && <Check size={11} strokeWidth={3.5} />}
    </span>
  );
}

function YesNo() {
  return (
    <p className="mt-2 flex gap-12 pl-6">
      <span>
        <FormBox checked={false} />
        {heroSheet.no}
      </span>
      <span>
        <FormBox checked />
        {heroSheet.yes}
      </span>
    </p>
  );
}

/** Una frase de la declaración: ocupa su lugar desde el principio y aparece con el resaltador. */
function Sentence({ text, written }: { text: string; written: boolean }) {
  return (
    <span className={cn("transition-opacity duration-200", written ? "opacity-100" : "opacity-0")}>
      <span className={cn("mark mark-sweep", !written && "mark-off")}>{text}</span>
    </span>
  );
}

/**
 * Un recorte del I-589, Parte B, compuesto con la tipografía del formulario:
 * Times para las preguntas, Arial para lo que se completa. El texto es el de la
 * página 5 del PDF de muestra.
 */
function Sheet({ sentences }: { sentences: number }) {
  const s = heroSheet;
  return (
    <div className="rounded-paper bg-white px-4 pb-24 pt-5 font-form text-[13.5px] leading-[1.3] text-black sm:px-7 sm:pt-7">
      <div className="h-[5px] bg-black" />
      <p className="mt-[3px] border border-black bg-[#d2d2d2] px-1.5 py-[3px] text-[15px] font-bold leading-[1.2]">
        {s.part}
      </p>
      <p className="mt-3 flex gap-2">
        <b>{s.letter}</b>
        <span>{s.question}</span>
      </p>
      <YesNo />
      <div className="mt-2.5 space-y-[1em] border border-black px-2 pb-2.5 pt-1.5 font-typed text-[13px] leading-[1.38]">
        {s.before.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p>
          <Sentence text={s.sentences[0]} written={sentences >= 1} />{" "}
          <Sentence text={s.sentences[1]} written={sentences >= 2} />
        </p>
      </div>
      <div className="mt-4 border-t border-black" />
      <p className="mt-2.5 flex gap-2">
        <b>{s.nextLetter}</b>
        <span>{s.nextQuestion}</span>
      </p>
    </div>
  );
}

function Typing() {
  return (
    <span className="flex h-[40px] w-[60px] animate-fade-in items-center justify-center gap-1 rounded-[18px] rounded-bl-[6px] bg-white text-ink">
      {[0, 1, 2].map((i) => (
        <i
          key={i}
          className="block h-[6px] w-[6px] animate-typing rounded-full bg-current"
          style={{ animationDelay: `${i * 120}ms` }}
        />
      ))}
    </span>
  );
}

/**
 * El elemento vivo del inicio: la hoja del I-589 y, apoyada sobre ella, la
 * frase del cliente. El citrón marca la frase de origen y, en el mismo momento,
 * pasa sobre la frase que llega al formulario.
 */
export function HeroLive({ className, bare = false }: { className?: string; bare?: boolean }) {
  const stage = useStage(0.2);
  const { step, lap } = useTimeline({
    marks: HERO_MARKS,
    end: HERO_END,
    playing: stage.playing,
    still: stage.still,
  });
  const state = heroState(step);
  const said = heroSaid[state.said - 1];
  const label = "text-[13px] leading-none text-ink-muted";

  const caption = (
    <div className="flex items-center gap-3">
      {!stage.still && <StageControl paused={stage.paused} onToggle={stage.toggle} dark />}
      {!bare && <p className="max-w-[15rem] text-[14.5px] leading-[1.4] text-paper/75">{shared.hero.caption}</p>}
    </div>
  );

  return (
    <div ref={stage.ref} {...stage.hoverProps} className={className}>
      <p className="sr-only">{shared.hero.description}</p>
      <p aria-hidden className={label}>
        {shared.hero.form}
      </p>
      <div aria-hidden key={`sheet-${lap}`} className="mt-3.5 animate-fade-in">
        <Sheet sentences={state.sentences} />
      </div>
      <div className="relative z-10 -mt-[74px] flex items-end gap-6 sm:-ml-8 xl:-ml-14">
        <div
          aria-hidden
          className="w-full max-w-[344px] shrink-0 rounded-[22px] border border-ink-line bg-ink-raised p-4 pb-5 shadow-[0_18px_44px_rgba(0,0,0,0.5)]"
        >
          <p className={label}>{shared.hero.said}</p>
          <div key={`${lap}-${state.typing ? "typing" : state.said}`} className="mt-3.5 min-h-[128px] animate-fade-in">
            {state.typing ? (
              <Typing />
            ) : (
              <>
                <p
                  lang="es"
                  className="w-fit rounded-[18px] rounded-bl-[6px] bg-white px-3.5 py-2.5 text-[16px] leading-[1.4] text-ink"
                >
                  <span className={cn("mark mark-sweep", state.sources < state.said && "mark-off")}>{said.es}</span>
                </p>
                <p lang="en" className="mt-2 px-1 text-[13.5px] leading-[1.42] text-ink-muted">
                  {said.en}
                </p>
              </>
            )}
          </div>
        </div>
        <div className="hidden pb-1 md:block">{caption}</div>
      </div>
      <div className="mt-6 md:hidden">{caption}</div>
    </div>
  );
}
