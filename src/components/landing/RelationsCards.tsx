"use client";

import { Link } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import { motion } from "framer-motion";

function EntityCapsule({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`entity-capsule inline-flex items-center rounded-full px-5 pt-0.5 pb-2.5 text-3xl font-semibold ${className}`}
    >
      {children}
    </span>
  );
}

const LOVA_100 = {
  green: "var(--color-lova-green-100)",
  orange: "var(--color-lova-orange-100)",
  purple: "var(--color-lova-purple-100)",
} as const;

function LinkIcon({
  left,
  right,
}: {
  left: keyof typeof LOVA_100;
  right: keyof typeof LOVA_100;
}) {
  return (
    <span
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
      style={{
        background: `linear-gradient(to right, ${LOVA_100[left]}, ${LOVA_100[right]})`,
      }}
    >
      <Link size={16} weight="regular" className="text-black" />
    </span>
  );
}

const CARD_ANIMATION = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

const STAGGER_DELAY = 0.2;

export default function RelationsCards() {
  return (
    <div className="mt-16 flex flex-col gap-5">
      <motion.article
        className="flex flex-col gap-0 rounded-[24px] bg-white p-1 sm:flex-row sm:items-start"
        initial={CARD_ANIMATION.initial}
        whileInView={CARD_ANIMATION.animate}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ ...CARD_ANIMATION.transition, delay: STAGGER_DELAY * 0 }}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-5 p-8 pr-2">
            <div className="flex flex-wrap items-center gap-1">
              <EntityCapsule className="bg-lova-green-50 text-lova-green">
                Login
              </EntityCapsule>
              <LinkIcon left="green" right="orange" />
              <EntityCapsule className="bg-lova-orange-50 text-lova-orange">
                Subscriptions
              </EntityCapsule>
            </div>
            <h3 className="text-xl font-semibold text-black">
              Link your login to multiple subscription services.
            </h3>
        </div>
        <div className="relative min-w-0 flex-1 aspect-[420/450] overflow-hidden rounded-[18px]">
          <Image
            src="/features/relations-logins-subscriptions.png"
            alt=""
            fill
            className="object-contain"
            sizes="(max-width: 640px) 100vw, 50vw"
            aria-hidden
          />
        </div>
      </motion.article>

      <motion.article
        className="flex flex-col gap-0 rounded-[24px] bg-white p-1 sm:flex-row sm:items-start"
        initial={CARD_ANIMATION.initial}
        whileInView={CARD_ANIMATION.animate}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ ...CARD_ANIMATION.transition, delay: STAGGER_DELAY * 1 }}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-5 p-8 pr-2">
            <div className="flex flex-wrap items-center gap-1">
              <EntityCapsule className="bg-lova-green-50 text-lova-green">
                Login
              </EntityCapsule>
              <LinkIcon left="green" right="green" />
              <EntityCapsule className="bg-lova-green-50 text-lova-green">
                Logins
              </EntityCapsule>
            </div>
            <h3 className="text-xl font-semibold text-black">
              Create a login that you use as SSO for other services.
            </h3>
        </div>
        <div className="relative min-w-0 flex-1 aspect-[420/450] overflow-hidden rounded-[18px]">
          <Image
            src="/features/relations-sso.png"
            alt=""
            fill
            className="object-contain"
            sizes="(max-width: 640px) 100vw, 420px"
            aria-hidden
          />
        </div>
      </motion.article>

      <motion.article
        className="flex flex-col gap-0 rounded-[24px] bg-white p-1 sm:flex-row sm:items-start"
        initial={CARD_ANIMATION.initial}
        whileInView={CARD_ANIMATION.animate}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ ...CARD_ANIMATION.transition, delay: STAGGER_DELAY * 2 }}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-5 p-8 pr-2">
            <div className="flex flex-wrap items-center gap-1">
              <EntityCapsule className="bg-lova-purple-50 text-lova-purple">
                Card
              </EntityCapsule>
              <LinkIcon left="purple" right="orange" />
              <EntityCapsule className="bg-lova-orange-50 text-lova-orange">
                Subscriptions
              </EntityCapsule>
            </div>
            <h3 className="text-xl font-semibold text-black">
              Link all subscriptions to the card you pay with.
            </h3>
        </div>
        <div className="relative min-w-0 flex-1 aspect-[420/450] overflow-hidden rounded-[18px]">
          <Image
            src="/features/relations-card-subscriptions.png"
            alt=""
            fill
            className="object-contain"
            sizes="(max-width: 640px) 100vw, 420px"
            aria-hidden
          />
        </div>
      </motion.article>

      <motion.article
        className="flex flex-col gap-0 rounded-[24px] bg-white p-1 sm:flex-row sm:items-start"
        initial={CARD_ANIMATION.initial}
        whileInView={CARD_ANIMATION.animate}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ ...CARD_ANIMATION.transition, delay: STAGGER_DELAY * 3 }}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-5 p-8 pr-2">
            <div className="flex flex-wrap items-center gap-1">
              <EntityCapsule className="bg-lova-orange-50 text-lova-orange">
                Subscription
              </EntityCapsule>
              <LinkIcon left="orange" right="green" />
              <EntityCapsule className="bg-lova-green-50 text-lova-green">
                Login
              </EntityCapsule>
              <LinkIcon left="green" right="purple" />
              <EntityCapsule className="bg-lova-purple-50 text-lova-purple">
                Card
              </EntityCapsule>
            </div>
            <h3 className="text-xl font-semibold text-black">
              See your subscription login and the card used for payment.
            </h3>
        </div>
        <div className="relative min-w-0 flex-1 aspect-[420/450] overflow-hidden rounded-[18px]">
          <Image
            src="/features/relations-subscription-relations.png"
            alt=""
            fill
            className="object-contain"
            sizes="(max-width: 640px) 100vw, 50vw"
            aria-hidden
          />
        </div>
      </motion.article>
    </div>
  );
}
