"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  addToast,
  Avatar,
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@heroui/react";
import { SignOut, Trash } from "@phosphor-icons/react";
import { getLocale, setLocale, subscribeLocale, t } from "@/i18n";
import ChangePasswordDialog from "@/components/ChangePasswordDialog";
import ProfileTemplate from "@/components/ProfileTemplate";
import ScreenTitleBar from "@/components/ScreenTitleBar";
import {
  currentUser,
  getUserById,
  subscribeUsers,
  updateUserAvatar,
  updateUserProfile,
} from "@/lib/mockAdmin";
import { logout } from "@/lib/auth";

export default function ProfilePage() {
  const router = useRouter();
  const avatarInputRef = useRef(null);
  const [locale, setLocaleState] = useState(getLocale());
  const [user, setUser] = useState(() => getUserById(currentUser.id) || currentUser);
  const [formValues, setFormValues] = useState(() => ({
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    email: user.email ?? "",
  }));
  const [passwordValue, setPasswordValue] = useState("");
  const [touchedFields, setTouchedFields] = useState({
    firstName: false,
    lastName: false,
    email: false,
  });
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [avatarDraft, setAvatarDraft] = useState(undefined);
  const [avatarDraftIsObjectUrl, setAvatarDraftIsObjectUrl] = useState(false);
  const organizationLogo = "/brand/logo-meteoswiss.png";
  const isAdmin = currentUser.role === "admin";
  const unsavedDialog = useDisclosure();
  const [pendingNavigation, setPendingNavigation] = useState(null);
  const skipBeforeUnloadRef = useRef(false);

  useEffect(() => subscribeLocale(setLocaleState), []);
  useEffect(
    () =>
      subscribeUsers(() => {
        const nextUser = getUserById(currentUser.id) || currentUser;
        setUser(nextUser);
        setFormValues({
          firstName: nextUser.firstName ?? "",
          lastName: nextUser.lastName ?? "",
          email: nextUser.email ?? "",
        });
        setPasswordValue("");
        setTouchedFields({ firstName: false, lastName: false, email: false });
        setOldPassword("");
        setNewPassword("");
        if (avatarDraftIsObjectUrl && typeof avatarDraft === "string") {
          URL.revokeObjectURL(avatarDraft);
        }
        setAvatarDraft(undefined);
        setAvatarDraftIsObjectUrl(false);
      }),
    [avatarDraft, avatarDraftIsObjectUrl]
  );

  const handleAvatarUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    if (avatarDraftIsObjectUrl && typeof avatarDraft === "string") {
      URL.revokeObjectURL(avatarDraft);
    }
    const nextUrl = URL.createObjectURL(file);
    setAvatarDraft(nextUrl);
    setAvatarDraftIsObjectUrl(true);
    event.target.value = "";
  };

  const handleProfileChange = (field) => (event) => {
    setFormValues((current) => ({ ...current, [field]: event.target.value }));
  };

  const validateName = (value) => {
    if (!value.trim()) {
      return t("profile.validation.required");
    }
    if (!/^[A-Za-z][A-Za-z\s.'-]*$/.test(value.trim())) {
      return t("profile.validation.name");
    }
    return "";
  };

  const validateEmail = (value) => {
    if (!value.trim()) {
      return t("profile.validation.required");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
      return t("profile.validation.email");
    }
    return "";
  };

  const firstNameError = touchedFields.firstName ? validateName(formValues.firstName) : "";
  const lastNameError = touchedFields.lastName ? validateName(formValues.lastName) : "";
  const emailError = touchedFields.email ? validateEmail(formValues.email) : "";

  const isFormValid =
    !validateName(formValues.firstName) &&
    !validateName(formValues.lastName) &&
    !validateEmail(formValues.email);

  const saveProfileChanges = () => {
    updateUserProfile(currentUser.id, {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
    });
    setPasswordValue("");
    setOldPassword("");
    setNewPassword("");
    if (avatarDraft !== undefined) {
      updateUserAvatar(currentUser.id, avatarDraft);
      setAvatarDraft(undefined);
      setAvatarDraftIsObjectUrl(false);
    }
    addToast({
      title: t("profile.toast.saved"),
      severity: "success",
    });
  };

  const isDirty =
    formValues.firstName !== (user.firstName ?? "") ||
    formValues.lastName !== (user.lastName ?? "") ||
    formValues.email !== (user.email ?? "") ||
    Boolean(passwordValue) ||
    Boolean(newPassword) ||
    avatarDraft !== undefined;

  const getPasswordStrength = (value) => {
    let score = 0;
    if (value.length >= 8) score += 1;
    if (/[A-Z]/.test(value)) score += 1;
    if (/[0-9]/.test(value)) score += 1;
    if (/[^A-Za-z0-9]/.test(value)) score += 1;
    return score;
  };

  const strengthScore = getPasswordStrength(newPassword);
  const strengthWidth = `${(strengthScore / 4) * 100}%`;
  const strengthColor =
    strengthScore >= 3 ? "bg-success-500" : strengthScore === 2 ? "bg-amber-500" : "bg-danger-500";

  const displayAvatar = avatarDraft !== undefined ? avatarDraft : user.avatar;

  const performNavigation = (navigation) => {
    if (!navigation) {
      return;
    }
    if (navigation.type === "url") {
      window.location.href = navigation.value;
      return;
    }
    if (navigation.type === "back") {
      router.back();
      return;
    }
    if (navigation.type === "logout") {
      logout();
      router.replace("/login");
    }
  };

  const handleNavigationAttempt = (navigation) => {
    if (isDirty) {
      setPendingNavigation(navigation);
      unsavedDialog.onOpen();
      return;
    }
    performNavigation(navigation);
  };

  useEffect(() => {
    if (!isDirty) {
      setPendingNavigation(null);
      return;
    }
    const currentUrl = window.location.href;
    const handleBeforeUnload = (event) => {
      if (!isDirty || skipBeforeUnloadRef.current) {
        return;
      }
      event.preventDefault();
      event.returnValue = "";
    };
    const handlePopState = () => {
      if (!isDirty) {
        return;
      }
      window.history.pushState(null, "", currentUrl);
      setPendingNavigation({ type: "back" });
      unsavedDialog.onOpen();
    };
    const handleClick = (event) => {
      if (!isDirty) {
        return;
      }
      const target = event.target instanceof Element ? event.target : null;
      const link = target?.closest("a");
      if (!link || event.defaultPrevented) {
        return;
      }
      if (link.target === "_blank" || link.hasAttribute("download")) {
        return;
      }
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#")) {
        return;
      }
      const url = new URL(link.href);
      if (url.origin !== window.location.origin) {
        return;
      }
      event.preventDefault();
      setPendingNavigation({ type: "url", value: link.href });
      unsavedDialog.onOpen();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);
    document.addEventListener("click", handleClick, true);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("click", handleClick, true);
    };
  }, [isDirty, unsavedDialog]);

  return (
    <div>
      <ScreenTitleBar
        title={t("profile.title")}
        primaryLabel={t("profile.actions.logout")}
        primaryVariant="bordered"
        primaryColor="default"
        primaryStartContent={<SignOut size={18} weight="fill" />}
        onPrimaryPress={() => handleNavigationAttempt({ type: "logout" })}
      />

      <ProfileTemplate
        personalTitle={t("profile.sections.personal")}
        personalContent={
          <div className="flex w-full flex-col gap-6">
            <div className="flex items-center gap-4">
              <Avatar
                name={user.name}
                src={displayAvatar || undefined}
                size="xl"
                className="bg-slate-100 text-slate-600 w-32 h-32"
              />
              <Button
                size="sm"
                variant="bordered"
                radius="full"
                onPress={() => {
                  if (displayAvatar) {
                    if (avatarDraftIsObjectUrl && typeof avatarDraft === "string") {
                      URL.revokeObjectURL(avatarDraft);
                    }
                    setAvatarDraft(null);
                    setAvatarDraftIsObjectUrl(false);
                    return;
                  }
                  avatarInputRef.current?.click();
                }}
              >
                {displayAvatar ? t("profile.avatar.remove") : t("profile.avatar.upload")}
              </Button>
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <Input
                label={t("profile.firstName")}
                labelPlacement="inside"
                value={formValues.firstName}
                onChange={handleProfileChange("firstName")}
                onBlur={() =>
                  setTouchedFields((current) => ({ ...current, firstName: true }))
                }
                isInvalid={Boolean(firstNameError)}
                errorMessage={firstNameError}
                radius="md"
                isDisabled={!isAdmin}
              />
              <Input
                label={t("profile.lastName")}
                labelPlacement="inside"
                value={formValues.lastName}
                onChange={handleProfileChange("lastName")}
                onBlur={() =>
                  setTouchedFields((current) => ({ ...current, lastName: true }))
                }
                isInvalid={Boolean(lastNameError)}
                errorMessage={lastNameError}
                radius="md"
                isDisabled={!isAdmin}
              />
              <Input
                label={t("profile.email")}
                labelPlacement="inside"
                value={formValues.email}
                onChange={handleProfileChange("email")}
                onBlur={() =>
                  setTouchedFields((current) => ({ ...current, email: true }))
                }
                isInvalid={Boolean(emailError)}
                errorMessage={emailError}
                radius="md"
                isDisabled={!isAdmin}
              />
              <Input
                label={t("profile.password")}
                labelPlacement="inside"
                type="password"
                value={passwordValue}
                onChange={(event) => setPasswordValue(event.target.value)}
                placeholder="••••••••••••"
                radius="md"
                isDisabled={!isAdmin}
                endContent={
                  isAdmin ? (
                    <ChangePasswordDialog
                      triggerLabel={t("profile.passwordChange")}
                      title={t("profile.password.dialogTitle")}
                      currentPasswordLabel={t("profile.password.old")}
                      newPasswordLabel={t("profile.password.new")}
                      strengthLabel={t("profile.password.strength")}
                      cancelLabel={t("profile.password.cancel")}
                      saveLabel={t("profile.password.save")}
                      showPasswordLabel={t("login.passwordShow")}
                      hidePasswordLabel={t("login.passwordHide")}
                      oldPassword={oldPassword}
                      newPassword={newPassword}
                      onOldPasswordChange={(event) => setOldPassword(event.target.value)}
                      onNewPasswordChange={(event) => setNewPassword(event.target.value)}
                      showCurrentPassword={showCurrentPassword}
                      setShowCurrentPassword={setShowCurrentPassword}
                      showNewPassword={showNewPassword}
                      setShowNewPassword={setShowNewPassword}
                      strengthColor={strengthColor}
                      strengthWidth={strengthWidth}
                      onCancel={(onClose) => {
                        setOldPassword("");
                        setNewPassword("");
                        onClose();
                      }}
                      onSave={(onClose) => {
                        onClose();
                      }}
                    />
                  ) : null
                }
              />
            </div>
            <div className="flex w-full">
              <Button
                color={isAdmin && isDirty ? "primary" : "default"}
                radius="full"
                className={`mt-0 ${isAdmin && isDirty ? "" : "text-slate-700 border-slate-300"}`}
                isDisabled={!isAdmin || !isDirty || !isFormValid}
                variant={isAdmin && isDirty ? "solid" : "bordered"}
                onPress={() => {
                  setTouchedFields({ firstName: true, lastName: true, email: true });
                  if (!isFormValid) {
                    return;
                  }
                  saveProfileChanges();
                }}
              >
                {t("profile.actions.save")}
              </Button>
            </div>
          </div>
        }
        statusTitle={t("profile.status.title")}
        statusContent={
          <div className="flex flex-wrap items-center gap-2 mb-0">
            <Chip
              color={user.role === "admin" ? "secondary" : "default"}
              variant="flat"
              size="md"
            >
              {t(`administration.users.role.${user.role}`)}
            </Chip>
            <Chip
              color={user.status === "active" ? "success" : "danger"}
              variant="flat"
              size="md"
            >
              {t(
                `administration.users.status.${
                  user.status === "active" ? "active" : "deactivated"
                }`
              )}
            </Chip>
          </div>
        }
        statusMetaItems={[
          {
            key: "memberSince",
            label: t("administration.userDetails.memberSince"),
            value: user.memberSince,
          },
          {
            key: "lastActivity",
            label: t("administration.userDetails.lastActivity"),
            value: user.lastActivity,
          },
        ]}
        organizationTitle={t("profile.sections.organization")}
        organizationContent={
          <>
            <div className="flex items-center gap-3">
              {organizationLogo ? (
                <Image
                  src={organizationLogo}
                  alt={t("profile.organizationLogoAlt")}
                  width={192}
                  height={48}
                  className="h-12 w-auto"
                />
              ) : (
                <p className="text-base font-semibold text-slate-900">
                  {currentUser.organization}
                </p>
              )}
            </div>
            <p className="text-sm text-slate-500">{currentUser.orgDescription}</p>
          </>
        }
        preferencesTitle={t("profile.sections.preferences")}
        preferencesContent={
          <div className="w-[160px]">
            <Select
              label={t("profile.settings.language")}
              labelPlacement="inside"
              selectedKeys={[locale]}
              onSelectionChange={(keys) => {
                const [key] = Array.from(keys);
                if (key) {
                  setLocale(String(key));
                }
              }}
              radius="md"
            >
              <SelectItem key="de">{t("login.language.de")}</SelectItem>
              <SelectItem key="en">{t("login.language.en")}</SelectItem>
            </Select>
          </div>
        }
      />

      <Modal isOpen={unsavedDialog.isOpen} onOpenChange={unsavedDialog.onOpenChange} size="sm">
          <ModalContent className="!w-auto max-w-fit">
            {(onClose) => (
              <>
                <ModalHeader className="text-base font-semibold text-slate-900">
                  {t("profile.unsaved.title")}
                </ModalHeader>
                <ModalBody>
                  <p className="text-sm text-slate-600">{t("profile.unsaved.body")}</p>
                </ModalBody>
                <ModalFooter className="flex items-center gap-10">
                  <Button
                    variant="bordered"
                    radius="full"
                    onPress={() => {
                      skipBeforeUnloadRef.current = true;
                      onClose();
                      performNavigation(pendingNavigation);
                      setPendingNavigation(null);
                      setTimeout(() => {
                        skipBeforeUnloadRef.current = false;
                      }, 0);
                    }}
                  >
                    {t("profile.unsaved.doNotSave")}
                  </Button>
                  <div className="h-10 w-10" />
                  <div className="ml-auto flex items-center gap-3">
                    <Button
                      variant="bordered"
                      radius="full"
                      onPress={() => {
                        setPendingNavigation(null);
                        onClose();
                      }}
                    >
                      {t("profile.unsaved.cancel")}
                    </Button>
                    <Button
                      color="primary"
                      radius="full"
                      onPress={() => {
                        saveProfileChanges();
                        skipBeforeUnloadRef.current = true;
                        onClose();
                        performNavigation(pendingNavigation);
                        setPendingNavigation(null);
                        setTimeout(() => {
                          skipBeforeUnloadRef.current = false;
                        }, 0);
                      }}
                    >
                      {t("profile.actions.save")}
                    </Button>
                  </div>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>



    </div>
  );
}
