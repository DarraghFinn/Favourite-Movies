import fetchMock from "jest-fetch-mock";
import { render, screen } from "@testing-library/react";
import React from "react";
import { App } from "../../base/App";

fetchMock.enableMocks();

describe("<App /> tests", () => {
  it("should render landing page", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    render(<App />);

    expect(await screen.findByTestId("scribbr-movies")).toBeInTheDocument();
  });
});
