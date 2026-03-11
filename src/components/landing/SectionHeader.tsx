import type { ReactNode } from "react";

type SectionHeaderProps = {
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  titleTag?: "h1" | "h2";
  style?: React.CSSProperties;
};

export default function SectionHeader({
  title,
  description,
  className = "",
  titleTag = "h1",
  style,
}: SectionHeaderProps) {
  const TitleTag = titleTag;

  return (
    <header
      className={`mb-[128px] flex flex-col items-center text-center ${className}`.trim()}
      style={style}
    >
      <TitleTag className="max-w-[560px] text-center">
        {typeof title === "string" && !/[.!?]$/.test(title.trimEnd())
          ? `${title.trimEnd()}.`
          : title}
      </TitleTag>
      {description != null && (
        <p className="mt-5 max-w-[560px] text-center text-[21px] leading-8 text-slate-600">{description}</p>
      )}
    </header>
  );
}
