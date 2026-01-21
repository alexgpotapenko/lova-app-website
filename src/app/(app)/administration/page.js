import { t } from "@/i18n";

export default function AdministrationPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">
        {t("administration.title")}
      </h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6">
          <h2 className="text-base font-semibold text-slate-900">
            {t("administration.users")}
          </h2>
        </div>
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6">
          <h2 className="text-base font-semibold text-slate-900">
            {t("administration.activityLog")}
          </h2>
        </div>
      </div>
    </div>
  );
}
