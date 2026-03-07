"use client";

import { useEffect, useState } from "react";

const SCROLL_LOCK_PX = 1000;

export default function HeaderBg() {
  const [isPinned, setIsPinned] = useState(true);

  useEffect(() => {
    let rafId: number | null = null;

    const updatePosition = () => {
      const y = window.scrollY;
      setIsPinned(y <= SCROLL_LOCK_PX);
    };

    const onScrollOrResize = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        updatePosition();
      });
    };

    updatePosition();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return (
    <div
      className={`${isPinned ? "fixed top-0" : "absolute"} inset-x-0 -z-[1] pointer-events-none`}
      style={isPinned ? undefined : { top: SCROLL_LOCK_PX }}
      aria-hidden
    >
      {/* Bounding box 1740×800, top -200px, blur 200px, opacity 30% */}
      <div className="absolute left-1/2 top-[-200px] -translate-x-1/2 w-[1740px] h-[800px] blur-[200px] opacity-30">
        <span className="absolute left-0 top-0 w-[600px] h-[600px] rounded-full bg-lova-blue" />
        <span className="absolute left-[320px] top-[200px] w-[600px] h-[600px] rounded-full bg-lova-green" />
        <span className="absolute left-[820px] top-[200px] w-[600px] h-[600px] rounded-full bg-lova-purple" />
        <span className="absolute left-[1140px] top-0 w-[600px] h-[600px] rounded-full bg-lova-orange" />
      </div>
      {/* White circle 1000×1000, top -280px, same blur as colored circles */}
      <span className="absolute left-1/2 top-[-280px] -translate-x-1/2 w-[1000px] h-[1000px] rounded-full bg-white blur-[50px] -z-[1]" />
    </div>
  );
}
