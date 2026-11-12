import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "accent" | "paper" | "ghostDark" | "ink" | "outline";
type Size = "md" | "sm";

const base =
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-control font-medium " +
  "transition-[background-color,border-color,color,transform] duration-200 ease-out active:scale-[0.98] " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  // El citrón es del botón principal y de nada más.
  accent: "bg-accent text-ink hover:brightness-[1.07]",
  paper: "bg-paper text-ink hover:bg-white",
  ghostDark: "border border-paper/30 text-paper hover:border-paper/70 hover:bg-paper/[0.06]",
  ink: "bg-ink text-paper hover:brightness-[1.35]",
  outline: "border border-line-strong text-ink hover:border-ink",
};

const sizes: Record<Size, string> = {
  md: "h-12 px-5 text-[15.5px]",
  sm: "h-10 px-4 text-[14.5px]",
};

/** Clases de botón, para usarlas también en enlaces. */
export function buttonClass({
  variant = "ink",
  size = "md",
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant, size, className, type = "button", ...props },
  ref,
) {
  return <button ref={ref} type={type} className={buttonClass({ variant, size, className })} {...props} />;
});
