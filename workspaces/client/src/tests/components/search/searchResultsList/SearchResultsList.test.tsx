import { render, screen } from "@testing-library/react";
import React from "react";
import { SearchResultsList } from "../../../../components/search/searchResultsList/SearchResultsList";

describe("<SearchResultsList /> tests", () => {
  it("should render search results list component", async () => {
    render(<SearchResultsList handleClick={() => {}} searchedResults={{}} />);

    expect(
      await screen.findByTestId("scribbr-result-list")
    ).toBeInTheDocument();
  });

  it("should show error in search results list component", async () => {
    render(
      <SearchResultsList
        handleClick={() => {}}
        searchedResults={{ error: "Error" }}
      />
    );

    expect(
      await screen.findByTestId("scribbr-result-list")
    ).toBeInTheDocument();
    expect(await screen.findByTestId("scribbr-result-list")).toHaveTextContent(
      "Error"
    );
  });
});
