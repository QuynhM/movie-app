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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log(
          "LINK:",
          `https://api.themoviedb.org/3//movie/popular?api_key=${API_KEY}`
        );
        const res = await apiService.get(
          `https://api.themoviedb.org/3//movie/popular?api_key=${API_KEY}`
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
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="popular">
            <div className="popular-title">
              <Typography variant="h5" my={3}>
                What's Popular
              </Typography>
              <Divider />
            </div>
            <div className="display">
              {/* <div className="pop-display"> */}
              {movies ? (
                movies.map((item) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                    <MovieBox item={item} />
                  </Grid>
                ))
              ) : (
                <NoMatchPage />
              )}
              {/* </div> */}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default MoviesByGenre;
