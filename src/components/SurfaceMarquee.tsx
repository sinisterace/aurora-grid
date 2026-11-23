import type { ReactNode } from "react";
import { Globe, Hash, MessageSquare, Mic, Smartphone, SquareTerminal, type LucideIcon } from "lucide-react";
import { Marquee } from "./Marquee";

export interface SurfaceItem {
  name: string;
  /** Any node: an icon, an <img>, or your own logo. */
  mark?: ReactNode;
}

const icon = (Icon: LucideIcon) => <Icon aria-hidden className="size-5 text-[var(--color-cyan-glow)]" />;

export const defaultSurfaces: SurfaceItem[] = [
  { name: "Web", mark: icon(Globe) },
  { name: "Chat", mark: icon(MessageSquare) },
  { name: "Team chat", mark: icon(Hash) },
  { name: "Mobile", mark: icon(Smartphone) },
  { name: "Voice", mark: icon(Mic) },
  { name: "Developer tools", mark: icon(SquareTerminal) },
];

const Pill = ({ name, mark }: SurfaceItem) => (
    <div className="group flex shrink-0 items-center gap-3 pr-8 pl-8 [border-right:1px_solid_var(--color-border)]">
      {mark && <span className="flex items-center transition">{mark}</span>}
      <span className="font-display text-base font-medium uppercase tracking-[0.14em] whitespace-nowrap text-foreground/70 transition group-hover:text-foreground">
        {name}
      </span>
    </div>
);

/** A slow, hover-pausable marquee of labelled pills, e.g. the channels a product ships to. */
export function SurfaceMarquee({
  items = defaultSurfaces,
  ariaLabel = "Supported surfaces",
}: {
  items?: SurfaceItem[];
  ariaLabel?: string;
}) {
  return (
    <div className="relative border-y border-border py-4">
      <Marquee ariaLabel={ariaLabel} duration={28}>
        {items.map((item) => (
          <Pill key={item.name} {...item} />
        ))}
      </Marquee>
    </div>
  );
}
