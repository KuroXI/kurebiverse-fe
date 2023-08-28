import { Route, Routes } from "react-router-dom";
import { LandingPage, PopularPage, SearchPage, TrendingPage } from "./pages";
import { Navbar, VideoPlayer } from "./components";
import { LatestEpisodesPage } from "./pages";
import Index from "./components/Auth";
import {useEffect} from "react";
import {supabase} from "./redux/auth/supabase.ts";
import {setUserDetails} from "./redux/userSlice.ts";
import {useDispatch} from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    supabase.auth.getSession().then((session) => {
      dispatch(setUserDetails({ user: session.data.session?.user }));
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setUserDetails({ user: session?.user }));
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/popular" element={<PopularPage />} />
        <Route path="/latest" element={<LatestEpisodesPage />} />
        <Route path="/watch/:animeId" element={<VideoPlayer />} />
        <Route path="/search/:searchQuery" element={<SearchPage />} />
        <Route path="/login" element={<Index />} />
      </Routes>
    </>
  );
}

export default App;
