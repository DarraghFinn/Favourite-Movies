import { UNEXPECTED_ERROR } from "@scribbr-assessment-full-stack/common/src";
import React from "react";

export const ErrorSection = ({ error }: { error: string }) => (
  <div className="error-section" data-testid="scribbr-error-section">
    {error || `${UNEXPECTED_ERROR}`}
  </div>
);
