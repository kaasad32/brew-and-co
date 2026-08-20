import { type ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "secondary-inverse" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-body font-semibold " +
  "transition-[transform,box-shadow,background-color] duration-base ease-standard " +
  "disabled:opacity-50 disabled:pointer-events-none " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-foreground shadow-sm hover:bg-accent-hover hover:-translate-y-px hover:shadow-md active:translate-y-0 active:shadow-xs",
  secondary:
    "border border-foreground/20 text-foreground bg-transparent hover:bg-foreground/5 hover:-translate-y-px active:translate-y-0",
  // For a secondary button placed over photography (e.g. the hero), where
  // the default's foreground-based border/text would be illegible. A
  // dedicated variant, not a className override — two same-specificity
  // `text-*`/`border-*` utilities are ordered by Tailwind's build, not by
  // className string order, so overriding color utilities from outside a
  // variant is unreliable (see docs/design/style-guide.md's CSS-specificity
  // note).
  "secondary-inverse":
    "border border-paper/40 text-paper bg-transparent hover:bg-paper/10 hover:-translate-y-px active:translate-y-0",
  ghost: "text-foreground hover:bg-foreground/5",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-13 px-8 text-lg",
};

// Exported so non-<button> elements can share identical styling without
// duplicating the variant/size logic.
export function buttonClassName(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className = ""
) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", ...props }, ref) => (
    <button ref={ref} className={buttonClassName(variant, size, className)} {...props} />
  )
);
Button.displayName = "Button";
