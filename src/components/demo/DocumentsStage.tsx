import { useRef } from "react";
import { Camera, Check } from "lucide-react";
import { documentPhotos } from "@/assets/images";
import { demo, documents, documentsUi, type CaseDocument } from "@/content/sampleCase";
import { useStage } from "@/hooks/useStage";
import { useTimeline } from "@/hooks/useTimeline";
import { cropAround } from "@/lib/crop";
import { documentsState, documentsTimeline } from "@/lib/demo/documents";
import { cn } from "@/lib/utils";
import { AppWindow } from "./AppWindow";
import { Phone } from "./Phone";
import { Stage } from "./Stage";

const TIMELINE = documentsTimeline(documents.map((doc) => doc.fields.length));

/** Alto de una fila de la lista del teléfono, para saber adónde se achica la foto. */
const PHONE_ROW = 50;

function PhoneScreen({
  camera,
  flashes,
  list,
}: {
  camera: number | null;
  flashes: number;
  list: ("uploading" | "done")[];
}) {
  // El destello solo se dibuja cuando ocurre, no al montar el escenario a mitad de vuelta.
  const firstFlashes = useRef(flashes);
  if (flashes < firstFlashes.current) firstFlashes.current = flashes;

  // Mientras la foto se achica hacia la lista, el visor sigue mostrando el último documento.
  const shown = camera ?? Math.max(0, list.length - 1);
  const target = Math.max(0, list.length - 1);

  return (
    <>
      <div className="flex min-h-0 flex-1 flex-col px-3.5 pb-3.5 pt-1.5">
        <p className="px-0.5 text-[15px] font-semibold">{documentsUi.phone.title}</p>
        <ul className="mt-2.5 flex-1">
          {documents.map((doc, i) =>
            list[i] ? (
              <li key={doc.id} className="flex animate-fade-in items-center gap-2.5" style={{ height: PHONE_ROW }}>
                <img
                  src={documentPhotos[doc.id].mini}
                  alt=""
                  width={44}
                  height={33}
                  className="h-[33px] w-[44px] shrink-0 rounded-[4px] border border-line object-cover"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-medium leading-tight">{doc.phoneName}</span>
                  {list[i] === "done" ? (
                    <span className="mt-0.5 flex items-center gap-1 text-[11.5px] leading-tight text-muted">
                      <Check size={11} strokeWidth={3} className="text-ink" />
                      {documentsUi.phone.done}
                    </span>
                  ) : (
                    <span className="mt-0.5 block text-[11.5px] leading-tight text-muted">
                      {documentsUi.phone.uploading}
                      <span className="mt-[3px] block h-[2px] w-full overflow-hidden rounded-full bg-line">
                        <span className="block h-full w-full origin-left animate-upload bg-ink" />
                      </span>
                    </span>
                  )}
                </span>
              </li>
            ) : null,
          )}
        </ul>
        <div className="flex h-10 shrink-0 items-center justify-center gap-2 rounded-control bg-ink text-[13.5px] font-medium text-paper">
          <Camera size={15} strokeWidth={2} />
          {documentsUi.phone.takePhoto}
        </div>
      </div>

      {/* El visor de la cámara. El fondo aparece y se va con un fundido; la foto se achica hacia su fila de la lista. */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-10 bg-black transition-opacity ease-out",
          camera !== null ? "opacity-100 duration-[180ms]" : "opacity-0 duration-150",
        )}
      >
        <span className="absolute bottom-5 left-1/2 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full border-2 border-white/90">
          <span className="h-9 w-9 rounded-full bg-white/90" />
        </span>
      </div>
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-1/2 z-10 -mt-[90px] sm:-mt-[105px]",
          camera !== null
            ? "scale-100 opacity-100 [transition:opacity_180ms_ease-out,transform_0s]"
            : "scale-[0.18] opacity-0 [transition:opacity_230ms_ease-in,transform_230ms_cubic-bezier(0.22,1,0.36,1)]",
        )}
        style={{ transformOrigin: `36px ${(76 + target * PHONE_ROW + PHONE_ROW / 2 - 150).toFixed(0)}px` }}
      >
        <img
          src={documentPhotos[documents[shown].id].photo}
          alt=""
          width={1040}
          height={780}
          className="aspect-[4/3] w-full object-cover"
        />
        <span className="absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-white/90" />
        <span className="absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-white/90" />
        <span className="absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-white/90" />
        <span className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-white/90" />
      </div>
      {flashes > firstFlashes.current && (
        <div key={flashes} className="pointer-events-none absolute inset-0 z-20 animate-flash bg-white" />
      )}
    </>
  );
}

function DocumentList({ list, active }: { list: ("reading" | "done")[]; active: number | null }) {
  return (
    <aside className="shrink-0 border-b border-line p-3 sm:w-[212px] sm:border-b-0 sm:border-r xl:w-[236px]">
      <p className="px-1 text-[12px] leading-none text-muted">{documentsUi.team.list}</p>
      <ul className="mt-2.5 flex gap-2 sm:block sm:space-y-1">
        {documents.map((doc, i) => {
          const state = list[i];
          return (
            <li
              key={doc.id}
              className={cn(
                "flex items-center gap-2.5 rounded-[8px] sm:p-1.5",
                state ? "animate-fade-in" : "invisible",
                active === i && "sm:bg-paper",
              )}
            >
              <img
                src={documentPhotos[doc.id].mini}
                alt=""
                width={64}
                height={48}
                className={cn(
                  "h-[36px] w-[48px] shrink-0 rounded-[4px] border object-cover sm:h-[48px] sm:w-[64px]",
                  active === i ? "border-ink sm:border-line" : "border-line",
                )}
              />
              <span className="hidden min-w-0 sm:block">
                <span className="block text-[13px] font-medium leading-[1.2]">{doc.teamName}</span>
                <span className="mt-1 flex items-center gap-1 text-[12px] leading-none text-muted">
                  {state === "done" && <Check size={11} strokeWidth={3} className="text-ink" />}
                  {state === "done" ? documentsUi.team.done : documentsUi.team.reading}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

/** Proporción de la franja de la foto: ancha en escritorio, más alta en el teléfono. */
const STRIP = { wide: 3.1, narrow: 2 };

/**
 * La franja de la foto donde están los datos, con el resaltador sobre la zona
 * de donde sale el último dato completado.
 */
function SourceStrip({
  doc,
  box,
  aspect,
  className,
}: {
  doc: CaseDocument;
  box: CaseDocument["fields"][number]["source"] | null;
  aspect: number;
  className?: string;
}) {
  const crop = cropAround(
    doc.fields.map((field) => field.source),
    { aspect },
  );
  return (
    <div
      className={cn("relative overflow-hidden rounded-[6px] border border-line bg-paper-deep", className)}
      style={{ aspectRatio: aspect }}
    >
      <div
        className="absolute aspect-[4/3]"
        style={{
          width: `${(100 / crop.w) * 100}%`,
          left: `${(-crop.x / crop.w) * 100}%`,
          top: `${(-crop.y / crop.h) * 100}%`,
        }}
      >
        <img src={documentPhotos[doc.id].photo} alt="" width={1040} height={780} className="h-full w-full" />
        {box && (
          <span
            className="absolute rounded-[2px] bg-citron mix-blend-multiply [transition:all_80ms_linear]"
            style={{ left: `${box.x}%`, top: `${box.y}%`, width: `${box.w}%`, height: `${box.h}%` }}
          />
        )}
      </div>
    </div>
  );
}

function DocumentPanel({ doc, filled, reading }: { doc: CaseDocument; filled: number; reading: boolean }) {
  const box = filled > 0 ? doc.fields[filled - 1].source : null;
  return (
    <div className="animate-fade-in">
      <SourceStrip doc={doc} box={box} aspect={STRIP.wide} className="hidden sm:block" />
      <SourceStrip doc={doc} box={box} aspect={STRIP.narrow} className="sm:hidden" />
      <div className="mt-3 flex items-baseline gap-3">
        <p className="shrink-0 text-[15px] font-semibold leading-[1.25]">{doc.teamName}</p>
        <p className="min-w-0 flex-1 truncate text-[12px] leading-[1.25] text-muted">
          <span className="hidden sm:inline">{doc.issuer}</span>
        </p>
        <p className="flex shrink-0 items-center gap-1 text-[12px] leading-none text-muted">
          {!reading && <Check size={11} strokeWidth={3} className="text-ink" />}
          {reading ? documentsUi.team.reading : documentsUi.team.done}
        </p>
      </div>
      <ul className="mt-2.5">
        {doc.fields.map((field, k) => {
          const done = k < filled;
          return (
            <li key={field.id} className="flex h-[41px] items-center gap-3 border-t border-line">
              <span className="w-[50px] shrink-0 font-mono text-[11px] leading-none text-muted">{field.ref}</span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-3 text-[12px] leading-none text-muted">
                  <span className="truncate">{field.label}</span>
                  <span
                    className={cn(
                      "flex shrink-0 items-center gap-1 transition-opacity duration-200",
                      done ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <Check size={12} strokeWidth={3} className="text-ink" />
                    {doc.tag}
                  </span>
                </span>
                <span className="mt-[4px] block h-[19px] truncate text-[15px] font-semibold leading-[19px]">
                  {done && <span className="mark-pass">{field.value}</span>}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Paso 1: del teléfono del cliente a los campos del formulario, con su origen. */
export function DocumentsStage() {
  const stage = useStage();
  const { step, lap } = useTimeline({
    marks: TIMELINE.marks,
    start: TIMELINE.loopStart,
    end: TIMELINE.end,
    playing: stage.playing,
    still: stage.still,
  });
  const state = documentsState(TIMELINE.events, step);
  const active = state.active === null ? null : documents[state.active];

  return (
    <Stage
      stage={stage}
      description={demo.steps.documents.description}
      phone={
        <Phone time="7:42">
          <PhoneScreen key={lap} camera={state.camera} flashes={state.flashes} list={state.phone} />
        </Phone>
      }
      team={
        <AppWindow title={demo.windowTitle} className="lg:h-[520px]">
          <div key={lap} className="flex h-full animate-fade-in flex-col sm:flex-row">
            <DocumentList list={state.team} active={state.active} />
            <div className="min-h-[440px] min-w-0 flex-1 p-4 sm:min-h-0">
              {active && state.active !== null && (
                <DocumentPanel
                  key={active.id}
                  doc={active}
                  filled={state.filled}
                  reading={state.team[state.active] === "reading"}
                />
              )}
            </div>
          </div>
        </AppWindow>
      }
    />
  );
}
