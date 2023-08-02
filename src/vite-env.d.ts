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
  };
};

type AnimeQueryType = {
  currentPage: number;
  hasNextPage: boolean
  results: AnimeResultsType[];
};

type AnimeResultsType = {
  id: string;
  title: string;
  image: string;
  type: string;
  rating: number;
  releaseDate: string;
}

type RandomAnimeType = {
  id: string;
  title: {
    romaji: string;
    english: string;
    native: string;
  };
  malId: number;
  trailer: {
    id: string;
    site: string;
    thumbnail: string;
  };
  image: string;
  popularity: number;
  color: string;
  cover: string;
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
