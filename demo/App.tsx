import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, Layers, Sparkles, Wand2 } from "lucide-react";
import {
  BuilderFlow,
  Hero,
  IndustryArt,
  StepNav,
  SurfaceMarquee,
  TopNav,
  assistantAvatar,
  industries,
  sparkleBlue,
  sparkleLavender,
  sparklePink,
  sparkleTeal,
  sparkleYellow,
} from "../src";

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const on = () => setHash(window.location.hash);
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return hash;
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-6 py-16">
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-violet-glow)]">{eyebrow}</span>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function Gallery() {
  return (
    <main className="page-gradient min-h-screen pb-24">
      <Hero
        onStart={() => document.getElementById("surfaces")?.scrollIntoView({ behavior: "smooth" })}
        ctaLabel="Explore the kit"
      />

      <Section id="surfaces" eyebrow="01 · Surfaces" title="Panels over the aurora">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="glass glass-hover glass-shine rounded-[2rem] p-7">
            <Layers className="size-6 text-[var(--color-cyan-glow)]" />
            <h3 className="mt-4 font-display text-xl font-semibold">.glass</h3>
            <p className="mt-2 text-sm text-muted-foreground">Frosted, saturated backdrop blur with a hairline edge. Add .glass-hover and .glass-shine for interaction.</p>
          </div>
          <div className="surface rounded-[2rem] p-7">
            <Wand2 className="size-6 text-[var(--color-violet-glow)]" />
            <h3 className="mt-4 font-display text-xl font-semibold">.surface</h3>
            <p className="mt-2 text-sm text-muted-foreground">An opaque panel for dense content, tuned separately for light and dark.</p>
          </div>
          <div className="glass glow-ring rounded-[2rem] p-7">
            <Sparkles className="size-6 text-[var(--color-signal)]" />
            <h3 className="mt-4 font-display text-xl font-semibold">.glow-ring</h3>
            <p className="mt-2 text-sm text-muted-foreground">A soft electric halo for primary actions and focused elements.</p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button className="glass glass-hover glass-shine glow-ring inline-flex items-center gap-3 rounded-full px-8 py-4 font-display font-semibold">
            Primary action <ArrowRight className="size-4" />
          </button>
          <button className="glass glass-hover rounded-full px-6 py-3 font-display text-sm font-semibold">Secondary</button>
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-signal)]/12 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-signal)]">
            <span className="size-1.5 rounded-full bg-[var(--color-signal)] animate-pulse-dot" /> Live
          </span>
          <span className="text-gradient font-display text-2xl font-semibold">Gradient text</span>
        </div>
      </Section>

      <Section id="navigation" eyebrow="02 · Navigation" title="Pill nav and steppers">
        <div className="glass relative rounded-[2rem] py-6">
          <TopNav active="build" onBack={() => {}} />
        </div>
        <div className="mt-6 flex flex-wrap gap-4">
          <StepNav step={1} />
          <StepNav step={2} labels={["Connect", "Configure", "Launch"]} />
        </div>
      </Section>

      <Section id="motion" eyebrow="03 · Motion" title="Marquee">
        <SurfaceMarquee />
      </Section>

      <Section id="art" eyebrow="04 · Art" title="Sparkles, avatar, and industry tiles">
        <div className="flex flex-wrap items-end gap-6">
          {[sparkleTeal, sparkleBlue, sparkleLavender, sparklePink, sparkleYellow].map((src, i) => (
            <img key={src} src={src} alt="" className="w-16 animate-sparkle sparkle-glow" style={{ animationDelay: `${i * 0.4}s` }} />
          ))}
          <img src={assistantAvatar} alt="Assistant avatar" className="ml-4 size-16" />
        </div>
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-5">
          {industries.map((ind) => (
            <div key={ind.id} className="glass flex flex-col items-center gap-2 rounded-[1.75rem] p-4 text-center">
              <IndustryArt industry={ind.id} className="w-24" />
              <span className="font-display text-xs font-semibold">{ind.name}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section id="flow" eyebrow="05 · Example" title="A complete builder flow">
        <p className="max-w-2xl text-muted-foreground">
          Five screens assembled from the kit: hero, intake form, playground with live card preview, a build
          sequence, and a multi-channel launch view.
        </p>
        <a href="#flow-demo" className="glass glass-hover glow-ring mt-6 inline-flex items-center gap-3 rounded-full px-8 py-4 font-display font-semibold">
          Open the flow <ArrowRight className="size-4" />
        </a>
      </Section>
    </main>
  );
}

export function App() {
  const hash = useHashRoute();
  if (hash.startsWith("#flow-demo")) {
    const step = hash.split("/")[1] as "hero" | "lead" | "playground" | undefined;
    return <BuilderFlow key={hash} initialStep={step ?? "hero"} />;
  }
  return <Gallery />;
}
