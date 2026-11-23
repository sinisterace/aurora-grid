import { useState } from "react";
import { Building2, Sparkles, Monitor, ArrowRight } from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";
import { cn } from "../lib/cn";
import { auroraWave as wave, sparklePink } from "../art";

const steps = [
  { id: "company", icon: Building2, label: "Company" },
  { id: "playground", icon: Sparkles, label: "Playground" },
  { id: "preview", icon: Monitor, label: "Preview" },
] as const;

function StepNav({ active = "company" }: { active?: string }) {
  return (
    <nav className="inline-flex items-center gap-1 rounded-full bg-background/40 p-1.5 ring-1 ring-border/30 backdrop-blur-md">
      {steps.map((s, i) => {
        const Icon = s.icon;
        const isActive = s.id === active;
        const isPast = steps.findIndex((x) => x.id === active) > i;
        return (
          <div key={s.id} className="flex items-center">
            <button
              type="button"
              className={cn(
                "flex items-center gap-2 rounded-full px-3 py-2 font-display text-xs font-semibold tracking-tight transition-all sm:px-4",
                isActive
                  ? "bg-background/85 text-foreground shadow-sm"
                  : isPast
                    ? "text-foreground/80 hover:bg-background/50"
                    : "text-muted-foreground hover:bg-background/40 hover:text-foreground",
              )}
            >
              <span
                className={cn(
                  "grid size-5 place-items-center rounded-full text-[10px]",
                  isActive
                    ? "bg-[var(--color-electric)] text-white"
                    : isPast
                      ? "bg-[var(--color-signal)]/20 text-[var(--color-signal)]"
                      : "bg-muted text-muted-foreground",
                )}
              >
                {isPast ? "✓" : i + 1}
              </span>
              <span className="hidden sm:inline">{s.label}</span>
            </button>
          </div>
        );
      })}
    </nav>
  );
}

const fields = [
  {
    id: "firstName",
    label: "First name",
    placeholder: "Ada",
    type: "text",
    autoComplete: "given-name",
    width: "half",
  },
  {
    id: "lastName",
    label: "Last name",
    placeholder: "Lovelace",
    type: "text",
    autoComplete: "family-name",
    width: "half",
  },
  {
    id: "website",
    label: "Company website",
    placeholder: "acme.com",
    type: "text",
    autoComplete: "url",
    width: "full",
  },
  {
    id: "industry",
    label: "Industry",
    placeholder: "Technology",
    type: "text",
    autoComplete: "organization-title",
    width: "half",
  },
  {
    id: "email",
    label: "Work email",
    placeholder: "ada@acme.com",
    type: "email",
    autoComplete: "email",
    width: "full",
  },
] as const;

export interface LeadFormData {
  firstName: string;
  lastName: string;
  website: string;
  industry: string;
  email: string;
  [key: string]: string;
}


interface LeadFormProps {
  onBack: () => void;
  onSubmitted?: (data: LeadFormData) => void;
}

export function LeadForm({ onBack, onSubmitted }: LeadFormProps) {
  const [sent, setSent] = useState(false);

  return (
    <section className="relative min-h-screen overflow-hidden">
      <img
        src={wave}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-full w-full object-cover opacity-[0.55] [mask-image:linear-gradient(to_bottom,black_20%,transparent_90%)] dark:opacity-[0.45]"
      />

      <div className="sticky top-4 z-30 mx-auto w-full max-w-7xl px-6 pt-4">
        <div className="relative flex items-center justify-center">
          <StepNav active="company" />
          <div className="absolute right-0 flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={onBack}
              className="rounded-full border border-border/40 bg-background/70 px-4 py-2 font-display text-xs font-semibold tracking-tight text-foreground backdrop-blur-xl transition hover:bg-background"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-7rem)] max-w-[88rem] flex-col gap-8 px-6 py-8 lg:flex-row lg:items-center lg:gap-12 lg:py-0">
        <div className="flex flex-col justify-center lg:w-[38%] lg:pt-0">
          <img
            src={sparklePink}
            alt=""
            aria-hidden
            className="pointer-events-none mb-6 w-16 lg:w-20 floating sparkle-glow"
          />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-violet-glow)]">
            Start your build
          </span>
          <h2 className="mt-4 max-w-lg text-4xl leading-[1.05] md:text-5xl lg:text-[3.4rem] font-display text-foreground">
            Tell us about your company.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-foreground/70">
            We'll use these details to tailor an interactive playground to your industry, and preview a branded assistant experience for your customers.
          </p>
        </div>

        <div className="flex flex-1 justify-center">
          <form
            className="w-full max-w-[680px] rounded-[2.5rem] border border-border/50 bg-surface/80 p-7 shadow-lg backdrop-blur-2xl md:p-10 lg:p-14"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              const fd = new FormData(e.currentTarget);
              const data = Object.fromEntries(
                Array.from(fd.entries()).map(([k, v]) => [k, String(v)]),
              ) as unknown as LeadFormData;
              onSubmitted?.(data);
            }}
          >
            <div className="grid gap-6 sm:grid-cols-2 lg:gap-7">
              {fields.map((f) => (
                <label
                  key={f.id}
                  className={cn(
                    "flex flex-col gap-2.5 text-left",
                    f.width === "full" ? "sm:col-span-2" : "",
                  )}
                >
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-cyan-glow)]">
                    {f.label}
                  </span>
                  <input
                    required
                    name={f.id}
                    type={f.type}
                    autoComplete={f.autoComplete}
                    placeholder={f.placeholder}
                    defaultValue={
                      f.id === "firstName"
                        ? "Ada"
                        : f.id === "lastName"
                          ? "Lovelace"
                          : f.id === "website"
                            ? "acme.com"
                            : f.id === "industry"
                              ? "Retail"
                              : f.id === "email"
                                ? "ada@acme.com"
                                : ""
                    }
                    className="rounded-2xl border border-border/40 bg-background/60 px-5 py-4 text-base text-foreground outline-none placeholder:text-foreground/40 transition focus-visible:border-[var(--color-electric)] focus-visible:ring-1 focus-visible:ring-[var(--color-electric)]/30"
                  />
                </label>
              ))}
            </div>

            <button
              type="submit"
              className="mt-10 flex w-full items-center justify-center gap-2 rounded-full border border-border/40 bg-background/70 px-8 py-5 font-display text-base font-semibold tracking-tight text-foreground shadow-sm transition hover:bg-background hover:shadow-[0_0_30px_rgba(40,199,250,0.15)]"
            >
              {sent ? "Thanks — we'll be in touch" : "Continue"}
              {!sent && <ArrowRight className="size-4.5" />}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
