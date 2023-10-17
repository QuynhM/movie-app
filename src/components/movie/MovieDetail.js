import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingScreen from "../LoadingScreen";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import RecommendIcon from "@mui/icons-material/Recommend";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";

// import { API_KEY } from "../api/config";
import { MyContext } from "../../contexts/MyContext";
import { useContext } from "react";

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const { favoriteList, setFavoriteList } = useContext(MyContext);

  const handleAddFavorite = () => {
    // Create a new movie object with the relevant details
    const newMovie = {
      id: movie.id,
      original_title: movie.original_title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
    };
    if (!favoriteList.some((favorite) => favorite.id === newMovie.id)) {
      const updatedFavorites = [...favoriteList, newMovie];
      setFavoriteList(updatedFavorites);
    }
  };
  useEffect(() => {
    // Fetch movie details based on the `movieId` parameter from the URL
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=0e0e616fa66b34c2391ce2742c991f6f`
        );

        // Set the movie data to the state
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) {
    // Display a loading message or spinner while fetching data
    return <LoadingScreen />;
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically
          minHeight: "100vh", // Full viewport height
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 1)), url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center 30%",
          backgroundSize: "100% auto",
        }}
      >
        {movie ? (
          <Stack
            minWidth="60%"
            flexDirection={{ xs: "column", md: "row" }}
            sx={{ borderRadius: "10px", margin: "20px" }}
          >
            <Stack
              my={3}
              minWidth="350px"
              sx={{
                borderRadius: "10px",
              }}
            >
              <Box>
                <img
                  alt={`${movie.original_title}`}
                  height="500px"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  style={{ borderRadius: "10px" }}
                />
              </Box>
            </Stack>

            <Stack
              my={3}
              pl={{ xs: 0, md: 1 }}
              minHeight="100%"
              minWidth="400px"
              justifyContent="space-between"
            >
              <Stack
                justifyContent="space-between"
                alignItems="center"
                flexDirection="row"
              >
                <Typography
                  mb={1}
                  variant="h6"
                  style={{ fontSize: "59px", fontWeight: "bold" }}
                >
                  {`${movie.original_title}`}
                </Typography>
                <Stack flexDirection="column" alignItems="end">
                  <Typography
                    sx={{
                      marginRight: "34px",
                      marginTop: "10px",
                    }}
                    color="error"
                  >
                    {/* {movieError} */}
                  </Typography>
                </Stack>
              </Stack>
              <Stack my={{ xs: 2, md: 0 }}>
                <Typography variant="body">{`${movie.overview}`}</Typography>
              </Stack>

              <Stack
                my={{ xs: 2, md: 1 }}
                flexDirection="row"
                alignItems="center"
              >
                <Typography mr={1} variant="caption">
                  Genres
                </Typography>
                {movie.genres.map((item) => (
                  <Chip
                    key={`${item.id}`}
                    label={`${item.name}`}
                    size="small"
                    variant="outlined"
                  />
                ))}
              </Stack>
              <Stack
                my={{ xs: 2, md: 1 }}
                flexDirection="row"
                alignItems="center"
                flexWrap="wrap"
              >
                <Typography mr={1} variant="caption">
                  Companies
                </Typography>
                {movie.production_companies
                  .filter((item) => item.logo_path !== null)
                  .map((item) => (
                    <Chip
                      key={`${item.id}`}
                      avatar={
                        <Avatar
                          alt="Natacha"
                          src={`https://image.tmdb.org/t/p/w500/${item.logo_path}`}
                        />
                      }
                      label={`${item.name}`}
                      size="small"
                      variant="filled"
                    />
                  ))}
              </Stack>
              <Stack
                my={{ xs: 2, md: 1 }}
                flexDirection="row"
                alignItems="center"
              >
                <Typography mr={1} variant="caption">
                  Released:
                </Typography>
                <Chip
                  label={`${movie.release_date}`}
                  size="small"
                  variant="outlined"
                />
              </Stack>

              <Stack flexDirection="row" mt={1}>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  mr={3}
                >
                  <RecommendIcon className="recommend_icon" fontSize="small" />
                  <Typography variant="subtitle2" ml={1}>
                    {`${movie.vote_count}`}
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="row" justifyContent="center">
                  <FavoriteIcon className="favorite_icon" fontSize="small" />
                  <Typography variant="subtitle2" ml={1}>
                    {`${movie.vote_average}`}
                  </Typography>
                </Box>
              </Stack>
              <Button
                variant="contained"
                onClick={handleAddFavorite}
                sx={{ backgroundColor: "white" }}
              >
                Add to Favorite
              </Button>
            </Stack>
          </Stack>
        ) : (
          <Typography variant="h4" m={5}>
            Movie not found!
          </Typography>
        )}

        <Divider />
      </div>
    </>
  );
};

export default MovieDetail;
