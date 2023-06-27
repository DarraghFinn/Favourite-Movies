import {
  FavouriteMovies,
  OMDbMovie,
  SearchResults,
} from "@scribbr-assessment-full-stack/common/src";
import React, { useEffect, useState } from "react";
import {
  addNewFavouriteMovie,
  fetchAllFavouriteMovies,
  upvoteFavouriteMovie,
} from "../api/movieApi";
import { FavouriteMovieList } from "../components/favouriteMovieList/FavouriteMovieList";
import { Header } from "../components/header/Header";
import { SearchBar } from "../components/search/searchBar/SearchBar";
import { SearchResultsList } from "../components/search/searchResultsList/SearchResultsList";
import { ErrorSection } from "../components/search/error/ErrorSection";

export function App() {
  const [searchedResults, setSearchedResults] = useState<SearchResults>();
  const [favouriteMovies, setFavouriteMovies] = useState<FavouriteMovies>({});
  // Adding key to render favourite movie list component, only if a movie has been upvoted
  const [favouriteListKey, setFavouriteListKey] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    retrieveFavouriteMovies();
  }, []);

  const retrieveFavouriteMovies = async () => {
    const movies = await fetchAllFavouriteMovies();
    if (!movies.error) {
      setFavouriteMovies(movies);
      setHasError(false);
    } else {
      setHasError(true);
    }
  };

  const handleClick = async (movie: OMDbMovie) => {
    try {
      // Checking if movie already exists in favourite list
      if (favouriteMovies[movie.imdbID]) {
        favouriteMovies[movie.imdbID].upvotes++;
        await upvoteFavouriteMovie(favouriteMovies[movie.imdbID]);
        await retrieveFavouriteMovies();
        const key = `${movie.imdbID}-${favouriteMovies[movie.imdbID].upvotes}`;
        setFavouriteListKey(key);
      } else {
        // Adding new movie to db
        await addNewFavouriteMovie({ ...movie, upvotes: 1 });
        await retrieveFavouriteMovies();
        setFavouriteListKey(`${movie.imdbID}-1`);
      }
      setHasError(false);
    } catch (error) {
      setHasError(true);
      throw error;
    }
  };

  return (
    <div data-testid="scribbr-movies">
      <Header />
      <SearchBar setSearchedResults={setSearchedResults} />
      {(hasError || searchedResults?.error) && (
        <ErrorSection error={searchedResults?.error} />
      )}
      {searchedResults?.Search?.length > 0 && (
        <SearchResultsList
          searchedResults={searchedResults}
          handleClick={handleClick}
        />
      )}
      <FavouriteMovieList
        data-testid="scribbr-favourite-movies"
        key={favouriteListKey}
        favouriteMovies={favouriteMovies}
        handleClick={handleClick}
        searchedListLength={searchedResults?.Search?.length}
      />
    </div>
  );
}
