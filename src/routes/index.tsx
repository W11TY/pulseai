import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PulseTimeline } from "@/components/pulse-timeline";
import { Reveal, StaggerReveal, StaggerItem, TextStaggerReveal } from "@/components/reveal";
import { PulseDashboardDemo } from "@/components/pulse-dashboard-demo";
import { AnimatedNumber } from "@/components/animated-number";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { BentoPilots } from "@/components/bento-pilots";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pulse AI — Agentic Clinical AI for Predicting Patient Deterioration" },
      { name: "description", content: "At Pulse AI, we've traded reactive care for predictive precision. Agentic clinical AI that predicts patient deterioration — starting in oncology." },
      { property: "og:title", content: "Pulse AI — Agentic Clinical AI" },
      { property: "og:description", content: "Predicting patient deterioration before crisis happens." },
    ],
  }),
  component: HomePage,
});

const capabilities = [
  {
    id: "ingestion",
    category: "data streams",
    title: "Continuous Vitals & Telemetry Ingestion",
    description: "Real-time integration with hospital EHR systems, continuous bedside monitors, labs, and wearable sensor feeds.",
    tags: [
      "Real-time Vitals Streaming",
      "EHR & Lab Integration",
      "Wearable Telemetry",
      "Clinical Note Parsing",
    ],
  },
  {
    id: "deliberation",
    category: "agentic ai",
    title: "Autonomous Multi-Agent Deliberation",
    description: "Specialized medical AI agents reasoning collaboratively across lab trends, physiological patterns, and nursing notes.",
    tags: [
      "Multi-Agent Risk Audit",
      "Pattern Recognition",
      "Evidence-Based Reasoning",
      "Audit Trail Generation",
    ],
  },
  {
    id: "oncology",
    category: "oncology care",
    title: "Targeted Cancer Care Risk Models",
    description: "Predictive algorithms specifically trained on oncology cohorts to catch neutropenic sepsis and toxicity events early.",
    tags: [
      "Neutropenic Sepsis Warning",
      "Toxicity Event Prediction",
      "Chemotherapy Risk Scoring",
      "Oncology Trajectory",
    ],
  },
  {
    id: "workflow",
    category: "clinical integration",
    title: "Seamless EHR & Clinical Workflow",
    description: "Delivering prioritized risk alerts directly to clinician devices without cognitive clutter or alert fatigue.",
    tags: [
      "Prioritized Alerting",
      "Zero Alert Fatigue",
      "Clinician Device Sync",
      "Actionable Recommendations",
    ],
  },
];

const clinicalPilots = [
  {
    title: "Barts Health NHS Trust",
    tagline: "Oncology deterioration monitoring pilot across inpatient wards.",
    category: "Clinical Pilot",
    location: "London - UK",
    bgGradient: "from-emerald-500/20 via-[#9ada00]/10 to-transparent",
    accentColor: "#9ada00",
  },
  {
    title: "Innovate UK Cohort",
    tagline: "Multi-modal predictive telemetry & agentic AI research grant.",
    category: "Research Grant",
    location: "Cambridge - UK",
    bgGradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
    accentColor: "#3b82f6",
  },
  {
    title: "Marengo Rehabilitation",
    tagline: "Remote monitoring & post-treatment recovery tracking live today.",
    category: "Live Deployment",
    location: "United Kingdom",
    bgGradient: "from-teal-500/20 via-cyan-500/10 to-transparent",
    accentColor: "#14b8a6",
  },
  {
    title: "Cancer Research UK",
    tagline: "Early warning biomarker & clinical trajectory collaboration.",
    category: "Research Partner",
    location: "London - UK",
    bgGradient: "from-[#9ada00]/20 via-emerald-600/10 to-transparent",
    accentColor: "#9ada00",
  },
];

const testimonials = [
  {
    quote: "Pulse AI synthesizes complex, multi-parameter vital streams into clear clinical signals. It allows us to intervene hours before a patient shows physical signs of crisis.",
    author: "Frontline NHS Clinician",
    role: "Clinical Lead in Oncology",
  },
  {
    quote: "The multi-agent reasoning architecture provides transparency we can actually trust. Every alert comes with full auditability back to patient lab trends.",
    author: "Consultant Oncologist",
    role: "Barts Health NHS Trust Collaboration",
  },
];

const stats = [
  { value: 3, prefix: "", suffix: "", label: "Filed Patents in Clinical AI" },
  { value: 15, prefix: "< ", suffix: "m", label: "Early Warning Lead Time" },
  { value: 100, prefix: "", suffix: "%", label: "NHS Clinician Built & Validated" },
];

function HomePage() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
  };

  return (
    <>
      {/* Hero Section Replicated Framer Structure */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28 md:pt-44 md:pb-36 flex items-center min-h-[88vh]">
        <div className="container-page relative z-10 w-full">
          <Reveal delay={100} yOffset={40} className="max-w-4xl text-left">
            
            {/* Pill Badge Tag */}
            <div className="mb-6 sm:mb-8">
              <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] bg-white/90 border border-slate-200/90 text-slate-800 shadow-sm backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#9ada00] animate-pulse"></span>
                PULSE AI — CLINICAL INTELLIGENCE
              </span>
            </div>

            {/* Main Headline Replicated Framer Typography */}
            <h1 className="font-sans font-medium text-3xl sm:text-6xl md:text-7xl lg:text-[4.85rem] leading-[1.04] sm:leading-[0.96] tracking-[-0.04em] text-[#111112]">
              <TextStaggerReveal text="At Pulse AI, we’ve traded reactive care for " staggerDelay={0.06} />
              <span className="text-[#16a34a] font-medium underline decoration-[#9ada00]/80 underline-offset-8 inline-block">predictive precision</span>.
            </h1>

            {/* Sub-headline Description */}
            <p className="mt-6 sm:mt-10 text-base sm:text-xl text-[#475569] leading-relaxed max-w-2xl font-normal">
              Combining continuous telemetry, clinical notes, and agentic AI to help clinicians identify patient deterioration hours before bedside crisis — starting in <span className="text-slate-900 font-semibold">cancer care</span>.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto font-sans">
              <a
                href="#contact"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#111112] px-8 text-sm font-semibold text-white hover:bg-black transition-all shadow-md gap-3 group w-full sm:w-auto"
              >
                <span>Partner with us</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <a
                href="#capabilities"
                className="inline-flex h-12 items-center justify-center rounded-full border border-slate-300/90 bg-white/70 backdrop-blur-md px-8 text-sm font-semibold text-slate-800 hover:bg-white hover:border-slate-400 transition-all gap-2.5 w-full sm:w-auto"
              >
                <span>scroll to explore ↓</span>
              </a>
            </div>

          </Reveal>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="relative z-10">

        {/* Section 1: Key Stats Band */}
        <section className="border-y border-slate-200/80 bg-white/60 backdrop-blur-md py-12 sm:py-16">
          <div className="container-page">
            <StaggerReveal className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80">
              {stats.map((s, idx) => (
                <StaggerItem key={idx} className="pt-6 sm:pt-0 px-4">
                  <div className="text-4xl sm:text-6xl font-sans font-medium text-[#111112] tracking-tight mb-2">
                    <AnimatedNumber value={s.value} prefix={s.prefix} suffix={s.suffix} duration={1500} />
                  </div>
                  <div className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-[#64748b]">
                    {s.label}
                  </div>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </section>

        {/* Section 2: Partner & Validation Logos */}
        <section className="border-b border-slate-200/80 bg-white/40 backdrop-blur-md py-8 sm:py-14">
          <div className="container-page">
            <Reveal>
              <p className="text-center text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#64748b] mb-6 sm:mb-8">
                Developed in Collaboration With Leading Clinical & Research Institutions
              </p>
            </Reveal>
            <StaggerReveal staggerDelay={0.15} className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-6 sm:gap-16 opacity-85 grayscale hover:grayscale-0 transition-all duration-500">
              <StaggerItem><img src={`${import.meta.env.BASE_URL}nhs.png`} alt="NHS logo" className="h-7 sm:h-12 w-auto object-contain mx-auto sm:mx-0" /></StaggerItem>
              <StaggerItem><img src={`${import.meta.env.BASE_URL}barts.png`} alt="Barts Health logo" className="h-9 sm:h-16 w-auto object-contain mx-auto sm:mx-0" /></StaggerItem>
              <StaggerItem><img src={`${import.meta.env.BASE_URL}innovateuk.png`} alt="Innovate UK logo" className="h-7 sm:h-12 w-auto object-contain mx-auto sm:mx-0" /></StaggerItem>
              <StaggerItem><img src={`${import.meta.env.BASE_URL}cruk.png`} alt="Cancer Research UK logo" className="h-9 sm:h-16 w-auto object-contain mx-auto sm:mx-0" /></StaggerItem>
            </StaggerReveal>
          </div>
        </section>

        {/* Section 3: Platform Capabilities */}
        <section id="capabilities" className="py-24 sm:py-36">
          <div className="container-page">
            <Reveal className="mx-auto max-w-3xl text-center mb-14 sm:mb-20">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#16a34a]/10 text-[#16a34a] border border-[#16a34a]/20 mb-4">
                Clinical AI Platform
              </span>
              <TextStaggerReveal as="h2" text="Capabilities Built for Proactive Clinical Precision" className="font-sans text-3xl sm:text-5xl font-medium tracking-tight text-[#111112] leading-[1.06] justify-center text-center" staggerDelay={0.04} />
            </Reveal>

            <StaggerReveal staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {capabilities.map((cap) => (
                <StaggerItem key={cap.id} className="h-full">
                  <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 h-full flex flex-col justify-between group">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#9ada00] font-semibold bg-[#111112] px-3 py-1 rounded-md inline-block mb-6">
                        {cap.category}
                      </span>
                      <h3 className="font-sans text-2xl sm:text-3xl font-medium tracking-tight text-[#111112] mb-4 leading-snug group-hover:text-[#16a34a] transition-colors">
                        {cap.title}
                      </h3>
                      <p className="text-base sm:text-lg text-[#475569] leading-relaxed font-normal mb-8">
                        {cap.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                      {cap.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-xs font-medium bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </section>

        {/* Section 4: Live Clinical AI Ward Simulator */}
        <section id="demo" className="py-24 sm:py-36 bg-slate-900/5 backdrop-blur-sm border-y border-slate-200/60">
          <div className="container-page">
            <Reveal className="mx-auto max-w-3xl text-center mb-14 sm:mb-20">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#111112] text-white mb-4">
                AGENTIC WARD SIMULATOR
              </span>
              <TextStaggerReveal as="h2" text="See Clinical AI Deliberation Live" className="font-sans text-3xl sm:text-5xl font-medium tracking-tight text-[#111112] leading-[1.06] justify-center text-center" staggerDelay={0.04} />
              <p className="mt-4 text-base sm:text-lg text-[#475569] font-normal max-w-xl mx-auto">
                Select active ward patients below to monitor vital streaming and audit how specialized agents deliberate on deterioration risk.
              </p>
            </Reveal>

            <Reveal>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative group mx-auto max-w-5xl cursor-pointer">
                    <div className="group relative w-full h-[60vw] max-h-[350px] sm:max-h-none sm:h-[500px] rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 hover:shadow-2xl hover:border-slate-300 transition-all duration-500">
                      {/* Background Visual */}
                      <div className="absolute inset-0 bg-slate-900 group-hover:scale-105 transition-transform duration-700">
                        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-[#16a34a]/40"></div>
                        
                        {/* Grid overlay for tech feel */}
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                      </div>

                      {/* Content */}
                      <div className="absolute inset-0 p-8 sm:p-12 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 border border-white/20 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                        <h3 className="text-2xl sm:text-4xl font-sans font-medium text-white mb-4 tracking-tight">
                          Launch Ward Simulator
                        </h3>
                        <p className="text-slate-300 max-w-md mx-auto text-sm sm:text-base font-normal mb-8">
                          Experience real-time AI deliberation on multi-modal patient vitals and telemetry streams.
                        </p>
                        
                        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#9ada00] text-slate-900 font-semibold text-sm hover:bg-[#a6ec00] transition-colors shadow-lg">
                          Open Live Interface
                          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                
                <DialogContent className="max-w-[95vw] sm:max-w-[1200px] w-full p-0 border-0 bg-transparent shadow-2xl h-[90dvh] sm:h-[90vh] flex flex-col overflow-hidden rounded-3xl">
                  <div className="flex-1 bg-white h-full overflow-y-auto">
                    <PulseDashboardDemo />
                  </div>
                </DialogContent>
              </Dialog>
            </Reveal>
          </div>
        </section>

        {/* Section 5: Patient Journey Trajectory */}
        <section id="timeline" className="py-24 sm:py-36">
          <div className="container-page">
            <Reveal className="mx-auto max-w-3xl text-center mb-14 sm:mb-20">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-slate-100 text-slate-800 mb-4">
                CLINICAL TRAJECTORY
              </span>
              <TextStaggerReveal as="h2" text="One Patient Journey. Four Moments Where AI Alters Outcome." className="font-sans text-3xl sm:text-5xl font-medium tracking-tight text-[#111112] leading-[1.06] justify-center text-center" staggerDelay={0.04} />
            </Reveal>

            <Reveal>
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 sm:p-12 border border-slate-200/80 shadow-sm">
                <PulseTimeline />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Section 6: Clinical Deployments & Research Partnerships */}
        <section id="projects" className="py-24 sm:py-36 bg-slate-900/5 backdrop-blur-sm border-y border-slate-200/60">
          <div className="container-page">
            <Reveal className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-20 gap-6">
              <div>
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#111112] text-white mb-4">
                  CLINICAL PILOTS / research
                </span>
                <TextStaggerReveal as="h2" text="Active Clinical Validation & Pilots" className="font-sans text-3xl sm:text-5xl font-medium tracking-tight text-[#111112] leading-[1.06]" staggerDelay={0.04} />
              </div>
              <p className="text-sm sm:text-base text-[#64748b] max-w-sm font-normal">
                Deployments across NHS hospitals, research cohorts, and post-treatment rehabilitation today.
              </p>
            </Reveal>

            <BentoPilots />
          </div>
        </section>

        {/* Section 7: Clinician Testimonials */}
        <section id="testimonials" className="py-24 sm:py-36">
          <div className="container-page">
            <Reveal className="mx-auto max-w-3xl text-center mb-14 sm:mb-16">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.2em] bg-slate-100 text-slate-800 mb-4">
                Clinician Feedback
              </span>
              <TextStaggerReveal as="h2" text="What Frontline Clinicians Say" className="font-sans text-3xl sm:text-5xl font-medium tracking-tight text-[#111112] leading-[1.06] justify-center text-center" staggerDelay={0.04} />
            </Reveal>
          </div>
          
          <Reveal>
            <TestimonialsCarousel />
          </Reveal>
        </section>

        {/* Section 8: Partner / Contact Form */}
        <section id="contact" className="py-24 sm:py-36 border-t border-slate-200/80">
          <div className="container-page">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column: Heading */}
              <div className="lg:col-span-5">
                <Reveal>
                  <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#111112] text-white mb-6">
                    get in touch
                  </span>
                  <TextStaggerReveal as="h2" text="Let’s Predict Together." className="font-sans text-4xl sm:text-6xl font-medium tracking-tight text-[#111112] leading-[0.98] mb-6 max-w-[80vw] sm:max-w-[300px] text-center" staggerDelay={0.06} />
                  <p className="text-base sm:text-lg text-[#475569] leading-relaxed font-normal mb-8">
                    Interested in deploying clinical pilots, research collaborations, or data integration with Pulse AI? Get in touch with our founding clinical team.
                  </p>
                  
                  <div className="space-y-4 pt-6 border-t border-slate-200/80">
                    <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#16a34a]"></span>
                      <span>London — United Kingdom | NHS Trust Collaborations</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#9ada00]"></span>
                      <span>hello@pulseai.health</span>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Right Column: Contact Form */}
              <div className="lg:col-span-7">
                <Reveal>
                  <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#9ada00]/5 rounded-full blur-3xl -z-10 group-hover:bg-[#9ada00]/10 transition-colors duration-700" />
                    
                    {formSubmitted ? (
                      <div className="text-center py-16">
                        <div className="w-20 h-20 bg-[#9ada00]/20 text-[#9ada00] rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Inquiry Received</h3>
                        <p className="text-slate-500 font-medium text-lg">Our clinical team will get back to you within 24 hours.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                          <div className="relative">
                            <input
                              type="text"
                              required
                              id="firstName"
                              placeholder=" "
                              className="peer w-full h-14 px-4 rounded-xl border-2 border-slate-100 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:border-[#9ada00] focus:bg-white transition-all shadow-sm placeholder-transparent"
                            />
                            <label htmlFor="firstName" className="absolute left-4 -top-2.5 text-[11px] font-bold uppercase tracking-widest text-slate-400 bg-white px-1 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:font-medium peer-focus:-top-2.5 peer-focus:text-[11px] peer-focus:font-bold peer-focus:text-[#9ada00]">
                              First Name *
                            </label>
                          </div>
                          <div className="relative">
                            <input
                              type="text"
                              required
                              id="lastName"
                              placeholder=" "
                              className="peer w-full h-14 px-4 rounded-xl border-2 border-slate-100 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:border-[#9ada00] focus:bg-white transition-all shadow-sm placeholder-transparent"
                            />
                            <label htmlFor="lastName" className="absolute left-4 -top-2.5 text-[11px] font-bold uppercase tracking-widest text-slate-400 bg-white px-1 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:font-medium peer-focus:-top-2.5 peer-focus:text-[11px] peer-focus:font-bold peer-focus:text-[#9ada00]">
                              Last Name *
                            </label>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                          <div className="relative">
                            <input
                              type="email"
                              required
                              id="email"
                              placeholder=" "
                              className="peer w-full h-14 px-4 rounded-xl border-2 border-slate-100 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:border-[#9ada00] focus:bg-white transition-all shadow-sm placeholder-transparent"
                            />
                            <label htmlFor="email" className="absolute left-4 -top-2.5 text-[11px] font-bold uppercase tracking-widest text-slate-400 bg-white px-1 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:font-medium peer-focus:-top-2.5 peer-focus:text-[11px] peer-focus:font-bold peer-focus:text-[#9ada00]">
                              Work Email *
                            </label>
                          </div>
                          <div className="relative">
                            <input
                              type="text"
                              id="org"
                              placeholder=" "
                              className="peer w-full h-14 px-4 rounded-xl border-2 border-slate-100 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:border-[#9ada00] focus:bg-white transition-all shadow-sm placeholder-transparent"
                            />
                            <label htmlFor="org" className="absolute left-4 -top-2.5 text-[11px] font-bold uppercase tracking-widest text-slate-400 bg-white px-1 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:font-medium peer-focus:-top-2.5 peer-focus:text-[11px] peer-focus:font-bold peer-focus:text-[#9ada00]">
                              Institution
                            </label>
                          </div>
                        </div>

                        <div className="relative">
                          <select required className="w-full h-14 px-4 rounded-xl border-2 border-slate-100 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:border-[#9ada00] focus:bg-white transition-all shadow-sm appearance-none font-medium">
                            <option value="" disabled selected>Select Inquiry Type...</option>
                            <option value="pilot">Hospital Clinical Pilot</option>
                            <option value="data">Data Research Partnership</option>
                            <option value="tech">Technology Integration</option>
                            <option value="grant">Grant & Funding Opportunity</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                          </div>
                        </div>

                        <div className="relative">
                          <textarea
                            required
                            id="msg"
                            rows={4}
                            placeholder=" "
                            className="peer w-full p-4 rounded-xl border-2 border-slate-100 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:border-[#9ada00] focus:bg-white transition-all resize-none shadow-sm placeholder-transparent"
                          ></textarea>
                          <label htmlFor="msg" className="absolute left-4 -top-2.5 text-[11px] font-bold uppercase tracking-widest text-slate-400 bg-white px-1 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:font-medium peer-focus:-top-2.5 peer-focus:text-[11px] peer-focus:font-bold peer-focus:text-[#9ada00]">
                            Your Message *
                          </label>
                        </div>

                        <button
                          type="submit"
                          className="w-full h-14 rounded-xl bg-slate-950 text-white text-sm font-bold hover:bg-[#9ada00] hover:text-slate-950 transition-all shadow-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98]"
                        >
                          <span>Submit Partnership Inquiry</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                      </form>
                    )}
                  </div>
                </Reveal>
              </div>

            </div>
          </div>
        </section>

      </div>
    </>
  );
}
