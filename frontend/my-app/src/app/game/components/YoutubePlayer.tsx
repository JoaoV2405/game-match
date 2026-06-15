"use client";
// YoutubePlayer.tsx
// Marked "use client" because it renders a browser iframe.
// Perfectly safe to use inside a Server Component parent.

interface YoutubePlayerProps {
  videoId: string;
  className?: string;
}

export default function YoutubePlayer({ videoId, className = "" }: YoutubePlayerProps) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl ${className}`}
      style={{ paddingTop: "56.25%" }}
    >
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
        title="Game Trailer"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
