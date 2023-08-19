export type AnimeSearch = {
  currentPage: number
  hasNextPage: boolean
  results: AnimeSearchResult[]
}

export type AnimeSearchResult = {
  id: string
  malId: number
  title: AnimeSearchResultTitle
  status: string
  image: string
  cover: string
  popularity: number
  description: string
  rating: number
  genres: string[]
  color: string
  totalEpisodes: number
  currentEpisodeCount: number
  type: string
  releaseDate: number
}

export type AnimeSearchResultTitle = {
  romaji: string
  english: string
  native: string
  userPreferred: string
}