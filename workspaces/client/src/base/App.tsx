import React, { useState } from "react";
import { Header } from "../components/header/Header";
import { SearchBar } from "../components/search/searchBar/SearchBar";

export function App() {
  const [searchedResults, setSearchedResults] = useState(null);

  return (
    <>
      <Header />
      <SearchBar setSearchedResults={setSearchedResults} />
    </>
  );
}
