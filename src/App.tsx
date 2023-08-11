import { Box } from "@mui/material";
import { Navbar } from "./components";
import { Route, Routes } from "react-router-dom";
import { LandingPage, TrendingPage } from "./pages";

function App() {
  return (
    <Box>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/trending" element={<TrendingPage />} />
      </Routes>
    </Box>
  );
}

export default App;
