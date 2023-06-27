import * as React from "react";
import * as ReactDOM from "react-dom";
import { ErrorBoundary } from "react-error-boundary";
import { App } from "./base/App";
import "./index.css";
import { UNEXPECTED_ERROR } from "@scribbr-assessment-full-stack/common/src";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>{UNEXPECTED_ERROR}:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

ReactDOM.render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <App />
  </ErrorBoundary>,
  document.getElementById("root")
);
