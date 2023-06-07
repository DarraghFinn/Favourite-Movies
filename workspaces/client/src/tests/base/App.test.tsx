import { render, screen } from "@testing-library/react";
import React from "react";
import { App } from "../../base/App";

describe("<App /> tests", () => {
  it("should render landing page", async () => {
    render(<App />);

    expect(await screen.findByTestId("scribbr-movies")).toBeInTheDocument();
  });
});
