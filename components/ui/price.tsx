type PriceProps = { cents: number; compareAtCents?: number };

export function Price({ cents, compareAtCents }: PriceProps) {
  const format = (value: number) => `£${(value / 100).toFixed(2)}`;

  return (
    <span className="font-mono text-base text-foreground">
      {format(cents)}
      {compareAtCents && compareAtCents > cents && (
        <span className="ml-2 text-foreground-muted line-through">{format(compareAtCents)}</span>
      )}
    </span>
  );
}
