import { Song } from "@/types";
import useAuthModal from "./useAuthModal";
import { usePlayers } from "./usePlayer";
import { useUser } from "./useUser";

export const useOnPlay = (songs: Song[]) => {
  const player = usePlayers();
  const authModal = useAuthModal();
  const { user } = useUser();

  const usePlay = (id: string) => {
    if (!user) {
      return authModal.onOpen();
    }
    player.setId(id);
    player.setIds(songs.map((Song) => Song.id));
  };
  return usePlay;
};
