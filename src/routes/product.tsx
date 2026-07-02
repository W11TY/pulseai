import { createFileRoute, Link } from "@tanstack/react-router";
import { PulseTimeline } from "@/components/pulse-timeline";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/product")({
  head: () => ({
    meta: [
      { title: "Product — Pulse AI" },
      { name: "description", content: "Two threads, one patient journey: remote monitoring & rehabilitation live with Marengo, and deterioration prediction in oncology in development." },
      { property: "og:title", content: "Pulse AI Product" },
      { property: "og:description", content: "Remote monitoring, rehabilitation and deterioration prediction — one journey." },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  return (
    <>
      <section className="container-page py-24 md:py-32">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Product</p>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            One patient journey. Two threads of clinical AI.
          </h1>
          <p className="mt-6 text-lg text-text-muted">
            Pulse AI is not a dashboard. It's an intelligence layer that sits across the moments where deterioration is decided.
          </p>
        </Reveal>
      </section>

      <section className="border-y border-hairline bg-bg-panel">
        <div className="container-page py-20">
          <PulseTimeline condensed />
        </div>
      </section>

      <section className="container-page py-24 md:py-32">
        <div className="grid items-start gap-12 md:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <p className="eyebrow">Live · with Marengo</p>
            <h2 className="mt-5 text-3xl font-bold tracking-tight md:text-5xl">
              Remote monitoring & rehabilitation.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-lg text-text-muted">
              In partnership with Marengo, Pulse AI supports post-hospital and outpatient care — continuous monitoring of recovery signals, structured rehabilitation pathways and early flags when a patient drifts off track.
            </p>
            <p className="mt-4 text-text-muted">
              Deployed today across active care settings.
            </p>
            <Link to="/technology" className="mt-6 inline-flex items-center text-sm font-medium text-accent-pulse hover:underline">
              How the technology works →
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-hairline bg-bg-panel">
        <div className="container-page py-24 md:py-32">
          <div className="grid items-start gap-12 md:grid-cols-[1fr_1.4fr]">
            <Reveal>
              <p className="eyebrow">In development</p>
              <h2 className="mt-5 text-3xl font-bold tracking-tight md:text-5xl">
                Deterioration prediction — oncology first.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-lg text-text-muted">
                Our agentic clinical AI reasons across the full cancer-care journey to identify deterioration risk earlier — before it presents at the bedside.
              </p>
              <p className="mt-4 text-text-muted">
                In active research with NHS partners, with first clinical pilots opening by enquiry.
              </p>
              <Link to="/technology" className="mt-6 inline-flex items-center text-sm font-medium text-accent-pulse hover:underline">
                Read the technology →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
