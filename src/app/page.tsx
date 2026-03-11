"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Check,
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
          style={{ marginBottom: 64 }}
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
        <HeroCtaButtons />
      </section>

      <div id="hero-scene-section">
        <HeroScrollSection />
      </div>

      <section id="features-start" className="mt-24">
        <SectionHeader
          className="mb-32"
          title="Three essentials you rely on every day."
          description="Everything you need, ready when you need it."
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

      <section id="privacy-security" className="mt-40">
        <SectionHeader
          title="Privacy and Security."
          description="Everything stays on your device — protected with strong encryption and local authentication."
        />
        <div className="relative mt-16">
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
              style={{ top: -160, left: -160, width: 600, height: 600, transform: "rotate(45deg)" }}
            >
              {[160, 240, 320, 400, 480, 560].map((size, i) => {
                const radius = [32, 48, 64, 80, 96, 112][i];
                const borderOpacity = [1, 0.8, 0.6, 0.4, 0.2, 0.05][i];
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
              <div className="flex size-20 shrink-0 items-center justify-center">
                <EntityIcon variant={4} size={80} glass shapeOverride="square" />
              </div>
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
                Switching to a new phone, or just reinstalling the app won't be an issue — create your vault's backup and store it wherever you trust.
              </p>
              <p className="mt-2 h-body-base text-slate-600">
                It's protected with its own password, so only you can restore your vault.
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

      <section id="more-features" className="mt-40">
        <SectionHeader
          title="More Features."
          description="Discover additional ways to manage and protect your vault."
        />
        <div className="mt-16 grid grid-cols-2 items-start gap-y-16 lg:grid-cols-3">
          {[
            { Icon: Tag, title: "Assign categories to items", gradient: "linear-gradient(to right, color-mix(in srgb, var(--color-lova-green) 20%, transparent), color-mix(in srgb, var(--color-lova-purple) 20%, transparent))" },
            { Icon: PushPin, title: "Pin items to Home", gradient: "linear-gradient(to right, color-mix(in srgb, var(--color-lova-purple) 20%, transparent), color-mix(in srgb, var(--color-lova-orange) 20%, transparent))" },
            { Icon: Trash, title: "Erase your vault securely", gradient: "linear-gradient(to right, color-mix(in srgb, var(--color-lova-orange) 20%, transparent), color-mix(in srgb, var(--color-lova-blue) 20%, transparent))" },
            { Icon: CurrencyCircleDollar, title: "Select currency per subscription", gradient: "linear-gradient(to right, color-mix(in srgb, var(--color-lova-blue) 20%, transparent), color-mix(in srgb, var(--color-lova-green) 20%, transparent))" },
            {
              Icon: Globe,
              title: (
                <>
                  Automatic logo fetching{" "}
                  <span className="text-slate-400">(Internet required)</span>
                </>
              ),
              gradient: "linear-gradient(to right, color-mix(in srgb, var(--color-lova-green) 20%, transparent), color-mix(in srgb, var(--color-lova-purple) 20%, transparent))",
            },
            { Icon: Moon, title: "Dark mode", gradient: "linear-gradient(to right, color-mix(in srgb, var(--color-lova-purple) 20%, transparent), color-mix(in srgb, var(--color-lova-orange) 20%, transparent))" },
          ].map((item, i) => (
            <article
              key={typeof item.title === "string" ? item.title : `feature-${i}`}
              className="flex flex-col items-center justify-start text-center"
            >
              <div
                className="mb-3 flex size-16 items-center justify-center rounded-full"
                style={{ background: item.gradient }}
              >
                <item.Icon size={32} weight="fill" className="text-black" />
              </div>
              <h3 className="h-body-base text-black">{item.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section id="get-lova" className="relative mt-40">
        <SectionHeader
          title="Start for Free and Upgrade."
          description="Try all available features with a content limit, then go unlimited."
        />
        <div className="relative mt-16 grid grid-cols-1 items-stretch sm:grid-cols-2">
          <motion.article
            className="flex flex-col rounded-[24px] bg-white p-8 sm:h-[540px]"
            initial={CARD_ANIMATION.initial}
            whileInView={CARD_ANIMATION.animate}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ ...CARD_ANIMATION.transition, delay: STAGGER_DELAY * 0 }}
          >
            <div>
              <h2 className="text-xl font-semibold text-black">Basic</h2>
            </div>
            <div className="mt-8 flex min-h-0 flex-1 flex-col">
              {[
                { icon: 1, label: "Logins", limit: 5 },
                { icon: 3, label: "Cards", limit: 2 },
                { icon: 5, label: "Subscriptions", limit: 2 },
                { icon: "pin", label: "Pinned items", limit: 5 },
                { icon: "vault", label: "Vault backups", limit: 1 },
              ].map(({ icon, label, limit }) => (
                <div key={label} className="flex items-center gap-3 last:[&>div:last-child]:border-b-0">
                    <span className="shrink-0">
                      {icon === "pin" ? (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-lova-blue/25">
                          <PushPin size={16} weight="fill" className="text-lova-blue" />
                        </div>
                      ) : icon === "vault" ? (
                        <div className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-lova-blue/25">
                          <FileArrowDown size={16} weight="fill" className="text-lova-blue" />
                        </div>
                      ) : (
                        <EntityIcon variant={icon as 1 | 2 | 3 | 5 | 6} size={32} glass={false} shapeOverride={[1, 5].includes(icon as number) ? "square" : "circle"} />
                      )}
                    </span>
                    <div className="flex min-w-0 flex-1 items-center border-b border-slate-200 py-4">
                      <span className="font-normal text-black">{limit} {label.toLowerCase()}</span>
                    </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col">
              <span className="h-body-base text-slate-500">Price</span>
              <p className="font-normal text-black" style={{ fontFamily: '"Be Vietnam", Inter, sans-serif', fontSize: "clamp(1.75rem, 1.4rem + 1vw, 2.25rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>$0</p>
            </div>
          </motion.article>
          <motion.article
            className="relative flex flex-col overflow-hidden rounded-[24px] bg-white p-8 sm:h-[540px]"
            initial={CARD_ANIMATION.initial}
            whileInView={CARD_ANIMATION.animate}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ ...CARD_ANIMATION.transition, delay: STAGGER_DELAY * 0 }}
          >
            {/* Blurred circles */}
            <div className="pointer-events-none absolute -z-0" style={{ top: -156, left: -124 }}>
              {[
                { size: 280, top: 120, left: -40, color: "var(--color-lova-green)" },
                { size: 280, top: 40, left: 200, color: "var(--color-lova-purple)" },
                { size: 280, top: 360, left: -40, color: "var(--color-lova-orange)" },
                { size: 280, top: 280, left: 200, color: "var(--color-lova-blue)" },
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
            <div className="relative z-10 flex min-h-0 flex-1 flex-col">
              <div>
                <h2 className="text-xl font-semibold text-black">Unlimited</h2>
              </div>
              <div className="mt-8 flex min-h-0 flex-1 flex-col gap-8 pt-3">
                <div className="flex flex-row-reverse flex-nowrap justify-end">
                {[
                  { variant: 6 as const, shapeOverride: "square" as const },
                  { variant: 2 as const, iconOverride: PushPin, iconWeightOverride: "fill" as const, shapeOverride: "circle" as const },
                  { variant: 5 as const, shapeOverride: "square" as const },
                  { variant: 3 as const, shapeOverride: "circle" as const },
                  { variant: 1 as const, shapeOverride: "square" as const },
                ].map(({ variant, ...rest }, i) => (
                  <div
                    key={i}
                    className="relative shrink-0"
                    style={{
                      marginRight: i === 0 ? 0 : -12,
                      zIndex: i,
                    }}
                  >
                    <EntityIcon variant={variant} size={64} glass {...rest} />
                  </div>
                ))}
              </div>
              <ul className="flex flex-col gap-3">
                {[
                  "Unlimited logins, cards and subscriptions",
                  "Unlimited pinned items on home",
                  "Unlimited vault backups",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check size={20} weight="bold" className="mt-0.5 shrink-0 text-lova-blue" />
                    <span className="h-body-base text-black">{item}</span>
                  </li>
                ))}
                </ul>
              </div>
              <div className="mt-8 flex flex-col">
                <span className="h-body-base text-slate-500">Price</span>
                <p className="font-normal text-black" style={{ fontFamily: '"Be Vietnam", Inter, sans-serif', fontSize: "clamp(1.75rem, 1.4rem + 1vw, 2.25rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>$8.99</p>
              </div>
            </div>
          </motion.article>
        </div>
        <div className="mt-6 w-full">
          <HeroCtaButtons className="w-full" fullWidth buttonStyle={{ padding: 20 }} />
        </div>
      </section>

      <footer id="footer" className="mt-40 flex flex-col items-center gap-6 pb-10">
        <nav className="flex flex-row flex-wrap items-center justify-center gap-6">
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
        <div className="flex flex-col items-center gap-0 text-center">
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
