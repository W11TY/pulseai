import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/technology", label: "Technology" },
  { to: "/product", label: "Product" },
  { to: "/support", label: "Support" },
] as const;

function clampNav(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const routerState = useRouterState();
  const isHome = routerState.location.pathname === "/";

  /**
   * On the home page the navbar is `position: fixed` (always in viewport).
   * `scrolled` controls whether it shows a solid/blurred background.
   *
   * The trigger is driven by the hero wrapper's geometry — same formula as the
   * pinned scroll effect in index.tsx — so it fires at the right moment on
   * every viewport size (desktop and mobile) without a raw px threshold.
   *
   * Solid background activates when hero scroll progress >= 1, i.e. the hero
   * wrapper has fully scrolled past and the next section is covering the video.
   */
  const [scrolled, setScrolled] = useState(false);
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef(false);

  useEffect(() => {
    if (!isHome) return;

    const checkScroll = () => {
      pendingRef.current = false;

      // Find the hero wrapper by its aria-label — avoids coupling to internal
      // class names or IDs that may change.
      const heroWrapper = document.querySelector<HTMLElement>(
        "section[aria-label='Hero']"
      );

      if (!heroWrapper) {
        // Fallback: if no hero wrapper found, treat as scrolled when any scroll
        setScrolled(window.scrollY > 10);
        return;
      }

      const rect = heroWrapper.getBoundingClientRect();
      const wrapperTop = rect.top;
      const wrapperHeight = rect.height;
      const viewportHeight = window.innerHeight;

      // Same formula as the hero animation in index.tsx
      const progress = clampNav(
        -wrapperTop / (wrapperHeight - viewportHeight),
        0,
        1
      );

      // Solid navbar only when hero is fully scrolled out (progress = 1)
      setScrolled(progress >= 1);
    };

    const onScroll = () => {
      if (!pendingRef.current) {
        pendingRef.current = true;
        rafRef.current = requestAnimationFrame(checkScroll);
      }
    };

    // Run immediately on mount and on bfcache restore
    checkScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pageshow", checkScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pageshow", checkScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isHome]);

  // ── Styles ─────────────────────────────────────────────────────────────────
  // Home: fixed, transparent → solid on scroll-out
  // Other pages: sticky, always solid
  const headerClass = isHome
    ? [
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-hairline bg-bg-base/90 backdrop-blur text-text-primary"
          : "border-b border-transparent bg-transparent text-white",
      ].join(" ")
    : "sticky top-0 z-50 border-b border-hairline bg-bg-base/85 backdrop-blur";

  // Nav link colour — white over video, normal on solid bg
  const linkClass = isHome && !scrolled
    ? "text-sm text-white/80 transition-colors hover:text-white"
    : "text-sm text-text-muted transition-colors hover:text-text-primary";

  const activeLinkClass = isHome && !scrolled
    ? "text-sm text-white font-medium border-b border-white/70 pb-1"
    : "text-sm text-text-primary font-medium border-b border-accent-pulse pb-1";

  return (
    <header className={headerClass}>
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
          <img src="/logo.png" alt="Pulse AI" className="h-7 md:h-8 object-contain" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={linkClass}
              activeProps={{ className: activeLinkClass }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            to="/support"
            className="inline-flex h-9 items-center rounded-full bg-accent-pulse px-4 text-sm font-medium text-white transition-all hover:bg-[#196f4a] hover:scale-[1.02]"
          >
            Partner with us
          </Link>
        </div>

        {/* Hamburger — icon colour matches context */}
        <button
          aria-label="Toggle menu"
          className={`md:hidden ${isHome && !scrolled ? "text-white" : "text-text-primary"}`}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-hairline bg-bg-base md:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-md px-2 py-2 text-sm text-text-primary hover:bg-bg-panel"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/support"
              className="mt-2 inline-flex h-10 items-center justify-center rounded-full bg-accent-pulse px-4 text-sm font-medium text-white"
              onClick={() => setOpen(false)}
            >
              Partner with us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
