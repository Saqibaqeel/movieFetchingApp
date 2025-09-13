import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchMovies } from "../Redux/slice/moveSlice";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const { userSearchHistory } = useSelector((state) => state.movies);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(searchMovies(query.trim()));
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

      {userSearchHistory.length > 0 && (
        <div className="mb-3">
          <strong>Recent Searches:</strong>{" "}
          {userSearchHistory.join(", ")}
        </div>
      )}
    </div>
  );
}
