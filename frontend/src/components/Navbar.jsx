import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchMovies, clearHistory } from "../Redux/slice/moveSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const { userSearchHistory, isMoviesLoading } = useSelector(
    (state) => state.movies
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(searchMovies(query.trim()));
      setQuery("");
    }
  };

  const clearHistoryHandler = () => {
    dispatch(clearHistory());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          MovieFinder
        </a>

        <form className="d-flex mx-auto w-50" onSubmit={handleSearch}>
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
            disabled={isMoviesLoading}
          >
            {isMoviesLoading ? "Loading..." : "Search"}
          </button>
        </form>

        <ul className="navbar-nav ms-3">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
            >
              History
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
              {userSearchHistory?.length > 0 ? (
                <>
                  {userSearchHistory.map((item, ind) => (
                    <li key={ind}>
                      <button
                        className="dropdown-item"
                        onClick={() => dispatch(searchMovies(item))}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={clearHistoryHandler}
                    >
                      Clear History
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <span className="dropdown-item text-muted">No history yet</span>
                </li>
              )}
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}
