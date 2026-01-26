"use client";

import { CaretDown, CaretUp } from "@phosphor-icons/react";
import CardBg from "@/components/CardBg";

export default function StatCard({
  title,
  value,
  unitLabel,
  borderColor,
  showDelta = false,
  deltaValue = 0,
}) {
  return (
    <div
      className={[
        "relative transition-opacity duration-200 ease-in-out",
        "min-w-[180px] flex-1",
      ].join(" ")}
    >
      <CardBg
        title={title}
        titleClassName="text-lg font-medium text-slate-900 m-0"
        headerWrapperClassName="px-6 pt-3 pb-2"
        contentWrapperClassName="px-6 pb-4"
        contentClassName="space-y-4"
        className="relative overflow-hidden"
      >
        <span
          className="absolute w-[3px] rounded-full z-0"
          style={{
            backgroundColor: borderColor,
            left: 8,
            top: 18,
            bottom: 4,
          }}
        />
        <div className="relative z-10">
          {(() => {
            const hasDelta = showDelta && Number.isFinite(deltaValue);
            const isPositive = deltaValue >= 0;
            const deltaDisplay = Math.abs(deltaValue);

            return (
              <p className="text-5xl font-regular text-slate-900">
                {value}
                <span className="ml-2 inline-flex items-start relative">
                  {hasDelta ? (
                    <span className="absolute -top-5 left-0 flex items-center gap-1 text-sm text-slate-900">
                      {isPositive ? (
                        <CaretUp size={14} weight="fill" className="text-rose-500" />
                      ) : (
                        <CaretDown size={14} weight="fill" className="text-green-500" />
                      )}
                      <span>{deltaDisplay}</span>
                    </span>
                  ) : null}
                  <span className="text-sm font-normal text-slate-500">{unitLabel}</span>
                </span>
              </p>
            );
          })()}
        </div>
      </CardBg>
    </div>
  );
}
