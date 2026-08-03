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
    `,
    light: `
      border-cotton-candy-200
      bg-white
      text-midnight-violet
      shadow-md
      hover:bg-cotton-candy-50
    `,
    solid: `
      border-cotton-candy-500
      bg-cotton-candy-500
      text-white
      shadow-md
      hover:bg-brilliant-rose-500
    `,
  };
  return (
    <Link
      href="/"
      className={`
        inline-flex
        shrink-0
        items-center
        gap-2
        rounded-xl
        border
        px-3
        py-2
        text-sm
        font-medium
        backdrop-blur-sm
        transition-all
        sm:px-4
        sm:text-base
        ${variantClasses[variant]}
      `}
    >
      <ArrowLeft className="h-5 w-5 shrink-0" />
      {label}
    </Link>
  );
}
