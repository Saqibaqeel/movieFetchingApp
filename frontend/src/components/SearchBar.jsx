import React, { useState } from "react";
import movieStore from "../store/movieStore";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const { getMobieByName, usrerSearchHistory } = movieStore();
  console.log( usrerSearchHistory)

  const handleSearch = (e) => {
     e.preventDefault();
    if (query.trim()) {
      getMobieByName(query.trim());
    }
    setQuery("");
    
  };

  return (
   <div className="container">
    <form>
     
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="btn btn-primary"
          type="submit"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </form>
   </div>
  );
}
