"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  DeviceMobile,
  FileArrowDown,
  FileArrowUp,
  Key,
  Lock,
  Moon,
  Numpad,
  PushPin,
  ScanSmiley,
  Tag,
  Trash,
  Globe,
  CurrencyCircleDollar,
} from "@phosphor-icons/react/ssr";
import EntityIcon from "@/components/EntityIcon";
import HeroScrollSection from "@/components/HeroScrollSection";
import HeroCtaButtons from "@/components/landing/HeroCtaButtons";
import SectionHeader from "@/components/landing/SectionHeader";
import EntityDescriptionContent from "@/components/landing/EntityDescriptionContent";
import RelationsCards from "@/components/landing/RelationsCards";

const CARD_ANIMATION = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" as const },
};
const STAGGER_DELAY = 0.2;

export default function Home() {
  return (
    <main className="min-h-screen text-black">
      <section id="hero-header" className="flex flex-col items-center pt-16">
        <Image
          src="/logo.svg"
          alt="Lova"
          width={120}
          height={120}
          className="mb-12"
          priority
        />
        <SectionHeader
          title={
            <>
              Your local vault for
              <br />
              what matters.
            </>
          }
          description={
            <>
              Keep your logins, cards, and subscriptions organized
              <br />
              in one secure place.
            </>
          }
        />
        <HeroCtaButtons className="mt-8" />
      </section>

      <div id="hero-scene-section">
        <HeroScrollSection />
      </div>

      <section id="features-start" className="mt-24">
        <SectionHeader
          className="mb-32"
          title="The essentials you rely on every day."
          description="Logins, cards, and subscriptions — in one secure place."
        />
        <EntityDescriptionContent />
      </section>

      <section id="create-relations-section" className="relative mt-40">
        <SectionHeader
          title="Relations."
          description="Connect your logins, cards, and subscriptions together so you always see the full context."
        />
        <RelationsCards />
      </section>

      <section className="mt-40">
        <SectionHeader
          title="Privacy and Security."
          description="Everything stays on your device — protected with strong encryption and local authentication."
        />
        <div className="relative mt-16">
          <div
            className="absolute -left-8 -top-6 z-20"
            style={{ transform: "rotate(-14deg)" }}
          >
            <EntityIcon variant={4} size={128} glass />
          </div>
          <motion.article
            className="relative overflow-hidden rounded-[24px] bg-white p-8"
            initial={CARD_ANIMATION.initial}
            whileInView={CARD_ANIMATION.animate}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ ...CARD_ANIMATION.transition, delay: STAGGER_DELAY * 0 }}
          >
            {/* Behind icon: 4 blurred circles */}
            <div className="pointer-events-none absolute -z-0" style={{ top: -156, left: -124 }}>
              {[
                { size: 280, top: 0, left: 0, color: "var(--color-lova-green)" },
                { size: 280, top: 0, left: 240, color: "var(--color-lova-purple)" },
                { size: 280, top: 240, left: 0, color: "var(--color-lova-orange)" },
                { size: 280, top: 240, left: 240, color: "var(--color-lova-blue)" },
              ].map((c, i) => (
                <span
                  key={i}
                  className="absolute rounded-full blur-[50px]"
                  style={{
                    width: c.size,
                    height: c.size,
                    top: c.top,
                    left: c.left,
                    backgroundColor: c.color,
                    opacity: 0.16,
                  }}
                />
              ))}
            </div>
            {/* Nested rounded squares */}
            <div
              className="pointer-events-none absolute -z-0"
              style={{ top: -136, left: -124, width: 412, height: 412, transform: "rotate(-14deg)" }}
            >
              {[108, 196, 284, 372].map((size, i) => {
                const radius = [32, 48, 64, 80][i];
                const borderOpacity = [1, 0.8, 0.6, 0.4][i];
                return (
                  <span
                    key={i}
                    className="absolute left-1/2 top-1/2 border bg-transparent"
                    style={{
                      width: size,
                      height: size,
                      borderRadius: radius,
                      borderColor: `rgba(255, 255, 255, ${borderOpacity})`,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                );
              })}
            </div>
            <div className="relative z-10 flex flex-col gap-6">
              <div className="size-20 shrink-0 opacity-0" aria-hidden />
              <div className="grid grid-cols-1 md:grid-cols-2 md:items-start">
                <div className="flex flex-col gap-8">
                  <h2 className="text-xl font-semibold text-black">
                    No accounts.
                    <br />
                    No cloud.
                    <br />
                    No tracking.
                  </h2>
                  <div className="flex flex-wrap gap-1">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-2">
                      <DeviceMobile size={16} weight="regular" className="shrink-0 text-slate-700" />
                      <span className="text-sm font-medium text-slate-700">On-device storage</span>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-2">
                      <Numpad size={16} weight="regular" className="shrink-0 text-slate-700" />
                      <span className="text-sm font-medium text-slate-700">PIN</span>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-2">
                      <ScanSmiley size={16} weight="regular" className="shrink-0 text-slate-700" />
                      <span className="text-sm font-medium text-slate-700">Face ID</span>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-2">
                      <Lock size={16} weight="regular" className="shrink-0 text-slate-700" />
                      <span className="text-sm font-medium text-slate-700">AES-256 encryption</span>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-2">
                      <Key size={16} weight="regular" className="shrink-0 text-slate-700" />
                      <span className="text-sm font-medium text-slate-700">iOS Keychain</span>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex flex-col gap-4 md:mt-0 md:pl-[42px]">
                  <p className="h-body-base text-slate-600">
                    Your vault is protected with a PIN or Face ID and encrypted using strong, device-level security.
                  </p>
                  <p className="h-body-base text-slate-600">
                    All data is stored locally and protected with strong encryption<sup>1</sup>. The encryption key is kept in the iOS Keychain and can only be accessed after authentication.
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    <sup>1</sup> Uses industry-standard AES-256 encryption.
                  </p>
                </div>
              </div>
          </div>
        </motion.article>
        </div>
        <div className="mt-5 flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <motion.article
              className="rounded-[24px] bg-white p-8"
              initial={CARD_ANIMATION.initial}
              whileInView={CARD_ANIMATION.animate}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ ...CARD_ANIMATION.transition, delay: STAGGER_DELAY * 1 }}
            >
              <FileArrowDown size={48} weight="light" className="mb-5 text-lova-blue" />
              <h3 className="text-xl font-semibold text-black">Vault Backup</h3>
              <p className="mt-2 h-body-base text-slate-600">
                Reinstalling the app? Switching to a new phone? Create a backup of your vault and store it wherever you trust.
              </p>
              <p className="mt-2 h-body-base text-slate-600">
                Your backup is protected with its own password, so only someone who knows that password can restore the vault.
              </p>
            </motion.article>
            <motion.article
              className="rounded-[24px] bg-white p-8"
              initial={CARD_ANIMATION.initial}
              whileInView={CARD_ANIMATION.animate}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ ...CARD_ANIMATION.transition, delay: STAGGER_DELAY * 1 }}
            >
              <FileArrowUp size={48} weight="light" className="mb-5 text-lova-blue" />
              <h3 className="text-xl font-semibold text-black">Vault Restore</h3>
              <p className="mt-2 h-body-base text-slate-600">
                After a fresh app install, import your backup and decrypt it with the password generated during backup creation. Then set up a new PIN code — and your vault is restored and ready to use.
              </p>
            </motion.article>
          </div>
        </div>
      </section>

      <section className="mt-40">
        <SectionHeader
          title="More Features."
          description="Discover additional ways to manage and protect your vault."
        />
        <div className="mt-16 grid grid-cols-2 items-start gap-y-16 lg:grid-cols-3">
          {[
            { Icon: Tag, title: "Assign categories to items" },
            { Icon: PushPin, title: "Pin items to Home" },
            { Icon: Trash, title: "Erase your vault securely" },
            { Icon: CurrencyCircleDollar, title: "Select currency per subscription" },
            {
              Icon: Globe,
              title: (
                <>
                  Automatic logo fetching{" "}
                  <span className="text-slate-400">(Internet required)</span>
                </>
              ),
            },
            { Icon: Moon, title: "Dark mode" },
          ].map((item, i) => (
            <article
              key={typeof item.title === "string" ? item.title : `feature-${i}`}
              className="flex flex-col items-center justify-start text-center"
            >
              <item.Icon size={32} weight="light" className="mb-3 text-black" />
              <h3 className="h-body-base text-black">{item.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-40">
        <article className="relative overflow-hidden rounded-[24px] bg-white p-8">
          <div className="flex flex-col gap-6">
            <div className="relative">
              <Image
                src="/app-icon.png"
                alt="Lova"
                width={128}
                height={128}
                className="rounded-[24px] shadow-[0_0_30px_0_color(display-p3_1_1_1/0.70)]"
              />
            </div>
            <h2 className="text-xl font-semibold text-black">
              Get Lova
              <br />
              on the App Store
            </h2>
          </div>
        </article>
        <div className="mt-16 flex justify-center">
          <HeroCtaButtons />
        </div>
      </section>

      <footer id="footer" className="mt-40 flex flex-col items-center gap-6 pb-10">
        <nav className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
          <a href="mailto:alexgpotapenko@gmail.com?subject=Lova%20App%20Feedback" className="h-body-base font-medium text-lova-blue hover:text-lova-blue-700">
            Send Feedback
          </a>
          <a href="/terms?from=footer" className="h-body-base font-medium text-lova-blue hover:text-lova-blue-700">
            Terms of Use
          </a>
          <a href="/privacy?from=footer" className="h-body-base font-medium text-lova-blue hover:text-lova-blue-700">
            Privacy Policy
          </a>
        </nav>
        <div className="flex max-w-[560px] flex-col items-center gap-0 text-center">
          <p className="h-body-base text-slate-500">
            © 2026 Aleksej Potapenko. All rights reserved.
          </p>
          <p className="h-body-base text-slate-500">
            All product names, logos, and brands are property of their respective owners.
          </p>
          <p className="h-body-base text-slate-500">
            This website does not use cookies or analytics.
          </p>
        </div>
      </footer>
    </main>
  );
}
