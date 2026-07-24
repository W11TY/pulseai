import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support & partnerships — Pulse AI" },
      { name: "description", content: "Partner with Pulse AI: clinical pilots, data partnerships, grants, and India hospital enquiries." },
      { property: "og:title", content: "Partner with Pulse AI" },
      { property: "og:description", content: "Clinical pilots, data partnerships, grants and India hospital enquiries." },
    ],
  }),
  component: SupportPage,
});

const routes = [
  { title: "Clinical pilots", body: "For NHS trusts and hospitals exploring deterioration prediction or rehabilitation pathways.", email: "clinical@pulseai.health" },
  { title: "Data partnerships", body: "For research groups and providers with longitudinal patient-journey datasets.", email: "data@pulseai.health" },
  { title: "Grants & funding", body: "For funders, charities and grant programmes aligned with clinical AI in oncology.", email: "research@pulseai.health" },
  { title: "India hospital enquiries", body: "For hospital decision-makers in India exploring deployment in the launch market.", email: "india@pulseai.health" },
];

const faqs = [
  { q: "Is Pulse AI a product I can buy today?", a: "Our rehabilitation and monitoring thread is live with Marengo. Deterioration prediction is in active development and currently available through clinical pilots." },
  { q: "Where is Pulse AI based?", a: "Headquartered in the UK with India as our launch market for hospital deployments." },
  { q: "Do you publish your research?", a: "Yes — through peer-reviewed venues and in collaboration with our academic partners. Get in touch for current pre-prints." },
  { q: "How do you handle patient data?", a: "All clinical data is held under partnership agreements with the originating provider, processed under the relevant regulatory framework, and never used outside its agreed scope." },
];

function SupportPage() {
  return (
    <>
      <section className="container-page py-24 md:py-32">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Support · Partner with us</p>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            Tell us what you're trying to solve.
          </h1>
          <p className="mt-6 text-lg text-text-muted">
            Whether you're a clinician, a hospital, a research group or a funder — we'd like to hear from you.
          </p>
        </Reveal>
      </section>

      <section className="border-t border-hairline bg-bg-panel">
        <div className="container-page py-20">
          <div className="mx-auto max-w-5xl grid gap-6 md:grid-cols-2">
            {routes.map((r) => (
              <div key={r.title} className="card-elevated card-elevated-hover p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-text-primary">{r.title}</h3>
                  <p className="mt-2 text-sm text-text-muted leading-relaxed">{r.body}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-hairline">
                  <a href={`mailto:${r.email}`} className="inline-flex items-center text-sm font-semibold text-accent-pulse hover:text-accent-pulse-bright transition-colors">
                    {r.email} <span className="ml-1">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-24">
        <Reveal className="mx-auto max-w-3xl">
          <p className="eyebrow text-center">FAQ</p>
          <h2 className="mt-4 text-center text-3xl font-bold tracking-tight md:text-4xl">Common questions</h2>
          <div className="mt-12">
            <Accordion items={faqs} />
          </div>
        </Reveal>
      </section>
    </>
  );
}

function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className="divide-y divide-hairline border-y border-hairline">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-base font-medium text-text-primary">{item.q}</span>
              <span className="text-text-muted">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  {isOpen ? <path d="M5 12h14" /> : <><path d="M12 5v14" /><path d="M5 12h14" /></>}
                </svg>
              </span>
            </button>
            {isOpen && <p className="pb-6 pr-10 text-sm leading-relaxed text-text-muted">{item.a}</p>}
          </li>
        );
      })}
    </ul>
  );
}
