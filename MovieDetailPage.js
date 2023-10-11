import React, { useEffect, useState } from "react";
import apiService from "./src/api/apiService";
import { API_KEY } from "./src/api/config";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MovieDetail from "./src/components/movie/MovieDetail";
import { useParams } from "react-router-dom";
import { useAuth } from "./src/contexts/AuthContext";

function MovieDetailPage() {
  let auth = useAuth();
  // console.log(auth.user);
  let { movieId } = useParams();
  const [loading, setLoading] = useState();
  const [movieDetail, setMovieDetail] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await apiService.get(
          `movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
        );
        // console.log(res.data);
        setMovieDetail(res.data);
        setLoading(false);
      } catch (e) {
        // console.log(e.message);
      }
    };
    fetchData();
  }, [movieId]);

  return (
    <div
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`,
        backgroundSize: "cover", // Adjust background size as needed
        backgroundPosition: "center center", // Center the background image
        minHeight: "100vh", // Full viewport height
      }}
    >
      <MovieDetail movieDetail={movieDetail} loading={loading} />
    </div>
  );
}

export default MovieDetailPage;
