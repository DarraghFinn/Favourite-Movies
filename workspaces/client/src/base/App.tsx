import { Movie } from "@scribbr-assessment-full-stack/common/src";
import React, { useCallback, useState } from "react";
import { FavouriteMovieList } from "../components/favouriteMovieList/FavouriteMovieList";
import { Header } from "../components/header/Header";
import { SearchBar } from "../components/search/searchBar/SearchBar";
import { SearchResultsList } from "../components/search/searchResultsList/SearchResultsList";

export function App() {
  const [searchedResults, setSearchedResults] = useState(null);
  const [favouriteMovies, setFavouriteMovies] = useState({});
  // Adding key to render favourite movie list component, only if a movie has been upvoted
  const [favouriteListKey, setFavouriteListKey] = useState("");

  const handleClick = useCallback(
    (movie: Movie) => {
      // Checking if movie already exists in favourite list
      if (favouriteMovies[movie.imdbID]) {
        favouriteMovies[movie.imdbID].upvotes++;
        setFavouriteListKey(
          `${movie.imdbID}-${favouriteMovies[movie.imdbID].upvotes}`
        );
        setFavouriteMovies(favouriteMovies);
      } else {
        setFavouriteListKey(`${movie.imdbID}-1`);
        setFavouriteMovies({
          ...favouriteMovies,
          [movie.imdbID]: { upvotes: 1, ...movie },
        });
      }
    },
    [favouriteMovies]
  );

  return (
    <div data-testid="scribbr-movies">
      <Header />
      <SearchBar setSearchedResults={setSearchedResults} />
      <SearchResultsList
        searchedResults={searchedResults}
        handleClick={handleClick}
      />
      <FavouriteMovieList
        data-testid="scribbr-favourite-movies"
        key={favouriteListKey}
        favouriteMovies={favouriteMovies}
        handleClick={handleClick}
      />
    </div>
  );
}
