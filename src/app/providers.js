"use client";

import { useEffect, useState } from "react";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { getLocale, subscribeLocale } from "@/i18n";

export default function Providers({ children }) {
  const [locale, setLocale] = useState(getLocale());

  useEffect(() => subscribeLocale(setLocale), []);

  return (
    <HeroUIProvider>
      <ToastProvider placement="bottom-center" toastOffset={32} />
      <div data-locale={locale}>{children}</div>
    </HeroUIProvider>
  );
}