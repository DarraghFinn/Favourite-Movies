import { render, screen } from "@testing-library/react";
import React from "react";
import { SearchResultsList } from "../../../../components/search/searchResultsList/SearchResultsList";

describe("<SearchResultsList /> tests", () => {
  it("should render search results list component", async () => {
    render(
      <SearchResultsList
        searchedResults={{
          Response: "True",
          Search: [
            {
              Poster:
                "https://m.media-amazon.com/images/M/MV5BZmJkMmE1NjUtYTkyNC00MTEzLTgzNzgtOTU5NjFlYjU3OTY2XkEyXkFqcGdeQXVyMDY1OTk5Mw@@._V1_SX300.jpg",
              Title: "GRR Get 'Em, Tiger",
              Type: "movie",
              Year: "2020",
              imdbID: "tt15180496",
            },
          ],
        }}
      />
    );

    expect(
      await screen.findByTestId("scribbr-result-list")
    ).toBeInTheDocument();
  });
});
