import { Dispatch, SetStateAction } from "react";

export interface OMDbMovie {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
  upvotes?: number;
}

export interface PersistedMovie {
  poster: string;
  title: string;
  type: string;
  year: string;
  id: string;
  upvotes: number;
  created_at: string;
  updated_at: string;
}

export interface SearchResults {
  Response: string;
  Search: OMDbMovie[];
  error?: string;
}

export interface FavouriteMovies {
  [id: string]: OMDbMovie;
}

export interface FavouriteMovieListProps {
  favouriteMovies: FavouriteMovies;
  handleClick?: (movie: OMDbMovie) => Promise<void>;
  searchedListLength: number;
}

export interface MovieItemProps {
  movie: OMDbMovie;
  handleClick?: (movie: OMDbMovie) => Promise<void>;
  tabIndex: number;
  count: number;
}

export interface SearchBarProps {
  setSearchedResults: any;
}

export interface SearchResultsListProps {
  searchedResults: SearchResults;
  handleClick?: (movie: OMDbMovie) => Promise<void>;
}
