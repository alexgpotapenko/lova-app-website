"use client";

import { useEffect, useState } from "react";

const SCROLL_LOCK_PX = 1000;

export default function HeaderBg() {
  const [isPinned, setIsPinned] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let rafId: number | null = null;

    const updatePosition = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsPinned(true);
        return;
      }
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

  // On mobile: absolute (in-flow), not sticky — avoids viewport widening from fixed layer
  const positionClass = isMobile
    ? "absolute top-0 left-0 right-0"
    : isPinned
      ? "fixed top-0 inset-x-0"
      : "absolute inset-x-0";

  return (
    <div
      className={`${positionClass} -z-[1] pointer-events-none origin-top scale-50 transform-gpu md:scale-100 m-24`}
      style={!isMobile && !isPinned ? { top: SCROLL_LOCK_PX } : undefined}
      aria-hidden
    >
      {/* Bounding box 1740×800, top -200px, blur 200px, opacity 30% */}
      <div className="absolute left-1/2 top-[-200px] -translate-x-1/2 w-[1740px] h-[800px] blur-[200px] opacity-30">
        <span className="absolute left-0 top-0 w-[600px] h-[600px] rounded-full bg-lova-blue" />
        <span className="absolute left-[320px] top-[200px] w-[600px] h-[600px] rounded-full bg-lova-green" />
        <span className="absolute left-[820px] top-[200px] w-[600px] h-[600px] rounded-full bg-lova-purple" />
        <span className="absolute left-[1140px] top-0 w-[600px] h-[600px] rounded-full bg-lova-orange" />
      </div>
      {/* White circle 1000×1000, top -280px */}
      <span className="absolute left-1/2 top-[-280px] -translate-x-1/2 w-[1000px] h-[1000px] rounded-full bg-white blur-[50px] -z-[1]" />
    </div>
  );
}
