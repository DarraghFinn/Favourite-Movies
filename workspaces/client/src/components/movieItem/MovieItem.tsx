import { Movie } from "@scribbr-assessment-full-stack/common/src";
import React from "react";
import { VoteButton } from "../button/VoteButton";

export const MovieItem = (props: {
  movie: Movie;
  count: number;
  handleClick: (movie: Movie) => void;
}) => {
  const { Poster, Title, Year } = props.movie;

  return (
    <div
      className="movie"
      data-testid="scribbr-movie-item"
      onClick={() => props.handleClick(props.movie)}
    >
      <img id="moviePoster" src={Poster} alt="moviePoster" />
      <div className="movieInfo">
        <div id="movieTitle">{Title}</div>
        <div id="movieYear">{Year}</div>
      </div>
      <VoteButton count={props.count} />
    </div>
  );
};
