"use client";

import { Link } from "@phosphor-icons/react/ssr";
import { useEffect, useRef, useState } from "react";
import EntityIcon from "@/components/EntityIcon";

const PARALLAX_FACTOR = 0.35;
const MAX_SHIFT_PX = 220;

export default function CreateRelationsFloatingIcon() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [shiftY, setShiftY] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;

    const update = () => {
      const sectionEl = sectionRef.current;
      if (!sectionEl) return;

      const sectionTop = sectionEl.offsetTop;
      const delta = Math.max(0, window.scrollY - sectionTop);
      const nextShift = Math.min(MAX_SHIFT_PX, delta * PARALLAX_FACTOR);
      setShiftY(nextShift);
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        update();
      });
    };

    sectionRef.current = document.getElementById("create-relations-section");
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="pointer-events-none absolute -right-16 top-24 z-10"
      style={{ transform: `translateY(${shiftY}px)` }}
    >
      <EntityIcon
        variant={4}
        size={128}
        tiltAll
        iconOverride={Link}
        iconWeightOverride="regular"
      />
    </div>
  );
}
