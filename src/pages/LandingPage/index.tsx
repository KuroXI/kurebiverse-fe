import {Box} from "@mui/material";
import "./styles.scss";
import Hero from "./components/Hero.tsx";
import AnimeCardRow from "./components/AnimeCardRow.tsx";
import {
  QueryPagePerPage,
  useGetAnimeUpcomingEpisodesQuery,
  useGetPopularAnimeQuery,
  useGetTrendingAnimeQuery
} from "../../redux/services/animeapi.ts";
import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { QueryDefinition } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { AnimeSort } from "../../type/AnimeSort.ts";

const LandingPage = () => {
  return (
    <>
      <Hero/>
      <Box className="pl-4 pr-4 relative">
        <AnimeCardRow query={useGetTrendingAnimeQuery as (data : QueryPagePerPage) => UseQueryHookResult<QueryDefinition<QueryPagePerPage, BaseQueryFn, never, AnimeSort>>} title={"Trending"} redirect={"/trending"}/>
        <AnimeCardRow query={useGetPopularAnimeQuery as (data : QueryPagePerPage) => UseQueryHookResult<QueryDefinition<QueryPagePerPage, BaseQueryFn, never, AnimeSort>>} title={"Popular"} redirect={"/popular"}/>
        <AnimeCardRow query={useGetAnimeUpcomingEpisodesQuery as (data : QueryPagePerPage) => UseQueryHookResult<QueryDefinition<QueryPagePerPage, BaseQueryFn, never, AnimeSort>>} title={"Latest Episodes"} redirect={"/latest"}/>
      </Box>
    </>
  );
};

export {LandingPage};
