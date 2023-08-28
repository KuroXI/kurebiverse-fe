import { Box } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "../../api/axios";
import { IEpisode } from "@kuroxi/kurebiverse-types";
import "vidstack/styles/defaults.css";
import "vidstack/styles/community-skin/video.css";
import { MediaCommunitySkin, MediaOutlet, MediaPlayer } from "@vidstack/react";

const VideoPlayer = () => {
  const { animeId } = useParams();
  const [animeData, setAnimeData] = useState<IEpisode[]>([]);
  const [videoUrl, setVideoUrl] = useState<string>("");

  const fetchEpisode = useCallback(async () => {
    if (animeId) {
      const url = new URL(window.location.href);
      const params = new URLSearchParams(url.search);
      let episodeId = "";
      if (params) {
        episodeId = params.get("episode") as string;
      }

      const responseAnimeEpisodes = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/info/${animeId}/episodes`
      );
      const dataResponseAnimeEpisodes = await responseAnimeEpisodes.data;
      setAnimeData(dataResponseAnimeEpisodes.reverse());

      if (episodeId) {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/episode/${episodeId}`
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
      } else {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/episode/${
            dataResponseAnimeEpisodes[0].id
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
    }
  }, [animeId]);

  useEffect(() => {
    fetchEpisode();
    return () => {
      setVideoUrl("");
    };
  }, [fetchEpisode, window.location.href]);

  return (
    <Box>
      <MediaPlayer
        key={videoUrl + Date.now()}
        src={videoUrl}
        aspectRatio={16 / 9}
      >
        <MediaOutlet className="relative"></MediaOutlet>
        <MediaCommunitySkin />
      </MediaPlayer>
      {animeData?.map((episode, index) => {
        return (
          <Box key={episode.title}>
            <img src={episode.image} alt={episode.title} className="" />
            <Link
              to={`/watch/${animeId}?episode=${episode.id}`}
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "smooth",
                })
              }
            >
              Watch Episode {index + 1}
            </Link>
          </Box>
        );
      })}
    </Box>
  );
};

export { VideoPlayer };
