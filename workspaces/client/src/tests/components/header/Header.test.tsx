import { APP_TITLE } from "@scribbr-assessment-full-stack/common/src";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Header } from "../../../components/header/Header";

describe("<Header /> tests", () => {
  it("should render Header component", async () => {
    render(<Header />);

    expect(await screen.findByTestId("scribbr-header")).toBeInTheDocument();
    expect(screen.getByTestId("scribbr-header")).toHaveTextContent(APP_TITLE);
  });
});
