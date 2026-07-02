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
  {
    initials: "AK",
    name: "Akshat Kumar",
    role: "CEO & Co-founder",
    bio: "Ex-healthcare product leader. Formulated clinical ops platforms serving outpatient settings. Focused on global hospital deployments and system integrations."
  },
  {
    initials: "RS",
    name: "Dr. Rohan Singh",
    role: "CTO & Co-founder",
    bio: "PhD in Biomedical Engineering & AI. Formerly researcher in clinical ML. Developed our three core patented architectures for patient-journey temporal modeling."
  },
  {
    initials: "NP",
    name: "Dr. Neil Patel",
    role: "Chief Clinical Officer",
    bio: "Practising NHS consultant oncologist at London Teaching Hospitals. Over 15 years in clinical oncology, directing model safety protocols and clinical trials."
  },
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

      <section className="border-y border-hairline bg-bg-panel transition-colors duration-300 py-24">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Founders</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">A founding team of clinicians and AI engineers.</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {founders.map((f) => (
              <div key={f.role} className="card-elevated card-elevated-hover p-6 bg-bg-base transition-colors duration-300">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-bg-panel-raised transition-colors duration-300">
                  <span className="font-mono text-sm text-text-muted font-bold">{f.initials}</span>
                </div>
                <h3 className="mt-6 text-lg font-bold text-text-primary">{f.name}</h3>
                <p className="mt-1 text-xs font-semibold text-accent-pulse uppercase tracking-wider">{f.role}</p>
                <p className="mt-4 text-sm text-text-muted leading-relaxed">
                  {f.bio}
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

      <section className="border-t border-hairline">
        <div className="container-page py-16">
          <p className="eyebrow text-center mb-8">Partners, funders and collaborators</p>
          <div className="flex flex-wrap items-center justify-center gap-12">
            <img src={`${import.meta.env.BASE_URL}nhs.png`} alt="NHS logo" className="h-16 w-auto object-contain opacity-80" />
            <img src={`${import.meta.env.BASE_URL}barts.png`} alt="Barts Health logo" className="h-20 w-auto object-contain opacity-80" />
            <img src={`${import.meta.env.BASE_URL}innovateuk.png`} alt="Innovate UK logo" className="h-16 w-auto object-contain opacity-80" />
            <img src={`${import.meta.env.BASE_URL}cruk.png`} alt="Cancer Research UK logo" className="h-20 w-auto object-contain opacity-80" />
          </div>
        </div>
      </section>
    </>
  );
}
