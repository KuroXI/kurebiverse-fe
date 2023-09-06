import { CircularProgress } from "@mui/material";
import { useGetRandomAnimeQuery } from "@/redux/services/animeapi.ts";
import {cleanDescription, proxyImage} from "@/lib/utils.ts";
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Bookmark, PlayCircle} from "lucide-react";

export default function Hero() {
  const { data, isLoading } = useGetRandomAnimeQuery(null);

  if (data === null) window.location.reload();

  return isLoading ? (
    <header className={"relative xl:h-[80vh] lg:h-[70vh] md:h-[60vh] sm:h-[50vh] h-[40vh]"}>
      <div className="flex justify-center items-center w-full h-full">
        <CircularProgress color="success" />
      </div>
    </header>
  ) : (
    <header
      className={"relative h-[100vw] min-h-[400px] max-h-[700px]"}
      style={{
        backgroundImage: `url(${proxyImage(data?.bannerImage)})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }}>

      <div className={"absolute h-1/6 w-full pointer-events-none bg-gradient-to-t from-transparent to-background"}/>
      <div className={"absolute h-full w-2/3 pointer-events-none bg-gradient-to-l from-transparent to-background"}/>

      <div className={"flex flex-col gap-5 absolute lg:mx-20 md:mx-10 mx-5 md:top-[30%] top-[25%] md:max-w-4xl max-w-screen"}>
        <h1 className={"text-primary font-bold md:text-4xl text-3xl line-clamp-1"}>
          {data?.title.english || data?.title.userPreferred || data?.title.romaji || data?.title.native}
        </h1>
        <div className={"flex flex-wrap overflow-hidden gap-x-2 gap-y-1"}>
          {data?.genres.map((genre) => (
            <Badge variant={"secondary"} className={"font-light text-sm"}>{genre}</Badge>
          ))}
        </div>
        { data?.description && (
          <h1 className={"md:text-base text-sm md:font-normal font-light md:line-clamp-5 line-clamp-4"}>
            {cleanDescription(data?.description)}
          </h1>
        )}
        <div className={"flex md:gap-5 gap-2"}>
          <Button className={"flex gap-1 text-sm font-medium text-primary-foreground"}>
            <PlayCircle/>
            Play Now
          </Button>
          <Button variant={"secondary"} className={"flex gap-1 text-sm font-medium"}>
            <Bookmark/>
            Add Watchlist
          </Button>
        </div>
      </div>

      <div className={"h-full w-full pointer-events-none bg-gradient-to-b from-transparent via-transparent to-background"}/>
    </header>
    // <header
    //   className={"relative xl:h-[80vh] lg:h-[70vh] md:h-[60vh] sm:h-[50vh] h-[40vh] text-white object-contain"}
    //   style={{
    //     backgroundImage: `url(${proxyImage(data?.bannerImage)})`,
    //     backgroundSize: "cover",
    //     backgroundPosition: "center top",
    //   }}
    //   >
    //   <Box className="h-full w-[100vw] pointer-events-none bg-gradient-to-l z-0 absolute from-transparent to-[#141414]" />
    //   <Box className="absolute xl:pl-16 md:pl-10 sm:pl-7 pl-4 text-xl md:pt-[170px] pt-[100px]">
    //     <h2 className="font-bold xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl">{data?.title?.english}</h2>
    //     <Box className="xl:text-xl lg:text-lg md:text-md sm:text-sm text-xs">
    //       <Box className="flex gap-5 my-3">
    //         <p className="text-[#6adf34] font-bold">{(data?.averageScore as number / 10).toFixed(1)} Rating</p>
    //         <p>{data?.startDate.year}</p>
    //         <p>{data?.episodes || 1} episode(s)</p>
    //       </Box>
    //       <p className="xl:w-2/5 md:w-2/4 w-3/4 line-clamp-3">{data?.description}</p>
    //     </Box>
    //     <Box className="flex justify-start items-center text-center gap-5 md:mt-10 mt-5">
    //       <button className="xl:px-10 xl:py-5 lg:px-7 lg:py-4 px-4 py-2 bg-white rounded-sm font-bold">
    //         <p className="text-black xl:text-xl lg:text-lg md:text-md sm:text-sm text-xs">
    //           <span className="mr-2"><PlayArrow className="text-xl" /></span>
    //           Watch Episode 1
    //         </p>
    //       </button>
    //       <button className="xl:px-10 xl:py-5 lg:px-7 lg:py-4 px-4 py-2 bg-[#424242] rounded-sm font-bold">
    //         <p className="xl:text-xl lg:text-lg md:text-md sm:text-sm text-xs">
    //           <span className="mr-2"><Info /></span>
    //           More Information
    //         </p>
    //       </button>
    //     </Box>
    //   </Box>
    //   <Box className="h-full w-full pointer-events-none bg-gradient-to-b from-transparent to-[#141414]" />
    // </header>
  );
}
