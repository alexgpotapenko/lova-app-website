"use client";

import { Button } from "@heroui/react";
import { t } from "@/i18n";

export default function BrandPreview() {
  return (
    <section className="rounded-md border border-dashed border-slate-200 bg-white p-6">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-slate-900">
          {t("brand.preview.title")}
        </h2>
        <p className="text-sm text-slate-500">{t("brand.preview.subtitle")}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-md border border-slate-100 bg-slate-50 p-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-4 w-4 rounded-full bg-key-600" />
            <span className="text-sm font-medium text-slate-700">
              {t("brand.preview.key")}
            </span>
          </div>
          <Button size="sm" color="primary" variant="solid" radius="md">
            {t("brand.preview.keyButton")}
          </Button>
        </div>
        <div className="rounded-md border border-slate-100 bg-slate-50 p-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-4 w-4 rounded-full bg-accent-600" />
            <span className="text-sm font-medium text-slate-700">
              {t("brand.preview.accent")}
            </span>
          </div>
          <Button
            size="sm"
            radius="md"
            color="success"
            variant="solid"
          >
            {t("brand.preview.accentButton")}
          </Button>
        </div>
      </div>
    </section>
  );
}
