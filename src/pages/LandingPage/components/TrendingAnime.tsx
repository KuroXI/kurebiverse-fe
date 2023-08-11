import {Box} from "@mui/material";
import AnimeCard from "./AnimeCard";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {useLayoutEffect, useState} from "react";
import settings from "../utils/settings.ts";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TrendingAnime = () => {
  const [data, setData] = useState<AnimeQueryType>();

  const fetchRandoms = () => {
    fetch(`https://kurebiverse-be.vercel.app/trending?page=1&perPage=20`)
      .then((response) => response.json())
      .then((data: AnimeQueryType) => setData(data))
  }
  useLayoutEffect(() => fetchRandoms, []);

  return (
    <Box className="mt-5">
      <a href={"/trending"} className={"hover:underline text-white font-bold inline-block"}>
        <h3 className="xl:text-3xl lg:text-2xl mb-5">
          Trending Anime
          <span>
            <ArrowForwardIosIcon className="xl:text-3xl lg:text-2xl"/>
          </span>
        </h3>
      </a>

      <Slider {...settings}>
        {data?.results.map((anime, index) => {
          return <AnimeCard key={`${index}-trending`} {...anime} />;
        })}
      </Slider>
    </Box>
  );
};

export default TrendingAnime;
