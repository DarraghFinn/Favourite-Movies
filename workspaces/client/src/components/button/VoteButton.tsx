import React from "react";

export const VoteButton = (props: { count: number | null }) => {
  const { count } = props;
  const isUpvoteButton = count != null;

  return (
    <div className={isUpvoteButton ? "upvoteButton" : "voteButton"}>
      {isUpvoteButton ? (
        <>
          <div id="upvoteIcon">❤️</div>
          <div id="upvotes">{count}</div>
        </>
      ) : (
        <div id="votes">Add to List</div>
      )}
    </div>
  );
};
