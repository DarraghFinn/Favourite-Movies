import React from "react";
import { VoteButton } from "../button/VoteButton";
import { MovieItemProps } from "@scribbr-assessment-full-stack/common/src";

export const MovieItem = (props: MovieItemProps) => {
  const { movie, count, handleClick, tabIndex } = props;
  return (
    <div
      className="movie"
      data-testid="scribbr-movie-item"
      onClick={() => handleClick(movie)}
      tabIndex={tabIndex}
    >
      <img id="moviePoster" src={movie.Poster} alt="moviePoster" />
      <div className="movieInfo">
        <div id="movieTitle">{movie.Title}</div>
        <div id="movieYear">{movie.Year}</div>
      </div>
      <VoteButton count={count} />
    </div>
  );
};
