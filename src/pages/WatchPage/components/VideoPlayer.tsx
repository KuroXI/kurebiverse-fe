import { MediaCommunitySkin, MediaOutlet, MediaPlayer } from "@vidstack/react";
import "vidstack/styles/defaults.css";
import "vidstack/styles/community-skin/video.css";
import { IEpisode, ISource } from "@/type/Anime";

type VideoPlayerProps = {
  episode: IEpisode;
  source: ISource;
};

export const VideoPlayer = ({ episode, source }: VideoPlayerProps) => {
  return (
    <MediaPlayer
      aspectRatio={16 / 9}
      load={"idle"}
      crossorigin={"anonymous"}
      title={episode.title}
    >
      <MediaOutlet className="relative">
        <source
          src={
            source.sources.find((source) => source.quality === "default")
              ?.url ?? source.sources[0].url
          }
          type={"application/x-mpegurl"}
        />
      </MediaOutlet>
      <MediaCommunitySkin />
    </MediaPlayer>
  );
};
