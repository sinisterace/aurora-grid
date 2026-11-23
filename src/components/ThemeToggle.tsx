import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

type Mode = "dark" | "light";

/** Toggles a `light` class on <html> and remembers the choice in localStorage. */
export function ThemeToggle({ storageKey = "aurora-grid-theme" }: { storageKey?: string }) {
  const [mode, setMode] = useState<Mode>("light");

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey) as Mode | null;
    if (stored) setMode(stored);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", mode === "light");
    window.localStorage.setItem(storageKey, mode);
  }, [mode, storageKey]);

  return (
    <button
      type="button"
      aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
      onClick={() => setMode(mode === "dark" ? "light" : "dark")}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 bg-background/80 text-foreground/70 transition-colors hover:bg-background hover:text-foreground sm:h-10 sm:w-10"
    >
      {mode === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
