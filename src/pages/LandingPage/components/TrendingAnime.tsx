import { useGetTrendingAnimeQuery } from "../../../redux/services/animeapi";
import { Box } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import settings from "../utils/settings";
import AnimeCard from "./AnimeCard";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const TrendingAnime = () => {
  const { data } = useGetTrendingAnimeQuery({
    page: "1",
    perPage: "20",
  });

  return (
    <Box className="mt-5">
      <h3 className="text-white font-bold xl:text-3xl lg:text-2xl mb-5">
        Trending Anime
        <span>
          <ArrowForwardIosIcon className="text-[100px!important]" />
        </span>
      </h3>
      <Slider className="h-max" {...settings}>
        {data?.results.map((anime, index) => {
          return <AnimeCard key={`${index}-popular`} {...anime} />;
        })}
      </Slider>
    </Box>
  );
};

export default TrendingAnime;
