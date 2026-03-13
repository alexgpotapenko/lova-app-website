"use client";

import { CalendarCheck, CreditCard, Key } from "@phosphor-icons/react/ssr";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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
      title: "Categories",
      description:
        "Organize your logins into categories to keep it easy to navigate.",
      illustrationKey: "logins-1",
    },
    {
      title: "Password generator",
      description:
        "Generate strong passwords when creating or editing your logins.",
      illustrationKey: "logins-2",
    },
    {
      title: "SSO reuse",
      description:
        "Create a login used for SSO and link it to the services that rely on it.",
      illustrationKey: "logins-3",
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
        "Store your card details, quickly copy and use them when needed.",
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

function getGallerySlides(entity: EntityKey): string[] {
  if (entity === "logins") {
    return ["/screen-login-categories.webp", "/screen-login-password-generator.webp", "/screen-login-sso-reuse.webp"];
  }
  if (entity === "cards") {
    return ["/screen-card-1.webp", "/screen-card-2.webp", "/screen-card-3.webp"];
  }
  return ["/screen-subscription-1.webp", "/screen-subscription-2.webp", "/screen-subscription-3.webp"];
}

const GALLERY_DURATION_MS = 5000;
const GALLERY_TICK_MS = 50;

/** Min height = 3 cards (~195.5px) + 2 gaps (20px) ≈ 626px */
const CARDS_SECTION_MIN_HEIGHT = 626;

function ScreenshotGallery({
  slides,
  className,
  ariaLabel = "Screenshot carousel",
}: {
  slides: readonly string[];
  className?: string;
  ariaLabel?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const n = slides.length;
    if (n === 0 || !isInView) return;
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (GALLERY_TICK_MS / GALLERY_DURATION_MS) * 100;
        if (next >= 100) {
          const current = activeIndexRef.current;
          const nextIndex = (current + 1) % n;
          setPreviousIndex(current);
          setActiveIndex(nextIndex);
          activeIndexRef.current = nextIndex;
          return 0;
        }
        return next;
      });
    }, GALLERY_TICK_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [activeIndex, slides.length, isInView]);

  useEffect(() => {
    if (previousIndex === null) return;
    const t = setTimeout(() => setPreviousIndex(null), 1000);
    return () => clearTimeout(t);
  }, [previousIndex]);

  const goTo = (index: number) => {
    if (index !== activeIndex) {
      setPreviousIndex(activeIndex);
      setActiveIndex(index);
      activeIndexRef.current = index;
    }
    setProgress(0);
  };

  return (
    <div ref={containerRef} className={className} aria-roledescription="carousel" aria-label={ariaLabel}>
      <div className="mb-6 flex justify-center gap-1">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Slide ${i + 1}`}
            aria-current={activeIndex === i ? true : undefined}
            onClick={() => goTo(i)}
            className="h-[3px] w-8 overflow-hidden rounded-full bg-black/20"
          >
            {activeIndex === i ? (
              <span
                className="block h-full rounded-full bg-black transition-none"
                style={{ width: `${progress}%` }}
              />
            ) : null}
          </button>
        ))}
      </div>
      <div className="relative w-[280px] max-w-none overflow-hidden rounded-[40px]">
        <div
          className="relative aspect-[420/912] w-full"
          style={{
            maskImage: "linear-gradient(to top, transparent 0px, transparent 160px, black 320px)",
            WebkitMaskImage: "linear-gradient(to top, transparent 0px, transparent 160px, black 320px)",
          }}
        >
          {slides.map((src, i) => {
            const isVisible = i === activeIndex || i === previousIndex;
            const isNew = i === activeIndex;
            return (
              <Image
                key={`slide-${i}`}
                src={src}
                alt={`Screenshot ${i + 1}`}
                fill
                unoptimized
                className={isNew ? "object-cover transition-opacity duration-1000" : "object-cover"}
                style={{
                  opacity: isVisible ? 1 : 0,
                  zIndex: isNew ? 10 : isVisible ? 5 : 0,
                }}
                aria-hidden={!isVisible}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
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

const SECTION_ANIMATION = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" as const },
};
const STAGGER_DELAY = 0.2;

function EntitySection({
  entity,
  entityIdx,
}: {
  entity: (typeof ENTITIES)[number];
  entityIdx: number;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgCircles = getBgCircles(entity.key);

  return (
    <motion.section
      ref={sectionRef}
      className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2"
      initial={SECTION_ANIMATION.initial}
      whileInView={SECTION_ANIMATION.animate}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        ...SECTION_ANIMATION.transition,
        delay: STAGGER_DELAY * entityIdx,
      }}
    >
      <div className="flex min-h-0 min-w-0 flex-col">
        <div className="relative w-full overflow-visible" style={{ height: CARDS_SECTION_MIN_HEIGHT }}>
          <div className="h-full rounded-[40px] blur-container-safari-fix-40">
            <div className="relative h-full overflow-hidden pb-12 pt-8">
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
              <div className="relative z-20">
                <div className="mb-6 flex items-center justify-center gap-2 -ml-4">
                  <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center">
                    {entity.key === "logins" && <Key size={28} weight="fill" className="text-lova-green" />}
                    {entity.key === "cards" && <CreditCard size={28} weight="fill" className="text-lova-purple" />}
                    {entity.key === "subscriptions" && <CalendarCheck size={28} weight="fill" className="text-lova-orange" />}
                  </span>
                  <h2>
                    {entity.label.trimEnd().match(/[.!?]$/) ? entity.label : `${entity.label.trimEnd()}.`}
                  </h2>
                </div>
                <div className="flex justify-center">
                  <ScreenshotGallery
                    slides={[...getGallerySlides(entity.key)]}
                    ariaLabel={`${entity.label} screenshots`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex min-w-0 flex-col gap-5">
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
    <div className="flex w-full flex-col gap-[96px]">
      {ENTITIES.map((entity, entityIdx) => (
        <EntitySection key={entity.key} entity={entity} entityIdx={entityIdx} />
      ))}
    </div>
  );
}
