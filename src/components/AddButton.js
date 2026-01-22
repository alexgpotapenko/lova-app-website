"use client";

import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { Plus } from "@phosphor-icons/react";
import { t } from "@/i18n";

export default function AddButton({
  size = "md",
  className = "",
  ariaLabel,
  title,
  body,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const isSmall = size === "sm";

  return (
    <>
      <Button
        isIconOnly
        size={isSmall ? "xs" : "md"}
        radius="full"
        variant="bordered"
        className={`${isSmall ? "h-6 w-6" : "h-10 w-10"} ${className}`.trim()}
        aria-label={ariaLabel || t("addButton.aria")}
        onPress={onOpen}
      >
        <Plus size={isSmall ? 12 : 18} weight="bold" />
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="sm">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-base font-semibold text-slate-900">
                {title || t("addButton.title")}
              </ModalHeader>
              <ModalBody>
                <p className="text-sm text-slate-600">
                  {body || t("addButton.body")}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  {t("addButton.close")}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
