import { ArrowUp, Check } from "lucide-react";
import { demo, interviewTurns, interviewUi, type InterviewTurn } from "@/content/sampleCase";
import { useStage } from "@/hooks/useStage";
import { useTimeline } from "@/hooks/useTimeline";
import { interviewState, interviewTimeline } from "@/lib/demo/interview";
import { cn } from "@/lib/utils";
import { AppWindow } from "./AppWindow";
import { Phone } from "./Phone";
import { Stage } from "./Stage";

const TIMELINE = interviewTimeline(interviewTurns.map((turn) => turn.es));

/** Índice, dentro de los turnos mostrados, del turno que suma cada cosa del lado del equipo. */
const sentenceTurn = (n: number) => interviewTurns.findIndex((turn) => turn.sentence === n);
const POLITICAL_TURN = interviewTurns.findIndex((turn) => turn.checksPoliticalOpinion);

function TypingDots({ mine }: { mine: boolean }) {
  return (
    <span
      className={cn(
        "flex h-[30px] w-[46px] items-center justify-center gap-[3px] rounded-[15px]",
        mine ? "self-end bg-white text-ink" : "self-start bg-ink-bubble text-paper",
      )}
    >
      {[0, 1, 2].map((i) => (
        <i
          key={i}
          className="block h-[5px] w-[5px] animate-typing rounded-full bg-current"
          style={{ animationDelay: `${i * 120}ms` }}
        />
      ))}
    </span>
  );
}

/** El mensaje del cliente, con la parte de donde sale el dato marcada en citrón. */
function Said({ turn, marked }: { turn: InterviewTurn; marked: boolean }) {
  if (!turn.source) return <>{turn.es}</>;
  const at = turn.es.indexOf(turn.source);
  if (at < 0) return <>{turn.es}</>;
  return (
    <>
      {turn.es.slice(0, at)}
      <span className={cn("mark mark-sweep", !marked && "mark-off")}>{turn.source}</span>
      {turn.es.slice(at + turn.source.length)}
    </>
  );
}

function Chat({ shown, translated, typing }: { shown: number; translated: number; typing: boolean }) {
  const next = interviewTurns[shown];
  return (
    <>
      <div className="shrink-0 border-b border-ink-line px-4 pb-2.5 pt-1 text-center">
        <p className="text-[13.5px] font-semibold leading-tight">{interviewUi.phone.title}</p>
        <p className="mt-0.5 text-[11.5px] leading-tight text-ink-muted">{interviewUi.phone.subtitle}</p>
      </div>
      <div className="flex min-h-0 flex-1 flex-col justify-end overflow-hidden px-3 pb-3">
        {interviewTurns.slice(0, shown).map((turn, i) => {
          const mine = turn.de === "solicitante";
          return (
            <div key={turn.number} className="grid shrink-0 animate-grow">
              <div className={cn("flex min-h-0 flex-col overflow-hidden pt-3", mine ? "items-end" : "items-start")}>
                <p
                  lang="es"
                  className={cn(
                    "max-w-[88%] rounded-[16px] px-3 py-2 text-[13.5px] leading-[1.38]",
                    mine ? "rounded-br-[5px] bg-white text-ink" : "rounded-bl-[5px] bg-ink-bubble text-paper",
                  )}
                >
                  <Said turn={turn} marked={i < translated} />
                </p>
                <p
                  lang="en"
                  className={cn(
                    "mt-1.5 max-w-[88%] px-1 text-[12px] leading-[1.35] text-ink-muted transition-opacity duration-200",
                    mine && "text-right",
                    i < translated ? "opacity-100" : "opacity-0",
                  )}
                >
                  {turn.en}
                </p>
              </div>
            </div>
          );
        })}
        {typing && next && (
          <div className="flex shrink-0 animate-fade-in flex-col pt-3">
            <TypingDots mine={next.de === "solicitante"} />
          </div>
        )}
      </div>
      <div className="mx-3 mb-3 flex h-9 shrink-0 items-center justify-end rounded-full border border-ink-line pr-1">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-ink-bubble text-ink-muted">
          <ArrowUp size={14} strokeWidth={2.25} />
        </span>
      </div>
    </>
  );
}

function Box({ checked }: { checked: boolean }) {
  return (
    <span className="grid h-[15px] w-[15px] shrink-0 place-items-center rounded-[3px] border border-ink">
      {checked && <Check size={11} strokeWidth={3.25} className="animate-fade-in" />}
    </span>
  );
}

/** Una frase de la declaración. Ocupa su lugar desde el principio, así nada se mueve cuando aparece. */
function Sentence({ text, written }: { text: string; written: boolean }) {
  return (
    <p className={cn("transition-opacity duration-200", written ? "opacity-100" : "opacity-0")}>
      {written ? <span className="mark-pass">{text}</span> : text}
    </p>
  );
}

function Answer({
  code,
  title,
  written,
  first = false,
  children,
}: {
  code: string;
  title: string;
  written: boolean;
  first?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={cn(!first && "border-t border-line pt-4")}>
      <div className="flex items-baseline gap-2.5">
        <span className="font-mono text-[11px] leading-none text-muted">{code}</span>
        <h4 className="flex-1 text-[12px] leading-none text-muted">{title}</h4>
        <span
          className={cn(
            "flex items-center gap-1 text-[12px] leading-none text-muted transition-opacity duration-200",
            written ? "opacity-100" : "opacity-0",
          )}
        >
          <Check size={12} strokeWidth={3} className="text-ink" />
          {interviewUi.team.tag}
        </span>
      </div>
      <div className="mt-2.5 space-y-2.5 text-[15px] leading-[1.5]">{children}</div>
    </section>
  );
}

function Declaration({ translated }: { translated: number }) {
  const ui = interviewUi.team;
  const written = (n: number) => translated > sentenceTurn(n);
  const political = translated > POLITICAL_TURN;
  return (
    <div className="flex h-full flex-col sm:flex-row">
      <aside className="shrink-0 border-b border-line p-4 sm:w-[212px] sm:border-b-0 sm:border-r xl:w-[236px]">
        <p className="font-mono text-[11px] leading-none text-muted">B.1</p>
        <h4 className="mt-2 text-[12px] leading-[1.35] text-muted">{ui.basis}</h4>
        <ul className="mt-3.5 space-y-3">
          {ui.checkboxes.map((label, i) => {
            const checked = i === 0 && political;
            return (
              <li key={label} className="flex items-start gap-2.5 text-[14.5px] font-semibold leading-[1.25]">
                <span className="mt-[1.5px]">
                  <Box checked={checked} />
                </span>
                {checked ? <span className="mark-pass">{label}</span> : label}
              </li>
            );
          })}
        </ul>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col gap-4 p-4 xl:px-5">
        <Answer code={ui.pastRef} title={ui.past} written={written(0)} first>
          <p>{ui.opening}</p>
          <Sentence text={ui.sentences[0]} written={written(0)} />
          <Sentence text={ui.sentences[1]} written={written(1)} />
        </Answer>
        <Answer code={ui.fearRef} title={ui.fear} written={written(2)}>
          <Sentence text={ui.sentences[2]} written={written(2)} />
        </Answer>
        <p className="mt-auto hidden border-t border-line pt-3 text-[12px] leading-none text-muted lg:block">
          {ui.footer}
        </p>
      </div>
    </div>
  );
}

/** Paso 2: la entrevista en el idioma del cliente y la declaración en inglés. */
export function InterviewStage() {
  const stage = useStage();
  const { step, lap } = useTimeline({
    marks: TIMELINE.marks,
    start: TIMELINE.loopStart,
    end: TIMELINE.end,
    playing: stage.playing,
    still: stage.still,
  });
  const state = interviewState(TIMELINE.events, step);

  return (
    <Stage
      stage={stage}
      dark
      description={demo.steps.interview.description}
      phone={
        <Phone dark time="11:04">
          <div key={lap} className="flex min-h-0 flex-1 animate-fade-in flex-col">
            <Chat shown={state.shown} translated={state.translated} typing={state.typing} />
          </div>
        </Phone>
      }
      team={
        <AppWindow title={demo.windowTitle} className="lg:h-[520px]">
          <div key={lap} className="h-full animate-fade-in">
            <Declaration translated={state.translated} />
          </div>
        </AppWindow>
      }
    />
  );
}
