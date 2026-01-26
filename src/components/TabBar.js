"use client";

import { Tab, Tabs } from "@heroui/react";
import AddButton from "@/components/AddButton";

export default function TabBar({
  tabs,
  activeKey,
  onChange,
  showAdd = false,
  addButtonProps = {},
  className = "",
}) {
  return (
    <div className={`flex items-center gap-4 border-b border-slate-200 ${className}`}>
      <div>
        <Tabs
          selectedKey={activeKey}
          onSelectionChange={(key) => {
            if (typeof key === "string") {
              onChange(key);
            }
          }}
          variant="underlined"
          classNames={{
            tabList: "gap-4 p-0 h-auto",
            tab: "h-auto px-0 py-3 text-base font-medium text-slate-500",
            tabContent: "w-full group-data-[selected=true]:text-slate-900",
            cursor: "bg-green-500 h-0.5 w-full",
          }}
        >
          {tabs.map((tab) => (
            <Tab key={tab.key} title={tab.label} />
          ))}
        </Tabs>
      </div>
      <div className="flex items-center">
        {showAdd ? <AddButton size="sm" {...addButtonProps} /> : null}
      </div>
    </div>
  );
}
