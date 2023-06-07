import { ADD_BUTTON } from "@scribbr-assessment-full-stack/common/src";
import { render, screen } from "@testing-library/react";
import React from "react";
import { VoteButton } from "../../../components/button/VoteButton";

describe("<VoteButton /> tests", () => {
  it("should render vote button component - upvote button", async () => {
    render(<VoteButton count={1} />);

    expect(
      await screen.findByTestId("scribbr-upvote-button")
    ).toBeInTheDocument();
    expect(
      await screen.findByTestId("scribbr-upvote-button")
    ).toHaveTextContent("❤️");
  });

  it("should render vote button component - add to list button", async () => {
    render(<VoteButton count={null} />);

    expect(
      await screen.findByTestId("scribbr-vote-button")
    ).toBeInTheDocument();
    expect(await screen.findByTestId("scribbr-vote-button")).toHaveTextContent(
      ADD_BUTTON
    );
  });
});
