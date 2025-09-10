// File: MovieCard.jsx
import React, { useEffect } from "react";
import moveStore from "../store/movieStore";
import CardSkelaton from "./CardSkelaton";

export default function MovieCard() {
  const { movies, ismoviesLoading, setMovies } = moveStore();

  useEffect(() => {
    setMovies(); // fetch movies on mount
  }, [setMovies]);

  const list = Array.isArray(movies) ? movies : movies?.titles || [];

  return (
    <div className="container mt-5">
      <style>{`
        .movie-card { 
          transition: transform .25s ease, box-shadow .25s ease; 
          border-radius: .6rem; 
          overflow: hidden; 
        }
        .movie-card:hover { 
          transform: scale(1.05); 
          box-shadow: 0 12px 30px rgba(0,0,0,0.2); 
        }
        .card-img-top { 
          border-bottom: 1px solid rgba(0,0,0,0.08); 
        }
      `}</style>

      {ismoviesLoading ? (
        <CardSkelaton/>
      ) : (
        <div className="row g-4">
          {list.length === 0 && (
            <div className="col-12 text-center text-muted">No movies found.</div>
          )}

          {list.map((item, idx) => {
            const id = item.id || `movie-${idx}`;
            const title = item.primaryTitle || "Untitled";
            const year = item.startYear || "";
            const img =
              item.primaryImage?.url ||
              "https://via.placeholder.com/300x450?text=No+Image";
            const genres = item.genres?.join(", ") || "";
            const rating = item.rating?.aggregateRating || "N/A";
            const votes = item.rating?.voteCount || "";
            const plot = item.plot || "";

            return (
              <div className="col-sm-6 col-md-4 col-lg-3" key={id}>
                <div className="card h-100 movie-card shadow-sm">
                  <img
                    src={img}
                    alt={title}
                    className="card-img-top"
                    style={{ height: 340, objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h6 className="card-title mb-2">
                      <i className="fas fa-film me-2"></i>
                      {title} {year && <small className="text-muted">({year})</small>}
                    </h6>
                    {genres && (
                      <p className="small text-muted mb-2">
                        <i className="fas fa-tags me-2"></i>
                        {genres}
                      </p>
                    )}
                    <p className="mb-2">
                      <i className="fas fa-star text-warning me-2"></i>
                      <strong>{rating}</strong>{" "}
                      {votes && <span className="text-muted">({Number(votes).toLocaleString()})</span>}
                    </p>
                    {plot && (
                      <p className="text-muted small mb-0" style={{ flexGrow: 1 }}>
                        {plot}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
