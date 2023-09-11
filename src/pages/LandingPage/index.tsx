import "./styles.scss";
import Hero from "./components/Hero.tsx";
import AnimeCardRow from "./components/AnimeCardRow.tsx";
import {
  QueryPagePerPage,
  useGetAnimeUpcomingEpisodesQuery,
  useGetPopularAnimeQuery,
  useGetTrendingAnimeQuery
} from "@/redux/services/animeapi.ts";
import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { QueryDefinition } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { AnimeSort } from "@/type/AnimeSort.ts";
import HistoryRow from "@/pages/LandingPage/components/HistoryRow.tsx";
import {useSelector} from "react-redux";
import {User} from "@supabase/supabase-js";
import {useEffect, useState} from "react";
import {supabase} from "@/redux/auth/supabase.ts";
import {History} from "@/type/History.ts";

const LandingPage = () => {
  const [history, setHistory] = useState<History[] | null>(null);
  const { user } = useSelector((state: { user: { user: User } }) => state.user);

  useEffect(() => {
    if (user) {
      supabase.from("histories").select("*")
        .then(({ data } : { data: History[] | null }) => setHistory(data))
    }
  }, [user]);

  return (
    <>
      <Hero/>
      <div className="pl-4 pr-4 relative">
        { history && <HistoryRow history={history}/> }
        <AnimeCardRow query={useGetTrendingAnimeQuery as (data : QueryPagePerPage) => UseQueryHookResult<QueryDefinition<QueryPagePerPage, BaseQueryFn, never, AnimeSort>>} title={"Trending"} redirect={"/trending"}/>
        <AnimeCardRow query={useGetPopularAnimeQuery as (data : QueryPagePerPage) => UseQueryHookResult<QueryDefinition<QueryPagePerPage, BaseQueryFn, never, AnimeSort>>} title={"Popular"} redirect={"/popular"}/>
        <AnimeCardRow query={useGetAnimeUpcomingEpisodesQuery as (data : QueryPagePerPage) => UseQueryHookResult<QueryDefinition<QueryPagePerPage, BaseQueryFn, never, AnimeSort>>} title={"Latest Episodes"} redirect={"/latest"}/>
      </div>
    </>
  );
};

export {LandingPage};
