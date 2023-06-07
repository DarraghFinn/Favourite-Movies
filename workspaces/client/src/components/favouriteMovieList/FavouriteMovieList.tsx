import { Movie } from "@scribbr-assessment-full-stack/common/src";
import React from "react";
import { MovieItem } from "../movieItem/MovieItem";

export const FavouriteMovieList = ({ favouriteMovies, handleClick }) => {
  return (
    <div>
      {Object.values(favouriteMovies)
        .sort((a: Movie, b: Movie) => b.upvotes - a.upvotes)
        .map((movie: Movie) => (
          <MovieItem
            key={movie.imdbID}
            movie={movie}
            count={movie?.upvotes || 1}
            handleClick={handleClick}
          />
        ))}
    </div>
  );
};
