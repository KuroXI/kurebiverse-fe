import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { LandingPage, PopularPage, TrendingPage } from "./pages";
import { Navbar, VideoPlayer } from "./components";
import { LatestEpisodesPage } from "./pages/LatestEpisodesPage";

function App() {
  return (
    <Box>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/popular" element={<PopularPage />} />
        <Route path="/latest" element={<LatestEpisodesPage />} />
        <Route path="/videotest/:animeId" element={<VideoPlayer />} />
      </Routes>
    </Box>
  );
}

export default App;
