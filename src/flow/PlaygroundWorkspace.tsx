import { useState } from "react";
import {
  ArrowRight,
  Braces,
  Check,
  ChevronDown,
  Hammer,
  Layers,
  Mic,
  MoreVertical,
  Plus,
  Sparkles,
} from "lucide-react";
import { industries, type CardTemplate, type Industry } from "./data";
import { cn } from "../lib/cn";
import { assistantAvatar, IndustryArt, sparkleTeal, sparkleYellow as sparkleDreamYellow } from "../art";

type Tab = "structure" | "data";

const tabs: { id: Tab; label: string; icon: typeof Layers }[] = [
  { id: "structure", label: "Structure", icon: Layers },
  { id: "data", label: "Data", icon: Braces },
];

const toneClass = {
  signal: "border-[var(--color-signal)]/40 bg-[var(--color-signal)]/10 text-[var(--color-signal)]",
  warn: "border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 text-[var(--color-accent)]",
  info: "border-[var(--color-electric)]/40 bg-[var(--color-electric)]/10 text-[var(--color-cyan-glow)]",
} as const;

function cardPath(industry: Industry, template: CardTemplate) {
  const seg = (s: string) =>
    s
      .split(/[-\s&·]+/)
      .filter(Boolean)
      .map((w) => w[0]!.toUpperCase() + w.slice(1).toLowerCase())
      .join("");
  return `cards/${seg(industry.id)}${seg(template.id)}`.slice(0, 42);
}

function RenderedCard({ template, brand }: { template: CardTemplate; brand: string }) {
  const p = template.preview;
  return (
    <div className="mx-auto w-full max-w-md animate-rise">
      <div className="relative flex h-[38rem] flex-col overflow-hidden rounded-[2rem] border border-border/50 bg-surface/80 shadow-2xl backdrop-blur-xl">
        <header className="flex shrink-0 items-center gap-3 px-6 py-5">
          <span className="truncate font-display text-xl font-semibold tracking-tight text-foreground">
            {brand} Service Agent
          </span>
          <span className="ml-auto flex items-center gap-3 text-foreground/60">
            <MoreVertical className="size-5" />
            <ChevronDown className="size-5" />
          </span>
        </header>

        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 pb-28">
          <div className="flex items-start gap-3">
            <img
              src={assistantAvatar}
              alt=""
              aria-hidden
              className="size-9 shrink-0 rounded-lg object-contain"
            />
            <div className="min-w-0">
              <div className="rounded-3xl bg-foreground/[0.07] px-4 py-3 text-sm leading-relaxed text-foreground">
                Here are the order details.
              </div>
              <p className="mt-1.5 text-xs text-foreground/50">Assistant</p>
            </div>
          </div>

          <article className="overflow-hidden rounded-3xl border border-border/50 bg-background/60">
            <header className="flex items-start justify-between gap-4 border-b border-border/50 px-5 py-4">
              <div className="min-w-0">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-cyan-glow)]">
                  {p.eyebrow}
                </span>
                <h4 className="mt-1.5 truncate font-display text-lg font-semibold tracking-tight text-foreground">
                  {p.title}
                </h4>
                <p className="mt-1 text-xs text-foreground/60">{p.subtitle}</p>
              </div>
              <span
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-widest",
                  toneClass[p.badge.tone],
                )}
              >
                {p.badge.label}
              </span>
            </header>

            <div className="grid grid-cols-3 divide-x divide-border/50 border-b border-border/50">
              {p.metrics.map((m) => (
                <div key={m.label} className="px-4 py-3">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-foreground/50">
                    {m.label}
                  </p>
                  <p className="mt-1 font-display text-base font-semibold tracking-tight text-foreground">
                    {m.value}
                  </p>
                </div>
              ))}
            </div>

            <ul className="divide-y divide-border/40">
              {p.rows.map((r) => (
                <li key={r.label} className="flex items-center justify-between gap-4 px-5 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm text-foreground">{r.label}</p>
                    {r.meta && (
                      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-foreground/50">
                        {r.meta}
                      </p>
                    )}
                  </div>
                  <span className="shrink-0 font-mono text-sm text-foreground">{r.value}</span>
                </li>
              ))}
            </ul>

            <footer className="flex flex-wrap items-center gap-2 border-t border-border/50 px-5 py-4">
              {p.actions.map((a, i) => (
                <button
                  key={a}
                  type="button"
                  className={cn(
                    "rounded-full px-4 py-2 font-display text-xs font-semibold tracking-tight",
                    i === 0
                      ? "border border-border/40 bg-background/70 text-foreground"
                      : "border border-border/60 text-foreground/70",
                  )}
                >
                  {a}
                </button>
              ))}
            </footer>
          </article>
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-background/95 px-4 pb-4 pt-3 backdrop-blur-sm">
          <div className="flex items-center gap-3 rounded-full bg-background px-5 py-4 ring-1 ring-border/60 shadow-lg">
            <Plus className="size-5 shrink-0 text-foreground/70" />
            <span className="flex-1 truncate text-sm text-foreground/50">
              What can I help you with?
            </span>
            <Mic className="size-5 shrink-0 text-foreground/70" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Structure({ template }: { template: CardTemplate }) {
  return (
    <div className="h-full space-y-2 overflow-auto rounded-3xl border border-border/50 bg-background/40 p-4 backdrop-blur-xl">
      <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/50">
        {template.id}.structure
      </div>
      {template.fields.map((f) => (
        <div
          key={f.name}
          className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl border border-border/40 bg-background/60 px-4 py-3 font-mono text-xs"
        >
          <span className="text-foreground">
            {f.name}
            {f.required && <span className="text-[var(--color-accent)]">*</span>}
          </span>
          <span className="text-foreground/50">{f.type}</span>
          <span className="ml-auto rounded-md border border-[var(--color-electric)]/30 bg-[var(--color-electric)]/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-[var(--color-cyan-glow)]">
            slot: {f.slot}
          </span>
          {f.note && <span className="w-full text-[10px] text-foreground/60">{f.note}</span>}
        </div>
      ))}
    </div>
  );
}

function Data({ template }: { template: CardTemplate }) {
  const json = JSON.stringify(template.payload, null, 2);
  return (
    <div className="h-full overflow-hidden rounded-3xl border border-border/50 bg-background/40 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-border/50 px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-foreground/50">
        <span>{template.id}.payload.json</span>
        <button
          type="button"
          onClick={() => void navigator.clipboard?.writeText(json)}
          className="transition hover:text-foreground"
        >
          Copy
        </button>
      </div>
      <pre className="max-h-full overflow-auto px-5 py-4 font-mono text-[11px] leading-relaxed text-[var(--color-cyan-glow)]/90">
        {json.split("\n").map((line, i) => (
          <div key={i} className="flex gap-4">
            <span className="select-none text-foreground/40">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="whitespace-pre">{line}</span>
          </div>
        ))}
      </pre>
    </div>
  );
}

function Personalization({ brand }: { brand: string }) {
  const palette = [
    { id: "electric", label: "Electric", cls: "bg-gradient-to-br from-[var(--color-electric)] to-[var(--color-cyan-glow)]" },
    { id: "lavender", label: "Lavender", cls: "bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent)]/50" },
    { id: "signal", label: "Signal", cls: "bg-gradient-to-br from-[var(--color-signal)] to-[var(--color-signal)]/50" },
    { id: "ink", label: "Ink", cls: "bg-foreground/80" },
  ];
  const [swatch, setSwatch] = useState(palette[0]!.id);

  return (
    <section className="animate-rise relative overflow-hidden rounded-[2rem] border border-border/50 bg-surface/80 px-5 py-5 shadow-sm backdrop-blur-2xl md:px-6">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-32 size-[26rem] rounded-full bg-gradient-to-br from-[var(--color-electric)]/30 to-transparent blur-3xl"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px animate-sweep bg-gradient-to-r from-transparent via-[var(--color-electric)]/70 to-transparent"
      />

      <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-electric)]/12 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-cyan-glow)]">
            <Sparkles className="size-3" /> live website profile
          </span>

          <div className="mt-3 flex items-start gap-4">
            <span
              className="grid size-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[var(--color-electric)] to-[var(--color-cyan-glow)] shadow-lg shadow-[var(--color-electric)]/20 ring-1 ring-white/20 font-display text-2xl font-semibold text-background md:size-20 md:text-3xl"
              aria-label={`${brand} logo placeholder`}
            >
              {brand.slice(0, 1).toUpperCase()}
            </span>
            <div className="flex flex-col justify-center">
              <p className="max-w-md text-sm leading-snug text-foreground/70">
                Acme blends digital self-service with human-led support across retail, support,
                and field operations, refining its experience from real-time website and CRM
                signals.
              </p>
            </div>
          </div>
        </div>

        <div className="min-w-0 space-y-2">
          <ul className="space-y-1">
            {[
              "Fast, personalized resolutions across every channel.",
              "Unified knowledge, CRM data, and live agent context.",
              "Scalable, brand-consistent experiences on every surface.",
              "Continuous improvement through AI-assisted insights.",
            ].map((s, i) => (
              <li
                key={i}
                className="flex items-start gap-2"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <Check className="mt-0.5 size-4 shrink-0 text-[var(--color-signal)]" />
                <span className="text-sm leading-snug text-foreground/90">{s}</span>
              </li>
            ))}
          </ul>

          <div className="mt-2 space-y-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-foreground/50">
              brand palette
            </span>
            <span className="flex items-center gap-2">
              {palette.map((c) => {
                const on = c.id === swatch;
                return (
                  <button
                    key={c.id}
                    type="button"
                    title={c.label}
                    aria-label={c.label}
                    aria-pressed={on}
                    onClick={() => setSwatch(c.id)}
                    className={cn(
                      "size-7 rounded-sm transition-all duration-200",
                      c.cls,
                      on
                        ? "scale-110 ring-2 ring-foreground/70 ring-offset-2 ring-offset-background"
                        : "opacity-60 hover:opacity-100 hover:scale-105",
                    )}
                  />
                );
              })}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export interface PlaygroundWorkspaceProps {
  onContinue?: (industry: Industry, template: CardTemplate) => void;
  lead?: Record<string, string> | undefined;
}

export function PlaygroundWorkspace({ onContinue, lead }: PlaygroundWorkspaceProps) {
  const brand = (
    lead?.["company"] ||
    (lead?.["website"] || "your-company.com").replace(/^https?:\/\//, "").split(".")[0] ||
    "Your brand"
  ).trim();
  const [industry, setIndustry] = useState<Industry>(industries[0]!);
  const [template, setTemplate] = useState<CardTemplate>(industries[0]!.templates[0]!);
  const [tab, setTab] = useState<Tab>("structure");
  const [nonce, setNonce] = useState(0);
  const [panelWidth, setPanelWidth] = useState(384);

  const startResize = (e: React.PointerEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startW = panelWidth;
    const move = (ev: PointerEvent) => {
      const next = Math.min(720, Math.max(300, startW - (ev.clientX - startX)));
      setPanelWidth(next);
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const pickIndustry = (ind: Industry) => {
    setIndustry(ind);
    setTemplate(ind.templates[0]!);
    setTab("structure");
  };

  return (
    <div className="relative mx-auto w-full max-w-[86rem] px-6 pt-8 pb-32">
      <img
        src={sparkleTeal}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -top-4 right-6 w-14 sparkle-glow floating"
      />

      <Personalization brand={brand} />

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {industries.map((ind) => {
          const active = ind.id === industry.id;
          return (
            <button
              key={ind.id}
              type="button"
              onClick={() => pickIndustry(ind)}
              className={cn(
                "group relative flex flex-col items-center overflow-hidden rounded-[1.75rem] border border-border/40 bg-background/60 px-3 pt-6 pb-4 transition-all duration-300 hover:-translate-y-1.5 hover:bg-background",
                active && "ring-1 ring-[var(--color-electric)]/60 shadow-[0_0_30px_rgba(40,199,250,0.12)]",
              )}
            >
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute -top-16 left-1/2 size-52 -translate-x-1/2 rounded-full bg-gradient-to-br blur-2xl transition-opacity duration-500",
                  ind.accent,
                  active ? "opacity-100" : "opacity-45 group-hover:opacity-80",
                )}
              />
              <IndustryArt
                industry={ind.id}
                className="relative h-32 w-32 drop-shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 md:h-36 md:w-36"
              />
              <span className="relative mt-2 flex w-full items-center justify-between gap-2">
                <span className="text-left font-display text-[13px] font-semibold leading-tight tracking-tight text-foreground">
                  {ind.name}
                </span>
                {active ? (
                  <Check className="size-4 shrink-0 text-[var(--color-signal)]" />
                ) : (
                  <ArrowRight className="size-4 shrink-0 text-foreground/40 transition group-hover:translate-x-0.5 group-hover:text-foreground" />
                )}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {industry.templates.map((t, i) => {
          const active = t.id === template.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setTemplate(t);
                setTab("structure");
              }}
              className={cn(
                "group relative flex items-start gap-3 rounded-3xl border border-border/40 bg-background/60 px-4 py-4 text-left transition-colors hover:bg-background",
                active && "ring-1 ring-[var(--color-electric)]/60 shadow-[0_0_30px_rgba(40,199,250,0.12)]",
              )}
            >
              <span className="font-mono text-lg tabular-nums text-foreground/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-sm font-semibold tracking-tight text-foreground">
                  {t.name}
                </span>
                <span className="mt-1 block line-clamp-2 text-xs leading-relaxed text-foreground/60">
                  {t.summary}
                </span>
              </span>
              {active ? (
                <Check className="mt-1 size-4 shrink-0 text-[var(--color-signal)]" />
              ) : (
                <ArrowRight className="mt-1 size-4 shrink-0 text-foreground/40 transition group-hover:translate-x-0.5 group-hover:text-foreground" />
              )}
            </button>
          );
        })}
      </div>

      <section className="mt-5 overflow-hidden rounded-[2rem] border border-border/50 bg-background/40 backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-3 border-b border-border/50 px-5 py-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl border border-border/40 bg-background/70 overflow-hidden">
            <img
              src={sparkleDreamYellow}
              alt=""
              aria-hidden
              className="size-9 object-contain"
            />
          </span>
          <span className="min-w-0">
            <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/50">
              agent action
            </span>
            <span className="block truncate font-display text-lg font-semibold tracking-tight text-foreground">
              {template.name}
            </span>
            <span className="block truncate font-mono text-[11px] text-[var(--color-cyan-glow)]/90">
              {cardPath(industry, template)}
            </span>
          </span>

          <span className="ml-auto flex flex-wrap items-center gap-2">
            <span className="flex items-center rounded-full bg-background/40 p-1 ring-1 ring-border/40 backdrop-blur-md">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-3.5 py-1.5 font-display text-xs font-semibold tracking-tight transition-all",
                    tab === t.id
                      ? "bg-background/85 text-foreground shadow-sm"
                      : "text-foreground/50 hover:text-foreground",
                  )}
                >
                  <t.icon className="size-4" />
                  {t.label}
                </button>
              ))}
            </span>
          </span>
        </div>

        <div className="bg-[var(--color-muted)]/30 p-5 md:p-7">
          <div
            className="grid min-h-[40rem] gap-5 lg:[grid-template-columns:1fr_var(--panel-w)]"
            style={{ ["--panel-w" as string]: `${panelWidth}px` }}
          >
            <div className="min-w-0">
              <RenderedCard key={`${template.id}-${nonce}`} template={template} brand={brand} />
            </div>

            <div className="animate-rise relative min-w-0">
              <span
                role="separator"
                aria-orientation="vertical"
                aria-label="Resize panel"
                onPointerDown={startResize}
                className="absolute -left-4 top-0 hidden h-full w-4 cursor-col-resize items-center justify-center lg:flex"
              >
                <span className="h-16 w-1 rounded-full bg-border transition-colors hover:bg-[var(--color-electric)]" />
              </span>
              {tab === "structure" ? <Structure template={template} /> : <Data template={template} />}
            </div>
          </div>
        </div>
      </section>

      {onContinue && (
        <div className="fixed bottom-6 left-1/2 z-40 w-[calc(100%-3rem)] max-w-3xl -translate-x-1/2 animate-rise">
          <div className="flex items-center gap-4 rounded-[2rem] border border-border/60 bg-background px-4 py-3.5 pr-5 shadow-2xl ring-1 ring-[var(--color-electric)]/30">
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl border border-border/40 bg-background/70 overflow-hidden">
              <IndustryArt industry={industry.id} className="size-9" />
            </span>

            <span className="min-w-0 flex-1">
              <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/50">
                building {industry.name.toLowerCase()}
              </span>
              <span className="block truncate font-display text-sm font-semibold tracking-tight text-foreground">
                {template.name}
              </span>
            </span>

            <button
              type="button"
              onClick={() => onContinue(industry, template)}
              className="group flex shrink-0 items-center gap-2 rounded-full bg-foreground px-5 py-3 font-display text-sm font-semibold tracking-tight text-background shadow-lg transition hover:bg-foreground/90"
            >
              <Hammer className="size-4" />
              Build your experience
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
