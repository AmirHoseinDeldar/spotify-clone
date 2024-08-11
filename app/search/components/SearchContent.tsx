"use client";

import { MediaItem } from "@/components/MediaItem";
import { useOnPlay } from "@/hooks/useOnPlay";
import { Song } from "@/types";
import React from "react";

interface SearchContentProps {
  songs: Song[];
}
export const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);
  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        {" "}
        چیزی یافت نشد!!
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-y-2 w-full px-6">
      {songs.map((song) => (
        <div className="flex items-center gap-x-4 w-full" key={song.id}>
          <div className="flex-1">
            <MediaItem onClick={(id: string) => onPlay(id)} data={song} />
          </div>
        </div>
      ))}
    </div>
  );
};
