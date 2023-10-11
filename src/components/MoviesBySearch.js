import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieBox from "./movie/MovieBox";
import { API_KEY } from "../api/config";
import apiService from "../api/apiService";
import LoadingScreen from "./LoadingScreen";
import { Divider, Grid, Typography } from "@mui/material";
import NoMatchPage from "../pages/NoMatchPage";

function MoviesBySearch() {
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("query");
  console.log("Search:", query);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await apiService.get(
          `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&language=en-US&limit = 3`
        );

        setSearchResult(res.data.results);

        console.log("Movies:", searchResult);
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, [query]);

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
                searchResult.map((item) => (
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
export default MoviesBySearch;
