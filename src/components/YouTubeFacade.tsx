'use client';

import { useState } from 'react';

type YouTubeFacadeProps = {
  videoId: string;
  videoTitle: string;
  playLabel: string;
};

export function YouTubeFacade({
  videoId,
  videoTitle,
  playLabel,
}: YouTubeFacadeProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <div className="border-hairline aspect-video w-full overflow-hidden rounded-lg border">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
          title={videoTitle}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsPlaying(true)}
      aria-label={playLabel}
      className="border-hairline group relative aspect-video w-full overflow-hidden rounded-lg border"
    >
      <img
        src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
        alt=""
        className="h-full w-full object-cover"
        loading="lazy"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/35 transition-colors group-hover:bg-black/45">
        <span className="border-mute bg-fg/[0.06] text-fg-bright group-hover:border-fg-dim group-hover:bg-fg/[0.1] flex h-16 w-16 items-center justify-center rounded-full border backdrop-blur-sm transition-colors">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="ml-1"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
