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
import { Box, Grid, IconButton } from "@mui/material";
import { NavigateBefore, NavigateNext } from "@mui/icons-material"; // Import icons
import "../index.css";

const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

function MoviesByGenre() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  let { genreId, genreName } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await apiService.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genreId}&page=${page}`
        );

        setMovies(res.data.results);

        console.log("Movies:", movies);
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, [genreId, page]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const isSmallScreen = window.innerWidth <= 750;

  return (
    <div className="popular">
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <div
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" my={3}>
              {genreName}
            </Typography>
            <Divider />
            {/* <Grid container spacing={12} className="display"> */}
            {movies ? (
              <Grid container spacing={3}>
                {movies.slice(0, 12).map((item) => (
                  <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                    <MovieBox item={item} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <NoMatchPage />
            )}
            {/* </Grid> */}

            {movies.length > 0 && (
              <Grid container spacing={3}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",

                    marginTop: "45px",
                  }}
                >
                  {isSmallScreen ? (
                    <Box>
                      <IconButton
                        onClick={() => handlePageChange(null, page - 1)}
                      >
                        <NavigateBefore />
                      </IconButton>
                      <IconButton
                        onClick={() => handlePageChange(null, page + 1)}
                      >
                        <NavigateNext />
                      </IconButton>
                    </Box>
                  ) : (
                    <Pagination
                      count={10}
                      page={page}
                      onChange={handlePageChange}
                    />
                  )}
                </Box>
              </Grid>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default MoviesByGenre;
