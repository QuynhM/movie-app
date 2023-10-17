import React, { useContext } from "react";
import MovieBox from "../components/movie/MovieBox";
import Grid from "@mui/material/Grid";
import { MyContext } from "../contexts/MyContext";

function FavoriteMovies() {
  const { favoriteList } = useContext(MyContext);

  return (
    <div className="popular">
      {favoriteList.length === 0 ? (
        <h2>Your favorite list is empty!</h2>
      ) : (
        <>
          <Grid
            container
            spacing={12}
            alignItems="center"
            justifyContent="center"
            className="display"
            flexDirection="row"
          >
            {favoriteList.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <MovieBox item={item} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
}

export default FavoriteMovies;
