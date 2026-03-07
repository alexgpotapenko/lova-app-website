type PrivacyColumnProps = {
  title: string;
  statement: string;
};

export default function PrivacyColumn({ title, statement }: PrivacyColumnProps) {
  return (
    <div className="rounded-[24px] bg-white px-4 py-4">
      <h3 className="text-base font-semibold text-black">{title}</h3>
      <p className="mt-1.5 text-sm leading-6 text-black">{statement}</p>
    </div>
  );
}
