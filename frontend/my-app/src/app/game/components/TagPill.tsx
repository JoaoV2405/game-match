interface TagPillProps {
  label: string;
  variant?: "genre" | "platform"| "company";
}

const variantStyles: Record<string, string> = {
  genre: "bg-violet-100 text-violet-700 border border-violet-200",
  platform: "bg-indigo-50 text-indigo-700 border border-indigo-200",
  company: "bg-blue-50 text-blue-700 border border-blue-200",
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
