"use client";

import { Button, Dropdown, DropdownMenu, DropdownItem, DropdownTrigger } from "@heroui/react";
import { DotsThree, Gear, Trash } from "@phosphor-icons/react";
import { t } from "@/i18n";

export default function ScreenTitleBar({
  title,
  showMenu = false,
  menuItems = [],
  primaryLabel,
  onPrimaryPress = () => {},
}) {
  const showActions = Boolean(primaryLabel) || showMenu;

  return (
    <div className="flex items-start justify-between gap-6 pb-8 pt-10">
      <h1 className="text-4xl font-semibold text-slate-900">{title}</h1>
      {showActions ? (
        <div className="flex items-center gap-3">
          {primaryLabel ? (
            <Button color="primary" size="lg" radius="md" onPress={onPrimaryPress}>
              {primaryLabel}
            </Button>
          ) : null}
          {showMenu ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button
                  isIconOnly
                  variant="bordered"
                  radius="full"
                  size="md"
                  aria-label={t("screenTitle.menu.aria")}
                >
                  <DotsThree size={18} weight="bold" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu radius="sm" aria-label={t("screenTitle.menu.aria")}>
                {menuItems.map((item) => (
                  <DropdownItem
                    key={item.key}
                    onPress={item.onPress}
                    color={item.isDanger ? "danger" : "default"}
                    className={item.isDanger ? "text-danger" : undefined}
                    startContent={item.icon}
                  >
                    {item.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
