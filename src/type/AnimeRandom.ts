export type AnimeRandom = {
  id: string
  title: string
  episodeId?: string
  translations: AnimeRandomTranslation[]
  image: string
  cover: string
  logos: AnimeRandomLogo[]
  type: string
  rating: number
  releaseDate: string
  description: string
  genres: string[]
  duration: number
  totalEpisodes?: number
  totalSeasons?: number
  directors: string[]
  writers: string[]
  actors: string[]
  trailer: AnimeRandomTrailer
  mappings: AnimeRandomMapping
  similar: AnimeRandomSimilar[]
  recommendations: AnimeRandomRecommendation[]
  seasons?: AnimeRandomSeason[]
}

export type AnimeRandomTranslation = {
  title: string
  description: string
  language: string
}

export type AnimeRandomLogo = {
  url: string
  aspectRatio: number
  width: number
}

export type AnimeRandomTrailer = {
  id?: string
  site?: string
  url: string
}

export type AnimeRandomMapping = {
  imdb: string
  tmdb: string
}

export type AnimeRandomSimilar = {
  id: number
  title: string
  image: string
  type: string
  rating: number
  releaseDate: string
}

export type AnimeRandomRecommendation = {
  id: number;
  title: string;
  image: string;
  type: string;
  rating: number;
  releaseDate: string;
};

export type AnimeRandomSeason = {
  season: number
  image: AnimeRandomImage
  episodes: AnimeRandomSeasonEpisode[]
}

export type AnimeRandomImage = {
  mobile: string
  hd: string
}

export type AnimeRandomSeasonEpisode = {
  title: string
  episode: number
  season: number
  releaseDate: string
  description: string
  img: AnimeRandomImage
}