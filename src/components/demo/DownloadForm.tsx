import { useId, useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { buttonClass, Button } from "@/components/ui/button";
import { downloadForm } from "@/content/sampleCase";
import { ANCHORS, SAMPLE_PDF, WALKTHROUGH_HREF, type Audience } from "@/content/site";
import { guardarContacto } from "@/lib/guardarContacto";
import { validateContact, type ContactErrors } from "@/lib/validateContact";
import { cn } from "@/lib/utils";

const inputClass =
  "h-12 w-full rounded-control border border-line-strong bg-white px-3.5 text-[16px] text-ink " +
  "transition-colors duration-200 hover:border-muted focus-visible:border-ink focus-visible:outline-offset-0";

function Field({
  label,
  hint,
  error,
  ...input
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string; error?: string }) {
  const id = useId();
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[14.5px] font-medium leading-none">
        {label}
        {hint && <span className="ml-1.5 font-normal text-muted">({hint})</span>}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(inputClass, error && "border-danger")}
        {...input}
      />
      {error && (
        <p id={`${id}-error`} className="text-[14px] leading-tight text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Formulario de descarga del PDF. Guarda con `guardarContacto`, que hoy no hace
 * nada, y abre el PDF del caso de muestra.
 */
export function DownloadForm({ audience }: { audience: Audience }) {
  const [values, setValues] = useState({ name: "", email: "", organization: "" });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [sent, setSent] = useState(false);

  const set = (key: keyof typeof values) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, [key]: event.target.value }));
    if (key !== "organization" && errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // El error todavía no se pintó: el foco va al primer campo con error en el próximo cuadro.
      requestAnimationFrame(() => form.querySelector<HTMLInputElement>("[aria-invalid='true']")?.focus());
      return;
    }
    // El PDF se abre dentro del mismo gesto, para que el navegador no lo bloquee.
    window.open(SAMPLE_PDF, "_blank", "noopener");
    setSent(true);
    void guardarContacto({
      nombre: values.name.trim(),
      correo: values.email.trim(),
      organizacion: values.organization.trim(),
      origen: audience,
    }).catch(() => {
      // Una falla al guardar no le quita el PDF al visitante.
    });
  };

  return (
    <div id={ANCHORS.download} className="grid scroll-mt-28 gap-x-12 gap-y-10 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <h3 className="font-serif text-[32px] leading-[1.1] tracking-[-0.01em] sm:text-[36px]">
          {downloadForm.title}
        </h3>
        <p className="mt-4 max-w-[26rem] text-[17px] leading-[1.55] text-ink/75">{downloadForm.text}</p>
        <p className="mt-8 max-w-[26rem] border-t border-line pt-5 text-[14.5px] leading-[1.5] text-muted">
          {downloadForm.note}
        </p>
        <a
          href={WALKTHROUGH_HREF}
          className="group mt-3 inline-flex items-center gap-1.5 rounded-[6px] text-[15.5px] font-medium underline decoration-line-strong underline-offset-4 transition-colors duration-200 hover:decoration-ink"
        >
          {downloadForm.walkthrough}
          <ArrowRight
            size={16}
            strokeWidth={2}
            className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
          />
        </a>
      </div>
      <div className="lg:col-span-6 lg:col-start-7">
        {sent ? (
          <div
            role="status"
            className="flex min-h-[316px] animate-fade-in flex-col items-start justify-center rounded-window border border-line p-7 sm:p-9"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-white">
              <Check size={16} strokeWidth={3} />
            </span>
            <p className="mt-4 font-serif text-[26px] leading-[1.15]">{downloadForm.ready}</p>
            <a
              href={SAMPLE_PDF}
              target="_blank"
              rel="noopener"
              className={buttonClass({ variant: "ink", className: "mt-6" })}
            >
              {downloadForm.open}
            </a>
          </div>
        ) : (
          <form noValidate onSubmit={onSubmit} className="grid gap-5">
            <Field
              label={downloadForm.name}
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={set("name")}
              error={errors.name}
              required
            />
            <Field
              label={downloadForm.email}
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={values.email}
              onChange={set("email")}
              error={errors.email}
              required
            />
            <Field
              label={downloadForm.organization}
              hint={downloadForm.optional}
              name="organization"
              autoComplete="organization"
              value={values.organization}
              onChange={set("organization")}
            />
            <Button type="submit" variant="ink" className="mt-1 w-full sm:w-fit sm:px-7">
              {downloadForm.submit}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
