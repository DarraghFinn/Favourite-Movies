import { ADD_BUTTON } from "@scribbr-assessment-full-stack/common/src";
import React from "react";

export const VoteButton = (props: { count: number | null }) => {
  const { count } = props;
  const isUpvoteButton = count != null;
  const className = isUpvoteButton ? "upvoteButton" : "voteButton";
  const testId = isUpvoteButton
    ? "scribbr-upvote-button"
    : "scribbr-vote-button";

  return (
    <div className={className} data-testid={testId} role="button">
      {isUpvoteButton ? (
        <>
          <div id="upvoteIcon">❤️</div>
          <div id="upvotes">{count}</div>
        </>
      ) : (
        <div id="votes">{ADD_BUTTON}</div>
      )}
    </div>
  );
};
