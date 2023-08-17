import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type QueryPagePerPage = {
  page: string;
  perPage: string;
};

export const animeApi = createApi({
  reducerPath: "animeApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getSearchAnime: builder.query<SearchType, string>({
      query: (searchString) => `/search/${searchString}`,
    }),
    getAnimeInfo: builder.query({
      query: (animeId) => `/info/${animeId}`,
    }),
    getAnimeStreamingLinks: builder.query<EpisodeStreamType, string>({
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
