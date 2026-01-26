"use client";

export default function CardBg({
  title,
  headerContent,
  children,
  className = "",
  bodyClassName = "",
  headerWrapperClassName = "px-6 pt-5 pb-8",
  contentWrapperClassName = "px-6 pb-6",
  contentClassName = "space-y-4",
  headerClassName = "flex flex-wrap items-center justify-between gap-5",
  titleClassName = "text-lg font-medium text-slate-900",
  showBackground = true,
  showShadow = true,
  rounded = "xl",
  ...props
}) {
  const roundedClassName =
    {
      none: "",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
    }[rounded] || "";
  const baseClasses = [
    showBackground ? "bg-white" : "bg-transparent",
    showShadow ? "shadow-[0_1px_3px_theme(colors.slate.900/0.06)]" : "",
    roundedClassName,
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const hasHeader = Boolean(title) || Boolean(headerContent);

  return (
    <div className={baseClasses} {...props}>
      <div className={bodyClassName}>
        {hasHeader ? (
          <div className={headerWrapperClassName}>
            <div className={headerClassName}>
              {title ? <h2 className={titleClassName}>{title}</h2> : null}
              {headerContent ? <div>{headerContent}</div> : null}
            </div>
          </div>
        ) : null}
        <div className={contentWrapperClassName}>
          <div className={contentClassName}>{children}</div>
        </div>
      </div>
    </div>
  );
}
