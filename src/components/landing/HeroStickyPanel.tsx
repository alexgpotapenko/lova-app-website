"use client";

import { AppStoreLogo } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import LandingButton from "@/components/landing/LandingButton";

const PANEL_TOP_PX = 14;
const TRIGGER_OFFSET_PX = 100;

export default function HeroStickyPanel() {
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const heroSceneSection = document.getElementById("hero-scene-section");
      if (!heroSceneSection) {
        setVisible(false);
        return;
      }
      const { bottom } = heroSceneSection.getBoundingClientRect();
      setVisible(bottom <= TRIGGER_OFFSET_PX);
    };

    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        update();
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className={`fixed left-1/2 z-40 w-[calc(100vw-48px)] max-w-[672px] -translate-x-1/2 transition-all duration-300 ${
        visible ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-3"
      }`}
      style={{ top: PANEL_TOP_PX }}
    >
      <div className="flex items-center justify-between rounded-full border border-white/35 bg-white/55 py-4 pr-4 pl-6 shadow-[0_8px_30px_rgba(15,23,42,0.12)] backdrop-blur-xl">
        <Image src="/logo.svg" alt="Lova" width={96} height={27} className="h-auto w-[96px]" />
        <LandingButton
          href="#"
          label={
            <>
              <span className="font-normal">Get on the </span>
              <span>App Store</span>
            </>
          }
          variant="primary"
          size="compact"
          leadingIcon={<AppStoreLogo size={20} weight="regular" />}
          className="font-semibold md:text-base"
          style={{ paddingLeft: 12, paddingRight: 20 }}
        />
      </div>
    </div>
  );
}
