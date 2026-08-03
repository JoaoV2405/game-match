import { ReactNode } from "react";

interface GameHeroProps {
  children: ReactNode;
}
export function HeroLayout({ children }: GameHeroProps) {
  return (
    
    <section
      className="
        relative
        z-20
        isolate
        flex
        min-h-[500px]
        items-center
        justify-center
        overflow-visible
        px-4
        pb-20
        pt-16
      "
    >
      {/* Forma decorativa esquerda */}
      <div
        className="
          pointer-events-none
          absolute
          -left-24
          top-20
          h-80
          w-80
          rotate-12
          rounded-[40%]
          border
          border-white/10
          bg-gradient-to-br
          from-cotton-candy-500/20
          to-brilliant-rose-500/5
          blur-[1px]
          overflow-hidden
        "
      />

      {/* Forma decorativa direita */}
      <div
  className="
    pointer-events-none
    absolute
    inset-y-0
    right-0
    w-72
    overflow-hidden
  "
>
  <div
    className="
      absolute
      -right-20
      bottom-4
      h-72
      w-72
      -rotate-12
      rounded-[35%]
      border
      border-white/10
      bg-gradient-to-br
      from-midnight-violet-200/15
      to-cotton-candy-500/20
    "
  />
</div>

      {/* Linhas diagonais */}
      <div
        className="
          pointer-events-none
          absolute
          right-[12%]
          top-20
          hidden
          rotate-12
          gap-3
          opacity-40
          lg:flex
        "
      >
        <span className="h-28 w-2 rounded-full bg-cotton-candy-200/40 overflow-hidden" />
        <span className="mt-8 h-20 w-2 rounded-full bg-brilliant-rose-300/30 overflow-hidden" />
        <span className="mt-3 h-36 w-2 rounded-full bg-midnight-violet-200/30 overflow-hidden" />
      </div>
      {children}
      
      
    </section>
  );
}
