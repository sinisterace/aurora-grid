import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Paperclip, Sparkles } from "lucide-react";
import { cn } from "../lib/cn";
import { assistantAvatar, ombreSpiral as ombre, sparklePink, sparkleTeal, sparkleYellow } from "../art";
import { Globe, Hash, MessageSquare, Plug } from "lucide-react";
import type { CardTemplate, Industry } from "./data";

type Surface = {
  id: string;
  name: string;
  kind: string;
  chrome: "site" | "channel" | "app" | "connector";
  mark: React.ReactNode;
};

const marks = {
  site: <Globe aria-hidden className="size-5 text-[var(--color-cyan-glow)]" />,
  app: <MessageSquare aria-hidden className="size-5 text-[var(--color-violet-glow)]" />,
  connector: <Plug aria-hidden className="size-5 text-[var(--color-signal)]" />,
  channel: <Hash aria-hidden className="size-5 text-[var(--color-electric)]" />,
};

const surfaces: Surface[] = [
  { id: "site", name: "Web site", kind: "Branded assistant site", chrome: "site", mark: marks.site },
  { id: "app", name: "Chat app", kind: "Connected app surface", chrome: "app", mark: marks.app },
  { id: "connector", name: "Connector", kind: "MCP connector surface", chrome: "connector", mark: marks.connector },
  { id: "channel", name: "Team chat", kind: "Internal assistant channel", chrome: "channel", mark: marks.channel },
];

export interface ExperienceLaunchProps {
  lead?: Record<string, string> | undefined;
  industry: Industry;
  template: CardTemplate;
}

export function ExperienceLaunch({ lead, industry, template }: ExperienceLaunchProps) {
  const domain = (lead?.["website"] || "your-company.com")
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");
  const brand = (lead?.["company"] || domain.split(".")[0] || "Your brand").trim();
  const agentUrl = `https://${domain.split("/")[0]}/agent`;

  const [live, setLive] = useState(1);
  const [active, setActive] = useState(surfaces[0]!.id);

  useEffect(() => {
    if (live >= surfaces.length) return;
    const t = setTimeout(() => setLive((n) => n + 1), 650);
    return () => clearTimeout(t);
  }, [live]);

  const activeSurface = surfaces.find((s) => s.id === active)!;

  return (
    <section className="relative mx-auto w-full max-w-[92rem] px-6 pt-8 pb-24">
      <img
        src={sparkleYellow}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -top-2 right-10 w-14 sparkle-glow floating"
      />
      <img
        src={sparkleTeal}
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-40 top-40 hidden w-9 sparkle-glow floating-slow lg:block"
      />
      <img
        src={sparklePink}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-2 top-64 hidden w-8 sparkle-glow floating-slow xl:block"
      />

      <div className="animate-rise relative overflow-hidden rounded-[2rem] border border-border/50 bg-surface/80 px-6 py-7 shadow-sm backdrop-blur-2xl md:px-8">
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute -right-32 -top-40 size-[30rem] rounded-full bg-gradient-to-br opacity-30 blur-3xl",
            industry.accent,
          )}
        />
        <img
          src={ombre}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -left-10 top-1/2 h-[150%] max-w-none -translate-y-1/2 object-contain opacity-45 light:opacity-60"
          style={{
            maskImage:
              "radial-gradient(130% 110% at 0% 50%, black 45%, rgba(0,0,0,0.5) 70%, transparent 95%)",
            WebkitMaskImage:
              "radial-gradient(130% 110% at 0% 50%, black 45%, rgba(0,0,0,0.5) 70%, transparent 95%)",
          }}
        />

        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-background/55 via-background/25 to-transparent"
        />

        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-electric)]/70 to-transparent animate-sweep"
        />

        <div className="relative">
          <div className="flex flex-wrap items-start gap-x-6 gap-y-4">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-signal)]/12 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-signal)]">
                <span className="size-1.5 rounded-full bg-[var(--color-signal)] animate-pulse-dot" />
                experience ready
              </span>
              <h1 className="mt-2 font-display text-3xl leading-[1.02] tracking-tight text-foreground md:text-[2.6rem]">
                {brand} Service Agent
              </h1>
            </div>
          </div>

          <CardSpec template={template} industry={industry} />
        </div>
      </div>

      <div className="sticky top-5 z-30 mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {surfaces.map((s, i) => {
          const isActive = s.id === active;
          const isLive = i < live;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(s.id)}
              aria-pressed={isActive}
              className={cn(
                "group relative isolate flex items-center gap-3.5 overflow-hidden rounded-[1.3rem] border border-border/40 bg-surface/80 px-4 py-4 text-left transition-all duration-300",
                isActive
                  ? "-translate-y-0.5 border-[var(--color-electric)]/50 shadow-lg"
                  : "opacity-80 hover:-translate-y-0.5 hover:opacity-100 hover:bg-background",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-[var(--color-electric)] transition-transform duration-300",
                  isActive ? "scale-x-100" : "scale-x-0",
                )}
              />
              <span
                className={cn(
                  "relative grid size-11 shrink-0 place-items-center rounded-[0.9rem] bg-background/60 ring-1 transition-transform duration-300",
                  isActive ? "scale-105 ring-[var(--color-electric)]/40" : "ring-border/50 group-hover:scale-105",
                )}
              >
                {s.mark}
              </span>
              <span
                className={cn(
                  "relative min-w-0 flex-1 truncate font-display text-[1.05rem] font-semibold tracking-tight transition-colors",
                  isActive ? "text-foreground" : "text-foreground/50 group-hover:text-foreground",
                )}
              >
                {s.name}
              </span>
              {isLive ? (
                <Check
                  className={cn(
                    "relative size-4 shrink-0 transition-colors",
                    isActive ? "text-[var(--color-signal)]" : "text-[var(--color-signal)]/60",
                  )}
                />
              ) : (
                <span className="relative size-1.5 shrink-0 rounded-full bg-[var(--color-electric)] animate-pulse-dot" />
              )}
            </button>
          );
        })}
      </div>

      <SurfacePreview
        key={activeSurface.id}
        surface={activeSurface}
        template={template}
        industry={industry}
        brand={brand}
        domain={domain}
        agentUrl={agentUrl}
      />
    </section>
  );
}

function pascal(s: string) {
  return s
    .split(/[-\s&·_]+/)
    .filter(Boolean)
    .map((w) => w[0]!.toUpperCase() + w.slice(1).toLowerCase())
    .join("");
}

function CardSpec({ template, industry }: { template: CardTemplate; industry: Industry }) {
  const capability = `${template.id.replace(/[-\s]+/g, "_").toLowerCase()}_finder`.replace(
    /_finder_finder$/,
    "_finder",
  );
  const apiName = `${pascal(industry.id)}${pascal(template.id)}Card`;
  const recordId = `rec_${template.id.replace(/[^a-z0-9]/gi, "").slice(0, 8).padEnd(8, "0")}`;

  const rows = [
    { label: "Experience", value: template.name, mono: false },
    { label: "Capability", value: capability, mono: true },
    { label: "Card type", value: apiName, mono: true },
    { label: "Record type", value: template.preview.eyebrow, mono: false },
    { label: "Record id", value: recordId, mono: true },
  ];

  return (
    <div className="animate-rise mt-5 overflow-hidden rounded-[1.75rem] border border-border/40 bg-background/60 px-5 py-5 md:px-7">
      <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/50">
        type contract
      </span>
      <dl className="mt-3.5 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((r) => (
          <div
            key={r.label}
            className="flex min-w-0 flex-col gap-1 border-b border-border/30 pb-2.5 last:border-0"
          >
            <dt className="font-mono text-[9px] uppercase tracking-[0.22em] text-foreground/50">
              {r.label}
            </dt>
            <dd
              className={cn(
                "truncate text-sm",
                r.mono
                  ? "font-mono text-[12px] text-[var(--color-cyan-glow)]/90"
                  : "font-display font-semibold tracking-tight text-foreground",
              )}
            >
              {r.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function SurfacePreview({
  surface,
  template,
  industry,
  brand,
  domain,
  agentUrl,
}: {
  surface: Surface;
  template: CardTemplate;
  industry: Industry;
  brand: string;
  domain: string;
  agentUrl: string;
}) {
  const handle = brand.toLowerCase().replace(/\s+/g, "-");
  const label =
    surface.chrome === "channel"
      ? `#${handle}-support`
      : surface.chrome === "app"
        ? `${brand} app`
        : surface.chrome === "connector"
          ? `${brand} connector`
          : agentUrl.replace(/^https?:\/\//, "");

  return (
    <div className="animate-rise relative mt-5 overflow-hidden rounded-[2.25rem] border border-border/50 bg-surface/80 p-3 shadow-sm backdrop-blur-2xl md:p-5">
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -right-24 -top-28 size-[26rem] rounded-full bg-gradient-to-br opacity-40 blur-3xl",
          industry.accent,
        )}
      />

      <div className="relative overflow-hidden rounded-[1.75rem] border border-border/40 bg-background/70">
        <div className="flex items-center gap-3 border-b border-border/40 bg-background/80 px-5 py-3.5">
          <span aria-hidden className="hidden gap-1.5 sm:flex">
            <span className="size-2.5 rounded-full bg-foreground/15" />
            <span className="size-2.5 rounded-full bg-foreground/15" />
            <span className="size-2.5 rounded-full bg-foreground/15" />
          </span>
          <span className="flex min-w-0 items-center gap-2 rounded-full border border-border/40 bg-background/60 px-3.5 py-1.5 backdrop-blur-md">
            <span className="grid size-4 shrink-0 place-items-center">{surface.mark}</span>
            <span className="truncate font-mono text-[11px] text-foreground/50">{label}</span>
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-[var(--color-signal)]/12 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.24em] text-[var(--color-signal)]">
            <span className="size-1 rounded-full bg-[var(--color-signal)] animate-pulse-dot" />
            headless
          </span>
        </div>

        {surface.chrome === "site" ? (
          <SitePanel
            brand={brand}
            domain={domain}
            agentUrl={agentUrl}
            template={template}
            industry={industry}
          />
        ) : (
          <ChatPanel surface={surface} brand={brand} template={template} />
        )}
      </div>
    </div>
  );
}

function SitePanel({
  brand,
  domain,
  agentUrl,
  template,
  industry,
}: {
  brand: string;
  domain: string;
  agentUrl: string;
  template: CardTemplate;
  industry: Industry;
}) {
  const grounding = [
    { label: "Grounded on 12 FAQ answers from your website" },
    { label: `Personalized site branded to ${brand}'s colors, logo & FAQ` },
  ];

  return (
    <div className="relative grid min-h-[38rem] gap-10 px-6 py-10 md:grid-cols-[1.05fr_1fr] md:items-center md:px-12 md:py-14">
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-[0.18]",
          industry.accent,
        )}
      />

      <div className="relative min-w-0">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.26em] text-foreground/50 backdrop-blur">
          <span className="relative flex size-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-cyan-glow)]/70" />
            <span className="relative size-1.5 rounded-full bg-[var(--color-cyan-glow)]" />
          </span>
          {domain}
        </span>

        <h2 className="mt-5 font-display text-[2.4rem] leading-[1.02] tracking-tight text-foreground md:text-[3.4rem]">
          {brand} agent is live
        </h2>

        <ul className="mt-6 space-y-3">
          {grounding.map((g) => (
            <li key={g.label} className="flex items-start gap-3">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[var(--color-cyan-glow)]/20 text-[var(--color-cyan-glow)] ring-1 ring-[var(--color-cyan-glow)]/40">
                <Check className="size-3" strokeWidth={3} />
              </span>
              <span className="text-sm leading-relaxed text-foreground/80 md:text-[0.95rem]">
                {g.label}
              </span>
            </li>
          ))}
        </ul>

        <a
          href={agentUrl}
          target="_blank"
          rel="noreferrer"
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 font-display text-sm font-semibold tracking-tight text-background shadow-xl transition hover:bg-foreground/90"
        >
          Open your site
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>

      <div className="relative grid place-items-center">
        <span
          aria-hidden
          className="pointer-events-none absolute size-64 rounded-full bg-gradient-to-br from-[var(--color-electric)]/40 to-[var(--color-signal)]/25 blur-3xl"
        />
        <span aria-hidden className="pointer-events-none absolute size-60 rounded-full border border-[var(--color-electric)]/25" />
        <span aria-hidden className="pointer-events-none absolute size-72 rounded-full border border-border/40" />
        <img
          src={assistantAvatar}
          alt=""
          aria-hidden
          className="relative size-44 floating-slow object-contain drop-shadow-2xl md:size-56"
        />
        <span className="absolute bottom-0 inline-flex items-center gap-2 rounded-full border border-border/40 bg-surface/80 px-3.5 py-1.5 font-display text-xs font-semibold tracking-tight text-foreground backdrop-blur-md">
          <Sparkles className="size-3.5 text-[var(--color-cyan-glow)]" />
          Service Assistant
        </span>
      </div>
    </div>
  );
}

function ChatPanel({
  surface,
  brand,
  template,
}: {
  surface: Surface;
  brand: string;
  template: CardTemplate;
}) {
  return (
    <div className="relative grid min-h-[38rem] md:min-h-[42rem] md:grid-cols-[13rem_1fr]">
      <div className="hidden flex-col gap-1.5 border-r border-border/40 bg-background/50 px-4 py-6 md:flex">
        <span className="px-2 font-mono text-[9px] uppercase tracking-[0.24em] text-foreground/50">
          {surface.name}
        </span>
        {[`${brand} Service Agent`, "Order lookups", "Escalations", "Account history"].map(
          (item, i) => (
            <span
              key={item}
              className={cn(
                "truncate rounded-xl px-3 py-2 text-xs",
                i === 0
                  ? "bg-foreground/[0.07] font-semibold ring-1 ring-border/40 text-foreground"
                  : "text-foreground/50",
              )}
            >
              {item}
            </span>
          ),
        )}
      </div>

      <div className="flex min-w-0 flex-col">
        <div className="flex-1 space-y-5 px-5 py-7 md:px-10 md:py-9">
          <p className="ml-auto w-fit max-w-[70%] rounded-2xl rounded-br-md bg-foreground/[0.07] px-4 py-2.5 text-xs text-foreground/50 md:text-sm">
            Can you pull this up for me?
          </p>

          <div className="flex items-start gap-3">
            <img src={assistantAvatar} alt="" aria-hidden className="size-8 shrink-0 object-contain" />
            <div className="min-w-0 flex-1">
              <p className="w-fit rounded-2xl rounded-tl-md bg-background/85 px-4 py-2.5 text-xs leading-relaxed ring-1 ring-border/40 text-foreground md:text-sm">
                Here are the {template.preview.eyebrow.toLowerCase()} details.
              </p>

              <div className="mt-3 max-w-2xl overflow-hidden rounded-[1.25rem] border border-border/50 bg-surface/80 p-4 md:p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-display text-sm font-semibold tracking-tight text-foreground md:text-base">
                    {template.preview.title}
                  </span>
                  <span className="rounded-md bg-[var(--color-signal)]/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--color-signal)]">
                    {template.preview.badge.label}
                  </span>
                </div>
                <div className="mt-3.5 space-y-2">
                  {template.preview.rows.map((r) => (
                    <span
                      key={r.label}
                      className="flex items-center justify-between gap-3 border-b border-border/30 pb-2 last:border-0 last:pb-0"
                    >
                      <span className="truncate text-[11px] text-foreground/50 md:text-xs">
                        {r.label}
                      </span>
                      <span className="truncate font-mono text-[11px] text-foreground md:text-xs">{r.value}</span>
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {template.preview.actions.map((a, i) => (
                    <span
                      key={a}
                      className={cn(
                        "rounded-lg px-3 py-1.5 text-[10px] font-semibold md:text-[11px]",
                        i === 0
                          ? "bg-foreground/90 text-background"
                          : "ring-1 ring-border/50 text-foreground/50",
                      )}
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border/40 bg-background/60 px-5 py-4 md:px-10">
          <div className="flex items-center gap-3 rounded-full border border-border/40 bg-surface/80 px-4 py-3 backdrop-blur-md">
            <Paperclip className="size-3.5 shrink-0 text-foreground/50" />
            <span className="truncate text-xs text-foreground/50">
              Message {brand} Service Agent…
            </span>
            <span className="ml-auto grid size-7 shrink-0 place-items-center rounded-full bg-foreground/90">
              <ArrowUpRight className="size-3.5 -rotate-45 text-background" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
