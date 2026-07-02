import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import { HelixVisual } from "@/components/helix-visual";
import { AgentReasoningVisualizer } from "@/components/agent-reasoning-visualizer";

export const Route = createFileRoute("/technology")({
  head: () => ({
    meta: [
      { title: "Technology — Pulse AI" },
      { name: "description", content: "How Pulse AI reasons across patient journeys: data ingestion, multi-agent clinical reasoning, risk synthesis, and clinician-facing output." },
      { property: "og:title", content: "Pulse AI Technology" },
      { property: "og:description", content: "Agentic clinical reasoning, explained." },
    ],
  }),
  component: TechPage,
});

const steps = [
  { n: "01", title: "Data ingestion", body: "Structured and unstructured signals from EHRs, monitoring devices and clinical documentation are normalised into a unified patient timeline." },
  { n: "02", title: "Multi-agent clinical reasoning", body: "Specialised agents reason in parallel — vitals, oncology context, medication history, recent imaging — and exchange evidence as they form a shared view." },
  { n: "03", title: "Risk synthesis", body: "A synthesis layer weighs agent outputs against clinically validated trajectories to produce a calibrated, time-bound deterioration risk." },
  { n: "04", title: "Clinician-facing output", body: "Risk is delivered as a transparent, auditable summary — not an opaque score — with the underlying evidence one click away." },
];

function TechPage() {
  return (
    <>
      <section className="container-page py-24 md:py-32 max-w-4xl">
        <div>
          <Reveal>
            <p className="eyebrow">Technology & R&D</p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              How the AI thinks.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-text-muted">
              Pulse AI is built around agentic clinical reasoning — a structured way for specialised models to deliberate over a patient's full journey and surface deterioration risk a clinician can audit.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-hairline bg-bg-panel transition-colors duration-300">
        <div className="container-page py-24">
          <div className="grid gap-y-16 md:grid-cols-2 md:gap-x-16">
            {steps.map((s) => (
              <Reveal key={s.n}>
                <p className="eyebrow">{s.n}</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">{s.title}</h3>
                <p className="mt-4 text-text-muted">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-hairline bg-bg-panel transition-colors duration-300">
        <div className="container-page pb-24">
          <Reveal>
            <AgentReasoningVisualizer />
          </Reveal>
        </div>
      </section>

      <section className="container-page py-24 md:py-32">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Data foundation</p>
          <h2 className="mt-5 text-3xl font-bold tracking-tight md:text-4xl">
            Real patient journeys, not curated benchmarks.
          </h2>
          <p className="mt-6 text-text-muted">
            Our models are trained and validated on longitudinal patient data from active NHS collaborations — capturing the noise, gaps and ambiguity of real care, rather than the polished synthetic datasets common in academic ML.
          </p>
        </Reveal>
      </section>

      <section className="border-t border-hairline bg-bg-panel">
        <div className="container-page py-24">
          <Reveal>
            <p className="eyebrow">Patents</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Three patents filed.</h2>
            <ul className="mt-8 max-w-2xl divide-y divide-hairline border-y border-hairline">
              {["Agentic reasoning architecture for clinical risk", "Patient-journey representation for longitudinal models", "Calibrated risk synthesis with clinician-facing evidence"].map((t) => (
                <li key={t} className="flex items-baseline justify-between gap-6 py-5">
                  <span className="text-text-primary">{t}</span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Filed</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="container-page py-24">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">R&D partnerships</p>
          <h2 className="mt-5 text-3xl font-bold tracking-tight md:text-4xl">
            Research with the people who'll use it.
          </h2>
          <p className="mt-5 text-text-muted">
            Active collaborations with NHS trusts, UK academic groups and clinical AI funders. New research partnerships open by enquiry.
          </p>
        </Reveal>
      </section>
    </>
  );
}
