"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  CardBody,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@heroui/react";
import { Eye, EyeSlash, SignIn } from "@phosphor-icons/react";
import { isLoggedIn, login } from "@/lib/auth";
import { getLocale, setLocale, subscribeLocale, t } from "@/i18n";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [locale, setLocaleState] = useState(getLocale());
  const [showPassword, setShowPassword] = useState(false);
  const forgotDialog = useDisclosure();

  useEffect(() => {
    if (isLoggedIn()) {
      router.replace("/");
    }
  }, [router]);

  useEffect(() => subscribeLocale(setLocaleState), []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (error && hasSubmitted) {
      setError("");
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (error && hasSubmitted) {
      setError("");
    }
  };

  const handleSubmit = (event) => {
    event?.preventDefault?.();
    setHasSubmitted(true);
    if (!email.trim() || !password) {
      setError(t("login.error"));
      return;
    }
    const success = login(email.trim(), password);
    if (success) {
      router.replace("/");
      return;
    }
    setError(t("login.error"));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="min-h-screen min-[1024px]:grid min-[1024px]:grid-cols-2">
        <div className="flex min-h-screen flex-col bg-white">
          <div className="w-full px-6 pt-6">
            <div className="flex justify-end">
              <div className="w-[80px]">
                <Select
                  aria-label={t("profile.settings.language")}
                  labelPlacement="inside"
                  selectedKeys={[locale]}
                  onSelectionChange={(keys) => {
                    const [key] = Array.from(keys);
                    if (key) {
                      setLocale(String(key));
                      setLocaleState(String(key));
                    }
                  }}
                  radius="md"
                >
                  <SelectItem key="de">DE</SelectItem>
                  <SelectItem key="en">EN</SelectItem>
                </Select>
              </div>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-[480px] px-8 pb-32">
              <div className="mb-16 space-y-4 pb-6 bg-gradient-to-r from-primary-500 to-green-500 bg-[length:100%_2px] bg-no-repeat bg-bottom">
                <Image
                  src="/brand/logo-swisens.svg"
                  alt={t("login.logoAlt")}
                  width={120}
                  height={24}
                  className="h-6 w-auto mb-3"
                  priority
                />
                <Image
                  src="/brand/logo-product.svg"
                  alt={t("login.logoAlt")}
                  width={120}
                  height={24}
                  className="h-6 w-auto"
                  priority
                />
              </div>
            <h1 className="text-2xl font-semibold text-slate-900">
              {t("login.title")}
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              {t("login.subtitle")}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
              <div className="space-y-4">
                <Input
                  type="email"
                  label={t("login.emailLabel")}
                  labelPlacement="inside"
                  value={email}
                  onChange={handleEmailChange}
                  isInvalid={hasSubmitted && Boolean(error)}
                  radius="sm"
                  name="email"
                  autoComplete="email"
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  label={t("login.passwordLabel")}
                  labelPlacement="inside"
                  value={password}
                  onChange={handlePasswordChange}
                  isInvalid={hasSubmitted && Boolean(error)}
                  radius="sm"
                  name="password"
                  autoComplete="current-password"
                  endContent={
                    <div className="flex items-center gap-1">
                      <Button
                        isIconOnly
                        variant="light"
                        radius="full"
                        size="sm"
                        onPress={() => setShowPassword((prev) => !prev)}
                        aria-label={
                          showPassword ? t("login.passwordHide") : t("login.passwordShow")
                        }
                      >
                        {showPassword ? (
                          <EyeSlash size={16} weight="bold" />
                        ) : (
                          <Eye size={16} weight="bold" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="bordered"
                        radius="full"
                        className="px-2 text-xs"
                        onPress={() => forgotDialog.onOpen()}
                      >
                        {t("login.forgotPasswordShort")}
                      </Button>
                    </div>
                  }
                />
              </div>

              {error ? (
                <Card className="border border-slate-200 bg-slate-100" shadow="none">
                  <CardBody className="py-3">
                    <p className="text-sm text-slate-700">{error}</p>
                  </CardBody>
                </Card>
              ) : null}

              <Button
                type="submit"
                onPress={handleSubmit}
                size="lg"
                radius="full"
                color="primary"
                variant="solid"
                className="mt-4"
                endContent={<SignIn size={18} weight="bold" />}
              >
                {t("login.button")}
              </Button>
            </form>
            <Modal isOpen={forgotDialog.isOpen} onOpenChange={forgotDialog.onOpenChange} size="sm">
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="text-base font-semibold text-slate-900">
                      {t("login.forgotPasswordTitle")}
                    </ModalHeader>
                    <ModalBody>
                      <p className="text-sm text-slate-600">
                        {t("login.forgotPasswordBody")}
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button variant="bordered" radius="full" onPress={onClose}>
                        {t("login.forgotPasswordClose")}
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
            </div>
          </div>
        </div>

        <div className="relative hidden min-[1024px]:block">
          <div className="absolute inset-0 bg-slate-200 bg-[url('/brand/login-bg.jpg')] bg-cover bg-center" />
        </div>
      </div>
    </div>
  );
}
