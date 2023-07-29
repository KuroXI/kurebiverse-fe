import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type QueryPagePerPage = {
  page: string;
  perPage: string;
};

export const animeApi = createApi({
  reducerPath: "animeApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.BASE_URL }),
  endpoints: (builder) => ({
    getSearchAnime: builder.query<SearchType, string>({
      query: (searchString) => `/${searchString}`,
    }),
    getAnimeInfo: builder.query<AnimeInfoType, string>({
      query: (animeId) => `/info/${animeId}`,
    }),
    getAnimeStreamingLinks: builder.query<WatchAnimeType, string>({
      query: (episodeId) => `/watch/${episodeId}`,
    }),
    getAnimeRecentEpisodes: builder.query<AnimeQueryType, QueryPagePerPage>({
      query: ({ page, perPage }: QueryPagePerPage) =>
        `/recent-episodes?page=${page}&perPage=${perPage}`,
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
      query: () => `/airing-schedule
      `,
    }),
    getRandomAnime: builder.query<RandomAnimeType, unknown>({
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
