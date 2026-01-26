"use client";

import { useRouter } from "next/navigation";
import { Button, Dropdown, DropdownMenu, DropdownItem, DropdownTrigger } from "@heroui/react";
import { ArrowLeft, DotsThree } from "@phosphor-icons/react";
import { t } from "@/i18n";

export default function ScreenTitleBar({
  title,
  showMenu = false,
  menuItems = [],
  primaryLabel,
  primaryAriaLabel,
  onPrimaryPress = () => {},
  primaryVariant = "solid",
  primaryColor = "primary",
  primaryRadius = "full",
  primaryClassName = "",
  primaryStartContent = null,
  primaryIconOnly = false,
  primarySize = "lg",
  primaryAfterMenu = false,
  showBack = false,
  onBackPress,
  titleClassName = "",
  spacingClassName = "pb-10 pt-10",
}) {
  const router = useRouter();
  const showActions = Boolean(primaryLabel) || primaryIconOnly || showMenu;
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
      return;
    }
    router.back();
  };

  return (
    <div className={`flex items-start gap-6 ${spacingClassName}`}>
      <div className="flex flex-1 items-center gap-3">
        {showBack ? (
          <Button
            isIconOnly
            variant="bordered"
            radius="full"
            size="lg"
            aria-label={t("screenTitle.back.aria")}
            onPress={handleBackPress}
          >
            <ArrowLeft size={18} weight="bold" />
          </Button>
        ) : null}
        <div className="w-full py-1">
          <h1 className={`text-4xl font-semibold text-slate-900 ${titleClassName}`}>
            {title}
          </h1>
        </div>
      </div>
      {showActions ? (
        <div className="ml-auto flex items-center gap-3">
          {!primaryAfterMenu && (primaryLabel || primaryIconOnly) ? (
            <Button
              isIconOnly={primaryIconOnly}
              color={primaryColor}
              variant={primaryVariant}
              size={primarySize}
              radius={primaryRadius}
              onPress={onPrimaryPress}
              className={primaryClassName}
              startContent={primaryIconOnly ? undefined : primaryStartContent}
              aria-label={primaryIconOnly ? primaryAriaLabel || primaryLabel : undefined}
            >
              {primaryIconOnly ? primaryStartContent : primaryLabel}
            </Button>
          ) : null}
          {showMenu ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button
                  isIconOnly
                  variant="bordered"
                  radius="full"
                  size="lg"
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
          {primaryAfterMenu && (primaryLabel || primaryIconOnly) ? (
            <Button
              isIconOnly={primaryIconOnly}
              color={primaryColor}
              variant={primaryVariant}
              size={primarySize}
              radius={primaryRadius}
              onPress={onPrimaryPress}
              className={primaryClassName}
              startContent={primaryIconOnly ? undefined : primaryStartContent}
              aria-label={primaryIconOnly ? primaryAriaLabel || primaryLabel : undefined}
            >
              {primaryIconOnly ? primaryStartContent : primaryLabel}
            </Button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
