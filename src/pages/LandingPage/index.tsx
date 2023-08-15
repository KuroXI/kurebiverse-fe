import {Box} from "@mui/material";
import "./styles.scss";
import Hero from "./components/Hero.tsx";
import AnimeCardRow from "./components/AnimeCardRow.tsx";
import {
  useGetAnimeRecentEpisodesQuery,
  useGetPopularAnimeQuery,
  useGetTrendingAnimeQuery
} from "../../redux/services/animeapi.ts";

const LandingPage = () => {
  return (
    <>
      <Hero/>
      <Box className="pl-4 pr-4 relative">
        <AnimeCardRow query={useGetTrendingAnimeQuery} title={"Trending"} redirect={"/trending"}/>
        <AnimeCardRow query={useGetPopularAnimeQuery} title={"Popular"} redirect={"/popular"}/>
        <AnimeCardRow query={useGetAnimeRecentEpisodesQuery} title={"Latest Episodes"} redirect={"/latest"}/>
      </Box>
    </>
  );
};

export {LandingPage};
