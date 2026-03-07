import {
  CalendarCheck,
  CreditCard,
  FileArrowDown,
  Key,
} from "@phosphor-icons/react/ssr";

type BentoCardProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  items?: string[];
  tone?: "slate" | "blue" | "green" | "purple" | "orange";
  accent?: "slate" | "blue" | "green" | "purple" | "orange";
  icon?: "key" | "card" | "calendar" | "docArrowDown";
  featured?: boolean;
  className?: string;
};

export default function BentoCard({
  eyebrow,
  title,
  description,
  items,
  tone = "slate",
  accent = "slate",
  icon,
  featured = false,
  className = "",
}: BentoCardProps) {
  const accentStyles: Record<NonNullable<BentoCardProps["accent"]>, string> = {
    slate: "text-slate-700 bg-slate-100",
    blue: "text-lova-blue bg-lova-blue/15",
    green: "text-lova-green bg-lova-green/15",
    purple: "text-lova-purple bg-lova-purple/15",
    orange: "text-lova-orange bg-lova-orange/15",
  };

  const iconMap = {
    key: Key,
    card: CreditCard,
    calendar: CalendarCheck,
    docArrowDown: FileArrowDown,
  } as const;
  const Icon = icon ? iconMap[icon] : null;

  return (
    <article
      className={`rounded-[24px] bg-white p-5 ${featured ? "p-6 md:p-7" : ""} ${className}`}
    >
      {Icon ? (
        <div
          className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${accentStyles[accent]}`}
          aria-hidden
        >
          <Icon size={22} weight="fill" />
        </div>
      ) : null}
      {eyebrow ? (
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
          {eyebrow}
        </p>
      ) : null}
      <h3 className={`${featured ? "text-xl md:text-2xl" : "text-lg"} font-semibold text-slate-900`}>
        {title}
      </h3>
      {description ? (
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      ) : null}
      {items && items.length > 0 ? (
        <ul className="mt-3 space-y-2.5">
          {items.map((item) => (
            <li key={item} className="flex gap-2 text-sm leading-6 text-slate-700">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
