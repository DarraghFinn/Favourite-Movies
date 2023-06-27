import { ErrorSection } from "@scribbr-assessment-full-stack/client/src/components/search/error/ErrorSection";
import { render, screen } from "@testing-library/react";
import React from "react";

describe("<ErrorSection /> tests", () => {
  it("should show error in error section", async () => {
    render(<ErrorSection error={"Error"} />);

    expect(
      await screen.findByTestId("scribbr-error-section")
    ).toBeInTheDocument();
    expect(
      await screen.findByTestId("scribbr-error-section")
    ).toHaveTextContent("Error");
  });
});
