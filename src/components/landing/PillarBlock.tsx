type PillarBlockProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  bullets: string[];
};

export default function PillarBlock({
  icon,
  title,
  description,
  bullets,
}: PillarBlockProps) {
  return (
    <article className="rounded-[24px] bg-white px-5 py-5">
      <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-black">{title}</h3>
      <p className="mt-2 h-body-base">{description}</p>
      <ul className="mt-3 space-y-2.5">
        {bullets.map((item) => (
          <li key={item} className="flex gap-2.5 h-body-base">
            <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
