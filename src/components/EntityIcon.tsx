import {
  Key,
  CreditCard,
  CalendarCheck,
  Link,
  FileArrowDown,
  ShieldCheckered,
} from "@phosphor-icons/react/ssr";
import type { ComponentType } from "react";

const DEFAULT_BOX_SIZE = 128;
const DEFAULT_ICON_SIZE = 72;
const DEFAULT_SQUARE_RADIUS = 24;

const variants = [
  {
    shape: "square" as const,
    bg: "bg-lova-green/25",
    rounded: "rounded-[24px]",
    Icon: Key,
    iconColor: "text-lova-green",
    iconWeight: "fill" as const,
    tiltDeg: -14,
  },
  {
    shape: "circle" as const,
    bg: "bg-lova-blue/25",
    rounded: "rounded-full",
    Icon: Link,
    iconColor: "text-lova-blue",
    iconWeight: "regular" as const,
    tiltDeg: 9,
  },
  {
    shape: "circle" as const,
    bg: "bg-lova-purple/25",
    rounded: "rounded-full",
    Icon: CreditCard,
    iconColor: "text-lova-purple",
    iconWeight: "fill" as const,
    tiltDeg: -17,
  },
  {
    shape: "square" as const,
    bg: "bg-lova-blue/25",
    rounded: "rounded-[24px]",
    Icon: ShieldCheckered,
    iconColor: "text-lova-blue",
    iconWeight: "fill" as const,
    tiltDeg: 12,
  },
  {
    shape: "square" as const,
    bg: "bg-lova-orange/25",
    rounded: "rounded-[24px]",
    Icon: CalendarCheck,
    iconColor: "text-lova-orange",
    iconWeight: "fill" as const,
    tiltDeg: -20,
  },
  {
    shape: "circle" as const,
    bg: "bg-lova-blue/25",
    rounded: "rounded-full",
    Icon: FileArrowDown,
    iconColor: "text-lova-blue",
    iconWeight: "fill" as const,
    tiltDeg: 16,
  },
] as const;

type EntityIconVariant = 1 | 2 | 3 | 4 | 5 | 6;
type IconWeight = "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
type IconComponent = ComponentType<{
  size?: number | string;
  weight?: IconWeight;
  className?: string;
}>;

const GLASS_BORDER = "1px solid rgba(255, 255, 255, 0.15)";
const GLASS_FILTER = "blur(20px) saturate(1.35)";

function getGlassStyle(variant: EntityIconVariant): {
  backgroundColor: string;
  border: string;
  backdropFilter: string;
  WebkitBackdropFilter: string;
  isolation: "isolate";
  transform?: string;
} {
  switch (variant) {
    case 1:
      return {
        backgroundColor: "rgba(37, 177, 101, 0.24)",
        border: GLASS_BORDER,
        backdropFilter: GLASS_FILTER,
        WebkitBackdropFilter: GLASS_FILTER,
        isolation: "isolate",
      };
    case 2:
      return {
        backgroundColor: "rgba(32, 109, 229, 0.24)",
        border: GLASS_BORDER,
        backdropFilter: GLASS_FILTER,
        WebkitBackdropFilter: GLASS_FILTER,
        isolation: "isolate",
      };
    case 3:
      return {
        backgroundColor: "rgba(125, 51, 212, 0.24)",
        border: GLASS_BORDER,
        backdropFilter: GLASS_FILTER,
        WebkitBackdropFilter: GLASS_FILTER,
        isolation: "isolate",
      };
    case 5:
      return {
        backgroundColor: "rgba(233, 113, 46, 0.24)",
        border: GLASS_BORDER,
        backdropFilter: GLASS_FILTER,
        WebkitBackdropFilter: GLASS_FILTER,
        isolation: "isolate",
      };
    default:
      return {
        backgroundColor: "rgba(32, 109, 229, 0.24)",
        border: GLASS_BORDER,
        backdropFilter: GLASS_FILTER,
        WebkitBackdropFilter: GLASS_FILTER,
        isolation: "isolate",
      };
  }
}

export default function EntityIcon({
  variant,
  glass = true,
  tiltAll = false,
  size = DEFAULT_BOX_SIZE,
  iconOverride,
  iconWeightOverride,
  shapeOverride,
  tiltDeg: tiltDegOverride,
}: {
  variant: EntityIconVariant;
  glass?: boolean;
  tiltAll?: boolean;
  size?: number;
  iconOverride?: IconComponent;
  iconWeightOverride?: IconWeight;
  shapeOverride?: "circle" | "square";
  tiltDeg?: number;
}) {
  const config = variants[variant - 1];
  const Icon = iconOverride ?? config.Icon;
  const iconWeight = iconWeightOverride ?? config.iconWeight;
  const shape = shapeOverride ?? config.shape;
  const tiltDeg = tiltDegOverride ?? config.tiltDeg;
  const rotate = tiltAll ? `rotate(${tiltDeg}deg)` : undefined;
  const iconSize = Math.round((size / DEFAULT_BOX_SIZE) * DEFAULT_ICON_SIZE);
  const squareRadius = Math.round((size / DEFAULT_BOX_SIZE) * DEFAULT_SQUARE_RADIUS);
  const rounded = shape === "circle" ? "rounded-full" : config.rounded;

  return (
    <div
      className={`flex items-center justify-center ${rounded} shadow-[0_0_30px_0_color(display-p3_1_1_1/0.70)] ${glass ? "" : config.bg}`}
      style={{
        width: size,
        height: size,
        borderRadius: shape === "circle" ? 9999 : squareRadius,
        ...(glass ? getGlassStyle(variant) : undefined),
        ...(rotate ? { transform: `${rotate} translateZ(0)` } : undefined),
      }}
    >
      <Icon
        size={iconSize}
        weight={iconWeight}
        className={config.iconColor}
      />
    </div>
  );
}
