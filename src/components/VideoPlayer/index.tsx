import { Box, Button } from "@mui/material";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useGetAnimeEpisodesQuery } from "../../redux/services/animeapi";
import axios from "../../api/axios";
import { IEpisode } from "@kuroxi/kurebiverse-types";

const VideoPlayer = () => {
  const { animeId } = useParams();
  const [animeData, setAnimeData] = useState<IEpisode[]>([]);
  const [videoUrl, setVideoUrl] = useState<string>("");

  const fetchEpisode = useCallback(async () => {
    if (animeId) {
      console.log("DONE ONCE");
      const responseAnimeEpisodes = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/info/${animeId}/episodes`
      );
      const dataResponseAnimeEpisodes = await responseAnimeEpisodes.data;
      setAnimeData(dataResponseAnimeEpisodes);

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/episode/${
          dataResponseAnimeEpisodes[dataResponseAnimeEpisodes.length - 1].id
        }`
      );

      const dataResponse = await response.data;
      const getDefault = dataResponse.sources;
      let defaultKey = "";
      for (let key in getDefault) {
        if (getDefault[key].quality === "default") {
          defaultKey = key;
        }
      }
      setVideoUrl(getDefault[defaultKey].url);
    }
  }, [animeId]);

  useEffect(() => {
    fetchEpisode();
    return () => {
      setAnimeData([]);
      setVideoUrl("");
    };
  }, [fetchEpisode]);

  return (
    <Box>
      {videoUrl.length > 0 && (
        <ReactPlayer
          url={videoUrl}
          width={"100vw"}
          height={"100vh"}
          controls={true}
        />
      )}
      {animeData?.map((episode) => {
        return (
          <Box key={episode.title}>
            <img src={episode.image} alt={episode.title} className="" />
            <Button>Watch</Button>
          </Box>
        );
      })}
    </Box>
  );
};

export { VideoPlayer };
