
import {
  FaSteam,
  FaPlaystation,
} from "react-icons/fa";
import { BsNintendoSwitch } from "react-icons/bs";
import {
  SiEpicgames,
} from "react-icons/si";
import { GameWebsiteDto } from "@/app/types/game";
import { Globe } from "lucide-react";

const WEBSITES_CONFIG: Record<
  number,
  { label: string; color: string; bg: string; icon: React.ReactNode }
> = {
  1: {
    label: "Official Page",
    color: "#c6d4df",
    bg: "#1b2838",
    icon: (
      <Globe className="w-5 h-5"/>
    ),
  },
  13: {
    label: "Steam",
    color: "#c6d4df",
    bg: "#1b2838",
    icon: (
      <FaSteam className="w-5 h-5"/>
    ),
  },
  16: {
    label: "Epic Games",
    color: "#ffffff",
    bg: "#2a2a2a",
    icon: (
      <SiEpicgames className="w-5 h-5"/>
    ),
  },
  23: {
    label: "PlayStation",
    color: "#ffffff",
    bg: "#003087",
    icon: (
      <FaPlaystation className="w-5 h-5"/>
    ),
  },
  24: {
    label: "Nintendo",
    color: "#ffffff",
    bg: "#E4000F",
    icon: (
      <BsNintendoSwitch className="w-5 h-5" color="white"/>
    ),
  },
};

interface PlatformBoxProps {
  platforms: GameWebsiteDto[];
}

export function PlatformBox({ platforms }: PlatformBoxProps) {
  return (
    <div className="rounded-2xl border border-violet-200 bg-white shadow-md p-5 flex flex-col gap-4">
      <h3 className="text-sm font-semibold uppercase tracking-widest text-violet-400">
        Disponível em
      </h3>
      <div className="flex flex-col gap-3">
        {platforms.map((p) => {
            const cfg = WEBSITES_CONFIG[p.website_type];

            return (
              <a
                key={p.website_type}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl px-4 py-3 hover:scale-[1.02] cursor-pointer transition-all hover:shadow-lg"
                style={{ backgroundColor: cfg.bg, color: cfg.color }}
              >
                <span>{cfg.icon}</span>
                <span className="text-sm font-semibold">{cfg.label}</span>
              </a>
            );
          })}
      </div>
    </div>
  );
}
