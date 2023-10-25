export interface Result<T> extends Meta {
	results: T[]
}

export type Meta = {
	currentPage?: number;
	hasNextPage?: boolean;
}

export type Title = {
  romaji?: string;
  english?: string;
  native?: string;
  userPreferred?: string;
};
