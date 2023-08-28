import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IResult,
  IAnime,
  IEpisode,
  ISource,
  IAiringSchedule,
} from "@kuroxi/kurebiverse-types";

export type QueryPagePerPage = {
  page: number;
  perPage: number;
};

export interface AiringScheduleQuery extends QueryPagePerPage {
  airingAtLesser: number;
  airingAtGreater: number;
}

export const animeApi = createApi({
  reducerPath: "animeApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getSearchAnime: builder.query<IResult<IAnime>, string>({
      query: (searchString) => `/search/${searchString}`,
    }),
    getAnimeInfo: builder.query<IAnime, string>({
      query: (animeId) => `/info/${animeId}`,
    }),
    getAnimeEpisodes: builder.query<IEpisode[], string>({
      query: (animeId) => `/info/${animeId}/episodes`,
    }),
    getAnimeStreamingLinks: builder.query<ISource, string>({
      query: (episodeId) => `/episode/${episodeId}`,
    }),
    getAnimeUpcomingEpisodes: builder.query<IResult<IAnime>, QueryPagePerPage>({
      query: ({ page, perPage }: QueryPagePerPage) =>
        `/upcoming?page=${page}&perPage=${perPage}`,
    }),
    getTrendingAnime: builder.query<IResult<IAnime>, QueryPagePerPage>({
      query: ({ page, perPage }: QueryPagePerPage) =>
        `/trending?page=${page}&perPage=${perPage}`,
    }),
    getPopularAnime: builder.query<IResult<IAnime>, QueryPagePerPage>({
      query: ({ page, perPage }: QueryPagePerPage) =>
        `/popular?page=${page}&perPage=${perPage}`,
    }),
    getAiringSchedule: builder.query<IAiringSchedule, AiringScheduleQuery>({
      query: ({ page, perPage, airingAtGreater, airingAtLesser }) =>
        `/schedule?page=${page}&perPage=${perPage}&airingAtGreater=${airingAtGreater}&airingAtLesser=${airingAtLesser}`,
    }),
    getRandomAnime: builder.query<IAnime, unknown>({
      query: () => `/random`,
    }),
  }),
});

export const {
  useGetSearchAnimeQuery,
  useGetAiringScheduleQuery,
  useGetAnimeInfoQuery,
  useGetAnimeUpcomingEpisodesQuery,
  useGetAnimeStreamingLinksQuery,
  useGetPopularAnimeQuery,
  useGetRandomAnimeQuery,
  useGetTrendingAnimeQuery,
  useGetAnimeEpisodesQuery,
} = animeApi;
