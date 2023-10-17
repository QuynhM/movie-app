import React, { useEffect, useState } from "react";
import MovieBox from "../movie/MovieBox";
import Grid from "@mui/material/Grid";
import apiService from "../../api/apiService";
import axios from "axios";
import { API_KEY } from "../../api/config";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "./trending.css";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { IconButton } from "@mui/material";

function TrendingMoviesList() {
  const [movie, setMovie] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState();
  const [page, setPage] = useState(1);
  const moviesPerPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await apiService.get(
          `/trending/movie/day?api_key=${API_KEY}`
        );
        const result = res.data.results;

        setMovie([...result]);
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, []);

  const handleNextMovie = () => {
    let nextIndex = currentIndex + 1;

    if (nextIndex >= movie.length) {
      nextIndex = 0; // Loop back to the first movie
    }

    setCurrentIndex(nextIndex);
  };

  const handlePreviousMovie = () => {
    const previousIndex = currentIndex - 1;
    if (previousIndex >= 0) {
      setCurrentIndex(previousIndex);
    }
  };

  const currentMovie = movie[currentIndex];

  return (
    <>
      {currentMovie && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "90vh",
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 1)), url(https://image.tmdb.org/t/p/w500/${currentMovie.poster_path})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center 20%",
            backgroundSize: "100% auto",
            width: "100%",
            position: "relative", // Set position to relative
          }}
        >
          <IconButton
            onClick={handlePreviousMovie}
            disabled={currentIndex === 0}
            sx={{
              position: "absolute",
              top: "50%",
              left: "20px",
              transform: "translateY(-50%)",
              zIndex: 2,
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            <NavigateBefore />
          </IconButton>
          <Stack
            my={3}
            minWidth="350px"
            sx={{
              borderRadius: "0px",
            }}
          >
            <Box>
              <img
                alt={`${currentMovie.original_title}`}
                style={{
                  borderRadius: "10px",
                  maxWidth: "100%",
                  height: "auto",
                }}
                src={`https://image.tmdb.org/t/p/w500/${currentMovie.poster_path}`}
                className="img slide-in"
              />
            </Box>

            <Button
              variant="outlined"
              LinkComponent={Link}
              to={`/movie/${currentMovie.id}`}
              color="primary"
            >
              Info
            </Button>
          </Stack>

          <Divider />

          <IconButton
            onClick={handleNextMovie}
            sx={{
              position: "absolute",
              top: "50%",
              right: "20px",
              transform: "translateY(-50%)",
              zIndex: 2,
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            <NavigateNext />
          </IconButton>
        </div>
      )}
    </>
  );
}

export default TrendingMoviesList;
