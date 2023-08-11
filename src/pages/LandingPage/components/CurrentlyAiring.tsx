import { Box, CircularProgress } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import settings from "../utils/settings";
import AnimeCard from "./AnimeCard";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useGetAnimeRecentEpisodesQuery } from "../../../redux/services/animeapi";

const CurrentlyAiring = () => {
  const { data, isLoading } = useGetAnimeRecentEpisodesQuery({
    page: "1",
    perPage: "20",
  });

  return (
    <Box className="mt-5">
      <a
        href={"/airing"}
        className={"hover:underline text-white font-bold inline-block"}
      >
        <h3 className="text-white font-bold xl:text-3xl lg:text-2xl mb-5">
          Currently Airing Anime
          <span>
            <ArrowForwardIosIcon className="xl:text-3xl lg:text-2xl" />
          </span>
        </h3>
      </a>
      <Slider className="h-max" {...settings}>
        {isLoading ? (
          <Box className="flex justify-center items-center w-full">
            <CircularProgress color="success" />
          </Box>
        ) : (
          data?.results.map((anime: AnimeResultsType, index: number) => {
            return <AnimeCard key={`${index}-airing`} {...anime} />;
          })
        )}
      </Slider>
    </Box>
  );
};

export default CurrentlyAiring;
