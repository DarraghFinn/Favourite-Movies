export const APP_TITLE = "Scribbr's full-stack assessment";

export interface Movie {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
  upvotes?: number;
}
