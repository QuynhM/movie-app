import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import MovieBox from "./movie/MovieBox";

const FavoriteMovies = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  // Function to add a movie to favorites
  const addToFavorites = (movie) => {
    // Check if the movie is not already in favorites
    if (!favoriteMovies.find((favMovie) => favMovie.id === movie.id)) {
      setFavoriteMovies([...favoriteMovies, movie]);
    }
  };

  // Function to remove a movie from favorites
  const removeFromFavorites = (movie) => {
    const updatedFavorites = favoriteMovies.filter(
      (favMovie) => favMovie.id !== movie.id
    );
    setFavoriteMovies(updatedFavorites);
  };

  return (
    <div>
      <Typography variant="h5" my={3}>
        Favorite Movies
      </Typography>
      {favoriteMovies.length === 0 ? (
        <Typography variant="body1">No favorite movies yet.</Typography>
      ) : (
        favoriteMovies.map((item) => (
          <div key={item.id}>
            <MovieBox item={item} />
            <button onClick={() => removeFromFavorites(item)}>
              Remove from Favorites
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default FavoriteMovies;
