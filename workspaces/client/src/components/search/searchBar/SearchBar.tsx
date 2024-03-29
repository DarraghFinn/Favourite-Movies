import { fetchMovieBySearch } from "@scribbr-assessment-full-stack/client/src/api/movieApi";
import {
  SEARCH_PLACEHOLDER,
  SearchBarProps,
} from "@scribbr-assessment-full-stack/common";
import React, { useEffect, useState } from "react";

export const SearchBar = ({ setSearchedResults }: SearchBarProps) => {
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
        const data = await fetchMovieBySearch(title);
        setSearchedResults(data);
      }
    } catch (error) {
      throw error;
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
        tabIndex={1}
      />
    </div>
  );
};
