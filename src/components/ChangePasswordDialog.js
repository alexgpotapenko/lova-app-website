"use client";

import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/react";
import { Eye, EyeSlash } from "@phosphor-icons/react";

export default function ChangePasswordDialog({
  triggerLabel,
  triggerClassName = "",
  labelPlacement = "inside",
  title,
  currentPasswordLabel,
  newPasswordLabel,
  strengthLabel,
  cancelLabel,
  saveLabel,
  showPasswordLabel,
  hidePasswordLabel,
  oldPassword,
  newPassword,
  onOldPasswordChange,
  onNewPasswordChange,
  showCurrentPassword,
  setShowCurrentPassword,
  showNewPassword,
  setShowNewPassword,
  strengthColor,
  strengthWidth,
  onCancel,
  onSave,
}) {
  const dialog = useDisclosure();
  return (
    <>
      <div className={`pointer-events-auto flex h-full items-center ${triggerClassName}`.trim()}>
        <Button size="sm" variant="bordered" radius="full" onPress={dialog.onOpen}>
          {triggerLabel}
        </Button>
      </div>
      <Modal isOpen={dialog.isOpen} onOpenChange={dialog.onOpenChange} size="sm">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-base font-semibold text-slate-900">
                {title}
              </ModalHeader>
              <ModalBody className="space-y-2">
                <Input
                  type={showCurrentPassword ? "text" : "password"}
                  label={currentPasswordLabel}
                  labelPlacement={labelPlacement}
                  value={oldPassword}
                  onChange={onOldPasswordChange}
                  radius="md"
                  endContent={
                    <Button
                      isIconOnly
                      variant="light"
                      radius="full"
                      size="sm"
                      aria-label={showCurrentPassword ? hidePasswordLabel : showPasswordLabel}
                      onPress={() => setShowCurrentPassword((current) => !current)}
                    >
                      {showCurrentPassword ? (
                        <EyeSlash size={16} weight="bold" />
                      ) : (
                        <Eye size={16} weight="bold" />
                      )}
                    </Button>
                  }
                />
                <div>
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    label={newPasswordLabel}
                    labelPlacement={labelPlacement}
                    value={newPassword}
                    onChange={onNewPasswordChange}
                    radius="md"
                    endContent={
                      <Button
                        isIconOnly
                        variant="light"
                        radius="full"
                        size="sm"
                        aria-label={showNewPassword ? hidePasswordLabel : showPasswordLabel}
                        onPress={() => setShowNewPassword((current) => !current)}
                      >
                        {showNewPassword ? (
                          <EyeSlash size={16} weight="bold" />
                        ) : (
                          <Eye size={16} weight="bold" />
                        )}
                      </Button>
                    }
                  />
                <div className="mt-5 space-y-5">
                    <p className="text-sm text-foreground-500 mb-2">{strengthLabel}</p>
                    <div className="h-2 w-full rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full transition-all ${strengthColor}`}
                        style={{ width: strengthWidth }}
                      />
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="bordered"
                  radius="full"
                  onPress={() => onCancel(onClose)}
                >
                  {cancelLabel}
                </Button>
                <Button
                  color="primary"
                  radius="full"
                  onPress={() => onSave(onClose)}
                >
                  {saveLabel}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
