import { render, screen } from "@testing-library/react";
import React from "react";
import { FavouriteMovieList } from "../../../components/favouriteMovieList/FavouriteMovieList";

describe("<FavouriteMovieList /> tests", () => {
  it("should render favourite movie list component", async () => {
    render(
      <FavouriteMovieList
        handleClick={() => {}}
        favouriteMovies={{
          "abc-123": {
            Poster: "Test poster",
            Title: "This Test",
            Type: "Horror",
            Year: "2003",
            imdbID: "123-abc",
            upvotes: 1,
          },
        }}
      />
    );

    expect(await screen.findByTestId("scribbr-movie-list")).toBeInTheDocument();
  });
});
