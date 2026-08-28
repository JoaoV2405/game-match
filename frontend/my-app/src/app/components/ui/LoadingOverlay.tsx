import { LoaderCircle } from "lucide-react";

export type LinkLoadingIndicatorProps = {
  name?: string;
};
export function LoadingOverlay({
  name = "a página",
}: {
  name?: string;
}) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-ink-950/70 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <LoaderCircle className="h-12 w-12 animate-spin text-cotton-candy-200" />

        <span className="text-sm text-gray-300">
          Carregando {name}...
        </span>
      </div>
    </div>
  );
}