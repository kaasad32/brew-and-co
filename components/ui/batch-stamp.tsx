type BatchStampSize = "lg" | "sm" | "watermark";

type BatchStampProps = {
  origin: string;
  altitude: string;
  process: string;
  roastedOn: string;
  size?: BatchStampSize;
  className?: string;
};

const DIMENSIONS: Record<BatchStampSize, number> = { lg: 240, sm: 72, watermark: 480 };

export function BatchStamp({
  origin,
  altitude,
  process,
  roastedOn,
  size = "lg",
  // Default only applies when the caller omits className entirely — this
  // way an override always fully replaces it instead of competing with it
  // in the generated stylesheet, where two same-specificity `text-*`
  // utilities are ordered by Tailwind's build, not by className string
  // order (see docs/design/style-guide.md's CSS-specificity note).
  className = "text-roast-900",
}: BatchStampProps) {
  const dimension = DIMENSIONS[size];
  const rimId = `stamp-rim-${size}`;
  const decorative = size === "watermark";

  return (
    <svg
      viewBox="0 0 240 240"
      width={dimension}
      height={dimension}
      className={`${size === "watermark" ? "opacity-[0.06] " : ""}${className}`}
      role={decorative ? "presentation" : "img"}
      aria-hidden={decorative || undefined}
      aria-label={
        decorative ? undefined : `${origin}, ${altitude}, ${process}, roasted ${roastedOn}`
      }
    >
      <circle
        cx="120"
        cy="120"
        r="112"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray={size === "sm" ? "2 4" : "3 6"}
      />
      <path
        id={rimId}
        fill="none"
        d="M 120,120 m -96,0 a 96,96 0 1,1 192,0 a 96,96 0 1,1 -192,0"
      />
      {size !== "sm" && (
        <text fontFamily="var(--font-mono)" fontSize="11" letterSpacing="3" fill="currentColor">
          <textPath href={`#${rimId}`} startOffset="0%">
            BREW &amp; CO &#183; SINGLE ORIGIN &#183; BREW &amp; CO &#183; SINGLE ORIGIN &#183;
          </textPath>
        </text>
      )}
      {size === "lg" && (
        <g fontFamily="var(--font-mono)" fill="currentColor" textAnchor="middle">
          <text x="120" y="105" fontSize="13" fontWeight="500">
            {origin.toUpperCase()}
          </text>
          <text x="120" y="125" fontSize="10" opacity="0.75">
            {altitude} &#183; {process}
          </text>
          <text x="120" y="145" fontSize="10" opacity="0.75">
            {roastedOn}
          </text>
        </g>
      )}
    </svg>
  );
}
