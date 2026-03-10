import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Lova",
  description: "Privacy Policy for Lova app",
};

type Props = { searchParams: Promise<{ from?: string }> };

export default async function PrivacyPage({ searchParams }: Props) {
  const { from } = await searchParams;
  const backHref = from === "footer" ? "/#footer" : "/";

  return (
    <main className="min-h-screen text-black">
      <div className="mx-auto max-w-[720px] py-16">
        <Link
          href={backHref}
          className="mb-12 inline-block font-medium text-lova-blue hover:text-lova-blue-700"
        >
          Back to Home Page
        </Link>

        <h1 className="text-3xl font-semibold text-black">Privacy Policy</h1>
        <p className="mt-2 text-slate-500">Last updated: 2026</p>

        <div className="mt-10 space-y-10 text-slate-700">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-black">Overview</h2>
            <p className="leading-relaxed">
              Lova is designed with privacy as a core principle. The app does not
              require accounts, does not use cloud storage, and does not track
              users.
            </p>
            <p className="mt-3 leading-relaxed">
              All information entered into Lova remains on the user&apos;s device
              unless the user explicitly exports an encrypted backup.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-black">
              Data Collection
            </h2>
            <p className="leading-relaxed">
              Lova does <strong>not collect personal data</strong>.
            </p>
            <p className="mt-3 leading-relaxed">
              The app does not collect or store:
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1 pl-2">
              <li>personal information</li>
              <li>analytics data</li>
              <li>tracking identifiers</li>
              <li>advertising identifiers</li>
              <li>usage data</li>
            </ul>
            <p className="mt-3 leading-relaxed">
              Lova does not transmit user vault data to external servers.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-black">
              Local Data Storage
            </h2>
            <p className="leading-relaxed">
              All user data is stored locally on the device inside an encrypted
              vault.
            </p>
            <p className="mt-3 leading-relaxed">
              The vault is protected using strong encryption and can only be
              accessed after user authentication.
            </p>
            <p className="mt-3 leading-relaxed">
              Authentication methods supported by the app:
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1 pl-2">
              <li>PIN code</li>
              <li>Face ID or Touch ID (if enabled)</li>
            </ul>
            <p className="mt-3 leading-relaxed">
              Vault data is encrypted using AES-256 encryption.
            </p>
            <p className="mt-3 leading-relaxed">
              The encryption key is stored securely in the iOS Keychain and can
              only be accessed after successful authentication.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-black">
              Backup Files
            </h2>
            <p className="leading-relaxed">
              Lova allows users to create encrypted backup files with the
              .lova extension.
            </p>
            <p className="mt-3 leading-relaxed">Backup files:</p>
            <ul className="mt-2 list-inside list-disc space-y-1 pl-2">
              <li>
                are encrypted using a password chosen by the user
              </li>
              <li>
                can be stored anywhere the user decides (Files, iCloud, external
                storage, etc.)
              </li>
              <li>cannot be restored without the backup password</li>
            </ul>
            <p className="mt-3 leading-relaxed">
              The developer has no access to backup files.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-black">
              Internet Access
            </h2>
            <p className="leading-relaxed">
              Lova may use internet access only for optional features such as
              fetching public service logos.
            </p>
            <p className="mt-3 leading-relaxed">
              No user vault data is transmitted during these requests.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-black">
              Third-Party Services
            </h2>
            <p className="leading-relaxed">
              Lova does not use third-party analytics, advertising networks, or
              tracking services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-black">
              Data Sharing
            </h2>
            <p className="leading-relaxed">
              Lova does not share user data with the developer or with third
              parties.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-black">
              Children&apos;s Privacy
            </h2>
            <p className="leading-relaxed">
              Lova does not knowingly collect data from children under the age
              of 13.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-black">
              Changes to This Policy
            </h2>
            <p className="leading-relaxed">
              This Privacy Policy may be updated in future versions of the app.
              Any changes will be published on this page.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-black">Contact</h2>
            <p className="leading-relaxed">
              If you have questions about this Privacy Policy, please contact:{" "}
              <a
                href="mailto:alexgpotapenko@gmail.com"
                className="font-medium text-lova-blue hover:text-lova-blue-700"
              >
                alexgpotapenko@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
