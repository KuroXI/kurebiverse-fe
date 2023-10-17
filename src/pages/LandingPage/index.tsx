import Hero from "./components/Hero.tsx";
import AnimeCardRow from "./components/AnimeCardRow.tsx";
import {
  useGetAnimeUpcomingEpisodesQuery,
  useGetPopularAnimeQuery,
  useGetTrendingAnimeQuery,
} from "@/redux/services/animeapi.ts";
import HistoryRow from "@/pages/LandingPage/components/HistoryRow.tsx";

export const LandingPage = () => {
  return (
    <>
      <Hero />
      <div className="flex flex-col gap-5 relative px-4">
        <HistoryRow />
        <AnimeCardRow
          query={useGetTrendingAnimeQuery}
          title={"Trending"}
          redirect={"/trending"}
        />
        <AnimeCardRow
          query={useGetPopularAnimeQuery}
          title={"Popular"}
          redirect={"/popular"}
        />
        <AnimeCardRow
          query={useGetAnimeUpcomingEpisodesQuery}
          title={"Latest Episodes"}
          redirect={"/latest"}
        />
      </div>
    </>
  );
};
