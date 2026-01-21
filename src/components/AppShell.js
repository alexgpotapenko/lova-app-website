"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TopBar from "@/components/TopBar";
import { isLoggedIn } from "@/lib/auth";
import { t } from "@/i18n";

export default function AppShell({ children }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace("/login");
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) {
    return <div className="min-h-screen bg-slate-50" />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="block min-[744px]:hidden">
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="max-w-md text-center">
            <h1 className="text-xl font-semibold text-slate-900">
              {t("app.smallScreen.title")}
            </h1>
            <p className="mt-3 text-sm text-slate-600">
              {t("app.smallScreen.body")}
            </p>
          </div>
        </div>
      </div>

      <div className="hidden min-[744px]:block">
        <TopBar />
        <main className="mx-auto w-full px-6 pb-10 pt-6">
          {children}
        </main>
      </div>
    </div>
  );
}
