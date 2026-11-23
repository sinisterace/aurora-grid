import type { ReactNode } from "react";
import { Building2, Sparkles, Monitor } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export type TopNavStep = string;

export interface TopNavItem {
  id: string;
  label: string;
  icon: ReactNode;
}

export const defaultTopNavItems: TopNavItem[] = [
  { id: "company", label: "Company", icon: <Building2 className="size-4" /> },
  { id: "build", label: "Playground", icon: <Sparkles className="size-4" /> },
  { id: "preview", label: "Preview", icon: <Monitor className="size-4" /> },
];

function NavPill({ icon, label, active }: { icon: ReactNode; label: string; active?: boolean }) {
  return (
    <button
      type="button"
      className={`flex items-center gap-1.5 rounded-full px-3 py-2 font-display text-xs font-semibold tracking-tight transition-all sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm ${
        active
          ? "bg-background/80 text-foreground"
          : "text-muted-foreground hover:bg-background hover:text-foreground"
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

/** Sticky, centered pill navigation with a theme toggle and a back button. */
export function TopNav({
  active,
  onBack,
  items = defaultTopNavItems,
}: {
  active: TopNavStep;
  onBack?: () => void;
  items?: TopNavItem[];
}) {
  return (
    <div className="sticky top-4 z-30 mx-auto w-full max-w-6xl px-6">
      <div className="relative flex items-center justify-center">
        <nav className="flex items-center rounded-full bg-background/40 p-1 ring-1 ring-border/30 backdrop-blur-md">
          {items.map((item) => (
            <NavPill key={item.id} icon={item.icon} label={item.label} active={active === item.id} />
          ))}
        </nav>
        <div className="absolute right-0 flex items-center gap-2">
          <ThemeToggle />
          {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="glass glass-hover rounded-full px-4 py-2 font-display text-xs font-semibold tracking-tight"
          >
            ← Back
          </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopNav;
