type FeatureRowProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  last?: boolean;
};

export default function FeatureRow({
  icon,
  title,
  description,
  last = false,
}: FeatureRowProps) {
  return (
    <div className={`flex gap-3 py-4 ${last ? "" : "border-b border-slate-200"}`}>
      <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-700">
        {icon}
      </div>
      <div>
        <h3 className="text-base font-medium text-black">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-black">{description}</p>
      </div>
    </div>
  );
}
