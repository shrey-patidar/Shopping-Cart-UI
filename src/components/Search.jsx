import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const Search = ({ search, setSearch, isSearchActive, setIsSearchActive }) => {
  const toggleSearch = (value) => {
    setIsSearchActive(value == 0 ? false : true);
  };

  return (
    <input
      type="text"
      placeholder="Search an item"
      onChange={(e) => {
        toggleSearch(e.target.value);
        setSearch(e.target.value);
      }}
      value={search}
    />
  );
};

export default Search;
