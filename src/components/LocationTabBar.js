"use client";

import { Button } from "@heroui/react";
import AddButton from "@/components/AddButton";

export default function LocationTabBar({
  tabs,
  activeKey,
  onChange,
  showAdd = false,
  addButtonProps = {},
}) {
  return (
    <div className="flex items-center gap-2">
      {tabs.map((tab) => {
        const isActive = tab.key === activeKey;
        return (
          <Button
            key={tab.key}
            size="md"
            radius="full"
            variant={isActive ? "solid" : "bordered"}
            color={isActive ? "success" : "default"}
            className={isActive ? "text-white" : "text-slate-700"}
            onPress={() => onChange(tab.key)}
          >
            {tab.label}
          </Button>
        );
      })}
      {showAdd ? <AddButton size="md" {...addButtonProps} /> : null}
    </div>
  );
}