import { useEffect, useState } from "react";
import { Check, Globe, Layers, Palette, Workflow } from "lucide-react";
import { cn } from "../lib/cn";
import { assistantAvatar, sparkleTeal } from "../art";
import { Hash, MessageSquare, Plug } from "lucide-react";
import type { CardTemplate, Industry } from "./data";

type BuildStep = {
  label: string;
  detail: string;
  icon: typeof Globe;
};

export interface BuildPreviewProps {
  lead?: Record<string, string> | undefined;
  industry: Industry;
  template: CardTemplate;
  onDone?: () => void;
}

export function BuildPreview({ lead, industry, template, onDone }: BuildPreviewProps) {
  const domain = (lead?.["website"] || "your-company.com").replace(/^https?:\/\//, "");
  const brand = domain.split(".")[0] || "your brand";

  const steps: BuildStep[] = [
    { label: `Reading ${domain}`, detail: "Grounding on your public site and brand system", icon: Globe },
    { label: `Learning the ${brand} brand`, detail: "Mapping your identity into accessible interface roles", icon: Palette },
    { label: `Composing ${template.name}`, detail: `Assembling ${template.fieldCount} fields into the interactive card`, icon: Layers },
    { label: "Wiring agent actions", detail: `Binding ${template.actionCount} actions to the ${industry.name} service agent`, icon: Workflow },
    { label: "Building your agent", detail: "Finalizing the runtime for every surface", icon: Globe },
  ];

  const [active, setActive] = useState(1);

  useEffect(() => {
    if (active >= steps.length) {
      if (!onDone) return;
      const done = setTimeout(onDone, 1400);
      return () => clearTimeout(done);
    }
    const t = setTimeout(() => setActive((n) => n + 1), 2600);
    return () => clearTimeout(t);
  }, [active, steps.length, onDone]);

  const current = steps[Math.min(active, steps.length - 1)]!;
  const pct = Math.round((active / steps.length) * 100);
  const remaining = steps.length - active;

  return (
    <section className="relative mx-auto w-full max-w-[86rem] px-6 pt-10 pb-20">
      <img
        src={sparkleTeal}
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-8 top-2 w-14 sparkle-glow floating"
      />

      <div className="inline-flex items-center gap-2.5 rounded-full border border-border/40 bg-background/70 py-1.5 pl-1.5 pr-4 backdrop-blur-xl">
        <span className="grid size-8 place-items-center rounded-full bg-[var(--color-signal)]/15 font-display text-sm font-semibold text-[var(--color-signal)]">
          {brand[0]?.toUpperCase()}
        </span>
        <span className="font-display text-sm font-semibold tracking-tight text-foreground">{domain}</span>
      </div>

      <h1 className="mt-5 max-w-4xl font-display text-4xl leading-[1.02] tracking-tight text-foreground md:text-5xl">
        Your assistant is assembling the experience.
      </h1>
      <p className="mt-4 font-display text-sm font-semibold tracking-tight text-[var(--color-cyan-glow)] md:text-base">
        {current.detail}
      </p>

      <div className="mt-10 grid gap-5 lg:grid-cols-[22rem_1fr]">
        <div className="animate-rise overflow-hidden rounded-[2rem] border border-border/50 bg-surface/80 p-4 backdrop-blur-2xl">
          <div className="flex items-center justify-between px-2 pb-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/50">
              agent build
            </span>
            <span className="font-display text-sm font-semibold tabular-nums text-foreground">{pct}%</span>
          </div>

          <div className="relative overflow-hidden rounded-[1.5rem] border border-border/40 bg-[var(--color-muted)]/40">
            <div className="relative grid h-44 place-items-center overflow-hidden">
              <div
                aria-hidden
                className="absolute size-48 rounded-full bg-gradient-to-br from-[var(--color-electric)]/30 to-[var(--color-signal)]/20 blur-2xl"
              />
              <img
                src={assistantAvatar}
                alt=""
                aria-hidden
                className="relative size-28 floating-slow object-contain drop-shadow-xl"
              />
              <span
                aria-hidden
                className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[var(--color-electric)]/70 to-transparent animate-sweep"
              />
            </div>

            <div className="border-t border-border/40 bg-background/50 px-5 py-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-cyan-glow)]">
                step {Math.min(active + 1, steps.length)} of {steps.length}
              </span>
              <h2 className="mt-1.5 font-display text-lg font-semibold tracking-tight text-foreground">
                {current.label}
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-foreground/60">{current.detail}</p>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 rounded-2xl bg-background/40 p-2 ring-1 ring-border/40">
            {steps.map((s, i) => {
              const done = i < active;
              const isNow = i === active;
              return (
                <span
                  key={s.label}
                  className={cn(
                    "grid h-10 flex-1 place-items-center rounded-lg transition-all duration-500",
                    done
                      ? "bg-[var(--color-signal)]/15 text-[var(--color-signal)]"
                      : isNow
                        ? "bg-[var(--color-electric)]/20 text-[var(--color-cyan-glow)] ring-1 ring-[var(--color-electric)]/50"
                        : "text-foreground/30",
                  )}
                >
                  {done ? <Check className="size-4" /> : <s.icon className="size-4" />}
                </span>
              );
            })}
          </div>

          <div className="flex items-center justify-between px-2 pt-3">
            <span className="flex items-center gap-2 text-xs text-foreground/50">
              <span className="size-1.5 rounded-full bg-[var(--color-signal)] animate-pulse-dot" />
              {remaining > 0 ? "Working in the background" : "Build complete"}
            </span>
            <span className="font-mono text-[11px] text-foreground/50">
              {remaining > 0 ? `${remaining} remaining` : "ready"}
            </span>
          </div>
        </div>

        <div className="animate-rise overflow-hidden rounded-[2rem] border border-border/50 bg-background/40 p-5 backdrop-blur-xl md:p-7">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-0">
            <RuntimeNode label={domain} icon={<Globe className="size-6 text-[var(--color-cyan-glow)]" />} />
            <Wire />
            <div className="relative grid w-full max-w-[15rem] place-items-center rounded-[1.75rem] border border-border/40 bg-surface/80 px-6 py-6 ring-1 ring-[var(--color-electric)]/50 shadow-[0_0_30px_rgba(40,199,250,0.1)]">
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute -top-10 size-40 rounded-full bg-gradient-to-br opacity-70 blur-2xl",
                  industry.accent,
                )}
              />
              <img
                src={assistantAvatar}
                alt=""
                aria-hidden
                className="relative size-20 object-contain drop-shadow-xl"
              />
              <p className="relative mt-3 font-display text-base font-semibold tracking-tight text-foreground">
                Service Agent
              </p>
              <p className="relative text-center text-xs text-foreground/60">
                {industry.name} specialist
              </p>
            </div>
            <Wire />
            <RuntimeNode label={template.name} icon={<Layers className="size-6 text-[var(--color-cyan-glow)]" />} />
          </div>

          <div className="mt-7 rounded-[1.5rem] border border-border/40 bg-[var(--color-muted)]/40 p-5">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/50">
              <span>build log</span>
              <span>secure session</span>
            </div>
            <ul className="mt-4 space-y-2 font-mono text-xs">
              {steps.slice(0, active + 1).map((s, i) => {
                const done = i < active;
                return (
                  <li key={s.label} className="flex items-center gap-3 animate-rise">
                    {done ? (
                      <Check className="size-3.5 shrink-0 text-[var(--color-signal)]" />
                    ) : (
                      <span className="size-1.5 shrink-0 rounded-full bg-[var(--color-electric)] animate-pulse-dot" />
                    )}
                    <span className={done ? "text-foreground/50" : "text-foreground"}>
                      {s.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <SurfaceBuildRow active={active >= steps.length - 1} />
    </section>
  );
}

function RuntimeNode({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <div className="grid w-full max-w-[11rem] place-items-center rounded-3xl border border-border/40 bg-surface/80 px-5 py-6 backdrop-blur-xl">
      {icon}
      <p className="mt-3 truncate text-center font-display text-sm font-semibold tracking-tight text-foreground">
        {label}
      </p>
    </div>
  );
}

function Wire() {
  return (
    <span
      aria-hidden
      className="relative h-6 w-px shrink-0 overflow-hidden bg-gradient-to-b from-transparent via-border to-transparent md:mx-4 md:h-px md:w-14 md:bg-gradient-to-r"
    >
      <span className="absolute inset-0 animate-sweep bg-gradient-to-r from-transparent via-[var(--color-electric)] to-transparent" />
    </span>
  );
}

const surfaces: { name: string; mark: React.ReactNode }[] = [
  { name: "Web", mark: <Globe aria-hidden className="size-4 text-[var(--color-cyan-glow)]" /> },
  { name: "Chat apps", mark: <MessageSquare aria-hidden className="size-4 text-[var(--color-violet-glow)]" /> },
  { name: "Connectors", mark: <Plug aria-hidden className="size-4 text-[var(--color-signal)]" /> },
  { name: "Team chat", mark: <Hash aria-hidden className="size-4 text-[var(--color-electric)]" /> },
];

function SurfaceBuildRow({ active }: { active: boolean }) {
  return (
    <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center justify-center gap-3 md:flex-row">
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/50">
        Building for every surface
      </span>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {surfaces.map((s) => (
          <span
            key={s.name}
            className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-background/60 px-3 py-1.5"
          >
            {s.mark}
            <span className="font-display text-xs font-medium tracking-tight text-foreground">{s.name}</span>
          </span>
        ))}
      </div>
      <span
        className={cn(
          "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold",
          active ? "bg-[var(--color-signal)]/15 text-[var(--color-signal)]" : "bg-[var(--color-electric)]/15 text-[var(--color-cyan-glow)]",
        )}
      >
        {active ? (
          <Check className="size-3" />
        ) : (
          <span className="size-1.5 rounded-full bg-[var(--color-electric)] animate-pulse-dot" />
        )}
        {active ? "Ready" : "In progress"}
      </span>
    </div>
  );
}
