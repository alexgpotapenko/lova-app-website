"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  addToast,
  Avatar,
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
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
import { Check, Prohibit, SignOut, Swap, UserMinus } from "@phosphor-icons/react";
import CardBg from "@/components/CardBg";
import ChangePasswordDialog from "@/components/ChangePasswordDialog";
import ProfileTemplate from "@/components/ProfileTemplate";
import ScreenTitleBar from "@/components/ScreenTitleBar";
import { getLocale, setLocale, subscribeLocale, t } from "@/i18n";
import { logout } from "@/lib/auth";
import {
  currentUser,
  getUserById,
  subscribeUsers,
  updateUserAvatar,
  updateUserProfile,
  updateUserRole,
} from "@/lib/mockAdmin";

export default function UserDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const userId = typeof params?.userId === "string" ? params.userId : "";

  const avatarInputRef = useRef(null);
  const [locale, setLocaleState] = useState(getLocale());
  const [user, setUser] = useState(() => getUserById(userId));
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [passwordValue, setPasswordValue] = useState("");
  const [touchedFields, setTouchedFields] = useState({
    firstName: false,
    lastName: false,
    email: false,
  });
  const skipBeforeUnloadRef = useRef(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [avatarDraft, setAvatarDraft] = useState(undefined);
  const [avatarDraftIsObjectUrl, setAvatarDraftIsObjectUrl] = useState(false);
  
  const resolvedUser = useMemo(() => user, [user]);
  const isAdmin = currentUser.role === "admin";
  const isSelf = currentUser.id === userId;
  const deactivateDialog = useDisclosure();
  const deleteDialog = useDisclosure();
  const unsavedDialog = useDisclosure();
  const [pendingNavigation, setPendingNavigation] = useState(null);
  const organizationLogo = "/brand/logo-meteoswiss.png";
  const canEdit = isAdmin;

  useEffect(() => subscribeLocale(setLocaleState), []);
  useEffect(() => {
    setUser(getUserById(userId));
    return subscribeUsers((nextUsers) => {
      setUser(nextUsers.find((entry) => entry.id === userId));
    });
  }, [userId]);

  useEffect(() => {
    if (!resolvedUser) {
      return;
    }
    setFormValues({
      firstName: resolvedUser.firstName ?? "",
      lastName: resolvedUser.lastName ?? "",
      email: resolvedUser.email ?? "",
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
  }, [resolvedUser]);

  const handleAvatarUpload = (event, targetId) => {
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

  const handleProfileChange = (targetId, field) => (event) => {
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

  const saveProfileChanges = (targetId) => {
    updateUserProfile(targetId, {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
    });
    setPasswordValue("");
    setOldPassword("");
    setNewPassword("");
    if (avatarDraft !== undefined) {
      updateUserAvatar(targetId, avatarDraft);
      setAvatarDraft(undefined);
      setAvatarDraftIsObjectUrl(false);
    }
    addToast({
      title: t("profile.toast.saved"),
      severity: "success",
    });
  };

  const isDirty =
    formValues.firstName !== (resolvedUser?.firstName ?? "") ||
    formValues.lastName !== (resolvedUser?.lastName ?? "") ||
    formValues.email !== (resolvedUser?.email ?? "") ||
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

  const displayAvatar = avatarDraft !== undefined ? avatarDraft : resolvedUser?.avatar;

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

  if (!isAdmin) {
    return (
      <div className="space-y-6">
        <ScreenTitleBar
          title={t("administration.userDetails.title")}
          showBack
          onBackPress={() => handleNavigationAttempt({ type: "back" })}
        />
        <CardBg>
          <p className="text-sm text-slate-600">{t("administration.restricted")}</p>
        </CardBg>
      </div>
    );
  }

  if (!resolvedUser) {
    return (
      <div className="space-y-6">
        <ScreenTitleBar
          title={t("administration.userDetails.title")}
          showBack
          onBackPress={() => handleNavigationAttempt({ type: "back" })}
        />
        <CardBg>
          <p className="text-sm text-slate-600">{t("administration.userDetails.notFound")}</p>
        </CardBg>
      </div>
    );
  }

  if (isSelf) {
    const profileUser = resolvedUser || currentUser;

    return (
      <div>
        <ScreenTitleBar
          title={profileUser.name}
          showBack
          primaryLabel={t("profile.actions.logout")}
          primaryVariant="bordered"
          primaryColor="default"
          primaryStartContent={<SignOut size={18} weight="fill" />}
          onPrimaryPress={() => handleNavigationAttempt({ type: "logout" })}
          onBackPress={() => handleNavigationAttempt({ type: "back" })}
        />

        <ProfileTemplate
          personalTitle={t("profile.sections.personal")}
          personalContent={
            <div className="flex w-full flex-col gap-6">
              <div className="flex items-center gap-4">
                <Avatar
                  name={profileUser.name}
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
                  onChange={(event) => handleAvatarUpload(event, profileUser.id)}
                />
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <Input
                  label={t("profile.firstName")}
                  labelPlacement="inside"
                  value={formValues.firstName}
                  onChange={handleProfileChange(profileUser.id, "firstName")}
                  onBlur={() =>
                    setTouchedFields((current) => ({ ...current, firstName: true }))
                  }
                  isInvalid={Boolean(firstNameError)}
                  errorMessage={firstNameError}
                  radius="md"
                  isDisabled={!canEdit}
                />
                <Input
                  label={t("profile.lastName")}
                  labelPlacement="inside"
                  value={formValues.lastName}
                  onChange={handleProfileChange(profileUser.id, "lastName")}
                  onBlur={() =>
                    setTouchedFields((current) => ({ ...current, lastName: true }))
                  }
                  isInvalid={Boolean(lastNameError)}
                  errorMessage={lastNameError}
                  radius="md"
                  isDisabled={!canEdit}
                />
                <Input
                  label={t("profile.email")}
                  labelPlacement="inside"
                  value={formValues.email}
                  onChange={handleProfileChange(profileUser.id, "email")}
                  onBlur={() =>
                    setTouchedFields((current) => ({ ...current, email: true }))
                  }
                  isInvalid={Boolean(emailError)}
                  errorMessage={emailError}
                  radius="md"
                  isDisabled={!canEdit}
                />
                <Input
                  label={t("profile.password")}
                  labelPlacement="inside"
                  type="password"
                  value={passwordValue}
                  onChange={(event) => setPasswordValue(event.target.value)}
                  placeholder="••••••••••••"
                  radius="md"
                  isDisabled={!canEdit}
                  endContent={
                    canEdit ? (
                      <ChangePasswordDialog
                        triggerLabel={t("profile.passwordChange")}
                        labelPlacement="outside"
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
                  color={canEdit && isDirty ? "primary" : "default"}
                  radius="full"
                  className={`mt-0 ${canEdit && isDirty ? "" : "text-slate-700 border-slate-300"}`}
                  isDisabled={!canEdit || !isDirty || !isFormValid}
                  variant={canEdit && isDirty ? "solid" : "bordered"}
                  onPress={() => {
                    setTouchedFields({ firstName: true, lastName: true, email: true });
                    if (!isFormValid) {
                      return;
                    }
                    saveProfileChanges(profileUser.id);
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
                color={profileUser.role === "admin" ? "secondary" : "default"}
                variant="flat"
                size="md"
              >
                {t(`administration.users.role.${profileUser.role}`)}
              </Chip>
              <Chip
                color={profileUser.status === "active" ? "success" : "danger"}
                variant="flat"
                size="md"
              >
                {t(
                  `administration.users.status.${
                    profileUser.status === "active" ? "active" : "deactivated"
                  }`
                )}
              </Chip>
            </div>
          }
          statusMetaItems={[
            {
              key: "memberSince",
              label: t("administration.userDetails.memberSince"),
              value: profileUser.memberSince,
            },
            {
              key: "lastActivity",
              label: t("administration.userDetails.lastActivity"),
              value: profileUser.lastActivity,
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
              labelPlacement="outside"
              selectedKeys={new Set([locale])}
              selectionMode="single"
              disallowEmptySelection
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
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="text-base font-semibold text-slate-900">
                    {t("profile.unsaved.title")}
                  </ModalHeader>
                  <ModalBody>
                    <p className="text-sm text-slate-600">{t("profile.unsaved.body")}</p>
                  </ModalBody>
              <ModalFooter className="flex flex-col items-stretch gap-10">
                <Button
                  variant="bordered"
                  radius="full"
                  onPress={() => {
                    onClose();
                    performNavigation(pendingNavigation);
                    setPendingNavigation(null);
                  }}
                >
                  {t("profile.unsaved.doNotSave")}
                </Button>
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
                    saveProfileChanges(profileUser.id);
                    onClose();
                    performNavigation(pendingNavigation);
                    setPendingNavigation(null);
                  }}
                >
                  {t("profile.actions.save")}
                </Button>
              </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>

      </div>
    );
  }

  return (
    <div>
      <ScreenTitleBar
        title={resolvedUser.name}
        showBack
        onBackPress={() => handleNavigationAttempt({ type: "back" })}
      />

      <ProfileTemplate
        personalTitle={t("profile.sections.personal")}
        personalContent={
          <div className="flex w-full flex-col gap-6">
            <div className="flex items-center gap-4">
              <Avatar
                name={resolvedUser.name}
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
                onChange={(event) => handleAvatarUpload(event, resolvedUser.id)}
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <Input
                label={t("profile.firstName")}
                labelPlacement="inside"
                value={formValues.firstName}
                onChange={handleProfileChange(resolvedUser.id, "firstName")}
                onBlur={() =>
                  setTouchedFields((current) => ({ ...current, firstName: true }))
                }
                isInvalid={Boolean(firstNameError)}
                errorMessage={firstNameError}
                radius="md"
                isDisabled={!canEdit}
              />
              <Input
                label={t("profile.lastName")}
                labelPlacement="inside"
                value={formValues.lastName}
                onChange={handleProfileChange(resolvedUser.id, "lastName")}
                onBlur={() =>
                  setTouchedFields((current) => ({ ...current, lastName: true }))
                }
                isInvalid={Boolean(lastNameError)}
                errorMessage={lastNameError}
                radius="md"
                isDisabled={!canEdit}
              />
              <Input
                label={t("profile.email")}
                labelPlacement="inside"
                value={formValues.email}
                onChange={handleProfileChange(resolvedUser.id, "email")}
                onBlur={() =>
                  setTouchedFields((current) => ({ ...current, email: true }))
                }
                isInvalid={Boolean(emailError)}
                errorMessage={emailError}
                radius="md"
                isDisabled={!canEdit}
              />
              <Input
                label={t("profile.password")}
                labelPlacement="inside"
                type="password"
                value={passwordValue}
                onChange={(event) => setPasswordValue(event.target.value)}
                placeholder="••••••••••••"
                radius="md"
                isDisabled={!canEdit}
                endContent={
                  canEdit ? (
                    <ChangePasswordDialog
                      triggerLabel={t("profile.passwordChange")}
                      labelPlacement="inside"
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
                color={canEdit && isDirty ? "primary" : "default"}
                radius="full"
                className={`mt-0 ${canEdit && isDirty ? "" : "text-slate-700 border-slate-300"}`}
                isDisabled={!canEdit || !isDirty || !isFormValid}
                variant={canEdit && isDirty ? "solid" : "bordered"}
                onPress={() => {
                  setTouchedFields({ firstName: true, lastName: true, email: true });
                  if (!isFormValid) {
                    return;
                  }
                  saveProfileChanges(resolvedUser.id);
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
              size="md"
              color={resolvedUser.role === "admin" ? "secondary" : "default"}
              variant="flat"
            >
              {t(`administration.users.role.${resolvedUser.role}`)}
            </Chip>
            <Chip
              size="md"
              color={resolvedUser.status === "active" ? "success" : "danger"}
              variant="flat"
            >
              {t(
                `administration.users.status.${
                  resolvedUser.status === "active" ? "active" : "deactivated"
                }`
              )}
            </Chip>
          </div>
        }
        statusMetaItems={[
          {
            key: "memberSince",
            label: t("administration.userDetails.memberSince"),
            value: resolvedUser.memberSince,
          },
          {
            key: "lastActivity",
            label: t("administration.userDetails.lastActivity"),
            value: resolvedUser.lastActivity,
          },
        ]}
        actionsTitle={t("administration.userDetails.actions")}
        actionsContent={
          <div className="flex flex-wrap gap-3">
            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <Button variant="bordered" radius="full" startContent={<Swap size={16} weight="fill" />}>
                  {t("administration.userDetails.changeRole")}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label={t("administration.userDetails.changeRole")}>
                <DropdownItem
                  key="regular"
                  startContent={
                    resolvedUser.role === "regular" ? (
                      <Check size={16} weight="bold" className="text-slate-500" />
                    ) : null
                  }
                  onPress={() => updateUserRole(resolvedUser.id, "regular")}
                >
                  {t("administration.users.role.regular")}
                </DropdownItem>
                <DropdownItem
                  key="admin"
                  startContent={
                    resolvedUser.role === "admin" ? (
                      <Check size={16} weight="bold" className="text-slate-500" />
                    ) : null
                  }
                  onPress={() => updateUserRole(resolvedUser.id, "admin")}
                >
                  {t("administration.users.role.admin")}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Button
              variant="bordered"
              radius="full"
              startContent={<Prohibit size={16} weight="fill" />}
              onPress={deactivateDialog.onOpen}
            >
              {t("administration.userDetails.deactivate")}
            </Button>

            <Button
              variant="bordered"
              radius="full"
              startContent={<UserMinus size={16} weight="regular" />}
              onPress={deleteDialog.onOpen}
            >
              {t("administration.userDetails.delete")}
            </Button>
          </div>
        }
      />

        {!isSelf ? (
          <Modal isOpen={deactivateDialog.isOpen} onOpenChange={deactivateDialog.onOpenChange} size="sm">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="text-base font-semibold text-slate-900">
                  {t("administration.userDetails.deactivateTitle")}
                </ModalHeader>
                <ModalBody>
                  <p className="text-sm text-slate-600">
                    {t("administration.userDetails.deactivateBody")}
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button variant="bordered" radius="full" onPress={onClose}>
                    {t("administration.userDetails.cancel")}
                  </Button>
                  <Button color="danger" radius="full" onPress={onClose}>
                    {t("administration.userDetails.deactivateConfirm")}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
          </Modal>
        ) : null}

        {!isSelf ? (
          <Modal isOpen={deleteDialog.isOpen} onOpenChange={deleteDialog.onOpenChange} size="sm">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="text-base font-semibold text-slate-900">
                  {t("administration.userDetails.deleteTitle")}
                </ModalHeader>
                <ModalBody>
                  <p className="text-sm text-slate-600">
                    {t("administration.userDetails.deleteBody")}
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button variant="bordered" radius="full" onPress={onClose}>
                    {t("administration.userDetails.cancel")}
                  </Button>
                  <Button color="danger" radius="full" onPress={onClose}>
                    {t("administration.userDetails.deleteConfirm")}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
          </Modal>
        ) : null}

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
                        saveProfileChanges(resolvedUser.id);
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
