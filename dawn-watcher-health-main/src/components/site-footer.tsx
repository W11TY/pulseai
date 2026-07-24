import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <>
      <section className="border-t border-hairline bg-bg-panel">
        <div className="container-page py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Get in touch</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-text-primary md:text-5xl">
              Building the next generation of clinical AI.
            </h2>
            <p className="mt-4 text-text-muted">
              We work with clinicians, hospitals, researchers and funders. Tell us what you're trying to solve.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/support"
                className="inline-flex h-11 items-center rounded-full bg-accent-pulse px-6 text-sm font-medium text-white shadow-md shadow-accent-pulse/10 transition-all hover:bg-accent-pulse/80 hover:scale-[1.02]"
              >
                Partner with us
              </Link>
              <Link
                to="/technology"
                className="inline-flex h-11 items-center rounded-full border border-hairline bg-bg-base/40 backdrop-blur-sm px-6 text-sm font-medium text-text-primary transition-all hover:bg-white/5 hover:border-accent-pulse"
              >
                Learn about our technology
              </Link>
            </div>
            <div className="mt-10">
              <PulseDivider />
            </div>
          </div>
        </div>
      </section>
      <footer className="border-t border-hairline bg-bg-panel">
        <div className="container-page grid gap-10 py-14 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link to="/" className="inline-block">
              <img src="/logo.png" alt="Pulse AI" className="h-7 md:h-8 object-contain" />
            </Link>
            <p className="mt-3 max-w-xs text-sm text-text-muted">
              Agentic clinical AI for predicting patient deterioration — starting in oncology.
            </p>
            <div className="mt-6 space-y-2 text-sm text-text-muted">
              <div><span className="eyebrow block">United Kingdom</span>London</div>
              <div><span className="eyebrow block mt-3">India</span>Launch market</div>
            </div>
          </div>
          <div>
            <p className="eyebrow">Explore</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/about" className="text-text-primary hover:text-accent-pulse">About</Link></li>
              <li><Link to="/technology" className="text-text-primary hover:text-accent-pulse">Technology</Link></li>
              <li><Link to="/product" className="text-text-primary hover:text-accent-pulse">Product</Link></li>
              <li><Link to="/support" className="text-text-primary hover:text-accent-pulse">Support</Link></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow">Partner with us</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/support" className="text-text-primary hover:text-accent-pulse">Clinical pilots</Link></li>
              <li><Link to="/support" className="text-text-primary hover:text-accent-pulse">Data partnerships</Link></li>
              <li><Link to="/support" className="text-text-primary hover:text-accent-pulse">Grants & funding</Link></li>
              <li><Link to="/support" className="text-text-primary hover:text-accent-pulse">India hospital enquiries</Link></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow">Contact</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="text-text-primary">hello@pulseai.health</li>
              <li className="text-text-muted">For press and research enquiries</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-hairline">
          <div className="container-page flex flex-col items-start justify-between gap-2 py-6 text-xs text-text-muted md:flex-row md:items-center">
            <span>© {new Date().getFullYear()} Pulse AI Ltd. All rights reserved.</span>
            <span>Developed with clinicians. Built on real patient journeys.</span>
          </div>
        </div>
      </footer>
    </>
  );
}

function PulseDivider() {
  return (
    <svg viewBox="0 0 600 24" className="mx-auto h-5 w-full max-w-md" fill="none" aria-hidden>
      <path
        d="M0 12 H210 L222 4 L236 20 L250 8 L262 16 L274 12 H600"
        stroke="var(--accent-pulse)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
