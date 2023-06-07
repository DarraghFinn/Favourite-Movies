import { Movie } from "@scribbr-assessment-full-stack/common/src";
import React from "react";
import { MovieItem } from "../../movieItem/MovieItem";

export const SearchResultsList = ({ searchedResults, handleClick }) => {
  const { Search, error } = searchedResults || {};

  return (
    <div className="searchResultsList" data-testid="scribbr-result-list">
      {Search?.length > 0 ? (
        Search.map((movie: Movie) => (
          <MovieItem
            key={movie.imdbID}
            movie={movie}
            count={null}
            handleClick={handleClick}
          />
        ))
      ) : (
        <div>{error}</div>
      )}
    </div>
  );
};
