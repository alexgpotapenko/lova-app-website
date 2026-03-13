import Link from "next/link";
import { CaretLeft } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use — Lova",
  description: "Terms of Use for Lova app",
};

type Props = { searchParams: Promise<{ from?: string }> };

export default async function TermsPage({ searchParams }: Props) {
  const { from } = await searchParams;
  const backHref = from === "footer" ? "/#footer" : "/";

  return (
    <main className="min-h-screen text-black">
      <div className="layout-container !px-0 py-16">
        <Link
          href={backHref}
          className="mb-12 inline-flex items-center gap-1 font-medium text-lova-blue hover:text-lova-blue-700"
        >
          <CaretLeft size={16} weight="bold" className="shrink-0" />
          Back to Home Page
        </Link>

        <h1>Terms of Use</h1>
        <p className="mt-2 text-slate-500">Last updated: 2026</p>

        <div className="mt-10 space-y-10 text-slate-700">
          <section>
            <h2 className="mb-3">
              Acceptance of Terms
            </h2>
            <p className="h-body-base leading-relaxed">
              By downloading or using Lova, you agree to these Terms of Use.
            </p>
            <p className="mt-3 leading-relaxed">
              If you do not agree with these terms, you should not use the app.
            </p>
          </section>

          <section>
            <h2 className="mb-3">
              Use of the App
            </h2>
            <p className="h-body-base leading-relaxed">
              Lova is a personal productivity tool that allows users to store and
              manage private information such as logins, cards, and
              subscriptions.
            </p>
            <p className="mt-3 leading-relaxed">
              The app is intended for personal use.
            </p>
          </section>

          <section>
            <h2 className="mb-3">
              Data Responsibility
            </h2>
            <p className="h-body-base leading-relaxed">
              All data entered into Lova is stored locally on the user&apos;s
              device.
            </p>
            <p className="mt-3 leading-relaxed">Users are responsible for:</p>
            <ul className="mt-2 list-inside list-disc space-y-1 pl-2">
              <li>remembering their PIN</li>
              <li>safely storing backup passwords</li>
              <li>keeping backup files secure</li>
            </ul>
            <p className="mt-3 leading-relaxed">
              The developer cannot recover lost vaults or forgotten passwords.
            </p>
          </section>

          <section>
            <h2 className="mb-3">Backups</h2>
            <p className="h-body-base leading-relaxed">
              Users are responsible for creating and storing backups if they
              wish to preserve their data.
            </p>
            <p className="mt-3 leading-relaxed">
              Loss of device access or forgotten authentication credentials may
              result in permanent loss of stored data.
            </p>
          </section>

          <section>
            <h2 className="mb-3">
              No Warranty
            </h2>
            <p className="h-body-base leading-relaxed">
              Lova is provided &quot;as is&quot; without warranties of any kind.
            </p>
            <p className="mt-3 leading-relaxed">
              The developer does not guarantee that the app will be error-free or
              uninterrupted.
            </p>
          </section>

          <section>
            <h2 className="mb-3">
              Limitation of Liability
            </h2>
            <p className="h-body-base leading-relaxed">
              To the maximum extent permitted by law, the developer is not liable
              for any loss of data, financial loss, or damages resulting from
              the use of the app.
            </p>
          </section>

          <section>
            <h2 className="mb-3">
              Intellectual Property
            </h2>
            <p className="h-body-base leading-relaxed">
              The Lova app, its design, and its content are the intellectual
              property of the developer.
            </p>
            <p className="mt-3 leading-relaxed">
              All product names, logos, and brands mentioned in the app or on
              the website belong to their respective owners.
            </p>
          </section>

          <section>
            <h2 className="mb-3">
              End-User License Agreement
            </h2>
            <p className="h-body-base leading-relaxed">
              This application is licensed under the Apple Standard End User
              License Agreement (EULA).
            </p>
            <p className="mt-3 leading-relaxed">
              <a
                href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-lova-blue hover:text-lova-blue-700"
              >
                https://www.apple.com/legal/internet-services/itunes/dev/stdeula/
              </a>
            </p>
          </section>

          <section>
            <h2 className="mb-3">
              Changes to Terms
            </h2>
            <p className="h-body-base leading-relaxed">
              These Terms of Use may be updated from time to time. Continued use
              of the app after updates constitutes acceptance of the revised
              terms.
            </p>
          </section>

          <section>
            <h2 className="mb-3">Contact</h2>
            <p className="h-body-base leading-relaxed">
              For questions regarding these Terms of Use, please contact:{" "}
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
