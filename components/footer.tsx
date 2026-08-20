import { BatchStamp } from "@/components/ui/batch-stamp";
import { SITE } from "@/lib/site-config";
import { HOURS_DISPLAY } from "@/lib/hours";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-inverse-background text-inverse-foreground">
      <BatchStamp
        origin=""
        altitude=""
        process=""
        roastedOn=""
        size="watermark"
        className="pointer-events-none absolute -right-24 -top-24 text-inverse-foreground"
      />
      <div className="relative mx-auto grid max-w-(--container-brand) gap-10 px-6 py-16 md:px-10 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">{SITE.name}</p>
          <p className="mt-2 max-w-sm text-sm text-inverse-foreground/70">
            Roasted in small batches. Every bag ships within a week of its roast date.
          </p>
        </div>
        <div className="text-sm text-inverse-foreground/80">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-inverse-foreground/50">
            Find us
          </p>
          <p className="mt-2">{SITE.addressLine1}</p>
          <p>{SITE.addressLine2}</p>
          <p className="mt-2">
            <a href={SITE.phoneHref} className="hover:text-inverse-foreground">
              {SITE.phone}
            </a>
          </p>
          <p>
            <a href={`mailto:${SITE.email}`} className="hover:text-inverse-foreground">
              {SITE.email}
            </a>
          </p>
        </div>
        <div className="text-sm text-inverse-foreground/80">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-inverse-foreground/50">
            Hours
          </p>
          <dl className="mt-2 space-y-1">
            {HOURS_DISPLAY.map((row) => (
              <div key={row.label} className="flex justify-between gap-4">
                <dt>{row.label}</dt>
                <dd className="font-mono">{row.hours}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </footer>
  );
}
