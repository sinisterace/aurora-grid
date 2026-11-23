// Primitives
export { Hero, type HeroProps } from "./components/Hero";
export { Marquee, type MarqueeProps } from "./components/Marquee";
export { SurfaceMarquee, defaultSurfaces, type SurfaceItem } from "./components/SurfaceMarquee";
export { StepNav } from "./components/StepNav";
export { TopNav, defaultTopNavItems, type TopNavItem } from "./components/TopNav";
export { ThemeToggle } from "./components/ThemeToggle";

// Art (original SVG, no binary assets)
export {
  GlassOrb,
  IndustryArt,
  assistantAvatar,
  auroraWave,
  ombreSpiral,
  sparkleUrl,
  sparkleBlue,
  sparkleLavender,
  sparklePink,
  sparkleTeal,
  sparkleYellow,
} from "./art";

// Example: a complete multi-step builder flow assembled from the kit
export { BuilderFlow, type BuilderFlowProps, type Step } from "./flow/BuilderFlow";
export { LeadForm, type LeadFormData } from "./flow/LeadForm";
export { PlaygroundWorkspace } from "./flow/PlaygroundWorkspace";
export { BuildPreview } from "./flow/BuildPreview";
export { ExperienceLaunch } from "./flow/ExperienceLaunch";
export { industries, type Industry, type CardTemplate, type CardField, type CardPreview } from "./flow/data";

export { cn } from "./lib/cn";
