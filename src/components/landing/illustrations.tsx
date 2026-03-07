import {
  ArrowRight,
  Bank,
  CreditCard,
  EnvelopeSimple,
  LockKey,
  MagicWand,
  User,
} from "@phosphor-icons/react/ssr";
import Image from "next/image";

const CARD_BRAND_SVGS = [
  "mastercard.svg",
  "visa.svg",
  "amex.svg",
  "discover.svg",
  "unionpay.svg",
];

export type IllustrationKey =
  | "logins-1"
  | "logins-2"
  | "cards-1"
  | "cards-2"
  | "cards-3"
  | "subscriptions-1"
  | "subscriptions-2";

export function renderIllustration(key: IllustrationKey) {
  if (key === "logins-1") {
    return (
      <div className="flex items-center justify-start">
        <div className="flex h-12 w-full items-center gap-3 rounded-full bg-lova-bg px-4 shadow-[0_0_0_3px_#fff]">
          <LockKey size={24} weight="fill" className="text-black" />
          <span className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-mono text-sm text-slate-700">
            {"<qo5?0[}nKSX1:Dl8hs-"}
          </span>
          <MagicWand size={18} weight="fill" className="text-lova-green" />
        </div>
      </div>
    );
  }

  if (key === "logins-2") {
    return (
      <div className="flex items-center justify-start">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-lova-green-100 text-lova-green shadow-[0_0_0_3px_#fff]">
              <EnvelopeSimple size={24} weight="fill" />
            </div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-lova-green-100 text-lova-green shadow-[0_0_0_3px_#fff]">
              <LockKey size={24} weight="fill" />
            </div>
          </div>
          <ArrowRight size={20} weight="bold" className="text-slate-400" />
          <div className="flex -space-x-2">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-lova-bg shadow-[0_0_0_3px_#fff]">
              <Image
                src="/features/google-g.png"
                alt="Google"
                width={24}
                height={24}
                className="h-6 w-6 object-contain"
              />
            </div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-lova-bg shadow-[0_0_0_3px_#fff]">
              <Image
                src="/features/apple-logo.png"
                alt="Apple"
                width={18}
                height={22}
                className="h-[22px] w-[18px] object-contain"
              />
            </div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-lova-bg shadow-[0_0_0_3px_#fff]">
              <Image
                src="/features/microsoft-logo.png"
                alt="Microsoft"
                width={20}
                height={20}
                className="h-5 w-5 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (key === "cards-1") {
    return (
      <div className="flex flex-wrap items-center">
        <div className="flex flex-wrap items-center -space-x-2">
          {CARD_BRAND_SVGS.map((logoFile) => (
            <Image
              key={logoFile}
              src={`/card-brands/${logoFile}`}
              alt={logoFile.replace(".svg", "")}
              width={40}
              height={36}
              className="h-9 w-auto rounded-full bg-lova-bg object-contain shadow-[0_0_0_3px_#fff]"
            />
          ))}
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-lova-bg text-sm font-semibold text-slate-500 shadow-[0_0_0_3px_#fff]">
            +5
          </div>
        </div>
      </div>
    );
  }

  if (key === "cards-2") {
    return (
      <div className="flex w-full items-center">
        <div className="flex h-12 w-full items-center gap-3 rounded-full bg-lova-bg px-4 shadow-[0_0_0_3px_#fff]">
          <Image
            src="/features/cards-2-logo.png"
            alt="Card provider"
            width={24}
            height={24}
            className="h-6 w-6 rounded-[6px] object-contain"
          />
          <span className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-mono text-sm text-slate-700">
            •••• 5678
          </span>
          <span className="inline-flex items-center rounded-full bg-lova-purple/15 px-2 py-1 text-xs font-semibold text-lova-purple">
            Virutal
          </span>
          <span className="inline-flex h-5 w-9 items-center rounded-full bg-white p-0.5">
            <span className="ml-auto h-4 w-4 rounded-full bg-lova-green" />
          </span>
        </div>
      </div>
    );
  }

  if (key === "cards-3") {
    return (
      <div className="flex items-center justify-start">
        <div className="flex -space-x-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-lova-purple-100 text-lova-purple shadow-[0_0_0_3px_#fff]">
            <Bank size={24} weight="regular" />
          </div>
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-lova-purple-100 text-lova-purple shadow-[0_0_0_3px_#fff]">
            <User size={24} weight="regular" />
          </div>
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-lova-purple-100 text-lova-purple shadow-[0_0_0_3px_#fff]">
            <CreditCard size={24} weight="regular" />
          </div>
        </div>
      </div>
    );
  }

  return null;
}
