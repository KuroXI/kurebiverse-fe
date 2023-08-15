import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {AnimeInfo} from "../../type/AnimeInfo.ts";

export type QueryPagePerPage = {
  page: number | 1;
  perPage: number | 20;
};

export const animeApi = createApi({
  reducerPath: "animeApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getSearchAnime: builder.query<SearchType, string>({
      query: (searchString) => `/search/${searchString}`,
    }),
    getAnimeInfo: builder.query<AnimeInfo, string>({
      query: (animeId) => `/info/${animeId}`,
    }),
    getAnimeStreamingLinks: builder.query<WatchAnimeType, QueryPagePerPage>({
      query: (episodeId) => `/episode/${episodeId}`,
    }),
    getAnimeRecentEpisodes: builder.query<AnimeQueryType, QueryPagePerPage>({
      query: ({ page, perPage }: QueryPagePerPage) =>
        `/airing?page=${page}&perPage=${perPage}`,
    }),
    getTrendingAnime: builder.query<AnimeQueryType, QueryPagePerPage>({
      query: ({ page, perPage }: QueryPagePerPage) =>
        `/trending?page=${page}&perPage=${perPage}`,
    }),
    getPopularAnime: builder.query<AnimeQueryType, QueryPagePerPage>({
      query: ({ page, perPage }: QueryPagePerPage) =>
        `/popular?page=${page}&perPage=${perPage}`,
    }),
    getAiringSchedule: builder.query<AnimeQueryType, unknown>({
      query: () => `/schedule`,
    }),
    getRandomAnime: builder.query<RandomAnimeType, unknown>({
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
