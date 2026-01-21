"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, Card, CardBody, Input } from "@heroui/react";
import { isLoggedIn, login } from "@/lib/auth";
import { t } from "@/i18n";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoggedIn()) {
      router.replace("/");
    }
  }, [router]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (error) {
      setError("");
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (error) {
      setError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
        <div className="flex flex-col justify-center px-8 py-10">
          <div className="mb-8">
            <Image
              src="/brand/logo.svg"
              alt={t("login.logoAlt")}
              width={96}
              height={32}
              priority
            />
          </div>

          <div className="w-full max-w-md">
            <h1 className="text-2xl font-semibold text-slate-900">
              {t("login.title")}
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              {t("login.subtitle")}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <Input
                type="email"
                label={t("login.emailLabel")}
                placeholder={t("login.emailPlaceholder")}
                value={email}
                onChange={handleEmailChange}
                isRequired
              />
              <Input
                type="password"
                label={t("login.passwordLabel")}
                placeholder={t("login.passwordPlaceholder")}
                value={password}
                onChange={handlePasswordChange}
                isRequired
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
                className="w-full bg-key-600 text-white hover:bg-key-700"
              >
                {t("login.button")}
              </Button>
              <p className="text-xs text-slate-500">{t("login.helper")}</p>
            </form>
          </div>
        </div>

        <div className="relative hidden min-[1024px]:block">
          <div className="absolute inset-0 bg-slate-200 bg-[url('/brand/login-bg.jpg')] bg-cover bg-center" />
        </div>
      </div>
    </div>
  );
}
