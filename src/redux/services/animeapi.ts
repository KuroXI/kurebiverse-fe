import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type QueryPagePerPage = {
  page: string;
  perPage: string;
};

export const animeApi = createApi({
  reducerPath: "animeApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.BASE_URL }),
  endpoints: (builder) => ({
    getSearchAnime: builder.query({
      query: (searchString) => `/${searchString}`,
    }),
    getAnimeInfo: builder.query({
      query: (animeId) => `/info/${animeId}`,
    }),
    getAnimeStreamingLinks: builder.query({
      query: (episodeId) => `/watch/${episodeId}`,
    }),
    getAnimeRecentEpisodes: builder.query({
      query: ({ page, perPage }: QueryPagePerPage) =>
        `/recent-episodes?page=${page}&perPage=${perPage}`,
    }),
    getTrendingAnime: builder.query({
      query: ({ page, perPage }: QueryPagePerPage) =>
        `/trending?page=${page}&perPage=${perPage}`,
    }),
    getPopularAnime: builder.query({
      query: ({ page, perPage }: QueryPagePerPage) =>
        `/popular?page=${page}&perPage=${perPage}`,
    }),
    getAiringSchedule: builder.query({
      query: () => `/airing-schedule
      `,
    }),
    getRandomAnime: builder.query({
      query: () => `/random-anime`,
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
