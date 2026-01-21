"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { CaretDown, Plus } from "@phosphor-icons/react";
import { t } from "@/i18n";
import { logout } from "@/lib/auth";

const cities = [
  { id: "zurich", labelKey: "topbar.city.zurich" },
  { id: "basel", labelKey: "topbar.city.basel" },
  { id: "geneva", labelKey: "topbar.city.geneva" },
];

export default function TopBar() {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [activeCity, setActiveCity] = useState(cities[0].id);

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/logo.svg"
              alt={t("app.logoAlt")}
              width={96}
              height={32}
              priority
            />
            <span className="text-base font-semibold text-slate-900">
              {t("app.productName")}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-slate-100 px-2 py-1">
              {cities.map((city) => {
                const isActive = city.id === activeCity;
                return (
                  <Button
                    key={city.id}
                    size="sm"
                    radius="full"
                    variant="flat"
                    onPress={() => setActiveCity(city.id)}
                    className={
                      isActive
                        ? "bg-key-600 text-white"
                        : "bg-white text-slate-700"
                    }
                  >
                    {t(city.labelKey)}
                  </Button>
                );
              })}
            </div>
            <Button
              isIconOnly
              radius="full"
              variant="flat"
              onPress={onOpen}
              aria-label={t("topbar.addButtonAria")}
              className="bg-slate-100 text-slate-700"
            >
              <Plus size={18} weight="fill" />
            </Button>
          </div>

          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button
                variant="flat"
                radius="lg"
                className="flex items-center gap-3 bg-slate-100 px-3"
              >
                <div className="flex flex-col items-start">
                  <span className="text-sm font-semibold text-slate-900">
                    {t("topbar.profile.name")}
                  </span>
                  <span className="text-xs text-slate-500">
                    {t("topbar.profile.org")}
                  </span>
                </div>
                <CaretDown size={16} weight="fill" className="text-slate-600" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label={t("topbar.menu.aria")}>
              <DropdownItem key="profile">
                {t("topbar.menu.profile")}
              </DropdownItem>
              <DropdownItem
                key="administration"
                onPress={() => router.push("/administration")}
              >
                {t("topbar.menu.administration")}
              </DropdownItem>
              <DropdownItem key="settings">
                {t("topbar.menu.settings")}
              </DropdownItem>
              <DropdownItem
                key="logout"
                className="text-key-700"
                onPress={handleLogout}
              >
                {t("topbar.menu.logout")}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </header>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="sm">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-base font-semibold text-slate-900">
                {t("topbar.builderTitle")}
              </ModalHeader>
              <ModalBody>
                <p className="text-sm text-slate-600">
                  {t("topbar.builderNotice")}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  {t("topbar.builderClose")}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
