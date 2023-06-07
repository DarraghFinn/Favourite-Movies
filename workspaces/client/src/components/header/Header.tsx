import { APP_TITLE } from "@scribbr-assessment-full-stack/common";
import React from "react";

export function Header() {
  return <h1 data-testid="scribbr-header">{APP_TITLE}</h1>;
}
