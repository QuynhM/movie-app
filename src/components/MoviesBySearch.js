import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieBox from "./movie/MovieBox";
import { API_KEY } from "../api/config";
import apiService from "../api/apiService";
import LoadingScreen from "./LoadingScreen";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Pagination,
  Typography,
} from "@mui/material";
import NoMatchPage from "../pages/NoMatchPage";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";

function MoviesBySearch() {
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("query");
  console.log("Search:", query);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await apiService.get(
          `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&language=en-US&}&page=${page}`
        );

        setSearchResult(res.data.results);

        console.log("Movies:", searchResult);
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, [query, page]);

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
          <div>
            <Grid
              container
              spacing={12}
              alignItems="center"
              justifyContent="center"
              className="display"
              flexDirection="row"
            >
              {searchResult ? (
                searchResult.slice(0, 12).map((item) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                    <MovieBox item={item} />
                  </Grid>
                ))
              ) : (
                <NoMatchPage />
              )}
            </Grid>

            {searchResult.length > 0 && (
              <Grid container spacing={3}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "45px",
                  }}
                >
                  {isSmallScreen ? (
                    <div
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
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
                    </div>
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
export default MoviesBySearch;
