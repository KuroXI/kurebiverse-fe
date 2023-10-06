import { useCallback, useEffect, useState } from "react";
import axios from "@/api/axios";
import { VideoPlayer } from "@/components";
import {
  useGetAnimeEpisodesQuery,
  useGetAnimeInfoQuery,
} from "@/redux/services/animeapi";
import { AnimeStream } from "@/type/AnimeStream";
import { Box, CircularProgress } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import EpisodeLinks from "./components/EpisodeLinks";
import { cleanDescription } from "@/lib/utils";

const WatchPage = () => {
  const { animeId } = useParams();
  const { data, isLoading } = useGetAnimeEpisodesQuery(animeId as string);
  const { data: animeInfoData, isLoading: animeInfoDataLoading } =
    useGetAnimeInfoQuery(animeId as string);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const location = useLocation();

  const episodeIdParams =
    new URLSearchParams(location.search).get("episodeId") ||
    (data && data[0]?.id);

  const pageNumberParams =
    new URLSearchParams(location.search).get("page") || 1;

  const episodeNumberParams =
    new URLSearchParams(location.search).get("episodeNumber") || 1;

  const fetchEpisode = useCallback(
    async (episodeId: string) => {
      if (animeId && episodeId) {
        const response = await axios.get(`/episode/${episodeId}`);
        const responseData: AnimeStream = await response.data;
        const defaultSource = responseData.sources.find(
          (source: { quality: string }) => source.quality === "default"
        );

        setVideoUrl(defaultSource?.url || "");
      }
    },
    [animeId]
  );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (episodeIdParams) {
      fetchEpisode(episodeIdParams);
    }
    return () => setVideoUrl("");
  }, [location, episodeIdParams, fetchEpisode]);

  if (isLoading && animeInfoDataLoading) {
    return (
      <div className="justify-center flex mb-10">
        <CircularProgress />
      </div>
    );
  }

  return (
    <Box className="flex flex-col lg:flex-row justify-between p-5 min-h-[100vh]">
      <Box className="w-full flex flex-col">
        <VideoPlayer key={videoUrl + Date.now()} videoUrl={videoUrl} />
        {animeInfoData && (
          <Box className="flex mt-5">
            <Box className="mr-5">
              <img
                src={animeInfoData.coverImage?.extraLarge as string}
                alt="animeImage"
                className="object-cover object-center min-h-[210px] min-w-[150px] max-h-[210px] max-w-[150px]"
                loading="lazy"
              />
            </Box>
            <Box>
              <Box>
                <h1 className="text-3xl font-bold">
                  {animeInfoData.title.romaji}
                </h1>
                <p className="text-[#8B8B8B] mt-3">
                  {cleanDescription(animeInfoData.description as string)}
                </p>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
      <Box className="w-full mt-10 lg:w-[40%] lg:px-5 lg:mt-0">
        <div>
          <EpisodeLinks
            data={data}
            animeId={animeId}
            currentPageNumber={Number(pageNumberParams)}
            dataIsLoading={isLoading}
            episodeNumber={Number(episodeNumberParams)}
          />
        </div>
      </Box>
    </Box>
  );
};

export { WatchPage };
