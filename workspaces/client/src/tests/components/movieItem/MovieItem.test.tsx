import { render, screen } from "@testing-library/react";
import React from "react";
import { MovieItem } from "../../../components/movieItem/MovieItem";

describe("<MovieItem /> tests", () => {
  it("should render movie item component", async () => {
    render(
      <MovieItem
        movie={{
          Poster: "Test poster",
          Title: "This Test",
          Type: "Horror",
          Year: "2003",
          imdbID: "123-abc",
        }}
        count={null}
        tabIndex={undefined}
      />
    );

    expect(await screen.findByTestId("scribbr-movie-item")).toBeInTheDocument();
  });
});
