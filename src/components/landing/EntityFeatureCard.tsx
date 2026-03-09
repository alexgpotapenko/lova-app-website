import type { ReactNode } from "react";

type EntityFeatureCardProps = {
  title: string;
  description: string;
  illustration?: ReactNode;
};

export default function EntityFeatureCard({
  title,
  description,
  illustration,
}: EntityFeatureCardProps) {
  const hasIllustration = Boolean(illustration);

  return (
    <article className="overflow-hidden rounded-[24px] bg-white">
      {hasIllustration ? <div className="p-6">{illustration}</div> : null}
      <div className={hasIllustration ? "px-6 pb-6 pt-0" : "p-6"}>
        <div className="flex flex-col gap-1">
          <h3 className="h-body-semibold text-black">{title}</h3>
          <p className="h-body-base">{description}</p>
        </div>
      </div>
    </article>
  );
}
