import axiosInstance from "@/api/axios";
import { useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { EpisodeLinks } from "./components/EpisodeLinks";
import { cleanDescription } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { IAnime, IEpisode, ISource } from "@/type/Anime";
import { SpinnerIcon } from "@/components/ui/icons";
import { VideoPlayer } from "./components/VideoPlayer";

const WatchPage = () => {
  const [episode, setEpisode] = useState<IEpisode | null>(null);
  const [source, setSource] = useState<ISource | null>(null);

  const { animeId } = useParams();

  const animeEpisode = useQuery<IEpisode[], string>({
    queryKey: [`episode-${animeId}`],
    queryFn: () =>
      axiosInstance(`/info/${animeId}/episodes`).then(({ data }) => data),
  });

  const animeInfo = useQuery<IAnime, string>({
    queryKey: [`info-${animeId}`],
    queryFn: () => axiosInstance(`/info/${animeId}`).then(({ data }) => data),
  });

  const [searchParams] = useSearchParams();
  const episodeId = searchParams.get("episodeId") ?? animeEpisode.data![0].id;
  const pageNumber = searchParams.get("page") ?? 1;
  const episodeNumber = searchParams.get("episode") ?? 1;

  const fetchEpisode = useCallback(
    async (episodeId: string) => {
      if (!animeId && !episodeId) return null;

      const { data }: { data: ISource } = await axiosInstance(
        `/episode/${episodeId}`,
      );
      setEpisode(
        animeEpisode.data?.find(
          (episode) => episode.id === episodeId,
        ) as IEpisode,
      );
      setSource(data);
    },
    [animeEpisode.data, animeId],
  );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (episodeId) fetchEpisode(episodeId);
    return () => setSource(null);
  }, [episodeId, fetchEpisode, searchParams]);

  console.log(animeEpisode.data);

  return (
    <div className="flex flex-col lg:flex-row justify-between p-5 min-h-[100vh]">
      <div className="w-full flex flex-col">
        {animeInfo.isLoading && animeEpisode.isLoading ? (
          <SpinnerIcon className="h-10 w-10 animate-spin" />
        ) : (
          <VideoPlayer
            episode={episode as IEpisode}
            source={source as ISource}
          />
        )}

        {animeInfo.data && (
          <div className="md:flex mt-5 hidden">
            <div className="mr-5">
              <img
                src={animeInfo.data.coverImage?.extraLarge as string}
                alt="animeImage"
                className="object-cover object-center min-h-[210px] min-w-[150px] max-h-[210px] max-w-[150px]"
                loading="lazy"
              />
            </div>
            <div>
              <div>
                <h1 className="text-3xl font-bold">
                  {animeInfo.data.title.romaji}
                </h1>
                <p className="text-[#8B8B8B] mt-3 line-clamp-6">
                  {cleanDescription(animeInfo.data.description as string)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      {animeEpisode.data && (
        <div className="w-full mt-10 lg:w-[40%] lg:px-5 lg:mt-0">
          <EpisodeLinks
            data={animeEpisode.data}
            animeId={animeId}
            currentPageNumber={Number(pageNumber)}
            dataIsLoading={animeEpisode.isLoading}
            episodeNumber={Number(episodeNumber)}
          />
        </div>
      )}
    </div>
  );
};

export default WatchPage;
