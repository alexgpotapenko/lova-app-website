"use client";

import type { CSSProperties, ReactNode } from "react";

type LandingButtonProps = {
  href: string;
  label: ReactNode;
  variant?: "primary" | "secondary";
  size?: "default" | "compact";
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export default function LandingButton({
  href,
  label,
  variant = "secondary",
  size = "default",
  leadingIcon,
  trailingIcon,
  className = "",
  style,
}: LandingButtonProps) {
  const base =
    "landing-btn inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/70 no-underline";
  const sizeClass =
    size === "compact" ? "px-3 py-2 text-sm" : "px-5 py-3 text-base";
  const styles =
    variant === "primary"
      ? "bg-lova-blue text-white hover:bg-lova-blue-700 hover:text-white"
      : "bg-white/90 text-slate-900 hover:bg-white";

  return (
    <a href={href} className={`${base} ${sizeClass} ${styles} ${className}`.trim()} style={style}>
      {leadingIcon ? <span aria-hidden>{leadingIcon}</span> : null}
      <span className="text-center">{label}</span>
      {trailingIcon ? <span aria-hidden>{trailingIcon}</span> : null}
    </a>
  );
}
