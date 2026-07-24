import { useEffect, useRef } from "react";

interface VideoScrollBackgroundProps {
  src?: string;
  className?: string;
  opacity?: number;
  mode?: "pingpong" | "loop" | "scroll";
}

export function VideoScrollBackground({
  src = "3dbg.mp4",
  className = "fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center",
  opacity = 0.85,
  mode = "pingpong",
}: VideoScrollBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const directionRef = useRef<"forward" | "reverse">("forward");
  const animFrameIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (mode === "scroll") {
      let scrollTimer: ReturnType<typeof setTimeout> | null = null;

      // Ensure video is ready to play
      video.muted = true;
      video.playsInline = true;

      const handleScroll = () => {
        if (!video) return;

        // Scrub time based on scroll position
        if (video.duration) {
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const maxScroll = Math.max(
            1,
            document.documentElement.scrollHeight - window.innerHeight
          );
          const progress = Math.min(1, Math.max(0, scrollTop / maxScroll));
          try {
            video.currentTime = progress * video.duration;
          } catch (e) {}
        }

        // Play video during scroll motion
        if (video.paused) {
          video.play().catch(() => {});
        }

        // Pause video 150ms after scroll stops
        if (scrollTimer) clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          if (video && !video.paused) {
            video.pause();
          }
        }, 150);
      };

      // Initial sync on load
      const handleLoaded = () => {
        handleScroll();
        if (video && !video.paused) video.pause();
      };

      video.addEventListener("loadedmetadata", handleLoaded);
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("touchmove", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("touchmove", handleScroll);
        video.removeEventListener("loadedmetadata", handleLoaded);
        if (scrollTimer) clearTimeout(scrollTimer);
      };
    }

    if (mode === "loop") {
      video.loop = true;
      video.play().catch(() => {});
      return;
    }

    // Ping-Pong mode: Forward -> Reverse -> Forward seamlessly
    video.loop = false;
    video.play().catch(() => {});

    let isRunning = true;
    lastTimeRef.current = null;
    directionRef.current = "forward";

    const step = (timestamp: number) => {
      if (!isRunning || !video) return;

      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }
      const delta = Math.min(0.064, (timestamp - lastTimeRef.current) / 1000);
      lastTimeRef.current = timestamp;

      if (video.duration && video.duration > 0) {
        if (directionRef.current === "forward") {
          if (video.currentTime >= video.duration - 0.08 || video.ended) {
            directionRef.current = "reverse";
            video.pause();
          }
        } else if (directionRef.current === "reverse") {
          const newTime = video.currentTime - delta;
          if (newTime <= 0.04) {
            video.currentTime = 0;
            directionRef.current = "forward";
            video.play().catch(() => {});
          } else {
            try {
              video.currentTime = newTime;
            } catch (e) {}
          }
        }
      }

      animFrameIdRef.current = requestAnimationFrame(step);
    };

    animFrameIdRef.current = requestAnimationFrame(step);

    const handleEnded = () => {
      directionRef.current = "reverse";
      if (video) video.pause();
    };

    video.addEventListener("ended", handleEnded);

    return () => {
      isRunning = false;
      if (video) {
        video.removeEventListener("ended", handleEnded);
      }
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [src, mode]);

  const baseUrl = import.meta.env.BASE_URL || "/";
  const cleanSrc = src.replace(/^\//, "");

  return (
    <div className={className} style={{ opacity }}>
      <video
        ref={videoRef}
        src={`${baseUrl}${cleanSrc}`}
        muted
        playsInline
        autoPlay
        preload="auto"
        className="w-full max-w-[340px] sm:max-w-sm aspect-[9/16] md:aspect-auto md:max-w-none md:w-full md:h-full object-cover rounded-3xl md:rounded-none block pointer-events-none mx-auto"
      />
    </div>
  );
}
