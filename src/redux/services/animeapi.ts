import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {AnimeInfo} from "../../type/AnimeInfo.ts";
import {AnimeRandom} from "../../type/AnimeRandom.ts";
import {AnimeSchedule} from "../../type/AnimeSchedule.ts";
import {AnimeSearch} from "../../type/AnimeSearch.ts";
import {AnimeSort} from "../../type/AnimeSort.ts";
import {AnimeStream} from "../../type/AnimeStream.ts";

export type QueryPagePerPage = {
  page: number;
  perPage: number;
};

export const animeApi = createApi({
  reducerPath: "animeApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getSearchAnime: builder.query<AnimeSearch, string>({
      query: (searchString) => `/search/${searchString}`,
    }),
    getAnimeInfo: builder.query<AnimeInfo, string>({
      query: (animeId) => `/info/${animeId}`,
    }),
    getAnimeStreamingLinks: builder.query<AnimeStream, string>({
      query: (episodeId) => `/episode/${episodeId}`,
    }),
    getAnimeRecentEpisodes: builder.query<AnimeSort, QueryPagePerPage>({
      query: ({ page, perPage }: QueryPagePerPage) =>
        `/airing?page=${page}&perPage=${perPage}`,
    }),
    getTrendingAnime: builder.query<AnimeSort, QueryPagePerPage>({
      query: ({ page, perPage }: QueryPagePerPage) =>
        `/trending?page=${page}&perPage=${perPage}`,
    }),
    getPopularAnime: builder.query<AnimeSort, QueryPagePerPage>({
      query: ({ page, perPage }: QueryPagePerPage) =>
        `/popular?page=${page}&perPage=${perPage}`,
    }),
    getAiringSchedule: builder.query<AnimeSchedule, unknown>({
      query: () => `/schedule`,
    }),
    getRandomAnime: builder.query<AnimeRandom, unknown>({
      query: () => `/random`,
    }),
  }),
});

export const {
  useGetSearchAnimeQuery,
  useGetAiringScheduleQuery,
  useGetAnimeInfoQuery,
  useGetAnimeRecentEpisodesQuery,
  useGetAnimeStreamingLinksQuery,
  useGetPopularAnimeQuery,
  useGetRandomAnimeQuery,
  useGetTrendingAnimeQuery,
} = animeApi;
