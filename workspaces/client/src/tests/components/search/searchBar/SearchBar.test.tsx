import { render, screen } from "@testing-library/react";
import React from "react";
import { SearchBar } from "../../../../components/search/searchBar/SearchBar";

describe("<SearchBar /> tests", () => {
  it("should render search bar component", async () => {
    render(<SearchBar setSearchedResults={() => {}} />);

    expect(await screen.findByTestId("scribbr-search-bar")).toBeInTheDocument();
  });
});
