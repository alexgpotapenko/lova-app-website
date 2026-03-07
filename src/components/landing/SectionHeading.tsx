type SectionHeadingProps = {
  kicker: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center mx-auto" : "text-left";

  return (
    <header className={`mb-7 flex max-w-[640px] flex-col ${alignClass}`}>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-black">
        {kicker}
      </p>
      <h2 className="text-3xl font-semibold leading-tight text-black md:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-2 max-w-[560px] text-sm leading-6 text-black">{description}</p>
      ) : null}
    </header>
  );
}
