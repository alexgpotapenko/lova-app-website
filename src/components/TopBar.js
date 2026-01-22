"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { t } from "@/i18n";
import ContentContainer from "@/components/ContentContainer";
import UserProfileMenu from "@/components/UserProfileMenu";
import LocationTabBar from "@/components/LocationTabBar";
import { getCity, setCity, subscribeCity } from "@/lib/city";

const cities = [
  { id: "zurich", labelKey: "topbar.city.zurich" },
  { id: "basel", labelKey: "topbar.city.basel" },
  { id: "geneva", labelKey: "topbar.city.geneva" },
];

export default function TopBar() {
  const pathname = usePathname();
  const [activeCity, setActiveCity] = useState(getCity());
  const showCities = pathname === "/";

  useEffect(() => {
    setActiveCity(getCity());
    return subscribeCity(setActiveCity);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
        <ContentContainer>
          {/* Shared width constraint lives in ContentContainer. */}
          <div className="flex items-stretch justify-between">
          <div className="flex items-center gap-3 py-4 pr-8">
            <Link href="/" className="inline-flex">
              <Image
                src="/brand/logo-app.svg"
                alt={t("app.logoAlt")}
                width={96}
                height={32}
                className="h-10 w-auto"
                priority
              />
            </Link>
          </div>

          {showCities ? (
            <div className="flex flex-1 items-center border-l border-slate-200 pl-6 pr-8 self-stretch">
              <LocationTabBar
                tabs={cities.map((city) => ({
                  key: city.id,
                  label: t(city.labelKey),
                }))}
                activeKey={activeCity}
                onChange={(nextCity) => {
                  setCity(nextCity);
                  setActiveCity(nextCity);
                }}
                showAdd
                addButtonProps={{
                  className: "text-slate-700",
                  ariaLabel: t("topbar.addButtonAria"),
                  title: t("dashboard.addTitle"),
                  body: t("dashboard.addBody"),
                }}
              />
            </div>
          ) : (
            <div className="flex-1 self-stretch" />
          )}
          <div className="inline-flex items-center border-l border-slate-200 pl-4 self-stretch">
            <UserProfileMenu />
          </div>
          </div>
        </ContentContainer>
      </header>
    </>
  );
}
