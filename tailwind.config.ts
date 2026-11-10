import type { Config } from "tailwindcss";

/**
 * Marca de Casepace. Los tres colores salen medidos del sitio publicado:
 * negro #121212, blanco cálido #F4F2EE y citrón #E4F27A.
 *
 * Regla de formas, que se cumple en todo el sitio:
 *   papel del formulario 2 px · botones y campos 10 px · ventanas 12 px ·
 *   escenarios 16 px · teléfono 36 px.
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#121212",
          raised: "#1B1B1A", // escenario sobre negro
          bubble: "#2C2C2A", // burbuja de Casepace en el teléfono oscuro
          line: "#30302D", // filetes sobre negro
          muted: "#A7A39A", // texto secundario sobre negro
        },
        paper: {
          DEFAULT: "#F4F2EE", // blanco cálido: escenarios y texto sobre negro
          deep: "#EBE8E1",
        },
        citron: "#E4F27A",
        line: {
          DEFAULT: "#E3E0D9",
          strong: "#C9C5BC",
        },
        muted: "#66635C", // texto secundario sobre blanco, AA
        danger: "#A3271B",
      },
      fontFamily: {
        serif: ['"Newsreader"', '"Newsreader Fallback"', "Georgia", "serif"],
        sans: ['"Figtree"', '"Figtree Fallback"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        form: ['"Times New Roman"', "Times", "serif"], // preguntas del I-589
        typed: ["Arial", "Helvetica", "sans-serif"], // respuestas del I-589
      },
      borderRadius: {
        paper: "2px",
        control: "10px",
        window: "12px",
        stage: "16px",
        phone: "36px",
      },
      boxShadow: {
        window: "0 12px 32px rgba(18, 18, 18, 0.08)",
        sheet: "0 1px 0 rgba(18, 18, 18, 0.06), 0 10px 24px rgba(18, 18, 18, 0.10)",
        page: "0 1px 2px rgba(18, 18, 18, 0.10), 0 6px 14px rgba(18, 18, 18, 0.08)",
      },
      maxWidth: {
        wrap: "1328px",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "rise-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "page-in": {
          from: { opacity: "0", transform: "translateY(64px) rotate(var(--giro))" },
          to: { opacity: "1", transform: "translateY(0) rotate(var(--giro))" },
        },
        "card-in": {
          from: { opacity: "0", transform: "translateX(24px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        flash: { "0%": { opacity: "0.95" }, "100%": { opacity: "0" } },
        typing: {
          "0%, 60%, 100%": { opacity: "0.3", transform: "translateY(0)" },
          "30%": { opacity: "1", transform: "translateY(-2px)" },
        },
        upload: { from: { transform: "scaleX(0)" }, to: { transform: "scaleX(1)" } },
        grow: {
          from: { gridTemplateRows: "0fr", opacity: "0" },
          to: { gridTemplateRows: "1fr", opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 200ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "rise-in": "rise-in 220ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "page-in": "page-in 300ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "card-in": "card-in 240ms cubic-bezier(0.22, 1, 0.36, 1) both",
        flash: "flash 120ms linear both",
        typing: "typing 900ms ease-in-out infinite",
        upload: "upload 280ms linear both",
        grow: "grow 220ms cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
} satisfies Config;
