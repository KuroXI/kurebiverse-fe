import { Hero } from "./components/Hero.tsx";
import { HistoryRow } from "@/pages/LandingPage/components/HistoryRow.tsx";
import { Row } from "./components/Row.tsx";
import { LandingPopularQuery, LandingTrendingQuery } from "@/lib/query.ts";

export const LandingPage = () => {
  return (
    <>
      <Hero />
      <div className="flex flex-col gap-5 relative px-4 w-screen">
        <HistoryRow />

        <Row query={LandingTrendingQuery} title="Trending" type="getTrending" />
        <Row query={LandingPopularQuery} title="Popular" type="getPopular" />
      </div>
    </>
  );
};

export default LandingPage;
