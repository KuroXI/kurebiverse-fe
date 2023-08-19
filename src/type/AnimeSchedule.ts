export type AnimeSchedule = {
  currentPage: number
  hasNextPage: boolean
  results: AnimeScheduleResult[]
}

export type AnimeScheduleResult = {
  id: string
  malId: number
  episode: number
  airingAt: number
  title: AnimeScheduleResultTitle
  country: string
  image: string
  description: string
  cover: string
  genres: string[]
  color: string
  rating: number | null
  releaseDate: number
  type: string
}

export type AnimeScheduleResultTitle = {
  romaji: string
  english: string
  native: string
  userPreferred: string
}