import React, { useEffect, useState } from "react";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import Typography from "@mui/material/Typography";
import MovieBox from "./movie/MovieBox";
import LoadingScreen from "./LoadingScreen";
import Pagination from "@mui/material/Pagination";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import NoMatchPage from "../pages/NoMatchPage";
import { Grid } from "@mui/material";

function MoviesByGenre() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [genreTitle, setGenreTitle] = useState(null);

  let { genreId, genreName } = useParams();
  // console.log("Id:", genreId);
  // console.log("Name:", genreName);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await apiService.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&append_to_response=videos&with_genres=${genreId}`
        );

        // const result = res.data;

        setMovies(res.data.results);

        console.log("Movies:", movies);
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, [genreId]);

  return (
    <div>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="displayMovies" flexDirection="row">
            <Typography variant="h5" my={3}>
              {genreName}
            </Typography>
            <Divider />
            <Grid
              container
              spacing={12}
              alignItems="center"
              justifyContent="center"
              className="display"
              flexDirection="row"
            >
              {movies ? (
                movies.map((item) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                    <MovieBox item={item} />
                  </Grid>
                ))
              ) : (
                <NoMatchPage />
              )}
            </Grid>
          </div>
        </>
      )}
    </div>
  );
}

export default MoviesByGenre;
