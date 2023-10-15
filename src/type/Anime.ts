export interface IMeta {
    total: number
    lastPage: number
    currentPage: number
    perPage: number
    hasNextPage: boolean
  }
  
  export interface ITitle {
    romaji?: string;
    english?: string;
    native?: string;
    userPreferred?: string;
  }
  
  export interface ITrailer {
    id?: string
    site?: string
    thumbnail?: string
  }
  
  export interface ICoverImage {
    extraLarge?: string
    large?: string
    medium?: string
    color?: string
  }
  
  export interface INextAiringEpisode {
    id: number
    airingAt: number
    timeUntilAiring: number
    episode: number
  }
  
  export interface IFunkyDate {
    year: number | null
    month: number | null
    day: number | null
  }
  
  export interface IResult<T> extends IMeta {
    results: T[]
  }
  
  export interface IAiringSchedule extends IMeta {
    results: {
      id: number
      airingAt: number
      timeUntilAiring: number
      episode: number
      info: IAnime
    }[]
  }
  
  export interface IEpisode {
    id: string
    title?: string
    description?: string
    isFiller?: boolean
    url?: string
    image?: string
    releaseDate?: string
  }
  
  export interface ISource {
    headers?: { [k: string]: string }
    intro?: IIntro
    subtitles?: ISubtitles[]
    sources: ISourceData[]
    download?: string
    embedURL?: string
  }
  
  export interface IIntro {
    start: number
    end: number
  }
  
  export interface ISubtitles {
    id?: string
    url: string
    lang: string
  }
  
  export interface ISourceData {
    url: string
    quality?: string
    isM3U8?: boolean
    isDASH?: boolean
    size?: number
  }
  
  export interface IAnime {
    id: string
    title: ITitle
    description: string | null
    trailer: ITrailer
    bannerImage: string | null
    coverImage: ICoverImage | null
    episodes: number
    duration: number
    isAdult: boolean
    countryOfOrigin: string
    seasonYear: number
    synonyms: string[]
    averageScore: number
    genres: string[]
    status: IStatus
    season: ISeason
    format: IFormat
    nextAiringEpisode: INextAiringEpisode | null
    startDate: IFunkyDate
    endDate: IFunkyDate
    relations: { nodes: IAnime[] } | null
  }
  
  export type IStatus = "FINISHED" | "RELEASING" | "NOT_YET_RELEASED" | "CANCELLED" | "HIATUS"
  export type IFormat = "UNKNOWN" | "TV" | "TV_SHORT" | "MOVIE" | "SPECIAL" | "OVA" | "ONA"  | "MUSIC"
  export type ISeason = "FALL" | "SUMMER" | "WINTER" | "SPRING"