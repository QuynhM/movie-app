import React, { useEffect, useState } from "react";
import apiService from "../api/apiService";
import { API_KEY, BASE_URL } from "../api/config";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import MoviesByGenre from "./MoviesByGenre";
import LoadingScreen from "./LoadingScreen";
import MovieBox from "./movie/MovieBox";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

export default function Category() {
  const [loading, setLoading] = useState(false);
  const [genresList, setGenresList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genreId, setGenreId] = useState();
  const [movieList, setMovieList] = useState([]);
  const [genreName, setGenreName] = useState();

  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await apiService.get(
          `genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        setGenresList(res.data.genres);
        setLoading(false);
        // console.log("Genre:", res);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, []);

  const handleClick = (event, genreId) => {
    setSelectedGenre(genreId);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "category-popover" : undefined;

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        sx={{
          pr: 2,
          pt: 1.5,
          pb: 2.5,
          "&:hover, &:focus": {
            backgroundColor: "transparent",
          },
        }}
        aria-describedby={id}
      >
        <ListItemText
          primary="Category"
          primaryTypographyProps={{
            fontSize: 18,
            fontWeight: "bold",
            lineHeight: "20px",
            mb: "2px",
          }}
          sx={{ my: 0 }}
        />
      </ListItemButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <List>
          {genresList.map((item) => (
            <div key={item.id}>
              <ListItem
                button
                onClick={() => {
                  setGenreId(item.id);
                  setGenreName(item.name);
                  navigate(`/genre/${item.id}/${item.name}`);
                  handleClose();
                }}
                key={item.id}
              >
                <ListItemText primary={item.name} />
              </ListItem>

              <Divider />
            </div>
          ))}
        </List>
      </Popover>

      <Grid container direction="row" spacing={2} mt={2}>
        {loading ? (
          <LoadingScreen />
        ) : (
          movieList.map((item) => (
            <Grid item xs={10} sm={6} md={4} lg={3}>
              <MovieBox key={item.id} item={item} />
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
}
