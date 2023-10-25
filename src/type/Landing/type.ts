import { Title } from "../type";

export type AnimeRandom = {
  id: string;
  cover: string;
  description: string;
  title: Title;
  genres: string[];
};

export type AnimeInfo = {
  id: string;
  image: string;
  description: string;
  status: string;
  cover: string;
  rating: number;
  releaseDate: number;
  genres: string[];
  duration: number;
  type: string;
  title: Title;
};

export type AnimeEpisodeResult = {
  id: string;
  episodes: AnimeEpisode[];
};

export type AnimeEpisode = {
  id: string;
  title: string;
  description: string;
  number: number;
  image: string;
  airDate: string;
};
