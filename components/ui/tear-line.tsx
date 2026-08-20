type TearLineProps = { label?: string };

export function TearLine({ label }: TearLineProps) {
  return (
    <div className="relative flex items-center py-2" aria-hidden="true">
      <span className="h-3 w-3 shrink-0 rounded-full border border-foreground/20 bg-background" />
      <span className="mx-2 h-px flex-1 border-t border-dashed border-foreground/25" />
      {label && (
        <span className="shrink-0 px-3 font-mono text-xs tracking-[0.15em] text-foreground-muted">
          {label.toUpperCase()}
        </span>
      )}
      <span className="mx-2 h-px flex-1 border-t border-dashed border-foreground/25" />
      <span className="h-3 w-3 shrink-0 rounded-full border border-foreground/20 bg-background" />
    </div>
  );
}
