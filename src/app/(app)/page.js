"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { Gear, Trash } from "@phosphor-icons/react";
import { getLocale, subscribeLocale, t } from "@/i18n";
import { getCity, subscribeCity } from "@/lib/city";
import AreaTabBar from "@/components/AreaTabBar";
import ScreenTitleBar from "@/components/ScreenTitleBar";
import BrandPreview from "@/components/BrandPreview";

export default function DashboardPage() {
  const [city, setCity] = useState(getCity());
  const [locale, setLocale] = useState(getLocale());
  const [activeAreaLabel, setActiveAreaLabel] = useState("");

  useEffect(() => {
    setCity(getCity());
    return subscribeCity(setCity);
  }, []);

  useEffect(() => subscribeLocale(setLocale), []);


  return (
    <div className="space-y-8" data-locale={locale}>
      <div>
        <ScreenTitleBar
          title={t(`dashboard.city.${city}`)}
          showMenu
          menuItems={[
            {
              key: "settings",
              label: t("screenTitle.menu.settings"),
              icon: <Gear size={18} weight="fill" />,
              onPress: () => {},
            },
            {
              key: "deleteCity",
              label: t("screenTitle.menu.deleteCity"),
              icon: <Trash size={18} weight="fill" />,
              isDanger: true,
              onPress: () => {},
            },
          ]}
        />
        <AreaTabBar
          onAreaChange={(area) => setActiveAreaLabel(area?.label || "")}
        />
      </div>

      <div className="space-y-6">
        <section className="rounded-md border border-slate-200 bg-white p-6">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-slate-900">
              {t("dashboard.chart.title")}
            </h2>
            <p className="text-sm text-slate-500">
              {t("dashboard.chart.subtitle")}
            </p>
          </div>
          <div className="flex min-h-72 items-center justify-center rounded-md border border-dashed border-slate-200 bg-slate-50">
            <span className="text-sm font-medium text-slate-500">
              {t("dashboard.chart.placeholder")}
              {activeAreaLabel ? ` — ${activeAreaLabel}` : ""}
            </span>
          </div>
        </section>

        <section className="rounded-md border border-slate-200 bg-white p-6">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-slate-900">
              {t("dashboard.controls.title")}
            </h2>
            <p className="text-sm text-slate-500">
              {t("dashboard.controls.subtitle")}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm" radius="md" variant="solid" color="default">
              {t("dashboard.controls.today")}
            </Button>
            <Button size="sm" radius="md" variant="bordered">
              {t("dashboard.controls.yesterday")}
            </Button>
            <Button size="sm" radius="md" variant="bordered">
              {t("dashboard.controls.last7")}
            </Button>
            <Button size="sm" radius="md" variant="bordered">
              {t("dashboard.controls.season")}
            </Button>
            <div className="ml-auto flex items-center gap-3">
              <span className="text-sm font-medium text-slate-600">
                {t("dashboard.controls.simpleMode")}
              </span>
              <Button size="sm" radius="md" variant="bordered">
                {t("dashboard.controls.expertMode")}
              </Button>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-md border border-slate-200 bg-white p-6">
            <h3 className="text-base font-semibold text-slate-900">
              {t("dashboard.indicators.cumulative")}
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              {t("dashboard.indicators.cumulativePlaceholder")}
            </p>
          </div>
          <div className="rounded-md border border-slate-200 bg-white p-6">
            <h3 className="text-base font-semibold text-slate-900">
              {t("dashboard.indicators.zones")}
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              {t("dashboard.indicators.zonesPlaceholder")}
            </p>
          </div>
        </section>
        <BrandPreview />
      </div>
    </div>
  );
}
