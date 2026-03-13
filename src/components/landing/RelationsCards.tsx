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
      className={`card-label inline-flex items-center rounded-full px-4 py-1 ${className}`}
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
    <div className="mt-16 flex flex-col gap-[96px]">
      <motion.article
        className="grid grid-cols-1 sm:grid-cols-2 sm:items-stretch"
        initial={CARD_ANIMATION.initial}
        whileInView={CARD_ANIMATION.animate}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ ...CARD_ANIMATION.transition, delay: STAGGER_DELAY * 0 }}
      >
        <div className="relative z-10 flex min-w-0 flex-col gap-5 rounded-[40px] bg-white p-6">
            <div className="flex flex-wrap items-center gap-1">
              <EntityCapsule className="bg-lova-green-50 text-lova-green">
                Login
              </EntityCapsule>
              <LinkIcon left="green" right="orange" />
              <EntityCapsule className="bg-lova-orange-50 text-lova-orange">
                Subscriptions
              </EntityCapsule>
            </div>
            <h3>
              Link your login to multiple subscription services.
            </h3>
        </div>
        <div className="relative z-0 min-w-0 overflow-hidden rounded-[40px] px-4 pt-4 shadow-[0_0_80px_rgba(0,0,0,0.06)]">
          <div className="relative aspect-[420/450] w-full overflow-hidden">
            <Image
              src="/features/relations-login-subscriptions.webp"
              alt=""
              fill
              className="object-contain"
              sizes="(max-width: 640px) 100vw, 50vw"
              aria-hidden
            />
          </div>
        </div>
      </motion.article>

      <motion.article
        className="grid grid-cols-1 sm:grid-cols-2 sm:items-stretch"
        initial={CARD_ANIMATION.initial}
        whileInView={CARD_ANIMATION.animate}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ ...CARD_ANIMATION.transition, delay: STAGGER_DELAY * 1 }}
      >
        <div className="relative z-10 flex min-w-0 flex-col gap-5 rounded-[40px] bg-white p-6">
            <div className="flex flex-wrap items-center gap-1">
              <EntityCapsule className="bg-lova-green-50 text-lova-green">
                Login
              </EntityCapsule>
              <LinkIcon left="green" right="green" />
              <EntityCapsule className="bg-lova-green-50 text-lova-green">
                Logins
              </EntityCapsule>
            </div>
            <h3>
              Create a login that you use as SSO for other services.
            </h3>
        </div>
        <div className="relative z-0 min-w-0 overflow-hidden rounded-[40px] px-4 pt-4 shadow-[0_0_80px_rgba(0,0,0,0.06)]">
          <div className="relative aspect-[420/450] w-full overflow-hidden">
            <Image
              src="/features/relations-sso.webp"
              alt=""
              fill
              className="object-contain"
              sizes="(max-width: 640px) 100vw, 420px"
              aria-hidden
            />
          </div>
        </div>
      </motion.article>

      <motion.article
        className="grid grid-cols-1 sm:grid-cols-2 sm:items-stretch"
        initial={CARD_ANIMATION.initial}
        whileInView={CARD_ANIMATION.animate}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ ...CARD_ANIMATION.transition, delay: STAGGER_DELAY * 2 }}
      >
        <div className="relative z-10 flex min-w-0 flex-col gap-5 rounded-[40px] bg-white p-6">
            <div className="flex flex-wrap items-center gap-1">
              <EntityCapsule className="bg-lova-purple-50 text-lova-purple">
                Card
              </EntityCapsule>
              <LinkIcon left="purple" right="orange" />
              <EntityCapsule className="bg-lova-orange-50 text-lova-orange">
                Subscriptions
              </EntityCapsule>
            </div>
            <h3>
              Link all subscriptions to the card you pay with.
            </h3>
        </div>
        <div className="relative z-0 min-w-0 overflow-hidden rounded-[40px] px-4 pt-4 shadow-[0_0_80px_rgba(0,0,0,0.06)]">
          <div className="relative aspect-[420/450] w-full overflow-hidden">
            <Image
              src="/features/relations-card-subscriptions.png"
              alt=""
              fill
              className="object-contain"
              sizes="(max-width: 640px) 100vw, 420px"
              aria-hidden
            />
          </div>
        </div>
      </motion.article>

      <motion.article
        className="grid grid-cols-1 sm:grid-cols-2 sm:items-stretch"
        initial={CARD_ANIMATION.initial}
        whileInView={CARD_ANIMATION.animate}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ ...CARD_ANIMATION.transition, delay: STAGGER_DELAY * 3 }}
      >
        <div className="relative z-10 flex min-w-0 flex-col gap-5 rounded-[40px] bg-white p-6">
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
            <h3>
              See your subscription login and the card used for payment.
            </h3>
        </div>
        <div className="relative z-0 min-w-0 overflow-hidden rounded-[40px] px-4 pt-4 shadow-[0_0_80px_rgba(0,0,0,0.06)]">
          <div className="relative aspect-[420/450] w-full overflow-hidden">
            <Image
              src="/features/relations-subscription-relations.webp"
              alt=""
              fill
              className="object-contain"
              sizes="(max-width: 640px) 100vw, 50vw"
              aria-hidden
            />
          </div>
        </div>
      </motion.article>
    </div>
  );
}
