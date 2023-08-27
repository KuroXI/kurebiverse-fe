import { IAnime } from "@kuroxi/kurebiverse-types"

export type AnimeSort = {
  currentPage: number
  hasNextPage: boolean
  results: IAnime[]
}

export type AnimeSortResult = {
  id: string
  malId: number
  title: AnimeSortResultTitle
  image: string
  trailer: AnimeSortResultTrailer
  description: string
  status: string
  cover: string
  rating: number
  releaseDate: number
  color: string
  genres: string[]
  totalEpisodes: number
  duration: number
  type: string
}

export type AnimeSortResultTitle = {
  romaji: string
  english: string
  native: string
  userPreferred: string
}

export type AnimeSortResultTrailer = {
  id?: string
  site?: string
  thumbnail: string
}