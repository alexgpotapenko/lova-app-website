"use client";

import type { ReactNode } from "react";

type LandingButtonProps = {
  href: string;
  label: ReactNode;
  variant?: "primary" | "secondary";
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  className?: string;
};

export default function LandingButton({
  href,
  label,
  variant = "secondary",
  leadingIcon,
  trailingIcon,
  className = "",
}: LandingButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-base font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/70";
  const styles =
    variant === "primary"
      ? "bg-lova-blue text-white hover:bg-lova-blue/90"
      : "bg-white/90 text-slate-900 hover:bg-white";

  return (
    <a href={href} className={`${base} ${styles} ${className}`.trim()}>
      {leadingIcon ? <span aria-hidden>{leadingIcon}</span> : null}
      <span className="text-center leading-tight">{label}</span>
      {trailingIcon ? <span aria-hidden>{trailingIcon}</span> : null}
    </a>
  );
}
