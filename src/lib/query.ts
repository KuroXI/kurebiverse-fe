export const InfoQuery = `query Anilist($id: String!) { anilist { getInfo(id: $id) { id image cover description genres title { romaji english native userPreferred } } } }`;

export const LandingRandomQuery = `query Anilist($perPage: Int) { anilist { getTrending(perPage: $perPage) { results { id cover description title { romaji english native userPreferred } genres } } } }`;

export const LandingTrendingQuery = `query Anilist { anilist { getTrending { results { id image description status cover rating releaseDate genres duration type title { romaji english native userPreferred } totalEpisodes } } } }`;

export const LandingPopularQuery = `query Anilist { anilist { getPopular { results { id image description status cover rating releaseDate genres duration type title { romaji english native userPreferred } totalEpisodes } } } }`;

export const EpisodeQuery = `query Anilist($id: String!) { anilist { getInfo(id: $id) { id episodes { id title description number image airDate } } } }`;
