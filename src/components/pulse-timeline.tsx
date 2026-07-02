import { useEffect, useRef, useState } from "react";

interface Stage {
  label: string;
  caption: string;
  status: "Live" | "In development" | "Future";
}

const stages: Stage[] = [
  { label: "Monitoring", caption: "Continuous patient signals", status: "Live" },
  { label: "Rehabilitation", caption: "With Marengo", status: "Live" },
  { label: "Deterioration Prediction", caption: "Oncology, first", status: "In development" },
  { label: "Clinical AI Platform", caption: "Unified care intelligence", status: "Future" },
];

const statusStyles: Record<Stage["status"], string> = {
  "Live": "text-accent-pulse",
  "In development": "text-text-primary",
  "Future": "text-text-muted",
};

export function PulseTimeline({ condensed = false }: { condensed?: boolean }) {
  const ref = useRef<SVGPathElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    const path = ref.current;
    if (!el || !path) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = String(length);
    path.style.strokeDashoffset = String(length);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !drawn) {
            path.style.transition = "stroke-dashoffset 1.8s ease-out";
            path.style.strokeDashoffset = "0";
            setDrawn(true);
          }
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [drawn]);

  // Horizontal layout: 4 peaks evenly spaced
  return (
    <div ref={wrapRef} className="w-full">
      {/* Desktop: horizontal */}
      <div className="hidden md:block">
        <div className="relative">
          <svg viewBox="0 0 1200 120" className={condensed ? "h-20 w-full" : "h-32 w-full"} fill="none" aria-hidden>
            <path
              ref={ref}
              d="M0 80 H140 L180 30 L220 110 L260 80 H440 L480 30 L520 110 L560 80 H740 L780 30 L820 110 L860 80 H1040 L1080 30 L1120 110 L1160 80 H1200"
              stroke="#1F8A5C"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="absolute inset-x-0 top-0 grid grid-cols-4">
            {stages.map((s, i) => (
              <div key={s.label} className="flex flex-col items-center text-center px-3" style={{ paddingTop: condensed ? 92 : 132 }}>
                <p className="eyebrow">{`0${i + 1}`}</p>
                <h4 className="mt-1 text-base font-semibold text-text-primary">{s.label}</h4>
                {!condensed && <p className="mt-1 text-sm text-text-muted">{s.caption}</p>}
                <p className={`mt-2 font-mono text-[11px] tracking-wider uppercase ${statusStyles[s.status]}`}>
                  {s.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: vertical spine */}
      <div className="md:hidden">
        <ol className="relative ml-6 border-l border-hairline">
          {stages.map((s, i) => (
            <li key={s.label} className="relative pl-6 pb-8 last:pb-0">
              <span className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-accent-pulse" />
              <p className="eyebrow">{`0${i + 1}`}</p>
              <h4 className="mt-1 text-base font-semibold text-text-primary">{s.label}</h4>
              <p className="mt-1 text-sm text-text-muted">{s.caption}</p>
              <p className={`mt-2 font-mono text-[11px] uppercase tracking-wider ${statusStyles[s.status]}`}>
                {s.status}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
