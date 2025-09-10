// File: Navbar.jsx
import React, { useState } from "react";
import movieStore from "../store/movieStore";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const { getMobieByName, usrerSearchHistory, ismoviesLoading } = movieStore();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      getMobieByName(query.trim());
      setQuery("");
    }
  };

  const clearHistory = () => {
    movieStore.setState({ usrerSearchHistory: [] });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
      <div className="container-fluid px-4">
        {/* Brand */}
        <a className="navbar-brand fw-bold d-flex align-items-center" href="#">
          <i className="fas fa-film me-2 text-warning"></i>
          MovieFinder
        </a>

        {/* Toggler for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Menu Items */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                <i className="fas fa-home me-1"></i> Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fas fa-video me-1"></i> Movies
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fas fa-info-circle me-1"></i> About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fas fa-envelope me-1"></i> Contact
              </a>
            </li>
          </ul>

          {/* Search Form */}
          <form className="d-flex mx-auto w-50" onSubmit={handleSearch}>
            <div className="input-group">
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
                disabled={ismoviesLoading}
              >
                {ismoviesLoading ? (
                  <span className="spinner-border spinner-border-sm"></span>
                ) : (
                  <i className="fas fa-search"></i>
                )}
              </button>
            </div>
          </form>

          {/* Search History Dropdown */}
          <ul className="navbar-nav ms-3">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="historyDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-history me-1"></i> History
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="historyDropdown"
              >
                {usrerSearchHistory.length > 0 ? (
                  <>
                    {usrerSearchHistory.map((item, ind) => (
                      <li key={ind}>
                        <button
                          className="dropdown-item text-truncate"
                          onClick={() => getMobieByName(item)}
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={clearHistory}>
                        <i className="fas fa-trash-alt me-1"></i> Clear History
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <span className="dropdown-item text-muted">
                      No history yet
                    </span>
                  </li>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
