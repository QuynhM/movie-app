import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import TrendingMoviesList from "../components/TrendingMoviesList";
import PopularMoviesList from "../components/PopularMoviesList";

function HomePage() {
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent={{ md: "center", xs: "flex-end" }}
        sx={{
          minHeight: "100vh",
        }}
      >
        <Grid item direction="row" container>
          <TrendingMoviesList />
          <PopularMoviesList />
        </Grid>
      </Grid>
    </>
  );
}

export default HomePage;
