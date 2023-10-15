import { Route, Routes } from "react-router-dom";
import {
  LandingPage,
  PopularPage,
  SearchPage,
  TrendingPage,
  WatchPage,
  LatestEpisodesPage,
} from "./pages";
import { Navbar } from "./components";
import Index from "./components/Auth";
import { useEffect } from "react";
import { supabase } from "./redux/auth/supabase.ts";
import { setUserDetails } from "./redux/userSlice.ts";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    supabase.auth.getSession().then((session) => {
      supabase
        .from("users")
        .select("*")
        .eq("userId", session.data.session?.user.id)
        .then(({ data }) => {
          if (data) dispatch(setUserDetails(data[0]));
        });
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      supabase
        .from("users")
        .select("*")
        .eq("userId", session?.user.id)
        .then(({ data }) => {
          if (data) dispatch(setUserDetails(data[0]));
        });
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
        <Route path="/watch/:animeId" element={<WatchPage />} />
        <Route path="/search/:searchQuery" element={<SearchPage />} />
        <Route path="/login" element={<Index />} />
      </Routes>
    </>
  );
}

export default App;
