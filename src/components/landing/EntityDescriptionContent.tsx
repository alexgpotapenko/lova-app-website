"use client";

import EntityIcon from "@/components/EntityIcon";
import EntityFeatureCard from "@/components/landing/EntityFeatureCard";
import {
  renderIllustration,
  type IllustrationKey,
} from "@/components/landing/illustrations";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

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

const TABS: Array<{
  key: EntityKey;
  label: string;
  activeClass: string;
  inactiveTextClass: string;
}> = [
  {
    key: "logins",
    label: "Logins",
    activeClass: "bg-lova-green text-white",
    inactiveTextClass: "text-lova-green",
  },
  {
    key: "cards",
    label: "Cards",
    activeClass: "bg-lova-purple text-white",
    inactiveTextClass: "text-lova-purple",
  },
  {
    key: "subscriptions",
    label: "Subscriptions",
    activeClass: "bg-lova-orange text-white",
    inactiveTextClass: "text-lova-orange",
  },
];

const ENTITY_FEATURES: Record<EntityKey, Feature[]> = {
  logins: [
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
  cards: [
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
  subscriptions: [
    {
      title: "See where your money goes.",
      description:
        "A visual split of all active subscriptions by monthly cost — so you always know what you're actually spending.",
      illustrationKey: "subscriptions-1",
    },
    {
      title: "Never get charged by surprise.",
      description:
        "Set a reminder before any renewal date and get notified on your device — no cloud, no account needed.",
      illustrationKey: "subscriptions-2",
    },
    {
      title: "Track trials before they turn into charges.",
      description:
        "Mark any subscription as a free trial and keep track of when it ends — so you cancel before it costs you.",
    },
  ],
};

export default function EntityDescriptionContent() {
  const [activeEntity, setActiveEntity] = useState<EntityKey>("logins");
  const [iconPlacement, setIconPlacement] = useState<IconPlacement>({
    xPercent: 0,
    yPercent: 0,
    offsetX: 0,
    offsetY: 0,
    rotateDeg: -12,
  });
  const isFirstRender = useRef(true);
  const features = useMemo(() => ENTITY_FEATURES[activeEntity], [activeEntity]);
  const activeScreenSrc = useMemo(() => {
    if (activeEntity === "cards") return "/screen-card-details.png";
    if (activeEntity === "subscriptions") return "/screen-subscription-details.png";
    return "/screen-login-details.png";
  }, [activeEntity]);
  const activeIconVariant = useMemo(() => {
    if (activeEntity === "logins") return 1;
    if (activeEntity === "cards") return 3;
    return 5;
  }, [activeEntity]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
    setIconPlacement({
      xPercent: 0,
      yPercent: 0,
      offsetX: randomInRange(-40, 40),
      offsetY: randomInRange(-40, 40),
      rotateDeg: randomInRange(-25, 25),
    });
  }, [activeEntity]);

  return (
    <div className="w-full">
      <div className="mb-16 flex flex-wrap items-center justify-center gap-2">
        {TABS.map((tab) => {
          const isActive = tab.key === activeEntity;
          return (
            <button
              key={tab.key}
              type="button"
              className={`cursor-pointer rounded-full px-6 py-3 text-lg font-semibold transition-all duration-300 ease-out md:text-xl ${
                isActive
                  ? tab.activeClass
                  : "bg-transparent text-slate-700 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.55)] hover:text-black"
              }`}
              onClick={() => setActiveEntity(tab.key)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="overflow-visible md:hidden">
        <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-visible">
          <div className="overflow-x-auto overflow-y-visible scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="px-6 overflow-visible">
              <div className="w-[672px] min-w-[672px] overflow-visible">
                <div className="grid grid-cols-2 items-start gap-5 overflow-visible">
                  <div className="min-w-0">
                    <div className="relative w-full overflow-visible">
                  <div className="overflow-hidden rounded-[24px]">
                    <Image
                      src={activeScreenSrc}
                      alt="Lova app screenshot"
                      width={420}
                      height={912}
                      className="w-full object-cover"
                    />
                  </div>
                  <div
                    className="pointer-events-none absolute z-10 hidden transition-all duration-500 ease-out md:block"
                    style={{
                      left: `calc(${iconPlacement.xPercent}% + ${iconPlacement.offsetX}px)`,
                      top: `calc(${iconPlacement.yPercent}% + ${iconPlacement.offsetY}px)`,
                      transform: `translate(-50%, -50%) rotate(${iconPlacement.rotateDeg}deg)`,
                    }}
                  >
                    <EntityIcon variant={activeIconVariant} size={128} />
                  </div>
                </div>
              </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`mobile-${activeEntity}`}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="flex min-w-0 flex-col gap-5 overflow-visible"
                    >
                      {features.map((feature) => (
                        <EntityFeatureCard
                          key={`mobile-card-${feature.title}`}
                          title={feature.title}
                          description={feature.description}
                          illustration={
                            feature.illustrationKey
                              ? renderIllustration(feature.illustrationKey)
                              : undefined
                          }
                        />
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden grid-cols-2 items-start gap-5 md:grid">
        <div className="min-w-0">
          <div className="relative w-full">
            <div className="overflow-hidden rounded-[24px]">
              <Image
                src={activeScreenSrc}
                alt="Lova app screenshot"
                width={420}
                height={912}
                className="w-full object-cover"
              />
            </div>
            <div
              className="pointer-events-none absolute z-10 transition-all duration-500 ease-out"
              style={{
                left: `calc(${iconPlacement.xPercent}% + ${iconPlacement.offsetX}px)`,
                top: `calc(${iconPlacement.yPercent}% + ${iconPlacement.offsetY}px)`,
                transform: `translate(-50%, -50%) rotate(${iconPlacement.rotateDeg}deg)`,
              }}
            >
              <EntityIcon variant={activeIconVariant} size={128} />
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeEntity}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="flex min-w-0 flex-col gap-5"
          >
            {features.map((feature) => (
              <EntityFeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                illustration={
                  feature.illustrationKey
                    ? renderIllustration(feature.illustrationKey)
                    : undefined
                }
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
