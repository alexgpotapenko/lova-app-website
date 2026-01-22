"use client";

import { useEffect, useState } from "react";
import { HeroUIProvider } from "@heroui/react";
import { getLocale, subscribeLocale } from "@/i18n";

export default function Providers({ children }) {
  const [locale, setLocale] = useState(getLocale());

  useEffect(() => subscribeLocale(setLocale), []);

  return (
    <HeroUIProvider>
      <div data-locale={locale}>{children}</div>
    </HeroUIProvider>
  );
}