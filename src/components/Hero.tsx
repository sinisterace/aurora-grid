import type { ReactNode } from "react";
import { GlassOrb, sparkleBlue, sparkleLavender, sparkleTeal, sparkleYellow } from "../art";
import { ThemeToggle } from "./ThemeToggle";
import { SurfaceMarquee, type SurfaceItem } from "./SurfaceMarquee";

function Sparkle({ src, className, delay }: { src: string; className: string; delay: string }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden
      className={`pointer-events-none absolute animate-sparkle sparkle-glow select-none ${className}`}
      style={{ animationDelay: delay }}
    />
  );
}

export interface HeroProps {
  /** Small uppercase line above the headline. */
  eyebrow?: string;
  /** One or two headline lines. The second line gets the gradient treatment in dark mode. */
  title?: [string] | [string, string];
  subtitle?: ReactNode;
  ctaLabel?: string;
  onStart?: () => void;
  /** Right-hand visual. Defaults to an animated glass orb. */
  visual?: ReactNode;
  /** Items for the marquee rail along the bottom. Pass [] to hide it. */
  surfaces?: SurfaceItem[];
  /** Optional background image behind the hero wash. */
  backgroundImage?: string;
  showThemeToggle?: boolean;
}

export function Hero({
  eyebrow = "Design system",
  title = ["Aurora", "Grid"],
  subtitle = "Aurora light, a blueprint grid, and luminous type for AI-native products, in midnight and daylight.",
  ctaLabel = "Get started",
  onStart,
  visual,
  surfaces,
  backgroundImage,
  showThemeToggle = true,
}: HeroProps) {
  const [line1, line2] = title;

  return (
    <header className="relative isolate flex min-h-screen flex-col overflow-hidden">
      {/* background plate */}
      <div
        aria-hidden
        className="hero-plate pointer-events-none absolute inset-0 -z-10 bg-cover bg-center"
        style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
      />
      <div aria-hidden className="hero-wash pointer-events-none absolute inset-0 -z-10" />
      {/* light grid */}
      <div
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,black,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-b from-transparent to-background"
      />

      {showThemeToggle && (
        <div className="absolute top-5 right-5 z-30">
          <ThemeToggle />
        </div>
      )}

      <div className="relative flex flex-1 items-center px-6 py-10 lg:py-14">
        <div className="relative mx-auto w-full max-w-[90rem]">
          <div className="relative z-30 max-w-3xl overflow-visible lg:max-w-4xl">
            <Sparkle src={sparkleTeal} className="-left-10 -top-20 w-16 opacity-70 sm:w-20" delay="0s" />

            <h1 className="animate-rise relative z-20 overflow-visible pointer-events-none font-display">
              <span className="block text-3xl font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:text-4xl lg:text-5xl">
                {eyebrow}
              </span>
              <span className="headline-ghost mt-4 block text-[5.5rem] font-semibold leading-[0.88] tracking-[-0.035em] sm:text-[7rem] lg:text-[8.5rem] xl:text-[10rem]">
                <span className="block dark:text-white dark:drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                  {line1}
                </span>
                {line2 && (
                  <span className="block dark:bg-gradient-to-b dark:from-white dark:via-white dark:to-cyan-300 dark:bg-clip-text dark:text-transparent dark:drop-shadow-[0_0_40px_rgba(34,211,238,0.2)]">
                    {line2}
                  </span>
                )}
              </span>
            </h1>

            {subtitle && (
              <p
                className="mt-8 max-w-2xl animate-rise text-xl leading-relaxed text-muted-foreground sm:text-2xl lg:max-w-3xl"
                style={{ animationDelay: "0.12s" }}
              >
                {subtitle}
              </p>
            )}

            {onStart && (
              <button
                type="button"
                onClick={onStart}
                className="glass glass-hover glass-shine glow-ring group mt-10 inline-flex animate-rise items-center gap-4 rounded-full px-14 py-6 font-display text-lg font-semibold tracking-tight text-foreground"
                style={{ animationDelay: "0.2s" }}
              >
                {ctaLabel}
                <span
                  aria-hidden
                  className="text-xl transition-transform duration-300 group-hover:translate-x-1.5"
                >
                  →
                </span>
              </button>
            )}

            <Sparkle
              src={sparkleYellow}
              className="-bottom-14 left-1/3 hidden w-16 opacity-60 lg:block"
              delay="1.6s"
            />
          </div>

          {/* visual, anchored right and aligned with the CTA */}
          <div className="pointer-events-none absolute top-[58%] right-0 z-10 hidden w-[46vw] max-w-[26rem] -translate-y-1/2 translate-x-[4%] md:block lg:w-[48vw] lg:max-w-[40rem] lg:translate-x-[10%] xl:w-[50vw] xl:max-w-[46rem] xl:translate-x-[12%]">
            <Sparkle src={sparkleBlue} className="-top-6 right-[18%] w-20 opacity-80 sm:w-28" delay="0.8s" />
            <Sparkle
              src={sparkleLavender}
              className="-bottom-8 right-[22%] w-16 opacity-70 sm:w-24"
              delay="2.4s"
            />
            <div aria-hidden className="logo-halo relative aspect-square w-full max-h-[68vh]">
              {visual ?? <GlassOrb className="mx-auto h-full w-auto max-w-full" />}
            </div>
          </div>
        </div>
      </div>

      {/* marquee rail */}
      {(surfaces === undefined || surfaces.length > 0) && (
        <div className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-6">
          <div className="mx-auto w-full max-w-[90rem]">
            <div className="max-w-2xl">
              <SurfaceMarquee items={surfaces} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Hero;
