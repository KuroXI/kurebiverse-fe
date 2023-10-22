import { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { LandingPage, WatchPage, Authentication, Discover } from "./pages";
import { Navbar } from "./components";
import { supabase } from "./redux/auth/supabase.ts";
import { setUserDetails } from "./redux/userSlice.ts";
import { useDispatch } from "react-redux";
import { SpinnerIcon } from "./components/ui/icons.tsx";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    supabase.auth.getSession().then((session) => {
      if (!session.data.session?.user.id) return;

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
      if (session?.user.id) {
        supabase
          .from("users")
          .select("*")
          .eq("userId", session?.user.id)
          .then(({ data }) => {
            if (data) dispatch(setUserDetails(data[0]));
          });
      }
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Suspense fallback={<SpinnerIcon className="h-10 w-10 animate-spin" />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/watch/:animeId" element={<WatchPage />} />
          <Route path="/discover" element={<Discover />} />

          {/* Authentication */}
          <Route path="/login" element={<Authentication type="login" />} />
          <Route
            path="/register"
            element={<Authentication type="register" />}
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
