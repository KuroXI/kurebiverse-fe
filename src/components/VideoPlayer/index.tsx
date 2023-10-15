import { Box, CircularProgress } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import axios from "../../api/axios";
import "vidstack/styles/defaults.css";
import "vidstack/styles/community-skin/video.css";
import {MediaCommunitySkin, MediaOutlet, MediaPlayer} from "@vidstack/react";
import { useGetAnimeEpisodesQuery } from "@/redux/services/animeapi.ts";
import { PlayArrow } from "@mui/icons-material";
import {proxyImage} from "@/lib/utils.ts";

const VideoPlayer = () => {
  const { animeId } = useParams();
  const { data, isLoading } = useGetAnimeEpisodesQuery(animeId as string);
  const [videoUrl, setVideoUrl] = useState<string>("");

  const fetchEpisode = useCallback(() => {
    if (animeId && data) {
      const url = new URL(window.location.href);
      const episodeIdParams = new URLSearchParams(url.search).get("episode") as string;
      const episodeId = episodeIdParams || data[0].id;

      axios.get(`${import.meta.env.VITE_BASE_URL}/episode/${episodeId}`).then(({ data }) => {
        const defaultSource = data.sources.filter(
          (source: { quality: string; }) => source.quality === "default"
        );

        setVideoUrl(defaultSource[0].url);
      })
    }
  }, [animeId, data]);

  useEffect(() => {
    fetchEpisode();
    return () => setVideoUrl("");
  }, [fetchEpisode, data]);

  function onEnd() {
    console.log("video ended");
  }

  return (
    <Box className="flex max-h-[92vh] overflow-hidden">
      <Box className="w-[80vw]">
        <MediaPlayer
          key={videoUrl + Date.now()}
          aspectRatio={16 / 9}
          load={"idle"}
          crossorigin={"anonymous"}
          onEnd={onEnd}
        >
          <MediaOutlet className="relative">
            <source src={videoUrl} type={"application/x-mpegurl"}/>
          </MediaOutlet>
          <MediaCommunitySkin />
        </MediaPlayer>
      </Box>
      <Box className="w-[20vw] overflow-y-scroll p-5">
        {isLoading ? (
          <div className={"justify-center flex mb-10"}>
            <CircularProgress />
          </div>
        ) : (
          data &&
          [...data]?.reverse()?.map((episode, index) => {
            return (
              <Link
                key={episode.title}
                to={`/watch/${animeId}?episode=${episode.id}`}
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                  })
                }
                className="text-white flex-grow-1 pl-3"
              >
                <Box
                  sx={{
                    display: "flex",
                    position: "relative",
                    alignItems: "center",
                    marginBottom: "10px",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      "& .play-arrow": {
                        visibility: "visible",
                      },
                      "& img": {
                        opacity: 0.7,
                      },
                    },
                  }}
                >
                  <img
                    src={proxyImage(episode.image)}
                    alt={episode.title}
                    className="w-[150px] mr-3 transition-opacity duration-300"
                  />
                  <p className="text-[#bebcbc] text-md flex justify-center items-center">
                    <span className="font-bold text-xl mr-3">{index + 1}</span>{" "}
                    <span className="font-bold text-sm text-[#8b8b8b] w-32">
                      {episode.title}
                    </span>
                  </p>
                  <PlayArrow
                    className="play-arrow"
                    sx={{
                      color: "white",
                      position: "absolute",
                      left: 48,
                      visibility: "hidden",
                      fontSize: "50px",
                    }}
                  />
                </Box>
              </Link>
            );
          })
        )}
      </Box>
    </Box>
  );
};

export { VideoPlayer };
