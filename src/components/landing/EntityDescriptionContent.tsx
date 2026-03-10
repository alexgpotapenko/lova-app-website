"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import EntityIcon from "@/components/EntityIcon";
import EntityFeatureCard from "@/components/landing/EntityFeatureCard";
import {
  renderIllustration,
  type IllustrationKey,
} from "@/components/landing/illustrations";
import Image from "next/image";

type EntityKey = "logins" | "cards" | "subscriptions";

type Feature = {
  title: string;
  description: string;
  illustrationKey?: IllustrationKey;
};

type IconPlacement = {
  xPercent: number;
  yPercent: number;
  offsetX: number;
  offsetY: number;
  rotateDeg: number;
};

type IconPlacementConfig = {
  placement: IconPlacement;
  column: "left" | "right";
};

type BgCircle = {
  size: number;
  top: string;
  left: string;
  color: string;
  opacity?: number;
};

const ENTITIES: Array<{
  key: EntityKey;
  label: string;
  features: Feature[];
}> = [
  {
    key: "logins",
    label: "Logins",
    features: [
    {
      title: "Password generator",
      description:
        "Generate strong, unique passwords with a single tap to use them when creating new accounts.",
      illustrationKey: "logins-1",
    },
    {
      title: "SSO reuse",
      description:
        "Link sign-in methods like Google or Apple once and reuse them across all services that use the same login.",
      illustrationKey: "logins-2",
    },
    ],
  },
  {
    key: "cards",
    label: "Cards",
    features: [
    {
      title: "Full card details",
      description:
        "Store the complete card details — bank and cardholder name, number, expiry date, CVV, and PIN",
      illustrationKey: "cards-3",
    },
    {
      title: "Automatic brand detection",
      description:
        "The card brand is detected automatically from the card number.",
      illustrationKey: "cards-1",
    },
    {
      title: "Virtual cards",
      description:
        "Mark cards as virtual to distinguish them from physical ones.",
      illustrationKey: "cards-2",
    },
    ],
  },
  {
    key: "subscriptions",
    label: "Subscriptions",
    features: [
    {
      title: "Upcoming payment",
      description:
        "Quickly see which subscription will charge next and how much.",
      illustrationKey: "subscriptions-1",
    },
    {
      title: "Never get charged by surprise",
      description:
        "Set a reminder before any renewal date and get notified on your device",
      illustrationKey: "subscriptions-2",
    },
    {
      title: "See where your money goes",
      description:
        "A visual breakdwon of all active subscriptions by monthly cost",
      illustrationKey: "subscriptions-3",
    },
    ],
  },
];

function getScreenSrc(entity: EntityKey) {
  if (entity === "cards") return "/screen-card-details.png";
  if (entity === "subscriptions") return "/screen-subscription-details.png";
  return "/screen-login-details.png";
}

function getIconVariant(entity: EntityKey) {
  if (entity === "logins") return 1;
  if (entity === "cards") return 3;
  return 5;
}

function getBgCircles(entity: EntityKey): BgCircle[] {
  const topCircleColor =
    entity === "logins"
      ? "var(--color-lova-green)"
      : entity === "cards"
        ? "var(--color-lova-purple)"
        : "var(--color-lova-orange)";
  const bottomRightColor =
    entity === "cards" ? "var(--color-lova-orange)" : "var(--color-lova-purple)";
  const bottomLeftColor =
    entity === "logins" ? "var(--color-lova-orange)" : "var(--color-lova-green)";

  return [
    { size: 600, top: "0%", left: "0%", color: topCircleColor, opacity: 0.1 },
    { size: 320, top: "80%", left: "50%", color: "var(--color-lova-blue)", opacity: 0.1 },
    { size: 320, top: "72%", left: "120%", color: bottomRightColor, opacity: 0.1 },
    { size: 320, top: "72%", left: "-20%", color: bottomLeftColor, opacity: 0.1 },
  ];
}

function getIconPlacement(entity: EntityKey): IconPlacementConfig {
  if (entity === "logins") {
    return {
      placement: { xPercent: -7, yPercent: 8, offsetX: 30, offsetY: 0, rotateDeg: -14 },
      column: "left",
    };
  }
  if (entity === "subscriptions") {
    return {
      placement: { xPercent: -5, yPercent: 65, offsetX: 20, offsetY: -40, rotateDeg: -14 },
      column: "left",
    };
  }
  // cards — правый верхний угол блока с карточками
  return {
    placement: { xPercent: 110, yPercent: -5, offsetX: -64, offsetY: 64, rotateDeg: 14 },
    column: "right",
  };
}

const SECTION_ANIMATION = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" as const },
};
const STAGGER_DELAY = 0.2;

/** ccw = -1, cw = 1; экстремумы ±20° от базового угла */
const SCROLL_ROTATE_DIRECTION: Record<EntityKey, number> = {
  logins: -1,
  cards: 1,
  subscriptions: -1,
};

const SCROLL_ROTATE_DEG = 20;

function EntitySection({
  entity,
  entityIdx,
}: {
  entity: (typeof ENTITIES)[number];
  entityIdx: number;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const direction = SCROLL_ROTATE_DIRECTION[entity.key];
  const iconPlacementConfig = getIconPlacement(entity.key);
  const p = iconPlacementConfig.placement;
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [p.rotateDeg - SCROLL_ROTATE_DEG * direction, p.rotateDeg + SCROLL_ROTATE_DEG * direction]
  );

  const bgCircles = getBgCircles(entity.key);
  const screenSrc = getScreenSrc(entity.key);
  const iconVariant = getIconVariant(entity.key);

  const iconStyle = {
    left: `calc(${p.xPercent}% + ${p.offsetX}px)` as const,
    top: `calc(${p.yPercent}% + ${p.offsetY}px)` as const,
  };

  return (
    <motion.section
      ref={sectionRef}
      className="grid grid-cols-1 items-start gap-5 md:grid-cols-2"
      initial={SECTION_ANIMATION.initial}
      whileInView={SECTION_ANIMATION.animate}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        ...SECTION_ANIMATION.transition,
        delay: STAGGER_DELAY * entityIdx,
      }}
    >
      <div className="min-w-0">
        <div className="relative w-full overflow-visible">
          <div className="h-[512px] overflow-hidden rounded-[32px]">
            <div className="relative h-full overflow-hidden pb-12 pt-10">
              {bgCircles.map((circle, idx) => (
                <span
                  key={`${entity.key}-bg-circle-${idx}`}
                  className="pointer-events-none absolute rounded-full blur-[40px]"
                  style={{
                    width: circle.size,
                    height: circle.size,
                    top: circle.top,
                    left: circle.left,
                    backgroundColor: circle.color,
                    opacity: circle.opacity ?? 1,
                    zIndex: idx === 0 ? 0 : 10,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ))}
              <div className="relative z-20 mb-10 text-center">
                <h2 className="text-black">
                  {entity.label.trimEnd().match(/[.!?]$/) ? entity.label : `${entity.label.trimEnd()}.`}
                </h2>
              </div>
              <div className="relative z-20 flex justify-center">
                <div className="relative w-[280px] max-w-none overflow-hidden rounded-[32px] shadow-[0_0_48px_rgba(255,255,255,0.65)]">
                  <div className="relative aspect-[420/912] w-full">
                    <Image
                      src={screenSrc}
                      alt={`${entity.label} screenshot`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {iconPlacementConfig.column === "left" && (
            <motion.div
              className="pointer-events-none absolute z-40 origin-center"
              style={{
                ...iconStyle,
                x: "-50%",
                y: "-50%",
                rotate,
              }}
            >
              <EntityIcon variant={iconVariant} size={128} />
            </motion.div>
          )}
        </div>
      </div>

      <div className="relative flex min-w-0 flex-col gap-5">
        {iconPlacementConfig.column === "right" && (
          <motion.div
            className="pointer-events-none absolute z-40 origin-center"
            style={{
              ...iconStyle,
              x: "-50%",
              y: "-50%",
              rotate,
            }}
          >
            <EntityIcon variant={iconVariant} size={128} />
          </motion.div>
        )}
        {entity.features.map((feature) => (
          <EntityFeatureCard
            key={`${entity.key}-${feature.title}`}
            title={feature.title}
            description={feature.description}
            illustration={
              feature.illustrationKey
                ? renderIllustration(feature.illustrationKey)
                : undefined
            }
          />
        ))}
      </div>
    </motion.section>
  );
}

export default function EntityDescriptionContent() {
  return (
    <div className="flex w-full flex-col gap-32">
      {ENTITIES.map((entity, entityIdx) => (
        <EntitySection key={entity.key} entity={entity} entityIdx={entityIdx} />
      ))}
    </div>
  );
}
