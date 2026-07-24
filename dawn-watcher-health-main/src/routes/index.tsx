import { createFileRoute, Link } from "@tanstack/react-router";
import { PulseTimeline } from "@/components/pulse-timeline";
import { Reveal } from "@/components/reveal";
import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

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

const partnerLogos = [
  { src: "/nhs.png", alt: "NHS" },
  { src: "/barts.png", alt: "Barts Health NHS Trust" },
  { src: "/innovateuk.png", alt: "Innovate UK" },
  { src: "/cruk.png", alt: "Cancer Research UK" },
];

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function HomePage() {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  // Wraps the video element — animated on mobile to shrink to 16:9
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const scrollPendingRef = useRef(false);
  const textHiddenRef = useRef(false);
  const isMobileRef = useRef(false);
  // ── Scroll-gate state (mobile-only, at progress=1) ───────────────────────
  const lockActiveRef = useRef(false);   // currently gating scroll
  const lockReleasedRef = useRef(false); // 2 swipes counted — gate open for this pass
  const swipeCountRef = useRef(0);       // 0, 1, or 2
  const touchStartYRef = useRef(0);      // touchstart Y for delta measurement
  const inSwipeRef = useRef(false);      // tracking an active touch gesture

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const heroText = heroTextRef.current;
    const videoContainer = videoContainerRef.current;
    if (!wrapper || !heroText || !videoContainer) return;

    // ── Mobile breakpoint tracking ──────────────────────────────────────────
    const mq = window.matchMedia("(max-width: 767px)");
    isMobileRef.current = mq.matches;

    const onBreakpointChange = (e: MediaQueryListEvent) => {
      isMobileRef.current = e.matches;
      // When switching breakpoints, immediately reset video container to correct state
      if (!e.matches) {
        videoContainer.style.width = "100%";
        videoContainer.style.height = "100%";
        videoContainer.style.transform = "translate(-50%, -50%)";
        videoContainer.style.borderRadius = "0px";
        videoContainer.style.left = "50%";
        videoContainer.style.top = "50%";
      }
      // Re-run animation to apply correct state for current scroll position
      updateAnimation();
    };

    // ── Core animation function ─────────────────────────────────────────────
    const updateAnimation = () => {
      scrollPendingRef.current = false;

      const wrapperRect = wrapper.getBoundingClientRect();
      const wrapperTop = wrapperRect.top;
      const wrapperHeight = wrapperRect.height;
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      const progress = clamp(
        -wrapperTop / (wrapperHeight - viewportHeight),
        0,
        1
      );

      // ── Text animation (progress 0→0.5, same on all viewports) ──────────
      const textProgress = clamp(progress / 0.5, 0, 1);
      const translateY = textProgress * -150;
      const opacity = 1 - textProgress;

      heroText.style.transform = `translateY(${translateY}px)`;
      heroText.style.opacity = String(opacity);

      // Toggle aria-hidden at boundary (direct DOM, no stale closure)
      const shouldBeHidden = opacity <= 0;
      if (shouldBeHidden !== textHiddenRef.current) {
        textHiddenRef.current = shouldBeHidden;
        heroText.setAttribute("aria-hidden", String(shouldBeHidden));
      }

      // Drive scroll-gate
      updateScrollGate(progress);

      // ── Mobile video container shrink (< 768px only) ─────────────────────
      if (isMobileRef.current) {
        // Target 16:9 box at progress=1: width=92vw, height=92vw*(9/16)
        const targetW = viewportWidth * 0.92;
        const targetH = targetW * (9 / 16);

        // Interpolate from full-screen to target
        const containerW = lerp(viewportWidth, targetW, progress);
        const containerH = lerp(viewportHeight, targetH, progress);
        const radius = lerp(0, 16, progress);

        // Center the container in the sticky viewport using absolute positioning
        // from its top-left at (50%, 50%) with negative translate offset
        videoContainer.style.width = `${containerW}px`;
        videoContainer.style.height = `${containerH}px`;
        videoContainer.style.borderRadius = `${radius}px`;
        // Keep it centered — translate by half its own dimensions
        videoContainer.style.transform = `translate(-50%, -50%)`;
        videoContainer.style.left = "50%";
        videoContainer.style.top = "50%";
      } else {
        // Desktop: full-bleed. Keep the centered anchor but set 100%/100% so it fills the sticky.
        videoContainer.style.width = "100%";
        videoContainer.style.height = "100%";
        videoContainer.style.transform = "translate(-50%, -50%)";
        videoContainer.style.borderRadius = "0px";
        videoContainer.style.left = "50%";
        videoContainer.style.top = "50%";
      }
    };

    // ── Scroll-gate: engage/disengage based on progress ────────────────────
    // Declared as function (hoisted) so updateAnimation can call it before
    // the touch handler consts are initialised in the scope below.
    function updateScrollGate(progress: number) {
      if (!isMobileRef.current) {
        if (lockActiveRef.current) releaseGate();
        return;
      }
      if (progress >= 1 && !lockReleasedRef.current && !lockActiveRef.current) {
        engageGate();
      } else if (progress < 1 && (lockActiveRef.current || lockReleasedRef.current)) {
        releaseGate();
        lockReleasedRef.current = false;
        swipeCountRef.current = 0;
      }
    }

    const onScroll = () => {
      if (!scrollPendingRef.current) {
        scrollPendingRef.current = true;
        rafRef.current = requestAnimationFrame(updateAnimation);
      }
    };

    // Debounced resize handler — also re-queries breakpoint
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        isMobileRef.current = window.matchMedia("(max-width: 767px)").matches;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        scrollPendingRef.current = false;
        updateAnimation();
      }, 100);
    };

    // Initial paint
    updateAnimation();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    // bfcache restore
    const onPageShow = () => {
      scrollPendingRef.current = false;
      updateAnimation();
    };
    window.addEventListener("pageshow", onPageShow);

    // matchMedia listener (fires on breakpoint cross, faster than resize)
    if (mq.addEventListener) {
      mq.addEventListener("change", onBreakpointChange);
    }

    // ── Scroll-gate touch/wheel handlers (non-passive — need preventDefault) ─
    // engageGate/releaseGate add/remove these dynamically to avoid overhead
    // when the gate is not active.

    const onTouchStart = (e: TouchEvent) => {
      if (!lockActiveRef.current) return;
      touchStartYRef.current = e.touches[0].clientY;
      inSwipeRef.current = true;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!lockActiveRef.current) return;
      const deltaY = touchStartYRef.current - e.touches[0].clientY; // positive = swipe up (scroll down)
      if (deltaY > 0) {
        // Downward page scroll intent — block it
        e.preventDefault();
      } else if (deltaY < -10) {
        // Upward swipe — release gate immediately
        releaseGate();
        lockReleasedRef.current = false;
        swipeCountRef.current = 0;
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!lockActiveRef.current || !inSwipeRef.current) return;
      inSwipeRef.current = false;
      const deltaY = touchStartYRef.current - (e.changedTouches[0]?.clientY ?? touchStartYRef.current);
      if (deltaY > 20) {
        // Counted as a valid downward swipe
        swipeCountRef.current += 1;
        if (swipeCountRef.current >= 2) {
          releaseGate();
          lockReleasedRef.current = true; // keep open for this forward pass
        }
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (!lockActiveRef.current) return;
      if (e.deltaY > 0) {
        // Scroll-down intent — block
        e.preventDefault();
        // Treat each wheel tick as a swipe (for trackpad/mouse on mobile emulators)
        swipeCountRef.current += 1;
        if (swipeCountRef.current >= 2) {
          releaseGate();
          lockReleasedRef.current = true;
        }
      } else if (e.deltaY < 0) {
        // Scroll up — release
        releaseGate();
        lockReleasedRef.current = false;
        swipeCountRef.current = 0;
      }
    };

    // Engage: add blocking listeners
    function engageGate() {
      if (lockActiveRef.current) return;
      lockActiveRef.current = true;
      document.addEventListener("touchstart", onTouchStart, { passive: true });
      document.addEventListener("touchmove", onTouchMove, { passive: false });
      document.addEventListener("touchend", onTouchEnd, { passive: true });
      document.addEventListener("wheel", onWheel, { passive: false });
    }

    // Release: remove blocking listeners
    function releaseGate() {
      if (!lockActiveRef.current) return;
      lockActiveRef.current = false;
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("wheel", onWheel);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pageshow", onPageShow);
      if (mq.removeEventListener) {
        mq.removeEventListener("change", onBreakpointChange);
      }
      releaseGate(); // ensure listeners cleaned up if component unmounts mid-lock
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(resizeTimer);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* Hero wrapper — 200vh reserves scroll distance for pin + text exit */}
      <section
        ref={wrapperRef}
        style={{ height: "200vh" }}
        aria-label="Hero"
      >
        {/*
          Sticky container — pinned at top, full viewport height.
          overflow: hidden on desktop clips the video correctly.
          On mobile we keep overflow:hidden too since the container shrinks
          inward and the sticky div's bg shows as the letterbox colour.
          The sticky div background matches the page bg so letterbox is clean.
        */}
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
            background: "var(--bg-base)",
          }}
        >
          {/*
            Video container — ONLY element animated on mobile.
            Desktop: full-bleed absolute (inset 0).
            Mobile: shrinks from full-screen to 16:9 box, centered via JS.
            The video inside always fills this container via 100%/100%.
          */}
          <div
            ref={videoContainerRef}
            aria-hidden="true"
            style={{
              position: "absolute",
              // Start centered — JS overrides width/height/borderRadius on scroll.
              // Using top/left 50% + translate(-50%,-50%) means it's always
              // centered regardless of whether JS has run yet, eliminating the
              // gap/flash before the first scroll event fires.
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              height: "100%",
              overflow: "hidden",
              zIndex: 1,
              willChange: "width, height, border-radius, transform",
            }}
          >
            {/* The video — NEVER animated, fills its container always */}
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              src="/hero-bg.mp4"
            />

            {/* Dark overlay — inside container so it shrinks with it on mobile */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.45) 100%)",
                zIndex: 2,
              }}
            />
          </div>

          {/* Hero text — scroll-driven translateY + opacity, z-index above container */}
          <div
            ref={heroTextRef}
            aria-hidden="false"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              willChange: "transform, opacity",
              transform: "translateY(0px)",
              opacity: 1,
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "1200px",
                padding: "0 1.5rem",
                textAlign: "center",
              }}
            >
              <div style={{ maxWidth: "48rem", margin: "0 auto" }}>
                <p className="eyebrow text-accent-pulse-bright">
                  Agentic clinical AI
                </p>
                <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-[56px] drop-shadow-sm">
                  Predicting patient deterioration{" "}
                  <span className="text-gradient font-serif italic font-medium">
                    before crisis
                  </span>{" "}
                  happens.
                </h1>
                <p className="mt-6 text-base md:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto drop-shadow-sm">
                  Pulse AI combines clinical data, patient monitoring, and
                  agentic AI to help clinicians identify risk earlier — starting
                  with cancer care.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Link
                    to="/support"
                    className="inline-flex h-12 items-center rounded-full bg-accent-pulse px-6 text-sm font-medium text-white hover:bg-[#196f4a] transition-all hover:scale-[1.02] shadow-lg shadow-black/20"
                  >
                    Partner with us
                  </Link>
                  <Link
                    to="/technology"
                    className="inline-flex h-12 items-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-6 text-sm font-medium text-white hover:bg-white/20 transition-colors"
                  >
                    Learn about our technology
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Mute toggle — sits above all layers */}
          <button
            onClick={toggleMute}
            style={{
              position: "absolute",
              bottom: "1.5rem",
              right: "1.5rem",
              zIndex: 10,
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-black/60 transition-all shadow-lg hover:scale-105 cursor-pointer"
            aria-label={muted ? "Unmute video" : "Mute video"}
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      </section>

      {/* Proof strip — solid bg + z-index so it slides over the pinned video */}
      <section
        className="border-y border-hairline py-8"
        style={{
          position: "relative",
          zIndex: 10,
          background: "var(--bg-panel)",
        }}
      >
        <div className="container-page">
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted mb-6">
            Collaborating with leading clinical and research partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            {partnerLogos.map((logo) => (
              <img
                key={logo.src}
                src={logo.src}
                alt={logo.alt}
                className="h-20 md:h-24 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Problem */}
      <section
        className="container-page py-24 md:py-32"
        style={{ position: "relative", zIndex: 10 }}
      >
        <Reveal className="mx-auto max-w-4xl">
          <p className="eyebrow">The problem</p>
          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-text-primary md:text-5xl">
            Most deterioration is visible in the data hours before it is visible
            at the bedside.
          </h2>
          <p className="mt-6 max-w-2xl text-text-muted">
            Clinicians work with fragmented signals — observations, scans,
            notes, vitals — across systems that don't talk. The pattern is
            there. The time to act on it isn't.
          </p>
        </Reveal>
      </section>

      {/* Solution */}
      <section
        className="border-t border-hairline bg-bg-panel"
        style={{ position: "relative", zIndex: 10 }}
      >
        <div className="container-page py-24 md:py-32">
          <Reveal className="mx-auto max-w-4xl">
            <p className="eyebrow">Our approach</p>
            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-text-primary md:text-5xl">
              An agentic clinical AI that reasons across a patient's journey —
              and surfaces risk in a form clinicians can use.
            </h2>
          </Reveal>
        </div>
      </section>

      {/* Pulse Timeline */}
      <section
        className="border-t border-hairline"
        style={{ position: "relative", zIndex: 10 }}
      >
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
