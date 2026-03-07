import type { ReactNode } from "react";

type SectionHeaderProps = {
  title: ReactNode;
  description: ReactNode;
  className?: string;
  titleTag?: "h1" | "h2";
};

export default function SectionHeader({
  title,
  description,
  className = "",
  titleTag = "h1",
}: SectionHeaderProps) {
  const TitleTag = titleTag;

  return (
    <header className={`flex flex-col items-center text-center ${className}`.trim()}>
      <TitleTag className="max-w-[560px] text-center">{title}</TitleTag>
      <p className="mt-5 max-w-[560px] text-center text-[21px] leading-8 text-slate-600">{description}</p>
    </header>
  );
}
