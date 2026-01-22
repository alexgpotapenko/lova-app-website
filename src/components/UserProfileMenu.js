"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@heroui/react";
import {
  Check,
  CaretDown,
  Gear,
  IdentificationBadge,
  Shield,
  SignOut,
} from "@phosphor-icons/react";
import { getLocale, setLocale, subscribeLocale, t } from "@/i18n";
import { logout } from "@/lib/auth";

export default function UserProfileMenu() {
  const router = useRouter();
  const [locale, setLocaleState] = useState(getLocale());

  useEffect(() => subscribeLocale(setLocaleState), []);

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button
          variant="bordered"
          radius="full"
          className="flex h-auto min-h-0 items-center justify-between bg-white pl-2 pr-3 py-1 text-slate-900"
        >
          <div className="flex items-center gap-3">
            <Avatar
              name={t("topbar.profile.name")}
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=64&h=64&q=80"
              size="sm"
              className="bg-slate-100 text-slate-600"
            />
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold text-slate-900">
                {t("topbar.profile.name")}
              </span>
              <span className="text-xs text-slate-500">
                {t("topbar.profile.org")}
              </span>
            </div>
          </div>
          <CaretDown size={16} weight="bold" className="text-slate-600" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label={t("topbar.menu.aria")} radius="sm" className="pt-1 pb-0">
        <DropdownSection showDivider className="py-0">
          <DropdownItem
            key="profile"
            startContent={<IdentificationBadge size={18} weight="fill" className="text-slate-500" />}
          >
            {t("topbar.menu.profile")}
          </DropdownItem>
          <DropdownItem
            key="administration"
            startContent={<Shield size={18} weight="fill" className="text-slate-500" />}
            onPress={() => router.push("/administration")}
          >
            {t("topbar.menu.administration")}
          </DropdownItem>
          <DropdownItem
            key="settings"
            startContent={<Gear size={18} weight="fill" className="text-slate-500" />}
          >
            {t("topbar.menu.settings")}
          </DropdownItem>
        </DropdownSection>
        <DropdownSection showDivider className="py-0">
          <DropdownItem
            key="language-de"
            startContent={
              locale === "de" ? (
                <Check size={18} weight="regular" className="text-slate-500" />
              ) : null
            }
            onPress={() => {
              setLocale("de");
              setLocaleState("de");
            }}
          >
            {t("login.language.de")}
          </DropdownItem>
          <DropdownItem
            key="language-en"
            startContent={
              locale === "en" ? (
                <Check size={18} weight="regular" className="text-slate-500" />
              ) : null
            }
            onPress={() => {
              setLocale("en");
              setLocaleState("en");
            }}
          >
            {t("login.language.en")}
          </DropdownItem>
        </DropdownSection>
        <DropdownSection className="py-0">
          <DropdownItem
            key="logout"
            color="danger"
            className="group text-danger"
            startContent={
              <SignOut
                size={18}
                weight="fill"
                className="text-danger group-hover:text-white"
              />
            }
            onPress={handleLogout}
          >
            {t("topbar.menu.logout")}
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
