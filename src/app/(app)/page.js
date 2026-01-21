import { t } from "@/i18n";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">
        {t("app.cityTitle")}
      </h1>
      <div className="flex min-h-64 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white">
        <span className="text-sm font-medium text-slate-500">
          {t("app.dashboardPlaceholder")}
        </span>
      </div>
    </div>
  );
}
