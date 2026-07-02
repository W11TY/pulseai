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

import { toast } from "sonner";

function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    org: "",
    track: "Clinical pilots",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success("Partnership enquiry received!", {
        description: "A member of our clinical integrations team will contact you shortly."
      });
    }, 1500);
  };

  return (
    <>
      <section className="container-page py-24 md:py-32">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Support · Partner with us</p>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            Tell us what you're trying to solve.
          </h1>
          <p className="mt-6 text-lg text-text-muted">
            Whether you're a clinician, a hospital director, a research group or a funder — let's build serious clinical AI together.
          </p>
        </Reveal>
      </section>

      <section className="border-t border-hairline bg-bg-panel transition-colors duration-300">
        <div className="container-page py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Form Section */}
            <div className="lg:col-span-7 bg-bg-base border border-hairline rounded-2xl p-8 shadow-sm transition-colors duration-300">
              <h2 className="text-xl font-bold text-text-primary mb-2">Partnership Intake Form</h2>
              <p className="text-xs text-text-muted mb-6">Submit your project parameters and our clinical team will review within 24 hours.</p>

              {submitted ? (
                <div className="text-center py-10">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-4">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-text-primary">Enquiry Submitted Successfully</h3>
                  <p className="text-sm text-text-muted mt-2 max-w-sm mx-auto">Thank you for reaching out. We have logged your request under track '{formData.track}' and sent a confirmation to {formData.email}.</p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", org: "", track: "Clinical pilots", message: "" });
                    }}
                    className="mt-6 inline-flex h-9 items-center rounded-full border border-hairline px-4 text-xs font-medium text-text-primary hover:bg-bg-panel"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="form-name" className="block text-xs font-mono uppercase text-text-muted mb-1.5">Full Name *</label>
                      <input
                        id="form-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Dr. Sarah Carter"
                        className="w-full h-10 px-3 rounded-lg border border-hairline bg-bg-panel text-text-primary text-sm focus:outline-none focus:border-accent-pulse transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="form-email" className="block text-xs font-mono uppercase text-text-muted mb-1.5">Email Address *</label>
                      <input
                        id="form-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sarah@institution.org"
                        className="w-full h-10 px-3 rounded-lg border border-hairline bg-bg-panel text-text-primary text-sm focus:outline-none focus:border-accent-pulse transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="form-org" className="block text-xs font-mono uppercase text-text-muted mb-1.5">Institution / Hospital</label>
                      <input
                        id="form-org"
                        type="text"
                        value={formData.org}
                        onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                        placeholder="NHS Foundation Trust"
                        className="w-full h-10 px-3 rounded-lg border border-hairline bg-bg-panel text-text-primary text-sm focus:outline-none focus:border-accent-pulse transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="form-track" className="block text-xs font-mono uppercase text-text-muted mb-1.5">Partnership Track</label>
                      <select
                        id="form-track"
                        value={formData.track}
                        onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                        className="w-full h-10 px-3 rounded-lg border border-hairline bg-bg-panel text-text-primary text-sm focus:outline-none focus:border-accent-pulse transition-all"
                      >
                        {routes.map(r => (
                          <option key={r.title} value={r.title}>{r.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="form-message" className="block text-xs font-mono uppercase text-text-muted mb-1.5">Project Scope / Details *</label>
                    <textarea
                      id="form-message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about the clinical workflows, datasets or deployment tracks you wish to explore..."
                      className="w-full p-3 rounded-lg border border-hairline bg-bg-panel text-text-primary text-sm focus:outline-none focus:border-accent-pulse transition-all resize-none"
                    ></textarea>
                  </div>

                  <button
                    id="submit-intake"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 inline-flex items-center justify-center rounded-full bg-accent-pulse text-white text-sm font-semibold hover:bg-[#196f4a] disabled:opacity-50 transition-colors"
                  >
                    {isSubmitting ? "Processing Enquiry..." : "Submit Partnership Request"}
                  </button>
                </form>
              )}
            </div>

            {/* Direct Channels */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-xl font-bold text-text-primary">Direct Channels</h2>
              <ul className="divide-y divide-hairline border-y border-hairline">
                {routes.map((r) => (
                  <li key={r.title} className="py-4 space-y-1">
                    <h3 className="text-sm font-bold text-text-primary">{r.title}</h3>
                    <p className="text-xs text-text-muted">{r.body}</p>
                    <a href={`mailto:${r.email}`} className="inline-block text-xs font-semibold text-accent-pulse hover:underline">
                      {r.email} →
                    </a>
                  </li>
                ))}
              </ul>
            </div>
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
