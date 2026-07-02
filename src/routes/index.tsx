import { createFileRoute, Link } from "@tanstack/react-router";
import { PulseTimeline } from "@/components/pulse-timeline";
import { HelixVisual } from "@/components/helix-visual";
import { Reveal } from "@/components/reveal";
import { PulseDashboardDemo } from "@/components/pulse-dashboard-demo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pulse AI — Predicting patient deterioration before crisis" },
      { name: "description", content: "Agentic clinical AI that helps clinicians identify deterioration risk earlier — starting in oncology, with remote monitoring and rehabilitation live today." },
      { property: "og:title", content: "Pulse AI — Agentic clinical AI" },
      { property: "og:description", content: "Predicting patient deterioration before crisis happens." },
    ],
  }),
  component: HomePage,
});

const proof = [
  "NHS clinician on the founding team",
  "Barts Health collaboration",
  "Backed by Innovate UK & Cancer Research UK",
  "Three patents filed",
  "Live with Marengo for rehabilitation",
];

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container-page py-20 md:py-32 max-w-4xl">
          <div>
            <p className="eyebrow">Agentic clinical AI</p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-text-primary sm:text-5xl md:text-[64px]">
              Predicting patient deterioration{" "}
              <span className="text-gradient">before crisis</span> happens.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-text-muted">
              Pulse AI combines clinical data, patient monitoring and agentic AI to help clinicians identify risk earlier — starting with cancer care.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/support"
                className="inline-flex h-12 items-center rounded-full bg-accent-pulse px-6 text-sm font-medium text-white hover:bg-[#196f4a]"
              >
                Partner with us
              </Link>
              <Link
                to="/technology"
                className="inline-flex h-12 items-center rounded-full border border-hairline bg-white/20 backdrop-blur-sm px-6 text-sm font-medium text-text-primary hover:bg-white/30 transition-all duration-300"
              >
                Learn about our technology
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-hairline bg-white/10 backdrop-blur-sm">
        <div className="container-page py-10">
          <div className="flex flex-wrap items-center justify-center gap-12 md:justify-between">
            <img src={`${import.meta.env.BASE_URL}nhs.png`} alt="NHS logo" className="h-16 w-auto object-contain opacity-80" />
            <img src={`${import.meta.env.BASE_URL}barts.png`} alt="Barts Health logo" className="h-20 w-auto object-contain opacity-80" />
            <img src={`${import.meta.env.BASE_URL}innovateuk.png`} alt="Innovate UK logo" className="h-16 w-auto object-contain opacity-80" />
            <img src={`${import.meta.env.BASE_URL}cruk.png`} alt="Cancer Research UK logo" className="h-20 w-auto object-contain opacity-80" />
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="container-page py-24 md:py-32">
        <Reveal className="mx-auto max-w-4xl">
          <p className="eyebrow">The problem</p>
          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-text-primary md:text-5xl">
            Most deterioration is visible in the data hours before it is visible at the bedside.
          </h2>
          <p className="mt-6 max-w-2xl text-text-muted">
            Clinicians work with fragmented signals — observations, scans, notes, vitals — across systems that don't talk. The pattern is there. The time to act on it isn't.
          </p>
        </Reveal>
      </section>

      {/* Solution */}
      <section className="border-t border-hairline">
        <div className="container-page py-24 md:py-32">
          <Reveal className="mx-auto max-w-4xl">
            <p className="eyebrow">Our approach</p>
            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-text-primary md:text-5xl">
              An agentic clinical AI that reasons across a patient's journey — and surfaces risk in a form clinicians can use.
            </h2>
          </Reveal>
        </div>
      </section>

      {/* Live Simulation */}
      <section className="border-t border-hairline">
        <div className="container-page py-24 md:py-32">
          <Reveal className="mx-auto max-w-3xl text-center mb-12">
            <p className="eyebrow">Clinical Simulator</p>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
              See the Clinical AI in Action
            </h2>
            <p className="mt-4 text-text-muted">
              Select different patients in the active ward panel below to observe vital data streaming and audit how specialized agents deliberate on risk.
            </p>
          </Reveal>
          <Reveal>
            <PulseDashboardDemo />
          </Reveal>
        </div>
      </section>

      {/* Pulse Timeline */}
      <section className="border-t border-hairline">
        <div className="container-page py-24 md:py-32">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">The Pulse Timeline</p>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
              One patient journey. Four moments where AI changes the outcome.
            </h2>
          </Reveal>
          <div className="mt-16">
            <PulseTimeline />
          </div>
        </div>
      </section>
    </>
  );
}
