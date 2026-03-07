import Image from "next/image";
import {
  ArrowsClockwise,
  FileArrowDown,
  Link,
  LockKey,
  MagnifyingGlass,
  PushPin,
  ShieldCheck,
} from "@phosphor-icons/react/ssr";
import HeroScrollSection from "@/components/HeroScrollSection";
import HeroCtaButtons from "@/components/landing/HeroCtaButtons";
import SectionHeading from "@/components/landing/SectionHeading";
import SectionHeader from "@/components/landing/SectionHeader";
import EntityDescriptionContent from "@/components/landing/EntityDescriptionContent";
import FeatureRow from "@/components/landing/FeatureRow";
import PrivacyColumn from "@/components/landing/PrivacyColumn";

const globalFeatureRows = [
  {
    icon: Link,
    title: "Relations",
    description:
      "Link logins, cards, and subscriptions to see the full picture.",
  },
  {
    icon: MagnifyingGlass,
    title: "Universal Search",
    description: "Search all entities from one place and jump directly to details.",
  },
  {
    icon: PushPin,
    title: "Pin to Home",
    description: "Keep frequent entries on Home for faster daily access.",
  },
  {
    icon: ArrowsClockwise,
    title: "Local reminders",
    description: "Get renewal reminders through local notifications only.",
  },
  {
    icon: LockKey,
    title: "Single vault",
    description: "One AES-256-GCM vault file with key material protected in Keychain.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen pb-28 text-black">
      <section className="flex flex-col items-center pt-[80px]">
        <Image
          src="/logo.svg"
          alt="Lova"
          width={120}
          height={120}
          className="mb-[64px]"
          priority
        />
        <SectionHeader
          title={
            <>
              Your local vault for
              <br />
              what matters
            </>
          }
          description="One device. One vault. No account, no cloud, no tracking."
        />
        <HeroCtaButtons className="mt-8" />
      </section>

      <HeroScrollSection />

      <section id="features-start" className="mt-24">
        <SectionHeader
          className="mb-16"
          title="What you can store"
          description="Lova keeps the important parts of your digital life in one app"
        />
        <EntityDescriptionContent />
      </section>

      <section className="mt-24">
        <SectionHeading
          kicker="Global features"
          title="Connected context, not disconnected records"
          description="A lightweight set of capabilities that keep your vault practical every day."
        />
        <div className="rounded-[24px] bg-white px-4 sm:px-5">
          {globalFeatureRows.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <FeatureRow
                key={feature.title}
                icon={<Icon size={18} weight="fill" />}
                title={feature.title}
                description={feature.description}
                last={idx === globalFeatureRows.length - 1}
              />
            );
          })}
        </div>
      </section>

      <section className="mt-24">
        <SectionHeading
          kicker="Privacy"
          title="No account. No cloud. No tracking."
          description="The app is built around local ownership. Your vault content stays on your device."
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <PrivacyColumn
            title="No account"
            statement="No sign-up. No email. Start with a local PIN."
          />
          <PrivacyColumn
            title="No cloud"
            statement="No automatic sync to external servers."
          />
          <PrivacyColumn
            title="No tracking"
            statement="No analytics pipeline for vault contents."
          />
        </div>
      </section>

      <section className="mt-24">
        <SectionHeading
          kicker="Backup"
          title="You fully control your vault export"
          description="Export a complete encrypted .lova backup and store it wherever you trust."
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <article className="rounded-[24px] bg-white p-5">
            <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
              <FileArrowDown size={20} weight="fill" className="text-lova-blue" />
            </div>
            <h3 className="text-xl font-semibold text-black">Encrypted .lova export</h3>
            <p className="mt-2 text-sm leading-7 text-black">
              Backup uses a separate password (PBKDF2), independent from your app PIN.
            </p>
          </article>
          <article className="rounded-[24px] bg-white p-5">
            <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
              <ShieldCheck size={20} weight="fill" className="text-lova-green" />
            </div>
            <h3 className="text-xl font-semibold text-black">Portable and restorable</h3>
            <p className="mt-2 text-sm leading-7 text-black">
              Save to Files, iCloud, or any storage you choose and restore on another device anytime.
            </p>
          </article>
        </div>
      </section>

      <section className="mt-20">
        <p className="text-center text-sm leading-6 text-black">
          One device. One vault. No account, no cloud, no tracking.
        </p>
      </section>
    </main>
  );
}
