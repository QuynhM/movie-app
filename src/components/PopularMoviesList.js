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
import { Box, Grid, PaginationItem, Stack } from "@mui/material";
import { Button } from "@mui/material";
import { Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%", // Adjust the width as needed
  height: "80vh", // Adjust the height as needed
  backgroundColor: "rgba(0,0,0, 0.8)",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function MoviesByGenre() {
  const [movies, setMovies] = useState([]);
  const [modalMovies, setModalMovies] = useState([]); // Separate list for modal
  const [loading, setLoading] = useState(false);
  // const [genreTitle, setGenreTitle] = useState(null);
  const [page, setPage] = useState(1);
  const moviesPerPage = 4;
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setModalMovies(movies);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

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

        setMovies(res.data.results);

        console.log("Movies:", movies);
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
            <div>
              <Typography variant="h5" my={3} sx={{}}>
                What's Popular
              </Typography>

              <Button onClick={() => setOpen(true)}>Explore</Button>
              <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <CloseIcon
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      cursor: "pointer",
                    }}
                    onClick={() => setOpen(false)}
                  />
                  <div
                    style={{
                      maxHeight: "1000px",
                      overflowY: "auto",
                    }}
                  >
                    <Grid
                      container
                      spacing={12}
                      alignItems="center"
                      justifyContent="center"
                      className="display"
                      flexDirection="row"
                    >
                      {movies.map((item) => (
                        <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                          <MovieBox item={item} />
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                </Box>
              </Modal>
            </div>

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

          <Grid
            container
            spacing={12}
            alignItems="center"
            justifyContent="center"
            className="display"
            flexDirection="row"
          >
            {movies.slice(startIndex, endIndex).map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <MovieBox item={item} />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </>
  );
}

export default MoviesByGenre;
