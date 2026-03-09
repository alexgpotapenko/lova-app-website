"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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
        className="flex flex-col gap-8 rounded-[24px] bg-white p-8 sm:flex-row sm:items-start"
        initial={CARD_ANIMATION.initial}
        whileInView={CARD_ANIMATION.animate}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ ...CARD_ANIMATION.transition, delay: STAGGER_DELAY * 0 }}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-lova-green-100">
            <Image
              src="/features/apple-logo.png"
              alt="Apple"
              width={18}
              height={22}
              className="h-[22px] w-[18px] object-contain"
            />
          </div>
          <h3 className="text-2xl font-semibold">
            <span className="text-lova-green">Subscriptions using this login.</span> See the services connected to this account.
          </h3>
        </div>
        <div className="relative min-w-0 flex-1 aspect-[420/450] overflow-hidden rounded-[16px]">
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
        className="flex flex-col gap-8 rounded-[24px] bg-white p-8 sm:flex-row sm:items-start"
        initial={CARD_ANIMATION.initial}
        whileInView={CARD_ANIMATION.animate}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ ...CARD_ANIMATION.transition, delay: STAGGER_DELAY * 1 }}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-lova-green-100 shadow-[0_0_0_3px_white]">
            <Image
              src="/features/google-g.png"
              alt="Google"
              width={24}
              height={24}
              className="h-6 w-6 object-contain"
            />
          </div>
          <h3 className="text-2xl font-semibold">
            <span className="text-lova-green">Apps signed in with this account.</span> See where this login is used for Google, Apple, or Microsoft sign-in.
          </h3>
        </div>
        <div className="relative min-w-0 flex-1 aspect-[420/450] overflow-hidden rounded-[16px]">
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
        className="flex flex-col gap-8 rounded-[24px] bg-white p-8 sm:flex-row sm:items-start"
        initial={CARD_ANIMATION.initial}
        whileInView={CARD_ANIMATION.animate}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ ...CARD_ANIMATION.transition, delay: STAGGER_DELAY * 2 }}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-lova-purple-100">
            <Image
              src="/features/chase-logo.png"
              alt="Chase"
              width={24}
              height={24}
              className="h-6 w-6 rounded-[6px] object-contain"
            />
          </div>
          <h3 className="text-2xl font-semibold">
            <span className="text-lova-purple">Subscriptions paid with this card.</span> Know which services are charged to this card.
          </h3>
        </div>
        <div className="relative min-w-0 flex-1 aspect-[420/450] overflow-hidden rounded-[16px]">
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
        className="flex flex-col gap-8 rounded-[24px] bg-white p-8 sm:flex-row sm:items-start"
        initial={CARD_ANIMATION.initial}
        whileInView={CARD_ANIMATION.animate}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ ...CARD_ANIMATION.transition, delay: STAGGER_DELAY * 3 }}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-lova-orange-100">
            <Image
              src="/features/netflix-logo.png"
              alt="Netflix"
              width={24}
              height={24}
              className="h-6 w-6 rounded-[6px] object-contain"
            />
          </div>
          <h3 className="text-2xl font-semibold">
            <span className="text-lova-orange">Login and card used for this subscription.</span> See how it's accessed and paid.
          </h3>
        </div>
        <div className="relative min-w-0 flex-1 aspect-[420/450] overflow-hidden rounded-[16px]">
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
