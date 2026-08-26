"use client";

import { useLinkStatus } from "next/link";
import { LoaderCircle } from "lucide-react";

export function LinkLoadingIndicator() {
  const { pending } = useLinkStatus();

  if (!pending) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-ink-950/70 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <LoaderCircle className="h-12 w-12 animate-spin text-cotton-candy-200" />

        <span className="text-sm text-gray-300">
          Carregando recomendações...
        </span>
      </div>
    </div>
  );
}