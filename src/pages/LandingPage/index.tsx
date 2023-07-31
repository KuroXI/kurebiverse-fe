import { Box } from "@mui/material";
import Hero from "./components/Hero";
import TrendingAnime from "./components/TrendingAnime";
import PopularAnime from "./components/PopularAnime";
import CurrentlyAiring from "./components/CurrentlyAiring";

const LandingPage = () => {
  return (
    <Box>
      <Hero />
      <Box className="p-16 relative z-10 top-[-120px]">
        <TrendingAnime />
        <PopularAnime />
        <CurrentlyAiring />
      </Box>
    </Box>
  );
};

export { LandingPage };
