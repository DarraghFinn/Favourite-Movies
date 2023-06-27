import {
  OMDbMovie,
  SearchResultsListProps,
} from "@scribbr-assessment-full-stack/common/src";
import React from "react";
import { MovieItem } from "../../movieItem/MovieItem";

export const SearchResultsList = (props: SearchResultsListProps) => {
  const { searchedResults, handleClick } = props;

  return (
    <div className="searchResultsList" data-testid="scribbr-result-list">
      {searchedResults.Search.map((movie: OMDbMovie, index: number) => (
        <MovieItem
          key={movie.imdbID}
          movie={movie}
          count={null}
          handleClick={handleClick}
          tabIndex={index + 1}
        />
      ))}
    </div>
  );
};
