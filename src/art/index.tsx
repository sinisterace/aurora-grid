/**
 * Original vector art for the kit: glass sparkles, an assistant avatar,
 * ambient gradient plates, and industry glass tiles.
 *
 * Everything is generated SVG (no raster files and no third-party brand
 * marks), so the kit has no binary assets and nothing to license. Swap
 * any of these for your own artwork.
 */
import type { CSSProperties } from "react";
import {
  Factory,
  GraduationCap,
  HeartPulse,
  Landmark,
  Plane,
  Scale,
  ShieldCheck,
  ShoppingBag,
  Thermometer,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "../lib/cn";

const svgUrl = (svg: string) => `data:image/svg+xml;utf8,${encodeURIComponent(svg.replace(/\s+/g, " ").trim())}`;

/* ------------------------------------------------------------------------- */
/* Sparkles: a four-point star with a soft halo and a specular highlight      */
/* ------------------------------------------------------------------------- */

const STAR =
  "M60 6 C63.5 41 79 56.5 114 60 C79 63.5 63.5 79 60 114 C56.5 79 41 63.5 6 60 C41 56.5 56.5 41 60 6 Z";

export function sparkleUrl(core: string, edge: string) {
  return svgUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
      <defs>
        <radialGradient id="g" cx="46%" cy="42%" r="62%">
          <stop offset="0" stop-color="#ffffff"/>
          <stop offset="0.32" stop-color="${core}"/>
          <stop offset="1" stop-color="${edge}"/>
        </radialGradient>
        <filter id="h" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="7"/>
        </filter>
      </defs>
      <path d="${STAR}" fill="${core}" opacity="0.55" filter="url(#h)"/>
      <path d="${STAR}" fill="url(#g)"/>
      <ellipse cx="53" cy="47" rx="9" ry="3.6" fill="#ffffff" opacity="0.75" transform="rotate(-40 53 47)"/>
    </svg>`);
}

export const sparkleTeal = sparkleUrl("#5eead4", "#0891b2");
export const sparkleBlue = sparkleUrl("#7dd3fc", "#2563eb");
export const sparkleLavender = sparkleUrl("#c4b5fd", "#7c3aed");
export const sparklePink = sparkleUrl("#f9a8d4", "#db2777");
export const sparkleYellow = sparkleUrl("#fde68a", "#f59e0b");

/* ------------------------------------------------------------------------- */
/* Assistant avatar: a glass orb with an inner sparkle                        */
/* ------------------------------------------------------------------------- */

export const assistantAvatar = svgUrl(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
    <defs>
      <linearGradient id="o" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#a78bfa"/>
        <stop offset="0.55" stop-color="#38bdf8"/>
        <stop offset="1" stop-color="#2dd4bf"/>
      </linearGradient>
      <radialGradient id="s" cx="35%" cy="28%" r="55%">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.85"/>
        <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <circle cx="48" cy="48" r="44" fill="url(#o)"/>
    <circle cx="48" cy="48" r="44" fill="url(#s)"/>
    <circle cx="48" cy="48" r="43" fill="none" stroke="#ffffff" stroke-opacity="0.45" stroke-width="2"/>
    <path d="M48 26 C49.6 42 54 46.4 70 48 C54 49.6 49.6 54 48 70 C46.4 54 42 49.6 26 48 C42 46.4 46.4 42 48 26 Z" fill="#ffffff" opacity="0.95"/>
  </svg>`);

/* ------------------------------------------------------------------------- */
/* Ambient plates: soft blurred colour fields for section backgrounds         */
/* ------------------------------------------------------------------------- */

export const auroraWave = svgUrl(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
    <defs>
      <filter id="b" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="90"/></filter>
    </defs>
    <g filter="url(#b)">
      <ellipse cx="380" cy="260" rx="420" ry="190" fill="#8b5cf6" opacity="0.55"/>
      <ellipse cx="900" cy="180" rx="460" ry="170" fill="#38bdf8" opacity="0.45"/>
      <ellipse cx="1320" cy="320" rx="360" ry="200" fill="#ec4899" opacity="0.35"/>
      <ellipse cx="760" cy="520" rx="520" ry="160" fill="#2dd4bf" opacity="0.25"/>
    </g>
  </svg>`);

export const ombreSpiral = svgUrl(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
    <defs>
      <radialGradient id="r" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="#fde68a" stop-opacity="0.9"/>
        <stop offset="0.45" stop-color="#f472b6" stop-opacity="0.55"/>
        <stop offset="1" stop-color="#8b5cf6" stop-opacity="0"/>
      </radialGradient>
      <filter id="b"><feGaussianBlur stdDeviation="30"/></filter>
    </defs>
    <circle cx="400" cy="400" r="360" fill="url(#r)" filter="url(#b)"/>
  </svg>`);

/* ------------------------------------------------------------------------- */
/* Industry glass tiles                                                       */
/* ------------------------------------------------------------------------- */

export type IndustryArtKey =
  | "retail"
  | "financial-services"
  | "healthcare"
  | "insurance"
  | "manufacturing"
  | "energy"
  | "travel"
  | "public-sector"
  | "legal"
  | "hvac";

const INDUSTRY_ART: Record<IndustryArtKey, { Icon: LucideIcon; from: string; to: string }> = {
  retail: { Icon: ShoppingBag, from: "#2dd4bf", to: "#0284c7" },
  "financial-services": { Icon: Landmark, from: "#f472b6", to: "#f59e0b" },
  healthcare: { Icon: HeartPulse, from: "#38bdf8", to: "#fb7185" },
  insurance: { Icon: ShieldCheck, from: "#34d399", to: "#0ea5e9" },
  manufacturing: { Icon: Factory, from: "#818cf8", to: "#2563eb" },
  energy: { Icon: Zap, from: "#fbbf24", to: "#10b981" },
  travel: { Icon: Plane, from: "#e879f9", to: "#fb923c" },
  "public-sector": { Icon: GraduationCap, from: "#a78bfa", to: "#38bdf8" },
  legal: { Icon: Scale, from: "#22d3ee", to: "#fbbf24" },
  hvac: { Icon: Thermometer, from: "#7dd3fc", to: "#fb7185" },
};

/** A tilted glass tile with a gradient core and a white glyph. Scales with `className`. */
export function IndustryArt({
  industry,
  className,
  style,
}: {
  industry: IndustryArtKey | string;
  className?: string;
  style?: CSSProperties;
}) {
  const art = INDUSTRY_ART[industry as IndustryArtKey] ?? INDUSTRY_ART.retail;
  const { Icon } = art;
  return (
    <span
      aria-hidden
      className={cn("relative inline-grid aspect-square place-items-center", className)}
      style={style}
    >
      <span
        className="absolute inset-[8%] rounded-[28%] blur-xl opacity-60"
        style={{ background: `linear-gradient(135deg, ${art.from}, ${art.to})` }}
      />
      <span
        className="absolute inset-[12%] rotate-[-8deg] rounded-[26%] border border-white/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_18px_40px_-18px_rgba(15,23,42,0.6)]"
        style={{
          background: `linear-gradient(140deg, ${art.from}ee, ${art.to}cc), radial-gradient(circle at 30% 22%, #ffffffb0, transparent 55%)`,
          backgroundBlendMode: "screen",
        }}
      />
      <span className="absolute inset-[12%] rotate-[-8deg] rounded-[26%] bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,0.75),transparent_42%)]" />
      <Icon className="relative size-[38%] rotate-[-8deg] text-white drop-shadow-[0_4px_10px_rgba(15,23,42,0.35)]" strokeWidth={1.8} />
    </span>
  );
}

/* ------------------------------------------------------------------------- */
/* Glass orb: the default hero visual                                         */
/* ------------------------------------------------------------------------- */

/**
 * Layered, slowly drifting glass orbs. CSS-only, so there's no WebGL and no
 * extra dependencies. Pass your own visual to <Hero visual={...}> to replace it.
 */
export function GlassOrb({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("relative aspect-square w-full", className)}>
      <div className="absolute inset-[6%] rounded-full bg-[conic-gradient(from_200deg,#8b5cf6,#38bdf8,#2dd4bf,#f472b6,#8b5cf6)] opacity-50 blur-3xl animate-drift" />
      <div className="glass absolute inset-[14%] rounded-full animate-float-slow" />
      <div
        className="absolute inset-[22%] rounded-full opacity-90 animate-float-slow"
        style={{
          animationDelay: "-3s",
          background:
            "radial-gradient(circle at 32% 26%, rgba(255,255,255,0.85), transparent 38%), linear-gradient(135deg, rgba(139,92,246,0.85), rgba(56,189,248,0.75) 55%, rgba(45,212,191,0.7))",
          boxShadow: "inset 0 -24px 60px rgba(15,23,42,0.35), 0 40px 120px -30px rgba(56,189,248,0.55)",
        }}
      />
      <div className="absolute inset-[22%] rounded-full border border-white/40" />
      <img src={sparkleYellow} alt="" className="absolute right-[18%] top-[16%] w-[14%] animate-sparkle sparkle-glow" />
      <img
        src={sparkleTeal}
        alt=""
        className="absolute bottom-[20%] left-[16%] w-[10%] animate-sparkle sparkle-glow"
        style={{ animationDelay: "1.4s" }}
      />
    </div>
  );
}
