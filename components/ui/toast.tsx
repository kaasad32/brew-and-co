type ToastProps = { message: string; tone?: "confirm" | "error" };

export function Toast({ message, tone = "confirm" }: ToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={[
        "rounded-sm px-4 py-3 text-sm font-medium shadow-md",
        tone === "confirm"
          ? "bg-inverse-background text-inverse-foreground"
          : "border border-cherry-600 bg-paper text-cherry-600",
      ].join(" ")}
    >
      {message}
    </div>
  );
}
