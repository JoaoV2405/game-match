import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface HomeButtonProps {
  variant?: "dark" | "light" | "solid";

  label?: string;
}
export function HomeButton({
  variant = "dark",
  label = "Voltar para Home",
}: HomeButtonProps) {
    const variantClasses = {
    dark: `
      border-cotton-candy-100/30
      bg-transparent
      text-white
      hover:bg-brilliant-rose-700/80
      absolute left-6 top-6 z-30
    `,
    light: `
      border-cotton-candy-200
      bg-white
      text-ink-900
      shadow-md
      hover:bg-cotton-candy-50
    `,
    solid: `
      border-cotton-candy-500
      bg-cotton-candy-500
      text-white
      shadow-md
      hover:bg-brilliant-rose-500
      relative
    `,
  };
  return (
    <Link
      href="/"
      className={`
                    inline-flex items-center gap-2
                    rounded-xl
                    border border-cotton-candy-100/30
                    bg-transparent
                    px-4 py-2
                    text-base font-medium
                    text-white
                    backdrop-blur-sm
                    transition-all
                    hover:bg-brilliant-rose-700/80     
                    ${variantClasses[variant]}`}
    >
      <ArrowLeft size={20} />
      {label}
    </Link>
  );
}
