"use client";

import { useId, type InputHTMLAttributes } from "react";

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  helperText?: string;
  error?: string;
};

export function FormField({ label, helperText, error, id, ...props }: FormFieldProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={fieldId}
        aria-invalid={!!error}
        aria-describedby={error ? `${fieldId}-error` : helperText ? `${fieldId}-helper` : undefined}
        className={[
          "h-11 rounded-sm border bg-surface px-3.5 text-base text-foreground placeholder:text-foreground-muted/60",
          "transition-colors duration-base ease-standard",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
          error ? "border-cherry-600" : "border-foreground/15 focus:border-accent",
        ].join(" ")}
        {...props}
      />
      {error ? (
        <p id={`${fieldId}-error`} className="text-sm text-cherry-600">
          {error}
        </p>
      ) : helperText ? (
        <p id={`${fieldId}-helper`} className="text-sm text-foreground-muted">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
