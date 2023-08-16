import { Box } from "@mui/material";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { useGetStreams } from "../../hooks/useGetStreams";
import { useMemo } from "react";

const VideoPlayer = () => {
  const { animeId } = useParams();
  const { data } = useGetStreams({ animeId: animeId! });
  const videoUrl = useMemo(() => {
    let url = "";
    if (data) {
      data.sources.forEach((source) => {
        if (source.quality === "default") {
          url = source.url;
        }
      });
    }

    return url;
  }, [data]);

  return (
    <Box>
      <ReactPlayer
        url={videoUrl}
        width={"100vw"}
        height={"100vh"}
        controls={true}
      />
    </Box>
  );
};

export { VideoPlayer };
