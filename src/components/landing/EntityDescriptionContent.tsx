"use client";

import EntityIcon from "@/components/EntityIcon";
import EntityFeatureCard from "@/components/landing/EntityFeatureCard";
import {
  renderIllustration,
  type IllustrationKey,
} from "@/components/landing/illustrations";
import Iphone from "@/components/Iphone";

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

const ICON_PLACEMENT: IconPlacement = {
  xPercent: 0,
  yPercent: 0,
  offsetX: 20,
  offsetY: 20,
  rotateDeg: -14,
};

export default function EntityDescriptionContent() {
  return (
    <div className="flex w-full flex-col gap-32">
      {ENTITIES.map((entity) => {
        const bgCircles = getBgCircles(entity.key);
        const screenSrc = getScreenSrc(entity.key);
        const iconVariant = getIconVariant(entity.key);

        return (
          <section key={entity.key} className="grid grid-cols-1 items-start gap-5 md:grid-cols-2">
            <div className="min-w-0">
              <div className="relative w-full overflow-visible">
                <div className="h-[512px] overflow-hidden rounded-[32px]">
                  <div className="relative overflow-hidden pb-12 pt-10">
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
                          zIndex: idx === 0 ? 0 : 30,
                          transform: "translate(-50%, -50%)",
                        }}
                      />
                    ))}
                    <div className="relative z-20 mb-10 text-center">
                      <h2 className="text-black">{entity.label}</h2>
                    </div>
                    <div className="relative z-20 flex justify-center">
                      <Iphone
                        responsive
                        screenSrc={screenSrc}
                        className="mx-auto !w-[240px] !max-w-none"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="pointer-events-none absolute z-40 transition-all duration-500 ease-out"
                  style={{
                    left: `calc(${ICON_PLACEMENT.xPercent}% + ${ICON_PLACEMENT.offsetX}px)`,
                    top: `calc(${ICON_PLACEMENT.yPercent}% + ${ICON_PLACEMENT.offsetY}px)`,
                    transform: `translate(-50%, -50%) rotate(${ICON_PLACEMENT.rotateDeg}deg)`,
                  }}
                >
                  <EntityIcon variant={iconVariant} size={128} />
                </div>
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-5">
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
          </section>
        );
      })}
    </div>
  );
}
