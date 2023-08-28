import { Box, CircularProgress } from "@mui/material";
import { useGetRandomAnimeQuery } from "../../../redux/services/animeapi";
import { Info, PlayArrow } from "@mui/icons-material";

export default function Hero() {
  const { data, isLoading } = useGetRandomAnimeQuery(null);
  
  if (data === null) window.location.reload();

  return isLoading ? (
    <header className={"relative xl:h-[80vh] lg:h-[70vh] md:h-[60vh] sm:h-[50vh] h-[40vh]"}>
      <Box className="flex justify-center items-center w-full h-full">
        <CircularProgress color="success" />
      </Box>
    </header>
  ) : (
    <header
      className={"relative xl:h-[80vh] lg:h-[70vh] md:h-[60vh] sm:h-[50vh] h-[40vh] text-white object-contain"}
      style={{
        backgroundImage: `url(${data?.bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }}
      >
      <Box className="h-full w-[100vw] pointer-events-none bg-gradient-to-l z-0 absolute from-transparent to-[#141414]" />
      <Box className="absolute xl:pl-16 md:pl-10 sm:pl-7 pl-4 text-xl md:pt-[170px] pt-[100px]">
        <h2 className="font-bold xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl">{data?.title?.english}</h2>
        <Box className="xl:text-xl lg:text-lg md:text-md sm:text-sm text-xs">
          <Box className="flex gap-5 my-3">
            <p className="text-[#6adf34] font-bold">{(data?.averageScore as number / 10).toFixed(1)} Rating</p>
            <p>{data?.startDate.year}</p>
            <p>{data?.episodes || 1} episode(s)</p>
          </Box>
          <p className="xl:w-2/5 md:w-2/4 w-3/4 line-clamp-3">{data?.description}</p>
        </Box>
        <Box className="flex justify-start items-center text-center gap-5 md:mt-10 mt-5">
          <button className="xl:px-10 xl:py-5 lg:px-7 lg:py-4 px-4 py-2 bg-white rounded-sm font-bold">
            <p className="text-black xl:text-xl lg:text-lg md:text-md sm:text-sm text-xs">
              <span className="mr-2"><PlayArrow className="text-xl" /></span>
              Watch Episode 1
            </p>
          </button>
          <button className="xl:px-10 xl:py-5 lg:px-7 lg:py-4 px-4 py-2 bg-[#424242] rounded-sm font-bold">
            <p className="xl:text-xl lg:text-lg md:text-md sm:text-sm text-xs">
              <span className="mr-2"><Info /></span>
              More Information
            </p>
          </button>
        </Box>
      </Box>
      <Box className="h-full w-full pointer-events-none bg-gradient-to-b from-transparent to-[#141414]" />
    </header>
  );
}
