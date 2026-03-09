import {
  ArrowRight,
  Bank,
  BellRinging,
  CaretUpDown,
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
  | "subscriptions-2"
  | "subscriptions-3";

type DonutSegment = {
  color: string;
  length: number;
  startAngleDeg: number;
};

const DONUT_RADIUS = 20;
const DONUT_STROKE_WIDTH = 4;
const DONUT_GAP_PX = 3;

/** Fixed donut segments so server and client render the same (no hydration mismatch). */
const SUBSCRIPTIONS_DONUT_SEGMENTS: DonutSegment[] = (() => {
  const circumference = 2 * Math.PI * DONUT_RADIUS;
  const effectiveGap = DONUT_GAP_PX;
  // Fixed colors and approximate portions (percent): teal, indigo, yellow, green, orange
  const parts: { color: string; portion: number }[] = [
    { color: "#14b8a6", portion: 0.21 },
    { color: "#6366f1", portion: 0.17 },
    { color: "#eab308", portion: 0.18 },
    { color: "#22c55e", portion: 0.24 },
    { color: "#f97316", portion: 0.2 },
  ];
  let currentAngle = 0;
  return parts.map(({ color, portion }) => {
    const segmentLength = Math.max(0, portion * circumference - effectiveGap);
    const segment: DonutSegment = {
      color,
      length: segmentLength,
      startAngleDeg: currentAngle,
    };
    currentAngle += portion * 360;
    return segment;
  });
})();

export function renderIllustration(key: IllustrationKey) {
  if (key === "logins-1") {
    return (
      <div className="flex items-center justify-start">
        <div className="flex h-12 w-full items-center gap-3 rounded-full bg-lova-bg px-4 shadow-[0_0_0_3px_white]">
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
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-lova-green-100 text-lova-green shadow-[0_0_0_3px_white]">
              <EnvelopeSimple size={24} weight="fill" />
            </div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-lova-green-100 text-lova-green shadow-[0_0_0_3px_white]">
              <LockKey size={24} weight="fill" />
            </div>
          </div>
          <ArrowRight size={20} weight="bold" className="text-slate-400" />
          <div className="flex -space-x-2">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-lova-bg shadow-[0_0_0_3px_white]">
              <Image
                src="/features/google-g.png"
                alt="Google"
                width={24}
                height={24}
                className="h-6 w-6 object-contain"
              />
            </div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-lova-bg shadow-[0_0_0_3px_white]">
              <Image
                src="/features/apple-logo.png"
                alt="Apple"
                width={18}
                height={22}
                className="h-[22px] w-[18px] object-contain"
              />
            </div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-lova-bg shadow-[0_0_0_3px_white]">
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
              className="h-9 w-auto rounded-full bg-lova-bg object-contain shadow-[0_0_0_3px_white]"
            />
          ))}
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-lova-bg text-sm font-semibold text-slate-500 shadow-[0_0_0_3px_white]">
            +5
          </div>
        </div>
      </div>
    );
  }

  if (key === "cards-2") {
    return (
      <div className="flex w-full items-center">
        <div className="flex h-12 w-full items-center gap-3 rounded-full bg-lova-bg px-4 shadow-[0_0_0_3px_white]">
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
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-lova-purple-100 text-lova-purple shadow-[0_0_0_3px_white]">
            <Bank size={24} weight="regular" />
          </div>
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-lova-purple-100 text-lova-purple shadow-[0_0_0_3px_white]">
            <User size={24} weight="regular" />
          </div>
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-lova-purple-100 text-lova-purple shadow-[0_0_0_3px_white]">
            <CreditCard size={24} weight="regular" />
          </div>
        </div>
      </div>
    );
  }

  if (key === "subscriptions-1") {
    return (
      <div className="flex items-center justify-start">
        <div className="inline-flex h-12 items-center gap-3 rounded-full bg-lova-bg px-4 shadow-[0_0_0_3px_white]">
          <Image
            src="/features/icloud-logo.png"
            alt="iCloud"
            width={24}
            height={24}
            className="h-6 w-6 rounded-[6px] object-cover"
          />
          <span className="inline-flex items-center gap-1 whitespace-nowrap text-sm text-slate-700">
            In 2 days: <strong>$2.99</strong>
          </span>
        </div>
      </div>
    );
  }

  if (key === "subscriptions-2") {
    return (
      <div className="flex w-full items-center">
        <div className="flex w-full items-center gap-0">
          <div className="flex h-12 min-w-0 flex-1 items-center gap-3 rounded-full bg-lova-bg px-4 shadow-[0_0_0_3px_white]">
            <Image
              src="/features/netflix-logo.png"
              alt="Netflix"
              width={24}
              height={24}
              className="h-6 w-6 rounded-[6px] object-cover"
            />
            <span className="inline-flex min-w-0 flex-1 items-center gap-1 whitespace-nowrap text-sm text-slate-700">
              <span>
                Remind before: <strong>1 week</strong>
              </span>
              <CaretUpDown size={12} weight="bold" className="text-slate-500" />
            </span>
          </div>
          <span className="-ml-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-lova-orange-100 text-lova-orange shadow-[0_0_0_3px_white]">
            <BellRinging size={24} weight="fill" />
          </span>
        </div>
      </div>
    );
  }

  if (key === "subscriptions-3") {
    return (
      <div className="flex items-center justify-start">
        <svg width="48" height="48" viewBox="0 0 48 48" aria-label="Subscription donut chart">
          {SUBSCRIPTIONS_DONUT_SEGMENTS.map((segment, idx) => (
            <circle
              key={`${segment.color}-${idx}`}
              cx="24"
              cy="24"
              r={DONUT_RADIUS}
              fill="none"
              stroke={segment.color}
              strokeWidth={DONUT_STROKE_WIDTH}
              strokeLinecap="butt"
              strokeDasharray={`${segment.length} ${2 * Math.PI * DONUT_RADIUS - segment.length}`}
              transform={`rotate(${segment.startAngleDeg - 90} 24 24)`}
            />
          ))}
        </svg>
      </div>
    );
  }

  return null;
}
