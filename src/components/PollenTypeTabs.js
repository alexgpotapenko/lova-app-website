"use client";

import Image from "next/image";

export default function PollenTypeTabs({ items, activeKey, onChange, className = "" }) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`.trim()}>
      {items.map((item) => {
        const isActive = item.key === activeKey;
        return (
          <div key={item.key} className="flex items-center">
            <button
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(item.key)}
              className={[
                "flex items-center gap-2 rounded-full py-2 pl-3 pr-4 text-left text-slate-600 transition-colors duration-200 ease-in-out",
                isActive
                  ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-900/8 cursor-default"
                  : "cursor-pointer shadow-[inset_0_0_0_2px_transparent] hover:bg-slate-200",
              ].join(" ")}
            >
              <span className="flex h-6 w-6 items-center justify-center bg-transparent">
                <Image
                  src={item.imageSrc}
                  alt={item.label}
                  width={24}
                  height={24}
                  className="h-6 w-6 object-cover bg-transparent"
                />
              </span>
              <span className="text-sm font-medium text-slate-900">{item.label}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
