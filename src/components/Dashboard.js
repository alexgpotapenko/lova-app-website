"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { addToast, Button, Spinner, Switch, Tabs, Tab } from "@heroui/react";
import { FadersHorizontal, Trash } from "@phosphor-icons/react";
import { getLocale, subscribeLocale, t } from "@/i18n";
import { getCity, subscribeCity } from "@/lib/city";
import { getMockDashboardData, pollenTypeOptions, rangeOptions } from "@/lib/mockDashboard";
import AreaTabBar from "@/components/AreaTabBar";
import CardBg from "@/components/CardBg";
import StatCard from "@/components/StatCard";
import PollenTypeTabs from "@/components/PollenTypeTabs";
import ScreenTitleBar from "@/components/ScreenTitleBar";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export default function Dashboard() {
  const [city, setCity] = useState(getCity());
  const [locale, setLocale] = useState(getLocale());
  const [activeAreaLabel, setActiveAreaLabel] = useState("");
  const [activeAreaKey, setActiveAreaKey] = useState("center");
  const [pollenType, setPollenType] = useState(pollenTypeOptions[0]);
  const [timeRange, setTimeRange] = useState(rangeOptions[0]);
  const [isExpertMode, setIsExpertMode] = useState(false);
  const [showUncertainty, setShowUncertainty] = useState(true);
  const [isPlotReady, setIsPlotReady] = useState(false);

  useEffect(() => {
    setCity(getCity());
    return subscribeCity(setCity);
  }, []);

  useEffect(() => subscribeLocale(setLocale), []);


  const dashboardData = useMemo(
    () =>
      getMockDashboardData({
        city,
        area: activeAreaKey,
        pollen: pollenType,
        range: timeRange,
      }),
    [city, activeAreaKey, pollenType, timeRange]
  );

  const pollenLabel = t(dashboardData.labelKey);
  const rangeLabel = t(dashboardData.rangeLabelKey);
  const currentSummaryLabelKey = "dashboard.summary.current";
  const maxValue = Math.max(
    ...dashboardData.series.upper,
    dashboardData.thresholds.high * 1.2
  );
  const summaryStats = useMemo(() => {
    const values = dashboardData.series.values;
    if (!values.length) {
      return { current: 0, average: 0, maximum: 0 };
    }
    const current = values[values.length - 1] ?? 0;
    const maximum = Math.max(...values);
    const average = Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
    return { current, average, maximum };
  }, [dashboardData.series.values]);
  const currentDelta = useMemo(() => {
    const values = dashboardData.series.values;
    if (values.length < 2) {
      return 0;
    }
    const last = values[values.length - 1] ?? 0;
    const previous = values[values.length - 2] ?? 0;
    return last - previous;
  }, [dashboardData.series.values]);

  const handleExportCsv = () => {
    const csvEscape = (value) => {
      const raw = value === null || value === undefined ? "" : String(value);
      if (/[",\n]/.test(raw)) {
        return `"${raw.replace(/"/g, '""')}"`;
      }
      return raw;
    };
    const pushRow = (cells) => rows.push(cells.map(csvEscape).join(","));
    const formatTimestamp = (date) => {
      if (!(date instanceof Date)) {
        return "";
      }
      return date.toISOString();
    };
    const rows = [];
    const resolvedAreaLabel =
      activeAreaLabel || t(`dashboard.area.${city}.${activeAreaKey}`);

    pushRow(["Metadata"]);
    pushRow(["City", t(`dashboard.city.${city}`)]);
    pushRow(["Area", resolvedAreaLabel]);
    pushRow(["Pollen type", pollenLabel]);
    pushRow(["Time range", rangeLabel]);
    pushRow(["Uncertainty", showUncertainty ? "On" : "Off"]);
    pushRow([""]);
    pushRow(["Summary stats"]);
    if (timeRange === "today") {
      pushRow([t(currentSummaryLabelKey), summaryStats.current]);
    }
    pushRow(["Average", summaryStats.average]);
    pushRow(["Maximum", summaryStats.maximum]);
    pushRow(["Unit", t("dashboard.summary.unit")]);
    pushRow([""]);
    pushRow(["Thresholds"]);
    pushRow(["Low", dashboardData.thresholds.low]);
    pushRow(["Medium", dashboardData.thresholds.medium]);
    pushRow(["High", dashboardData.thresholds.high]);
    pushRow([""]);
    pushRow(["Series"]);
    pushRow(["Timestamp", "Value", "Lower", "Upper"]);

    dashboardData.series.timestamps.forEach((timestamp, index) => {
      pushRow([
        formatTimestamp(timestamp),
        dashboardData.series.values[index],
        dashboardData.series.lower[index],
        dashboardData.series.upper[index],
      ]);
    });

    const csvContent = rows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `poleno-${city}-${activeAreaKey}-${pollenType}-${timeRange}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 0);
    addToast({
      title: t("dashboard.toast.exported"),
      severity: "success",
    });
  };

  const plotData = useMemo(() => {
    const { timestamps, values, lower, upper } = dashboardData.series;
    const lineTrace = {
      x: timestamps,
      y: values,
      type: "scatter",
      mode: "lines",
      name: pollenLabel,
      line: { color: "#007ca3", width: 2.5 },
    };

    if (!showUncertainty) {
      return [lineTrace];
    }

    return [
      {
        x: timestamps,
        y: upper,
        type: "scatter",
        mode: "lines",
        line: { color: "rgba(0,0,0,0)" },
        showlegend: false,
        hoverinfo: "skip",
      },
      {
        x: timestamps,
        y: lower,
        type: "scatter",
        mode: "lines",
        fill: "tonexty",
        name: t("dashboard.uncertainty.label"),
        line: { color: "rgba(0,0,0,0)" },
        fillcolor: "rgba(0, 124, 163, 0.15)",
      },
      lineTrace,
    ];
  }, [dashboardData, pollenLabel, showUncertainty]);

  const plotLayout = useMemo(
    () => ({
      margin: { l: 48, r: 24, t: 8, b: 44 },
      autosize: true,
      paper_bgcolor: "transparent",
      plot_bgcolor: "transparent",
      xaxis: {
        title: t("dashboard.axis.time"),
        showgrid: false,
        dtick: timeRange === "today" || timeRange === "yesterday" ? 7200000 : undefined,
        tickfont: { color: "#64748b", size: 11 },
      },
      yaxis: {
        title: t("dashboard.axis.concentration"),
        range: [0, maxValue],
        gridcolor: "#e2e8f0",
        tickfont: { color: "#64748b", size: 11 },
      },
      showlegend: false,
      shapes: [
        {
          type: "rect",
          xref: "paper",
          yref: "y",
          x0: 0,
          x1: 1,
          y0: 0,
          y1: dashboardData.thresholds.low,
          fillcolor: "rgba(34, 197, 94, 0.08)",
          line: { width: 0 },
        },
        {
          type: "rect",
          xref: "paper",
          yref: "y",
          x0: 0,
          x1: 1,
          y0: dashboardData.thresholds.low,
          y1: dashboardData.thresholds.medium,
          fillcolor: "rgba(251, 191, 36, 0.08)",
          line: { width: 0 },
        },
        {
          type: "rect",
          xref: "paper",
          yref: "y",
          x0: 0,
          x1: 1,
          y0: dashboardData.thresholds.medium,
          y1: dashboardData.thresholds.high,
          fillcolor: "rgba(251, 113, 133, 0.08)",
          line: { width: 0 },
        },
      ],
    }),
    [dashboardData.thresholds, maxValue, t, timeRange]
  );

  useEffect(() => {
    setIsPlotReady(false);
  }, [plotData, plotLayout]);

  return (
    <div className="flex min-h-screen flex-col" data-locale={locale}>
      <div className="flex-1 space-y-8">
        <div>
          <ScreenTitleBar
            title={t(`dashboard.city.${city}`)}
            showMenu
            primaryLabel={t("dashboard.exportCsv")}
            onPrimaryPress={handleExportCsv}
            primaryAfterMenu
            menuItems={[
              {
                key: "settings",
                label: t("screenTitle.menu.customize"),
                icon: <FadersHorizontal size={18} weight="regular" />,
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
            onAreaChange={(area) => {
              setActiveAreaLabel(area?.label || "");
              setActiveAreaKey(area?.key || "center");
            }}
          />
        </div>

        <div className="space-y-0">
          <section className="mb-8">
            <div className="FilterPanel flex flex-wrap items-center gap-5">
              <PollenTypeTabs
                items={pollenTypeOptions.map((type) => ({
                  key: type,
                  label: t(`dashboard.pollen.${type}`),
                  imageSrc: `/illustrations/pollen-type-${type}.png`,
                }))}
                activeKey={pollenType}
                onChange={(key) => setPollenType(String(key))}
              />
              <div className="ml-auto">
                <Tabs
                  selectedKey={timeRange}
                  onSelectionChange={(key) => setTimeRange(String(key))}
                  variant="solid"
                  radius="full"
                  classNames={{
                    tabList: "gap-1 rounded-full bg-slate-100 p-1",
                    tab: "h-7 rounded-full px-3 text-xs text-slate-600 data-[selected=true]:bg-white data-[selected=true]:text-slate-900 data-[selected=true]:shadow-sm",
                  }}
                >
                  {rangeOptions.map((range) => (
                    <Tab key={range} title={t(`dashboard.controls.${range}`)} />
                  ))}
                </Tabs>
              </div>
            </div>
          </section>
          <div className="Stats mb-5 flex flex-wrap gap-5">
            {(() => {
              const stats = [
                ...(timeRange === "today"
                  ? [
                      {
                        key: "current",
                        value: summaryStats.current,
                        labelKey: currentSummaryLabelKey,
                        borderColor: "#007ca3",
                        showDelta: true,
                        deltaValue: currentDelta,
                      },
                    ]
                  : []),
                {
                  key: "average",
                  value: summaryStats.average,
                  labelKey: "dashboard.summary.average",
                  borderColor: "#eab308",
                },
                {
                  key: "maximum",
                  value: summaryStats.maximum,
                  labelKey: "dashboard.summary.maximum",
                  borderColor: "#f43f5e",
                },
              ];

              return stats.map((item) => (
                <StatCard
                  key={item.key}
                  title={t(item.labelKey)}
                  value={item.value}
                  unitLabel={t("dashboard.summary.unit")}
                  borderColor={item.borderColor}
                  showDelta={item.showDelta}
                  deltaValue={item.deltaValue}
                />
              ));
            })()}
          </div>
          <div className="flex flex-col">
            <CardBg
              title={`${pollenLabel} ${t("dashboard.chart.concentration")}`}
              headerContent={
                <div className="ml-auto flex items-center gap-5 text-xs">
                  <Switch
                    isSelected={showUncertainty}
                    onValueChange={setShowUncertainty}
                    size="sm"
                    color="success"
                  >
                    {t("dashboard.controls.uncertainty")}
                  </Switch>
                  <Switch
                    isSelected={isExpertMode}
                    onValueChange={setIsExpertMode}
                    size="sm"
                    color="success"
                  >
                    {t("dashboard.controls.expertMode")}
                  </Switch>
                </div>
              }
              contentWrapperClassName="h-[480px] pb-6"
              contentClassName="flex h-full flex-col gap-5"
            >
              <div className="relative flex flex-1 flex-col">
                {!isPlotReady ? (
                  <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <Spinner size="lg" color="success" />
                  </div>
                ) : null}
                <Plot
                  data={plotData}
                  layout={plotLayout}
                  config={{ displayModeBar: false, responsive: true }}
                  style={{ width: "100%", height: "100%" }}
                  onInitialized={() => setIsPlotReady(true)}
                  onUpdate={() => setIsPlotReady(true)}
                />
              </div>
              <div className="flex flex-wrap items-center gap-5 px-6 text-xs text-slate-600">
                <span className="flex items-center gap-2">
                  <span
                    className="h-0.5 w-6"
                    style={{ backgroundColor: "#007ca3" }}
                  />
                  {pollenLabel}
                </span>
                {showUncertainty ? (
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-6 bg-[rgba(0,124,163,0.15)]" />
                    {t("dashboard.uncertainty.label")}
                  </span>
                ) : null}
                <span className="flex items-center gap-2">
                  <span className="h-2 w-6 bg-green-500/60" />
                  {t("dashboard.zones.low")}
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2 w-6 bg-amber-400/70" />
                  {t("dashboard.zones.medium")}
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2 w-6 bg-rose-400/70" />
                  {t("dashboard.zones.high")}
                </span>
              </div>
            </CardBg>
          </div>
        </div>
      </div>

    </div>
  );
}
