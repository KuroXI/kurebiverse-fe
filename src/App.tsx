import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { LandingPage, PopularPage, TrendingPage } from "./pages";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <Box>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/popular" element={<PopularPage />} />
      </Routes>
    </Box>
  );
}

export default App;
