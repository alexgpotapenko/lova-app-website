"use client";

import type { MutableRefObject } from "react";
import EntityIcon from "@/components/EntityIcon";
import Iphone from "@/components/Iphone";

export const WRAPPER_WIDTH = 460;
export const WRAPPER_HEIGHT = 960;
export const PHONE_SCALE = 0.75;
export const PHONE_TOP_OFFSET = 150;

// Point B: visual center of iPhone (with scale applied).
export const POINT_B_X = WRAPPER_WIDTH / 2;
export const POINT_B_Y = PHONE_TOP_OFFSET + (WRAPPER_HEIGHT * PHONE_SCALE) / 2;

// 6 icons on the "clock" positions: 12, 2, 4, 6, 8, 10.
export const ICON_ANGLES_DEG = [-90, -30, 30, 90, 150, 210];
export const ICON_VARIANTS: Array<1 | 2 | 3 | 4 | 5 | 6> = [1, 2, 3, 4, 5, 6];
export const ICON_ORBIT_RADIUS = 400;
export const GUIDE_RING_RADII = [
  ICON_ORBIT_RADIUS - 8,
  ICON_ORBIT_RADIUS - 64,
  ICON_ORBIT_RADIUS - 120,
  ICON_ORBIT_RADIUS - 176,
  ICON_ORBIT_RADIUS - 232,
];
export const GUIDE_RING_OPACITY = [1, 0.8, 0.6, 0.4, 0.2];

export type BgParticle = {
  radius: number;
  baseAngleDeg: number;
  size: number;
  shape: "circle" | "square";
  colorToken:
    | "--color-lova-blue"
    | "--color-lova-green"
    | "--color-lova-purple"
    | "--color-lova-orange";
  orbitDir: 1 | -1;
  baseSpinDeg: number;
  spinDir: 1 | -1;
};

// Deterministic pseudo-random background particles.
export const BG_PARTICLES: BgParticle[] = [
  { radius: 335, baseAngleDeg: -168, size: 18, shape: "circle", colorToken: "--color-lova-blue", orbitDir: 1, baseSpinDeg: 0, spinDir: 1 },
  { radius: 388, baseAngleDeg: -132, size: 30, shape: "circle", colorToken: "--color-lova-green", orbitDir: -1, baseSpinDeg: 0, spinDir: -1 },
  { radius: 352, baseAngleDeg: -104, size: 26, shape: "square", colorToken: "--color-lova-purple", orbitDir: 1, baseSpinDeg: 19, spinDir: 1 },
  { radius: 408, baseAngleDeg: -72, size: 22, shape: "square", colorToken: "--color-lova-orange", orbitDir: -1, baseSpinDeg: -27, spinDir: -1 },
  { radius: 342, baseAngleDeg: -36, size: 34, shape: "circle", colorToken: "--color-lova-green", orbitDir: 1, baseSpinDeg: 0, spinDir: 1 },
  { radius: 396, baseAngleDeg: -8, size: 16, shape: "circle", colorToken: "--color-lova-blue", orbitDir: -1, baseSpinDeg: 0, spinDir: -1 },
  { radius: 336, baseAngleDeg: 28, size: 14, shape: "circle", colorToken: "--color-lova-green", orbitDir: 1, baseSpinDeg: 0, spinDir: 1 },
  { radius: 420, baseAngleDeg: 56, size: 40, shape: "square", colorToken: "--color-lova-orange", orbitDir: -1, baseSpinDeg: 34, spinDir: 1 },
  { radius: 348, baseAngleDeg: 88, size: 12, shape: "circle", colorToken: "--color-lova-purple", orbitDir: 1, baseSpinDeg: 0, spinDir: -1 },
  { radius: 405, baseAngleDeg: 124, size: 44, shape: "square", colorToken: "--color-lova-blue", orbitDir: -1, baseSpinDeg: -41, spinDir: -1 },
  { radius: 354, baseAngleDeg: 156, size: 20, shape: "square", colorToken: "--color-lova-blue", orbitDir: 1, baseSpinDeg: 13, spinDir: 1 },
  { radius: 392, baseAngleDeg: 206, size: 48, shape: "circle", colorToken: "--color-lova-blue", orbitDir: -1, baseSpinDeg: 0, spinDir: -1 },
  { radius: 366, baseAngleDeg: -150, size: 16, shape: "square", colorToken: "--color-lova-green", orbitDir: 1, baseSpinDeg: 11, spinDir: -1 },
  { radius: 374, baseAngleDeg: -118, size: 18, shape: "circle", colorToken: "--color-lova-orange", orbitDir: -1, baseSpinDeg: 0, spinDir: 1 },
  { radius: 344, baseAngleDeg: -92, size: 14, shape: "circle", colorToken: "--color-lova-blue", orbitDir: 1, baseSpinDeg: 0, spinDir: -1 },
  { radius: 384, baseAngleDeg: -48, size: 24, shape: "square", colorToken: "--color-lova-purple", orbitDir: -1, baseSpinDeg: -18, spinDir: 1 },
  { radius: 360, baseAngleDeg: -14, size: 13, shape: "circle", colorToken: "--color-lova-green", orbitDir: 1, baseSpinDeg: 0, spinDir: 1 },
  { radius: 372, baseAngleDeg: 18, size: 17, shape: "square", colorToken: "--color-lova-blue", orbitDir: -1, baseSpinDeg: 26, spinDir: -1 },
  { radius: 350, baseAngleDeg: 66, size: 15, shape: "square", colorToken: "--color-lova-orange", orbitDir: 1, baseSpinDeg: -29, spinDir: 1 },
  { radius: 378, baseAngleDeg: 102, size: 21, shape: "square", colorToken: "--color-lova-purple", orbitDir: -1, baseSpinDeg: -33, spinDir: -1 },
  { radius: 342, baseAngleDeg: 140, size: 12, shape: "circle", colorToken: "--color-lova-green", orbitDir: 1, baseSpinDeg: 0, spinDir: 1 },
  { radius: 386, baseAngleDeg: 174, size: 23, shape: "square", colorToken: "--color-lova-blue", orbitDir: -1, baseSpinDeg: 17, spinDir: 1 },
  { radius: 358, baseAngleDeg: 220, size: 14, shape: "circle", colorToken: "--color-lova-orange", orbitDir: 1, baseSpinDeg: 0, spinDir: -1 },
  { radius: 370, baseAngleDeg: 246, size: 19, shape: "square", colorToken: "--color-lova-green", orbitDir: -1, baseSpinDeg: -22, spinDir: 1 },
];

export const BG_ORBIT_OUTER_SCALE = 0.9;
export const BG_ORBIT_INNER_SCALE = 0.56;

const getParticleTint = (colorToken: BgParticle["colorToken"]) => {
  switch (colorToken) {
    case "--color-lova-blue":
      return "rgba(32, 109, 229, 0.3)";
    case "--color-lova-green":
      return "rgba(37, 177, 101, 0.3)";
    case "--color-lova-purple":
      return "rgba(125, 51, 212, 0.3)";
    case "--color-lova-orange":
      return "rgba(233, 113, 46, 0.3)";
    default:
      return "rgba(255, 255, 255, 0.25)";
  }
};

type HeroPhoneSceneProps = {
  sceneScale: number;
  particleRefs: MutableRefObject<Array<HTMLSpanElement | null>>;
  iconRefs: MutableRefObject<Array<HTMLDivElement | null>>;
};

export default function HeroPhoneScene({
  sceneScale,
  particleRefs,
  iconRefs,
}: HeroPhoneSceneProps) {
  return (
    <div className="relative w-full" style={{ height: WRAPPER_HEIGHT * sceneScale }}>
      <div
        className="absolute left-1/2 top-0 h-[960px] w-[460px]"
        style={{
          transform: `translateX(-50%) scale(${sceneScale})`,
          transformOrigin: "top center",
        }}
      >
        <div className="absolute left-0 z-20" style={{ top: PHONE_TOP_OFFSET }}>
          <Iphone />
        </div>

        {GUIDE_RING_RADII.map((radius, idx) => (
          <span
            key={`guide-ring-${idx}`}
            className="absolute pointer-events-none rounded-full z-0"
            style={{
              left: POINT_B_X,
              top: POINT_B_Y,
              width: radius * 2,
              height: radius * 2,
              transform: "translate(-50%, -50%)",
              border: `1px solid rgba(255, 255, 255, ${GUIDE_RING_OPACITY[idx] ?? 0.2})`,
            }}
          />
        ))}

        {BG_PARTICLES.map((particle, idx) => (
          <span
            key={`particle-${idx}`}
            ref={(el) => {
              particleRefs.current[idx] = el;
            }}
            className="absolute pointer-events-none glass-color-particle"
            style={{
              left:
                POINT_B_X +
                Math.cos((particle.baseAngleDeg * Math.PI) / 180) *
                  (particle.radius * (idx < 12 ? BG_ORBIT_OUTER_SCALE : BG_ORBIT_INNER_SCALE)),
              top:
                POINT_B_Y +
                Math.sin((particle.baseAngleDeg * Math.PI) / 180) *
                  (particle.radius * (idx < 12 ? BG_ORBIT_OUTER_SCALE : BG_ORBIT_INNER_SCALE)),
              width: particle.size,
              height: particle.size,
              borderRadius: particle.shape === "circle" ? "9999px" : "10px",
              backgroundColor: getParticleTint(particle.colorToken),
              opacity: 0.56,
              transform: `translate(-50%, -50%) rotate(${particle.baseSpinDeg}deg)`,
            }}
          />
        ))}

        {ICON_VARIANTS.map((variant, idx) => (
          <div
            key={`icon-${variant}`}
            ref={(el) => {
              iconRefs.current[idx] = el;
            }}
            className="absolute z-30 flex items-center justify-center"
            style={{
              left: POINT_B_X,
              top: POINT_B_Y,
              transform: "translate(-50%, -50%)",
            }}
          >
            <EntityIcon variant={variant} glass tiltAll />
          </div>
        ))}
      </div>
    </div>
  );
}
