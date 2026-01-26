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
import { CaretDown, ShieldCheckered, SignOut, UserCircle } from "@phosphor-icons/react";
import { t } from "@/i18n";
import { logout } from "@/lib/auth";
import { currentUser, subscribeUsers } from "@/lib/mockAdmin";

export default function UserProfileMenu() {
  const router = useRouter();
  const [role, setRole] = useState(currentUser.role);
  const [displayUser, setDisplayUser] = useState({
    name: currentUser.name,
    avatar: currentUser.avatar,
  });

  useEffect(
    () =>
      subscribeUsers(() => {
        setRole(currentUser.role);
        setDisplayUser({ name: currentUser.name, avatar: currentUser.avatar });
      }),
    []
  );
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
              name={displayUser.name}
              src={displayUser.avatar || undefined}
              size="sm"
              className="bg-slate-100 text-slate-600"
            />
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold text-slate-900">
                {displayUser.name}
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
            startContent={<UserCircle size={18} className="text-slate-500" />}
            onPress={() => router.push("/profile")}
          >
            {t("topbar.menu.profile")}
          </DropdownItem>
          {role === "admin" ? (
            <DropdownItem
              key="administration"
              startContent={<ShieldCheckered size={18} className="text-slate-500" />}
              onPress={() => router.push("/administration")}
            >
              {t("topbar.menu.administration")}
            </DropdownItem>
          ) : null}
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
