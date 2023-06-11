import { Movie } from "@scribbr-assessment-full-stack/common/src";
import React, { useCallback, useEffect, useState } from "react";
import {
  addNewFavouriteMovie,
  fetchAllFavouriteMovies,
  upvoteFavouriteMovie,
} from "../api/movieApi";
import { FavouriteMovieList } from "../components/favouriteMovieList/FavouriteMovieList";
import { Header } from "../components/header/Header";
import { SearchBar } from "../components/search/searchBar/SearchBar";
import { SearchResultsList } from "../components/search/searchResultsList/SearchResultsList";

export function App() {
  const [searchedResults, setSearchedResults] = useState(null);
  const [favouriteMovies, setFavouriteMovies] = useState({});
  // Adding key to render favourite movie list component, only if a movie has been upvoted
  const [favouriteListKey, setFavouriteListKey] = useState("");

  useEffect(() => {
    retrieveFavouriteMovies();
  }, []);

  const retrieveFavouriteMovies = async () => {
    const data = await fetchAllFavouriteMovies();

    if (!data.error) {
      setFavouriteMovies(data);
    } else {
      console.error(data);
    }
  };

  const handleClick = useCallback(
    async (movie: Movie) => {
      // Checking if movie already exists in favourite list
      if (favouriteMovies[movie.imdbID]) {
        favouriteMovies[movie.imdbID].upvotes++;
        const updatedUpvotes = favouriteMovies[movie.imdbID].upvotes;
        await upvoteFavouriteMovie({ ...movie, upvotes: updatedUpvotes });
        setFavouriteListKey(`${movie.imdbID}-${updatedUpvotes}`);
        setFavouriteMovies(favouriteMovies);
      } else {
        // Adding new movie to db
        const addedMovie = { ...movie, upvotes: 1 };
        await addNewFavouriteMovie(addedMovie);
        setFavouriteListKey(`${movie.imdbID}-1`);
        setFavouriteMovies({ ...favouriteMovies, [movie.imdbID]: addedMovie });
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
