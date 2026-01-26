"use client";

export default function MetaDataItem({ label, value, className = "" }) {
  return (
    <div className={className}>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-sm text-slate-700">{value}</p>
    </div>
  );
}
