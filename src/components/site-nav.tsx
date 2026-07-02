import { Link } from "@tanstack/react-router";
import { useState } from "react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/technology", label: "Technology" },
  { to: "/product", label: "Product" },
  { to: "/support", label: "Support" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-white/10 backdrop-blur-md transition-colors duration-300">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
          <PulseMark />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-text-muted transition-colors hover:text-text-primary"
              activeProps={{ className: "text-sm text-text-primary font-medium" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            to="/support"
            className="inline-flex h-9 items-center rounded-full bg-accent-pulse px-4 text-sm font-medium text-white transition-colors hover:bg-[#196f4a]"
          >
            Partner with us
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label="Toggle menu"
          className="md:hidden p-2 rounded-lg text-text-primary hover:bg-white/20 transition-colors"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-hairline bg-white/10 backdrop-blur-md md:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-text-primary hover:bg-white/20 transition-colors"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-hairline">
              <Link
                to="/support"
                className="inline-flex w-full h-11 items-center justify-center rounded-full bg-accent-pulse px-4 text-sm font-medium text-white hover:bg-[#196f4a] transition-colors"
                onClick={() => setOpen(false)}
              >
                Partner with us
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function PulseMark() {
  return (
    <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Pulse AI Logo" className="h-6 w-auto object-contain select-none" />
  );
}
