export type AnimeInfo = {
  id: string
  title: AnimeInfoTitle
  malId: number
  synonyms: string[]
  isLicensed: boolean
  isAdult: boolean
  countyOfOrigin: string
  trailer: AnimeInfoTrailer
  image: string
  popularity: number
  color: string
  cover: string
  description: string
  status: string
  releaseDate: number
  startDate: AnimeInfoDate
  endDate: AnimeInfoDate
  totalEpisodes: number
  currentEpisode: number
  rating: number
  duration: number
  genres: string[]
  season: string
  studios: string[]
  subOrDub: "sub" | "dub"
  type: string
  recommendations: AnimeInfoRecommendation[]
  characters: AnimeInfoCharacter[]
  relations: AnimeInfoRelation[]
  mappings: AnimeInfoMapping
  episodes: AnimeInfoEpisode[]
}

type AnimeInfoTitle = {
  romaji: string
  english: string
  native: string
  userPreferred?: string
}

type AnimeInfoTrailer = {
  id?: string
  site?: string
  thumbnail?: string
}

type AnimeInfoDate = {
  year: number
  month: number
  day: number
}

export type AnimeInfoRecommendation = {
  id: number
  malId: number
  title: AnimeInfoTitle
  status: string
  episodes: number | null
  image: string
  cover: string
  rating: number
  type: string
}

export type AnimeInfoCharacter = {
  id: number
  role: string
  name: CharacterName
  image: string
  voiceActors: CharacterVoiceActor[]
}

type CharacterName = {
  first: string
  last: string
  full: string
  native: string
  userPreferred: string
}

type CharacterVoiceActor = {
  id: number
  language: string
  name: CharacterName
  image: string
}

export type AnimeInfoRelation = {
  id: number
  relationType: string
  malId: number
  title: AnimeInfoTitle
  status: string
  episodes: number | null
  image: string
  color: string
  type: string
  cover: string
  rating: number
}

export type AnimeInfoMapping = {
  mal: number
  anidb: number
  kitsu: number
  anilist: number
  thetvdb: number
  anisearch: number
  livechart: number
  "notify.moe": string
  "anime-planet": string
}

export type AnimeInfoEpisode = {
  id: string
  title: string
  description: string
  number: number
  image: string
  airDate: Date | string
}