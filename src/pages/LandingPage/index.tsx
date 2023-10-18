import { Hero } from "./components/Hero.tsx";
import { HistoryRow } from "@/pages/LandingPage/components/HistoryRow.tsx";
import { Row } from "./components/Row.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const LandingPage = () => {
  return (
    <>
      <Hero />
      <div className="flex flex-col gap-5 relative px-4 w-screen">
        <HistoryRow />

        <QueryClientProvider client={new QueryClient()}>
          <Row url="/trending?page=1&perPage=50" title="Trending" />
        </QueryClientProvider>

        <QueryClientProvider client={new QueryClient()}>
          <Row url="/popular?page=1&perPage=50" title="Popular" />
        </QueryClientProvider>
      </div>
    </>
  );
};

export default LandingPage;
