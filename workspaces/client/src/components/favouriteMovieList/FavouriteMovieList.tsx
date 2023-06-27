import React from "react";
import { MovieItem } from "../movieItem/MovieItem";
import {
  FavouriteMovieListProps,
  OMDbMovie,
} from "@scribbr-assessment-full-stack/common/src";

export const FavouriteMovieList = (props: FavouriteMovieListProps) => {
  const { favouriteMovies, handleClick, searchedListLength } = props;
  const values = Object.values(favouriteMovies);

  if (values.length > 0) {
    return (
      <div data-testid="scribbr-movie-list">
        {values.map((movie: OMDbMovie, index: number) => {
          const tabIndex =
            typeof searchedListLength === "number"
              ? index + searchedListLength
              : index;
          return (
            <MovieItem
              key={movie.imdbID}
              movie={movie}
              count={movie.upvotes}
              handleClick={handleClick}
              tabIndex={tabIndex}
            />
          );
        })}
      </div>
    );
  }
};
