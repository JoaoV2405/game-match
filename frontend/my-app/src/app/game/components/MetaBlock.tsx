import {TagPill} from "./TagPill";

export function MetaBlock({
  label,
  tags,
  variant,
}: {
  label: string;
  tags: string[];
  variant: "genre" | "platform" | "company";
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 shadow-lg shadow-black/10 backdrop-blur-sm">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-cotton-candy-100 mb-3">
        {label}
      </h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <TagPill key={t} label={t} variant={variant} />
        ))}
      </div>
    </div>
  );
}
