/// <reference types="vite/client" />

type SearchType = {
  currentPage: 1;
  results: [
    {
      id: string;
      title: string;
      image: string;
      type: string;
      rating: number;
      releaseDate: string;
    }
  ];
};

type AnimeInfoType = {
  id: string;
  title: string[];
  malId: number;
  trailer: {
    id: string;
    site: string;
    thumbnail: string;
  };
  image: string;
  popularity: number;
  color: string;
  description: string;
  status: string;
  releaseDate: number;
  startDate: {
    year: number;
    month: number;
    day: number;
  };
  endDate: {
    year: number;
    month: number;
    day: number;
  };
  rating: number;
  genres: string[];
  season: string;
  studios: string[];
  type: string;
  recommendations: {
    id: string;
    malId: string;
    title: string[];
    status: string;
    episodes: number;
    image: string;
    cover: string;
    rating: number;
    type: string;
  };
  characters: {
    id: string;
    role: string;
    name: string[];
    image: string;
  };
  relations: {
    id: number;
    relationType: string;
    malId: number;
    title: string[];
    status: string;
    episodes: number;
    image: string;
    color: string;
    type: string;
    cover: string;
    rating: number;
  };
  episodes: {
    id: string;
    title: string;
    episode: string;
  };
};

type WatchAnimeType = {
  id: string;
  title: string[];
  malId: number;
  trailer: {
    id: string;
    site: string;
    thumbnail: string;
  };
  image: string;
  popularity: number;
  color: string;
  description: string;
  status: string;
  releaseDate: number;
  startDate: {
    year: number;
    month: number;
    day: number;
  };
  endDate: {
    year: number;
    month: number;
    day: number;
  };
  rating: number;
  genres: string[];
  season: string;
  studios: string[];
  type: string;
  recommendations: {
    id: string;
    malId: string;
    title: string[];
    status: string;
    episodes: number;
    image: string;
    cover: string;
    rating: number;
    type: string;
  };
  characters: {
    id: string;
    role: string;
    name: string[];
    image: string;
  };
  relations: {
    id: number;
    relationType: string;
    malId: number;
    title: string[];
    status: string;
    episodes: number;
    image: string;
    color: string;
    type: string;
    cover: string;
    rating: number;
  };
  episodes: {
    id: string;
    title: string;
    chapter: string;
  }[];
};

type AnimeQueryType = {
  currentPage: number;
  hasNextPage: boolean;
  results: AnimeResultsType[];
};

type AnimeResultsType = {
  id: string;
  title: {
    romaji: string;
    english: string;
    native: string;
  };
  image: string;
  type: string;
  rating: number;
  releaseDate: string;
};

type RandomAnimeType = {
  id: string;
  title: string;
  episodeId: string;
  translations: Translation[];
  image: string;
  cover: string;
  logos: Logo[];
  type: string;
  rating: number;
  releaseDate: string;
  description: string;
  genres: string[];
  duration: number;
  directors: string[];
  writers: string[];
  actors: string[];
  trailer: Trailer;
  mappings: Mappings;
  similar: Recommendation[];
  recommendations: Recommendation[];
  totalEpisodes: number;
  totalSeasons: number;
};

type Logo = {
  url: string;
  aspectRatio: number;
  width: number;
};

type Mappings = {
  imdb: string;
  tmdb: number;
};

type Recommendation = {
  id: number;
  title: string;
  image: string;
  type: Type;
  rating: number;
  releaseDate: string;
};

type Trailer = {
  id: string;
  site: string;
  url: string;
};

type Translation = {
  title?: string;
  description?: string;
  language: string;
};

type EpisodeStreamType = {
  headers: Headers;
  sources: Source[];
  download: string;
};

type Headers = {
  Referer: string;
};

type Source = {
  url: string;
  isM3U8: boolean;
  quality: string;
};
