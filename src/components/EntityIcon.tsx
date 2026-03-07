import {
  Key,
  CreditCard,
  CalendarCheck,
  PushPin,
  FileArrowDown,
  ShieldCheckered,
} from "@phosphor-icons/react/ssr";

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
    tiltDeg: -14,
  },
  {
    shape: "circle" as const,
    bg: "bg-lova-blue/25",
    rounded: "rounded-full",
    Icon: PushPin,
    iconColor: "text-lova-blue",
    tiltDeg: 9,
  },
  {
    shape: "circle" as const,
    bg: "bg-lova-purple/25",
    rounded: "rounded-full",
    Icon: CreditCard,
    iconColor: "text-lova-purple",
    tiltDeg: -17,
  },
  {
    shape: "square" as const,
    bg: "bg-lova-blue/25",
    rounded: "rounded-[24px]",
    Icon: ShieldCheckered,
    iconColor: "text-lova-blue",
    tiltDeg: 12,
  },
  {
    shape: "square" as const,
    bg: "bg-lova-orange/25",
    rounded: "rounded-[24px]",
    Icon: CalendarCheck,
    iconColor: "text-lova-orange",
    tiltDeg: -20,
  },
  {
    shape: "circle" as const,
    bg: "bg-lova-blue/25",
    rounded: "rounded-full",
    Icon: FileArrowDown,
    iconColor: "text-lova-blue",
    tiltDeg: 16,
  },
] as const;

type EntityIconVariant = 1 | 2 | 3 | 4 | 5 | 6;

const GLASS_BORDER = "1px solid rgba(255, 255, 255, 0.15)";

function getGlassStyle(variant: EntityIconVariant): { backgroundColor: string; border: string } {
  switch (variant) {
    case 1:
      return { backgroundColor: "rgba(37, 177, 101, 0.24)", border: GLASS_BORDER };
    case 2:
      return { backgroundColor: "rgba(32, 109, 229, 0.24)", border: GLASS_BORDER };
    case 3:
      return { backgroundColor: "rgba(125, 51, 212, 0.24)", border: GLASS_BORDER };
    case 5:
      return { backgroundColor: "rgba(233, 113, 46, 0.24)", border: GLASS_BORDER };
    default:
      return { backgroundColor: "rgba(32, 109, 229, 0.24)", border: GLASS_BORDER };
  }
}

export default function EntityIcon({
  variant,
  glass = true,
  tiltAll = false,
  size = DEFAULT_BOX_SIZE,
}: {
  variant: EntityIconVariant;
  glass?: boolean;
  tiltAll?: boolean;
  size?: number;
}) {
  const config = variants[variant - 1];
  const Icon = config.Icon;
  const rotate = tiltAll ? `rotate(${config.tiltDeg}deg)` : undefined;
  const iconSize = Math.round((size / DEFAULT_BOX_SIZE) * DEFAULT_ICON_SIZE);
  const squareRadius = Math.round((size / DEFAULT_BOX_SIZE) * DEFAULT_SQUARE_RADIUS);

  return (
    <div
      className={`flex items-center justify-center ${config.rounded} shadow-[0_0_30px_0_color(display-p3_1_1_1/0.70)] ${glass ? "glass-color-particle" : config.bg}`}
      style={{
        width: size,
        height: size,
        borderRadius: config.shape === "circle" ? 9999 : squareRadius,
        ...(glass ? getGlassStyle(variant) : undefined),
        ...(rotate ? { transform: rotate } : undefined),
      }}
    >
      <Icon
        size={iconSize}
        weight="fill"
        className={config.iconColor}
      />
    </div>
  );
}
