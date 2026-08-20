import { buttonClassName } from "@/components/ui/button";

type EmptyStateProps = {
  message: string;
  actionLabel: string;
  actionHref: string;
  // Optional — for an empty state inside an overlay (e.g. the cart
  // drawer), so the overlay can close itself before the link navigates.
  onAction?: () => void;
};

export function EmptyState({ message, actionLabel, actionHref, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <p className="max-w-sm font-display text-xl text-foreground">{message}</p>
      <a href={actionHref} onClick={onAction} className={buttonClassName("primary", "md")}>
        {actionLabel}
      </a>
    </div>
  );
}
