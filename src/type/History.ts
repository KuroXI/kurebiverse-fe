export type HistoryResult = {
  id: string
  history: History[]
}

export type History = {
  animeId: string
  time: HistoryTime
  current_episode: number
  episodeId: string
  updatedAt: number
}

type HistoryTime = {
  progress: number
  totalDuration: number
}