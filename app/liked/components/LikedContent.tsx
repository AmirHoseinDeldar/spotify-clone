"use client";
import LikeButton from "@/components/LikeButton";
import { MediaItem } from "@/components/MediaItem";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
interface LikedContentProps {
  songs: Song[];
}
const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);
  if (songs.length === 0) {
    return (
      <div className="flex flex-col w-full px-8 text-neutral-400">
        آهنگ مورد علاقه ای نیست
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-y-2 w-full p-8">
      {songs.map((song) => (
        <div className="flex items-center gap-x-4 w-full" key={song.id}>
          <div className="flex-1">
            <MediaItem data={song} />
            {/* <MediaItem data={song} onClick={(id:string)=>onPlay(id)} /> */}
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default LikedContent;
