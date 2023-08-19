import {
  useGetAnimeInfoQuery,
  useGetAnimeStreamingLinksQuery,
} from "../redux/services/animeapi";

export const useGetStreams = ({ animeId }: { animeId: string }) => {
  const { data: animeData } = useGetAnimeInfoQuery(animeId);
  const { data, isLoading } = useGetAnimeStreamingLinksQuery(animeData!.episodes[0].id);

  return { data, isLoading };
};
