import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function HomeButton() {
return(

<Link
                href="/"
                className="
                    inline-flex items-center gap-2
                    rounded-xl
                    border border-violet-300/30
                    bg-transparent
                    px-4 py-2
                    text-base font-medium
                    text-white
                    backdrop-blur-sm
                    transition-all
                    hover:bg-violet-700/90
                    mb-4
                    
                "
                >
                <ArrowLeft size={20} />
                Voltar para Home
                </Link>

)}
