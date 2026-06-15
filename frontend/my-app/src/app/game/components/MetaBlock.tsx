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
    <div className="bg-white rounded-2xl border border-violet-100 shadow-sm p-5">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">
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