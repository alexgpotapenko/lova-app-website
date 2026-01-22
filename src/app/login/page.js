"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  CardBody,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input,
} from "@heroui/react";
import { CaretDown, Check } from "@phosphor-icons/react";
import { isLoggedIn, login } from "@/lib/auth";
import { getLocale, setLocale, subscribeLocale, t } from "@/i18n";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [locale, setLocaleState] = useState(getLocale());

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
        <div className="flex min-h-screen flex-col">
          <div className="w-full px-8 pt-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-6">
              <Image
                src="/brand/logo-swisens.svg"
                alt={t("login.logoAlt")}
                width={120}
                height={24}
                className="h-6 w-auto"
                priority
              />
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button
                  size="sm"
                  radius="sm"
                  variant="bordered"
                  className="px-3"
                  endContent={<CaretDown size={14} weight="regular" />}
                >
                  {t(`login.language.${locale}`)}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Language selector"
                className="w-32"
                onAction={(key) => {
                  if (typeof key === "string") {
                    setLocale(key);
                    setLocaleState(key);
                  }
                }}
              >
                <DropdownItem
                  key="de"
                  className="w-full px-2 py-2"
                  endContent={
                    locale === "de" ? <Check size={14} weight="bold" /> : null
                  }
                >
                  {t("login.language.de")}
                </DropdownItem>
                <DropdownItem
                  key="en"
                  className="w-full px-2 py-2"
                  endContent={
                    locale === "en" ? <Check size={14} weight="bold" /> : null
                  }
                >
                  {t("login.language.en")}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-md p-8">
              <div className="mb-16">
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
              <Input
                type="email"
                label={t("login.emailLabel")}
                value={email}
                onChange={handleEmailChange}
                isInvalid={hasSubmitted && Boolean(error)}
                radius="sm"
                name="email"
                autoComplete="email"
              />
              <Input
                type="password"
                label={t("login.passwordLabel")}
                value={password}
                onChange={handlePasswordChange}
                isInvalid={hasSubmitted && Boolean(error)}
                radius="sm"
                name="password"
                autoComplete="current-password"
              />

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
              >
                {t("login.button")}
              </Button>
            </form>
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
