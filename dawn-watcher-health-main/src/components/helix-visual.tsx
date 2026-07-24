import { lazy, Suspense, useEffect, useState } from "react";

const Helix = lazy(() => import("./helix-canvas"));

export function HelixVisual({ className = "" }: { className?: string }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isMobile && !reduce) setEnabled(true);
  }, []);

  if (!enabled) {
    return (
      <div className={className} aria-hidden>
        <StaticHelix />
      </div>
    );
  }

  return (
    <div className={className}>
      <Suspense fallback={<StaticHelix />}>
        <Helix />
      </Suspense>
    </div>
  );
}

function StaticHelix() {
  return (
    <svg viewBox="0 0 200 400" className="h-full w-full" fill="none" aria-hidden>
      {Array.from({ length: 24 }).map((_, i) => {
        const y = 20 + i * 15;
        const phase = (i / 24) * Math.PI * 4;
        const x1 = 100 + Math.sin(phase) * 60;
        const x2 = 100 - Math.sin(phase) * 60;
        return (
          <g key={i} stroke="#1F8A5C" strokeWidth="1" opacity={0.7}>
            <line x1={x1} y1={y} x2={x2} y2={y} />
            <circle cx={x1} cy={y} r="2.5" fill="#1F8A5C" />
            <circle cx={x2} cy={y} r="2.5" fill="#1F8A5C" />
          </g>
        );
      })}
    </svg>
  );
}
