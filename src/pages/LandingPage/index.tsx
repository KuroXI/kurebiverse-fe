import { Box } from "@mui/material";
import Hero from "./components/Hero";
import TrendingAnime from "./components/TrendingAnime";
import PopularAnime from "./components/PopularAnime";
import CurrentlyAiring from "./components/CurrentlyAiring";
import "./styles.scss";

const LandingPage = () => {
  return (
    <Box>
      <Hero />
      <Box className="xl:pl-16 md:pl-10 sm:pl-7 pl-4 relative z-10 xl:top-[-120px] lg:top-[-60px] top-[-50px]">
        <TrendingAnime />
        <PopularAnime />
        <CurrentlyAiring />
      </Box>
    </Box>
  );
};

export { LandingPage };
