import { cn } from "../lib/cn";

interface StepNavProps {
  step: 1 | 2 | 3;
  labels?: [string, string, string];
}

export function StepNav({
  step,
  labels = ["Company", "Playground", "Preview"],
}: StepNavProps) {
  const steps = labels.map((label, i) => {
    const number = i + 1;
    const active = number === step;
    const completed = number < step;

    return (
      <div
        key={label}
        className={cn(
          "flex items-center gap-3 px-3 sm:px-5 py-2 rounded-full transition-all",
          active && "bg-foreground/5",
        )}
      >
        <span
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold",
            active || completed
              ? "bg-foreground text-background"
              : "bg-surface-2 text-foreground/50",
          )}
        >
          {number}
        </span>
        <span
          className={cn(
            "hidden text-sm font-medium sm:block",
            active ? "text-foreground" : "text-foreground/50",
          )}
        >
          {label}
        </span>
      </div>
    );
  });

  return (
    <nav className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 p-2 shadow-sm backdrop-blur-xl">
      {steps}
    </nav>
  );
}
