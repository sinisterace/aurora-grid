import { useState, useEffect } from "react";
import { Hero } from "../components/Hero";
import { LeadForm, type LeadFormData } from "./LeadForm";
import { TopNav } from "../components/TopNav";
import { PlaygroundWorkspace } from "./PlaygroundWorkspace";
import { BuildPreview } from "./BuildPreview";
import { ExperienceLaunch } from "./ExperienceLaunch";
import type { Industry, CardTemplate } from "./data";

export type Step = "hero" | "lead" | "playground" | "build" | "launch";

export interface BuilderFlowProps {
  initialStep?: Step;
  defaultLead?: Partial<LeadFormData>;
  /** Set false if the host app manages the light/dark class itself. */
  manageTheme?: boolean;
  onLeadSubmitted?: (data: LeadFormData) => void;
  onBuildRequested?: (industry: Industry, template: CardTemplate, lead: LeadFormData | undefined) => void;
}

export function BuilderFlow({
  initialStep = "hero",
  defaultLead,
  manageTheme = true,
  onLeadSubmitted,
  onBuildRequested,
}: BuilderFlowProps) {
  const [step, setStep] = useState<Step>(initialStep);
  const [lead, setLead] = useState<LeadFormData | undefined>(() => ({
    firstName: defaultLead?.firstName || "",
    lastName: defaultLead?.lastName || "",
    website: defaultLead?.website || "",
    industry: defaultLead?.industry || "",
    email: defaultLead?.email || "",
  }));
  const [selection, setSelection] = useState<{ industry: Industry; template: CardTemplate } | null>(null);

  useEffect(() => {
    if (!manageTheme) return;
    const root = document.documentElement;
    if (!root.classList.contains("light") && !root.classList.contains("dark")) {
      root.classList.add("light");
    }
  }, [manageTheme]);

  const go = (next: Step) => {
    setStep(next);
    window.scrollTo(0, 0);
  };

  return (
    <main className="page-gradient min-h-screen pb-10">
      {step === "hero" && (
        <Hero
          eyebrow="Design custom"
          title={["Agent", "Interfaces"]}
          subtitle="Interactive cards let an assistant show rich, actionable UI on every channel. Explore the patterns that fit your company."
          ctaLabel="Start designing"
          onStart={() => go("lead")}
        />
      )}

      {step === "lead" && (
        <LeadForm
          onBack={() => go("hero")}
          onSubmitted={(data) => {
            setLead(data);
            onLeadSubmitted?.(data);
            go("playground");
          }}
        />
      )}

      {step === "playground" && (
        <>
          <div className="pt-4">
            <TopNav active="build" onBack={() => go("lead")} />
          </div>
          <PlaygroundWorkspace
            lead={lead}
            onContinue={(industry, template) => {
              setSelection({ industry, template });
              onBuildRequested?.(industry, template, lead);
              go("build");
            }}
          />
        </>
      )}

      {step === "build" && selection && (
        <>
          <div className="pt-4">
            <TopNav active="preview" onBack={() => go("playground")} />
          </div>
          <BuildPreview
            lead={lead}
            industry={selection.industry}
            template={selection.template}
            onDone={() => go("launch")}
          />
        </>
      )}

      {step === "launch" && selection && (
        <>
          <div className="pt-4">
            <TopNav active="preview" onBack={() => go("build")} />
          </div>
          <ExperienceLaunch lead={lead} industry={selection.industry} template={selection.template} />
        </>
      )}
    </main>
  );
}

export default BuilderFlow;
