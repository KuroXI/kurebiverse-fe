import { Box, CircularProgress } from "@mui/material";
import AnimeCard from "./AnimeCard";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import settings from "../utils/settings.ts";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetTrendingAnimeQuery } from "../../../redux/services/animeapi.ts";

const TrendingAnime = () => {
  const { data, isLoading } = useGetTrendingAnimeQuery({
    page: "1",
    perPage: "20",
  });

  return (
    <Box className="mt-5">
      <a
        href={"/trending"}
        className={"hover:underline text-white font-bold inline-block"}
      >
        <h3 className="xl:text-3xl lg:text-2xl mb-5">
          Trending Anime
          <span>
            <ArrowForwardIosIcon className="xl:text-3xl lg:text-2xl" />
          </span>
        </h3>
      </a>

      <Slider {...settings}>
        {isLoading ? (
          <Box className="flex justify-center items-center w-full">
            <CircularProgress color="success" />
          </Box>
        ) : (
          data?.results.map((anime: AnimeResultsType, index: number) => {
            return <AnimeCard key={`${index}-trending`} {...anime} />;
          })
        )}
      </Slider>
    </Box>
  );
};

export default TrendingAnime;
