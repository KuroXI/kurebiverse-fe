import { useCallback, useEffect, useState } from "react";
import axios from "@/api/axios";
import { VideoPlayer } from "@/components";
import {
  useGetAnimeEpisodesQuery,
  useGetAnimeInfoQuery,
} from "@/redux/services/animeapi";
import { Box, CircularProgress } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import EpisodeLinks from "./components/EpisodeLinks";
import { cleanDescription } from "@/lib/utils";

const WatchPage = () => {
  const [videoUrl, setVideoUrl] = useState<string>("");

  const { animeId } = useParams();
  const animeEpisode = useGetAnimeEpisodesQuery(animeId as string);
  const animeInfo = useGetAnimeInfoQuery(animeId as string);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const episodeId =
    searchParams.get("episodeId") ??
    (animeEpisode.data && animeEpisode.data[0].id);
  const pageNumber = searchParams.get("page") ?? 1;
  const episodeNumber = searchParams.get("episodeNumber") ?? 1;

  const fetchEpisode = useCallback(
    async (episodeId: string) => {
      if (!animeId && !episodeId) return null;

      const { data: fetchedData } = await axios.get(`/episode/${episodeId}`);
      const defaultSource = fetchedData.sources.find(
        (source: { quality: string }) => source.quality === "default",
      );

      setVideoUrl(defaultSource?.url || "");
    },
    [animeId],
  );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (episodeId) {
      fetchEpisode(episodeId);
    }
    return () => setVideoUrl("");
  }, [location, episodeId, fetchEpisode]);

  if (animeInfo.isLoading && animeEpisode.isLoading) {
    return (
      <div className="justify-center flex mb-10">
        <CircularProgress />
      </div>
    );
  }

  return (
    <Box className="flex flex-col lg:flex-row justify-between p-5 min-h-[100vh]">
      <Box className="w-full flex flex-col">
        <VideoPlayer videoUrl={videoUrl} />
        {animeInfo.data && (
          <Box className="md:flex mt-5 hidden">
            <Box className="mr-5">
              <img
                src={animeInfo.data.coverImage?.extraLarge as string}
                alt="animeImage"
                className="object-cover object-center min-h-[210px] min-w-[150px] max-h-[210px] max-w-[150px]"
                loading="lazy"
              />
            </Box>
            <Box>
              <Box>
                <h1 className="text-3xl font-bold">
                  {animeInfo.data.title.romaji}
                </h1>
                <p className="text-[#8B8B8B] mt-3 line-clamp-6">
                  {cleanDescription(animeInfo.data.description as string)}
                </p>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
      <div className="w-full mt-10 lg:w-[40%] lg:px-5 lg:mt-0">
        <EpisodeLinks
          data={animeEpisode.data}
          animeId={animeId}
          currentPageNumber={Number(pageNumber)}
          dataIsLoading={animeEpisode.isLoading}
          episodeNumber={Number(episodeNumber)}
        />
      </div>
    </Box>
  );
};

export default WatchPage;
