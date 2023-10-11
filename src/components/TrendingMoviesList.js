import React, { useEffect, useState } from "react";
import MovieBox from "./movie/MovieBox";
import Grid from "@mui/material/Grid";
import apiService from "../api/apiService";
import axios from "axios";
import { API_KEY } from "../api/config";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";

function TrendingMoviesList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState();
  const [page, setPage] = useState(1);
  // const [displayedMovies, setDisplayMovies] = useState([]);
  const moviesPerPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await apiService.get(
          `/trending/movie/day?api_key=${API_KEY}`
        );
        const result = res.data.results;

        setMovies([...result]);
        // setMovies(result);
        console.log("RES:", res);

        console.log("MoviesTrending:", movies);
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const startIndex = (page - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  console.log("Start:", startIndex);

  const handlePageChange = (event) => {
    let newPage = page + 1;
    if (newPage > totalPages) {
      setPage(1);
    } else {
      setPage(newPage);
    }
  };

  return (
    <>
      <div className="trending">
        <div className="trending-page">
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5" my={3} sx={{}}>
              TRENDING
            </Typography>

            <PaginationItem
              type="next"
              onClick={handlePageChange}
              showFirstButton={false}
              showLastButton={false}
              shape="rounded"
              variant="outlined"
            />
          </Stack>
          <Divider />
          <div className="display">
            {movies.slice(startIndex, endIndex).map((item) => (
              <Grid key={item.id} xs={12} sm={6} md={4} lg={3}>
                <MovieBox item={item} />
              </Grid>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default TrendingMoviesList;
