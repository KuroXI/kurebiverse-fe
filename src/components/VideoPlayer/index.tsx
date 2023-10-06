import { MediaCommunitySkin, MediaOutlet, MediaPlayer } from "@vidstack/react";
import "vidstack/styles/defaults.css";
import "vidstack/styles/community-skin/video.css";

const VideoPlayer = ({ videoUrl }: { videoUrl: string }) => {
  const onEnd = () => {
    console.log("video ended");
  };

  return (
    <MediaPlayer
      aspectRatio={16 / 9}
      load={"idle"}
      crossorigin={"anonymous"}
      onEnd={onEnd}
      autoplay={true}
    >
      <MediaOutlet className="relative">
        <source src={videoUrl} type={"application/x-mpegurl"} />
      </MediaOutlet>
      <MediaCommunitySkin />
    </MediaPlayer>
  );
};

export { VideoPlayer };
