"use client";

import { useEffect, useRef, useState } from "react";
import HeroPhoneScene, {
  BG_ORBIT_INNER_SCALE,
  BG_ORBIT_OUTER_SCALE,
  BG_PARTICLES,
  ICON_ANGLES_DEG,
  ICON_ORBIT_RADIUS,
  POINT_B_X,
  POINT_B_Y,
  WRAPPER_WIDTH,
} from "@/components/HeroPhoneScene";

const ANIMATION_START_SCROLL_PX = 100;
const ANIMATION_DURATION_SCROLL_PX = 900;
const COLLAPSE_DURATION_PX = 220;
const BASE_SCENE_SCALE = 0.75;

const ICON_ROTATE_TOTAL_DEG = 95;

const STAR_ORBIT_ROTATE_CW_DEG = 72;
const STAR_ORBIT_ROTATE_CCW_DEG = 58;
const STAR_SPIN_ROTATE_DEG = 84;

/**
 * Анимация hero:
 * 1) 6 иконок по кругу (12/2/4/6/8/10) вращаются как единая система 600px скролла.
 * 2) Фоновые частицы вращаются в обе стороны.
 * 3) После 600px иконки стягиваются в центр iPhone и исчезают.
 */
export default function HeroScrollSection() {
  const iconRefs = useRef<Array<HTMLDivElement | null>>([]);
  const particleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const rafRef = useRef<number | null>(null);
  const [sceneScale, setSceneScale] = useState(BASE_SCENE_SCALE);

  useEffect(() => {
    const applyProgress = (
      progress: number,
      collapseProgress: number,
      spinProgress: number,
    ) => {
      const rotation = spinProgress * ICON_ROTATE_TOTAL_DEG;
      const pull = collapseProgress * ICON_ORBIT_RADIUS;

      for (let i = 0; i < ICON_ANGLES_DEG.length; i += 1) {
        const iconEl = iconRefs.current[i];
        if (!iconEl) continue;

        const angleDeg = ICON_ANGLES_DEG[i] + rotation;
        const angle = (angleDeg * Math.PI) / 180;
        const radius = ICON_ORBIT_RADIUS - pull;

        const x = POINT_B_X + Math.cos(angle) * radius;
        const y = POINT_B_Y + Math.sin(angle) * radius;

        iconEl.style.left = `${x}px`;
        iconEl.style.top = `${y}px`;
        iconEl.style.opacity = "1";
      }

      for (let i = 0; i < BG_PARTICLES.length; i += 1) {
        const particle = BG_PARTICLES[i];
        const particleEl = particleRefs.current[i];
        if (!particleEl) continue;
        const orbitScale = i < 12 ? BG_ORBIT_OUTER_SCALE : BG_ORBIT_INNER_SCALE;

        const orbitRotDeg =
          particle.orbitDir === 1
            ? progress * STAR_ORBIT_ROTATE_CW_DEG
            : -progress * STAR_ORBIT_ROTATE_CCW_DEG;
        const angleDeg = particle.baseAngleDeg + orbitRotDeg;
        const angle = (angleDeg * Math.PI) / 180;
        const scaledRadius = particle.radius * orbitScale;
        const radius = scaledRadius - collapseProgress * scaledRadius;
        const x = POINT_B_X + Math.cos(angle) * radius;
        const y = POINT_B_Y + Math.sin(angle) * radius;
        const spinDeg =
          particle.baseSpinDeg + particle.spinDir * progress * STAR_SPIN_ROTATE_DEG;

        particleEl.style.left = `${x}px`;
        particleEl.style.top = `${y}px`;
        particleEl.style.opacity = "0.56";
        particleEl.style.transform = `translate(-50%, -50%) rotate(${spinDeg}deg)`;
      }
    };

    const update = () => {
      const raw =
        (window.scrollY - ANIMATION_START_SCROLL_PX) /
        ANIMATION_DURATION_SCROLL_PX;
      const progress = Math.min(1, Math.max(0, raw));
      const rawCollapse =
        (window.scrollY - ANIMATION_START_SCROLL_PX - ANIMATION_DURATION_SCROLL_PX) /
        COLLAPSE_DURATION_PX;
      const collapseProgress = Math.min(1, Math.max(0, rawCollapse));
      // Во время стягивания продолжаем вращение круга из 6 иконок.
      const spinProgress = progress + collapseProgress * 0.6;
      applyProgress(progress, collapseProgress, spinProgress);
    };

    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        update();
      });
    };

    const onResize = () => update();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const updateScale = () => {
      // 24px + 24px layout paddings from .layout-container
      const availableWidth = Math.max(280, window.innerWidth - 48);
      const nextScale = Math.min(BASE_SCENE_SCALE, availableWidth / WRAPPER_WIDTH);
      setSceneScale(nextScale);
    };

    updateScale();
    window.addEventListener("resize", updateScale);

    return () => {
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  return (
    <section className="hero-scroll-section w-full overflow-visible py-16">
      <HeroPhoneScene
        sceneScale={sceneScale}
        particleRefs={particleRefs}
        iconRefs={iconRefs}
      />
    </section>
  );
}
