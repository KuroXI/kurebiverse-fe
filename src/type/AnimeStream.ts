export type AnimeStream = {
  headers: AnimeStreamHeader
  sources: AnimeStreamSource[]
  download: string
}

export type AnimeStreamHeader = {
  Referer: string
}

export type AnimeStreamSource = {
  url: string
  isM3U8: boolean
  quality: string
}