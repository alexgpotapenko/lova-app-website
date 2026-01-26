"use client";

import { useEffect, useMemo, useState } from "react";
import { t } from "@/i18n";
import { getCity, subscribeCity } from "@/lib/city";
import TabBar from "@/components/TabBar";
import { currentUser, subscribeUsers } from "@/lib/mockAdmin";

const cityAreas = {
  zurich: [
    { key: "center", label: "dashboard.area.zurich.center" },
    { key: "north", label: "dashboard.area.zurich.north" },
    { key: "lake", label: "dashboard.area.zurich.lake" },
  ],
  basel: [{ key: "center", label: "dashboard.area.basel.center" }],
  geneva: [
    { key: "center", label: "dashboard.area.geneva.center" },
    { key: "west", label: "dashboard.area.geneva.west" },
  ],
};

export default function AreaTabBar({ onAreaChange = () => {} }) {
  const [city, setCity] = useState(getCity());
  const [role, setRole] = useState(currentUser.role);
  const [activeByCity, setActiveByCity] = useState({
    zurich: "center",
    basel: "center",
    geneva: "center",
  });

  useEffect(() => {
    setCity(getCity());
    return subscribeCity(setCity);
  }, []);

  useEffect(() => subscribeUsers(() => setRole(currentUser.role)), []);

  const tabs = useMemo(() => cityAreas[city] || cityAreas.zurich, [city]);
  const activeKey = activeByCity[city] || tabs[0]?.key;

  useEffect(() => {
    if (!tabs.some((tab) => tab.key === activeKey)) {
      setActiveByCity((prev) => ({
        ...prev,
        [city]: tabs[0]?.key,
      }));
    }
  }, [tabs, city, activeKey]);

  const translatedTabs = useMemo(
    () =>
      tabs.map((tab) => ({
        key: tab.key,
        label: t(tab.label),
      })),
    [tabs]
  );

  useEffect(() => {
    const activeTab = translatedTabs.find((tab) => tab.key === activeKey);
    if (activeTab) {
      onAreaChange(activeTab);
    }
  }, [translatedTabs, activeKey, onAreaChange]);

  const isAdmin = role === "admin";

  return (
    <TabBar
      tabs={translatedTabs}
      activeKey={activeKey}
      onChange={(key) => {
        setActiveByCity((prev) => ({
          ...prev,
          [city]: key,
        }));
      }}
      showAdd={isAdmin}
      addButtonProps={{
        className: "text-slate-700",
        ariaLabel: t("dashboard.area.add"),
        title: t("dashboard.area.addTitle"),
        body: t("dashboard.area.addBody"),
      }}
    />
  );
}
