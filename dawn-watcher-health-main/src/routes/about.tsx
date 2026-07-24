import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Pulse AI" },
      { name: "description", content: "Pulse AI is a clinical AI company building agentic intelligence for patient deterioration, founded by clinicians and engineers across the UK and India." },
      { property: "og:title", content: "About Pulse AI" },
      { property: "og:description", content: "Clinicians, researchers and engineers building serious clinical AI." },
    ],
  }),
  component: AboutPage,
});

const founders = [
  { initials: "AK", name: "Founder", role: "CEO" },
  { initials: "RS", name: "Founder", role: "CTO" },
  { initials: "NP", name: "Founder", role: "Chief Clinical Officer · NHS" },
];

const credibility = [
  "Innovate UK",
  "Cancer Research UK",
  "Barts Health NHS Trust",
  "Academic partners (UK)",
  "Marengo",
];

function AboutPage() {
  return (
    <>
      <section className="container-page py-24 md:py-32">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">About Pulse AI</p>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-text-primary md:text-6xl">
            Built with clinicians. For the patients they're trying to keep ahead of.
          </h1>
          <p className="mt-6 text-lg text-text-muted">
            We're a UK and India-based clinical AI company developing agentic intelligence that predicts patient deterioration. Our work begins in oncology and extends into remote monitoring and rehabilitation.
          </p>
        </Reveal>
      </section>

      <section className="border-y border-hairline bg-bg-panel">
        <div className="container-page py-24">
          <Reveal>
            <p className="eyebrow">Founders</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">A founding team of clinicians and AI engineers.</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {founders.map((f) => (
              <div key={f.role} className="card-elevated card-elevated-hover p-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-accent-pulse/20 bg-accent-pulse/5 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  <span className="font-mono text-sm font-semibold text-accent-pulse">{f.initials}</span>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-text-primary">{f.name}</h3>
                <p className="mt-1 text-sm text-accent-pulse/80 font-medium">{f.role}</p>
                <p className="mt-4 text-sm text-text-muted">
                  Brief bio placeholder — clinical and research background, years of experience, area of focus.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-24">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">An NHS clinician at the core</p>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            Our Chief Clinical Officer is a practising NHS consultant.
          </h2>
          <p className="mt-5 text-text-muted">
            Every product decision is anchored in real clinical workflow — not assumptions about it.
          </p>
        </Reveal>
      </section>

      <section className="border-t border-hairline bg-bg-panel">
        <div className="container-page py-16">
          <p className="eyebrow text-center">Partners, funders and collaborators</p>
          <div className="mt-8 grid grid-cols-1 divide-y divide-hairline md:flex md:divide-x md:divide-y-0">
            {credibility.map((c) => (
              <div key={c} className="px-2 py-3 text-center md:flex-1 md:px-6 md:py-0">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted">{c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
