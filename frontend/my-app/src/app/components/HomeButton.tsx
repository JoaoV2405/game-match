import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function HomeButton() {
return(
    <div className="bg-gradient-to-r from-purple-500 to-purple-900">

<Link
                href="/"
                className="
                    inline-flex items-center gap-2
                    rounded-xl
                    border border-violet-300/30
                    bg-purple-500
                    px-4 py-2
                    text-base font-medium
                    text-white
                    backdrop-blur-sm
                    transition-all
                    hover:bg-violet-700/90
                    ms-2
                    mt-1
                    mb-1
                "
                >
                <ArrowLeft size={20} />
                Voltar para Home
                </Link>
    </div>

)}
