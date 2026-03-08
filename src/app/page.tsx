import Image from "next/image";
import {
  ArrowsClockwise,
  FileArrowDown,
  LockKey,
  ShieldCheck,
} from "@phosphor-icons/react/ssr";
import HeroScrollSection from "@/components/HeroScrollSection";
import HeroCtaButtons from "@/components/landing/HeroCtaButtons";
import HeroStickyPanel from "@/components/landing/HeroStickyPanel";
import SectionHeading from "@/components/landing/SectionHeading";
import SectionHeader from "@/components/landing/SectionHeader";
import EntityDescriptionContent from "@/components/landing/EntityDescriptionContent";
import PrivacyColumn from "@/components/landing/PrivacyColumn";
import CreateRelationsFloatingIcon from "@/components/landing/CreateRelationsFloatingIcon";

export default function Home() {
  return (
    <main className="min-h-screen pb-28 text-black">
      <HeroStickyPanel />

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
              what matters
            </>
          }
          description={
            <>
              Keep your logins, cards, and subscriptions organized
              <br />
              in one secure place
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
          className="mb-16"
          title="What you can store"
          description="Lova keeps the important parts of your digital life in one app"
        />
        <EntityDescriptionContent />
      </section>

      <section id="create-relations-section" className="relative mt-40">
        <SectionHeader
          title="Create Relations"
          description="Relations connect your logins, cards, and subscriptions so you always see the full context."
        />
        <CreateRelationsFloatingIcon />
        <div className="mt-16 flex flex-col gap-4">
          <article className="rounded-[24px] bg-white p-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
              <h3 className="text-xl font-semibold text-black">
                See every service connected to this login in one place.
              </h3>
              <div className="h-[240px] w-full rounded-[16px] bg-slate-200" aria-hidden />
            </div>
          </article>
          <article className="rounded-[24px] bg-white p-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
              <h3 className="text-xl font-semibold text-black">
                Quickly find all services that rely on the same Google sign-in.
              </h3>
              <div className="h-[240px] w-full rounded-[16px] bg-slate-200" aria-hidden />
            </div>
          </article>
          <article className="rounded-[24px] bg-white p-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
              <h3 className="text-xl font-semibold text-black">
                Track services which are charged to this card and track your recurring payments.
              </h3>
              <div className="h-[240px] w-full rounded-[16px] bg-slate-200" aria-hidden />
            </div>
          </article>
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
            <p className="mt-2 h-body-base">
              Backup uses a separate password (PBKDF2), independent from your app PIN.
            </p>
          </article>
          <article className="rounded-[24px] bg-white p-5">
            <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
              <ShieldCheck size={20} weight="fill" className="text-lova-green" />
            </div>
            <h3 className="text-xl font-semibold text-black">Portable and restorable</h3>
            <p className="mt-2 h-body-base">
              Save to Files, iCloud, or any storage you choose and restore on another device anytime.
            </p>
          </article>
        </div>
      </section>

      <section className="mt-20">
        <p className="h-body-base text-center">
          One device. One vault. No account, no cloud, no tracking.
        </p>
      </section>
    </main>
  );
}
