import { SEARCH_PLACEHOLDER } from "@scribbr-assessment-full-stack/common";
import React, { useEffect, useState } from "react";

export const SearchBar = ({ setSearchedResults }) => {
  const [searchInput, setSearchInput] = useState("");
  const searchIcon = require("../../../../images/Icon.png");

  useEffect(() => {
    // Adding a debounce delay of 500ms to prevent too many api calls at the consecutively
    const debounce = setTimeout(() => {
      fetchMovies(searchInput);
    }, 500);
    return () => clearTimeout(debounce);
  }, [searchInput]);

  const fetchMovies = async (title: string) => {
    try {
      if (title.length > 0) {
        const response = await fetch(`/api/movies/${title}`);
        const data = await response.json();
        setSearchedResults(data);
      } else {
        setSearchedResults(null);
      }
    } catch (error) {
      setSearchedResults(error);
      console.error(error);
    }
  };

  const handleChange = (e: {
    preventDefault: () => void;
    target: { value: React.SetStateAction<string> };
  }) => {
    e.preventDefault();
    const movieTitle = e.target.value;
    setSearchInput(movieTitle);
  };

  return (
    <div className="searchBarWrapper" data-testid="scribbr-search-bar">
      <img src={searchIcon} alt="searchBarIcon" />
      <input
        autoFocus
        type="text"
        id="searchBarInput"
        onChange={handleChange}
        placeholder={SEARCH_PLACEHOLDER}
      />
    </div>
  );
};
