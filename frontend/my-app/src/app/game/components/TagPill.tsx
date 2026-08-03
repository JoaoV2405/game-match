interface TagPillProps {
  label: string;
  variant?: "genre" | "platform"| "company";
}

const variantStyles: Record<string, string> = {
  company: "bg-cotton-candy-400/15 text-cotton-candy-400 border border-cotton-candy-200/20",
  platform: "bg-midnight-violet-200/15 text-midnight-violet-200 border border-midnight-violet-200/20",
  genre: "bg-brilliant-rose-300/15 text-brilliant-rose-300 border border-brilliant-rose-300/20",
};

export function TagPill({ label, variant = "genre" }: TagPillProps) {
  return (
    <span
      className={`inline-block text-xs font-medium px-3 py-1 mx-0.5 rounded-full ${variantStyles[variant]}`}
    >
      {label}
    </span>
  );
}
