"use client";

import CardBg from "@/components/CardBg";
import MetaDataItem from "@/components/MetaDataItem";

export default function ProfileTemplate({
  personalTitle,
  personalContent,
  statusTitle,
  statusContent,
  statusMetaItems,
  organizationTitle,
  organizationContent,
  preferencesTitle,
  preferencesContent,
  actionsTitle,
  actionsContent,
}) {
  return (
    <div className="flex flex-col gap-5">
      <CardBg
        showShadow={false}
        className="shadow-[0_1px_3px_theme(colors.slate.900/0.06)]"
      >
        <div className="-mx-6 -mb-6">
          <div className="flex flex-col gap-0 lg:flex-row lg:items-start">
            {personalContent ? (
              <div className="flex-1 border-r border-slate-200">
                <CardBg
                  showBackground={false}
                  showShadow={false}
                  rounded={null}
                  title={personalTitle}
                >
                  {personalContent}
                </CardBg>
              </div>
            ) : null}

            {statusContent ? (
              <div className="w-full lg:w-[360px]">
                <CardBg
                  title={statusTitle}
                  showBackground={false}
                  showShadow={false}
                  rounded={null}
                >
                  {statusContent}
                  {statusMetaItems?.length
                    ? statusMetaItems.map((item, index) => (
                        <MetaDataItem
                          key={item.key || item.label}
                          className={index === 0 ? "mt-4" : "mt-3"}
                          label={item.label}
                          value={item.value}
                        />
                      ))
                    : null}
                </CardBg>
              </div>
            ) : null}
          </div>
        </div>
      </CardBg>

      {organizationContent ? (
        <CardBg title={organizationTitle}>
          <div className="space-y-3">{organizationContent}</div>
        </CardBg>
      ) : null}

      {preferencesContent ? (
        <CardBg title={preferencesTitle}>{preferencesContent}</CardBg>
      ) : null}

      {actionsContent ? (
        <CardBg title={actionsTitle}>
          <div className="space-y-3">{actionsContent}</div>
        </CardBg>
      ) : null}
    </div>
  );
}
