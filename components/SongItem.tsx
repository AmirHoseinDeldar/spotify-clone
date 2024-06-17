"use client";
import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import React from "react";

interface SongItemProps {
  data: Song;
  onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
  const imagePath = useLoadImage(data);

  return (
    <div
      onClick={() => onClick(data.id)}
      className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5  hover:bg-neutral-400/10 transition p-3"
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image
          loading="eager"
          className="object-cover"
          src={imagePath || "/images/liked.png"}
          fill
          alt="image"
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="w-full truncate font-semibold">{data.title}</p>
        <p className="text-sm text-neutral-400 pb-4 w-full truncate">
          توسط {data.author}
        </p>
      </div>
      <div className="absolute bottom-24 right-5">
        {/* <PlayButton /> */}
      </div>
    </div>
  );
};

export default SongItem;
