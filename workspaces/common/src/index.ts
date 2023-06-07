export const APP_TITLE = "Scribbr's favourite movies";
export const SEARCH_PLACEHOLDER = "Add your favourite movie";

export interface Movie {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
  upvotes?: number;
}
